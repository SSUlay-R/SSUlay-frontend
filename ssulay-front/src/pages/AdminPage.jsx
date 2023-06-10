import React, { useMemo, useState } from 'react';
import './AdminPage.css';
import Table from '../components/Table';
import Alert from 'react-bootstrap/Alert';
<<<<<<< HEAD
import AutoPreferPriority from '../function/AutoPreferPriority';
=======
import GaleShapelyAlgorithm from '../function/GaleShapelyAlgorithm';
import { doc, setDoc, collection, getDocs, updateDoc, getDoc } from "firebase/firestore";
import { db } from '../config/firebase';
>>>>>>> fa6b64763e47c4353c150c8489759719dc3fb864

export default function AdminPage() {

  const columns = useMemo(
    () => [
      {
        accessor: "userName",
        Header: "이름",
      },
      {
        accessor: "buddyName",
        Header: "버디",
      },
      {
        accessor: "buddyNationality",
        Header: "버디 국적"
      },
      {
        accessor: "studentNumber",
        Header: "학번",
      },
      {
        accessor: "email",
        Header: "이메일"
      }
    ], []
  );
  //파이어베이스에서 데이터 가져오기
  const fetchUsers = async () => {
    const userCollection = collection(db, 'users');
    const userSnapshot = await getDocs(userCollection);
    const users = {};
    userSnapshot.forEach((doc) => (users[doc.id] = doc.data()));
    return users;
  };
  
  const fetchMatchingResults = async () => {
    const matchingResultsCollection = collection(db, 'matchingResults');
    const matchingResultsSnapshot = await getDocs(matchingResultsCollection);
    const matchingResults = {};
    matchingResultsSnapshot.forEach((doc) => (matchingResults[doc.id] = doc.data()));
    return matchingResults;
  };

  // 교환학생과 내국인 학생 데이터를 분류해야 함. 
  const [isMatchingStarted, setIsMatchingStarted] = useState(false);
  const [stateMessage, setStateMessage] = useState('');
  const [isAutoPreferPriorityVisible, setIsAutoPreferPriorityVisible] = useState(false);

  const handleStartBtn=()=>{
    setIsMatchingStarted(true);
    setStateMessage('* 매칭이 시작되었습니다.');
    setIsAutoPreferPriorityVisible(true);
    //게일섀플리알고리즘 함수 돌리는거. h
  }

  const handlePageOpenBtn = async () => {
    setStateMessage('* 학생들이 결과 페이지를 확인할 수 있습니다.');
  
    // 사용자와 매칭 결과를 가져옵니다.
    const users = await fetchUsers();
    const rawMatchingResults = await fetchMatchingResults();
  
    // 매칭 결과를 원하는 형식으로 변환합니다.
    const userBuddies = Object.entries(rawMatchingResults).reduce((acc, [uid, matchingResult]) => {
      const user = users[uid];
      const buddies = matchingResult.buddyUids.map(buddyUid => users[buddyUid]);
  
      acc[user.userName] = {
        nationality: user.nationality,
        buddies: buddies.map(buddy => ({
          buddyName: buddy.userName,
          buddyNationality: buddy.nationality,
          email: buddy.email,
          studentNumber: buddy.studentNumber,
        })),
      };
  
      return acc;
    }, {});
  
    const formattedMatchingResults = Object.entries(userBuddies)
      .sort(([_, { nationality: a }], [__, { nationality: b }]) => {
        if (a === 'Korea' && b !== 'Korea') return -1;
        if (a !== 'Korea' && b === 'Korea') return 1;
        return 0;
      })
      .reduce((acc, [userName, { buddies }], idx) => {
        buddies.forEach((buddy, idx) => {
          if (idx === 0) {
            acc.push({ userName, ...buddy });
          } else {
            acc.push({ userName: '', ...buddy });
          }
        });
  
        return acc;
      }, []);
  
    setMatchingResults(formattedMatchingResults); // 추가된 코드
  }
  
  


  return (
    <>
      <div className="admin-page-contianier">
        <h1 className="admin-page-title">매칭 관리</h1>
        <hr />
        <div className="process-container">
          <button className="process-btn" onClick={handleStartBtn} disabled={isMatchingStarted}>
            매칭 시작
            {isAutoPreferPriorityVisible && <AutoPreferPriority />}
            <GaleShapelyAlgorithm isMatchingStarted={isMatchingStarted} />
          </button>
          <img className="arrow-img" alt="오른쪽 화살표" src="/assets/arrow.png" ></img>
          <button className="process-btn" onClick={handlePageOpenBtn} disabled={!isMatchingStarted} >
            매칭 확인<br />페이지 오픈
          </button>
        </div>
        <div className="state-message">
          {stateMessage && (
            <Alert variant='secondary'>{stateMessage}</Alert>
          )}
        </div>
        <div className="matching-result-container">
          <h1 className="admin-page-title">매칭 결과</h1>
          <hr />
          <div className="result-table-container">
            <Table columns={columns} data={matchingResults} />
          </div>
        </div>
      </div>
    </>
  )
}