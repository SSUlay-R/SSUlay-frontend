import React, { useEffect, useMemo, useState, useContext } from 'react';
import "./BuddySearch.css";
import ResultTag from './ResultTag';
import TagBlock from './TagBlock';
import Table from './Table';
import { collection, getDocs, doc, updateDoc, getDoc, query, where } from "firebase/firestore";
import { db } from '../config/firebase';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
export default function BuddySearch() {
  const navigate = useNavigate();
  const [selectedBuddy, setSelectedBuddy] = useState([]);  //선호 버디목록에 선택된 버디들
  const [selectedTags, setSelectedTags] = useState([]); //검색 필터링용 태그
  const [rankedBuddy, setRankedBuddy] = useState([]); //랭킹 매겨진 버디들
  const [showRankingError, setShowRankingError] = useState(''); //랭킹 유효성검사 관련 메시지
  const [searchedBuddy, setSearchBuddy] = useState([]); //검색 결과 리스트
  const [users, setUsers] = useState([]);// db users
  const { currentUser } = useContext(AuthContext); //현재 로그인된 사람
  //DB에서 users 가져오기
  useEffect(() => {
    const fetchData = async () => {
      console.log(currentUser.uid)
      if (currentUser && currentUser.uid) {
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.data();
        let q;
        let userSnapshot2;

        if (userData.nationality === "Korea") {
          q = query(collection(db, "users"), where("nationality", "!=", "Korea"));
          userSnapshot2 = await getDocs(q);
        } else {
          q = query(collection(db, "users"), where("nationality", "==", "Korea"));
          userSnapshot2 = await getDocs(q);
        }
        const userListPromises = userSnapshot2.docs.map(async (doc1) => {
          const data = doc1.data();
          const tagRef = doc(db, 'interestTag', data.uid);
          const tagSnapshot = await getDoc(tagRef);

          if (!tagSnapshot.exists) {
            return null; // or however you want to handle this case
          }

          const tagData = tagSnapshot.data();

          // Get the names of non-empty interest categories
          const interests = Object.keys(tagData).filter(key => {
            return Array.isArray(tagData[key]) && tagData[key].length > 0;
          });

          return {
            userName: data.userName,
            interests: interests,//.join(', '),
            lifestyle: [],
            uid: data.uid,
          };
        });

        const userList = (await Promise.all(userListPromises)).filter(user => user !== null);

        setUsers(userList);
        console.log(userList); // Add this line to log your users data
      }
    };

    fetchData();
  }, [currentUser && currentUser.uid]);



  const interests = [
    "KoreaAttraction",
    "Exercise",
    "Food",
    "Music",
    "Instrument"
  ];
  const lifestyles = [];
  const columns = useMemo(
    () => [
      {
        accessor: "userName",
        Header: "User name",
      },
      {
        accessor: "interests",
        Header: "Interests",
      },
      {
        accessor: "lifestyle",
        Header: "Lifestyle",
      },

    ], []
  );
  const data = useMemo(() => users, [users]);
  const handleSelectRow = (rowData) => {
    // 이미 선택한 데이터인 경우 중복 추가되지 않도록 처리
    if (!selectedBuddy.includes(rowData)) {
      setSelectedBuddy([...selectedBuddy, rowData]);
    }
  };
  const handleRankRow = (rowData, rank) => {
    if (rank === 0) {
      setRankedBuddy(rankedBuddy.filter((row) => row.userName !== rowData.userName));
    } else {
      const dataWithRank = { ...rowData, rank };
      setRankedBuddy(prevRankedBuddy => {
        const updatedBuddy = prevRankedBuddy.filter((row) => row.userName !== rowData.userName);
        return [...updatedBuddy, dataWithRank];
      });
    }
  };
  const handleSelectedTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag)); //이미 존재하면 해당 태그만 제외하고 다시 배열을 만듦
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  }

  //검색 필터링 함수, 검색버튼 누를 때 실행
  const searchBuddy = () => {
    //console.log(currentUser)
    let filteredData = data;
    if (selectedTags.length > 0) {
      filteredData = data.filter((row) => {
        // Convert the comma-separated tag strings back into arrays of tags
        const interestsArray = row.interests;
        const lifestyleArray = row.lifestyle;

        // Check if any of the individual tags are included in the selected tags
        return (
          interestsArray.some(tag => selectedTags.includes(tag)) ||
          lifestyleArray.some(tag => selectedTags.includes(tag))
        );
      });
    }
    // Format the interests
    filteredData = filteredData.map((buddy) => ({
      ...buddy,
      interests: buddy.interests.join(' '),
    }));
    setSearchBuddy(filteredData);
  };

  const handleSubmit = async () => {
    const ranks = rankedBuddy.map(row => row.rank);
    const hasDuplicateRanks = (new Set(ranks)).size !== ranks.length; // 랭킹 중복있나 확인
    const hasAllRanks = (new Set(ranks).size !== 3); //랭킹 모두 가지고 있는지 확인
    if (hasDuplicateRanks) {
      setShowRankingError('** Please assign unique rankings to the selected buddies.');
    }
    else if (hasAllRanks) {
      setShowRankingError('** Please assign rankings to the all buddies.');
    } else {
      // 정상일경우 제출할 로직 여기에 작성
      setShowRankingError(false);
      // Sort the ranked buddies by rank and map to an array of their ids
      let rankedBuddyIds = rankedBuddy.sort((a, b) => a.rank - b.rank).map(buddy => buddy.uid);
      // Update the current user's preferred buddies in Firestore
      const userRef = doc(db, 'users', currentUser.uid); // replace "currentUser" with the current user's ID
      await updateDoc(userRef, {
        preferedBuddy: rankedBuddyIds
      });
      navigate('/buddyform/complete');
    }
  };



  return (
    <>
      <div className="buddy-page-container">
        <h1 className="buddy-page-title">Choose your preferred buddies</h1>
        <hr />
        <div className="box-container">
          The list below is Soongsil students who applied for the Buddy program. Please read the information about the students, select 3 students who you want to be matched as a buddy and submit. Please make sure that the matching will be done based on your preference
        </div>
        <div className="tag-container">
          <div className="semi-title">
            Interests
          </div>
          <div className="tags">
            {interests.map((interest, index) => (
              <TagBlock key={index}
                isSelected={selectedTags.includes(interest)}
                onClick={handleSelectedTag}>{interest}</TagBlock>
            ))}
          </div>
        </div>

        <div className="tag-container">
          <div className="semi-title">
            Lifestyle & Value
          </div>
          <div className="tags">
            {lifestyles.map((lifestyle, index) => (
              <TagBlock key={index}
                isSelected={selectedTags.includes(lifestyle)}
                onClick={handleSelectedTag}>{lifestyle}</TagBlock>
            ))}
          </div>
        </div>
        <div className="search-result">
          <div className="semi-title">Search result</div>
          <hr />
          <div className="selected-tags">
            {selectedTags.map((tag, index) => (
              <ResultTag key={index} onRemoveTag={handleSelectedTag}>{tag}</ResultTag>
            ))}
            <button className="search-btn" onClick={searchBuddy}>Search</button>
          </div>
          <div className="result-table-container">
            <div className="result-counter">{searchedBuddy.length} results</div>
            <div className="result-table">
              <Table columns={columns} data={searchedBuddy} handleSelectRow={handleSelectRow} />
            </div>
          </div>
          <div className="selected-container">
            <div className="semi-title">Selected</div>
            <div className="selected-table">
              <Table columns={columns} data={selectedBuddy} handleRankRow={handleRankRow} />
            </div>
          </div>
          {showRankingError && (
            <div className="error-message">{showRankingError}</div>
          )}
          <button className="submit-btn" onClick={handleSubmit} id="submit-btn">Submit</button>
        </div>
      </div>
    </>
  )
}
