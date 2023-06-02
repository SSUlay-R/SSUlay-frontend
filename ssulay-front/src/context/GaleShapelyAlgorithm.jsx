import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from '../config/firebase';

// Gale-Shapely 알고리즘 함수 구현
export default function GaleShapelyAlgorithm(props) {
    // 결과를 출력하기 위한 state 정의
    const [result, setResult] = useState([]);

    // 한국 학생들과 국제 학생들에 대한 state 정의
    const [koreanUsers, setKoreanUsers] = useState([]);
    const [foreignUsers, setForeignUsers] = useState([]);

    // 학생들의 uid와 인덱스를 매핑하기 위한 state 정의
    const [foreignUidToIndex, setForeignUidToIndex] = useState({});
    const [foreignIndexToUid, setForeignIndexToUid] = useState({});
    const [koreanUidToIndex, setKoreanUidToIndex] = useState({});
    const [koreanIndexToUid, setKoreanIndexToUid] = useState({});

    // 페이지 로딩 시 데이터를 가져오는 useEffect 정의
    useEffect(() => {
        // firestore에서 데이터를 가져오는 함수 정의
        const fetchData = async () => {
            // 'users' 컬렉션에서 모든 문서를 가져옴
            const usersCollection = collection(db, 'users');
            const userSnapshot = await getDocs(usersCollection).catch(err => console.log(err));

            // 각 문서의 데이터를 가져와서 객체로 변환한 뒤 배열에 저장
            const userList = userSnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    userName: data.userName,
                    uid: data.uid,
                    nationality: data.nationality,
                    preferedBuddy: data.preferedBuddy,
                    buddyNum: data.buddyNum,
                };
            });

            // 한국인과 국제 학생을 분리
            const koreanUsers = userList.filter((user) => user.nationality === 'Korea');
            const foreignUsers = userList.filter((user) => user.nationality !== 'Korea');

            // uid와 인덱스를 매핑하는 데 사용할 객체 정의
            const foreignUidToIndex = {};
            const foreignIndexToUid = {};
            const koreanUidToIndex = {};
            const koreanIndexToUid = {};

            // 국제 학생들의 uid와 인덱스를 매핑
            foreignUsers.forEach((user, index) => {
                foreignUidToIndex[user.uid] = index;
                foreignIndexToUid[index] = user.uid;
            });

            // 한국 학생들의 uid와 인덱스를 매핑
            koreanUsers.forEach((user, index) => {
                koreanUidToIndex[user.uid] = index;
                koreanIndexToUid[index] = user.uid;
            });

            // 선호하는 버디의 uid를 인덱스로 변환
            foreignUsers.forEach(user => {
                user.preferedBuddy = user.preferedBuddy.map(uid => koreanUidToIndex[uid]);
            });
            koreanUsers.forEach(user => {
                user.preferedBuddy = user.preferedBuddy.map(uid => foreignUidToIndex[uid]);
            });

            // 매핑된 객체와 학생 데이터를 state에 저장
            setForeignIndexToUid(foreignIndexToUid);
            setForeignUidToIndex(foreignUidToIndex);
            setKoreanIndexToUid(koreanIndexToUid);
            setKoreanUidToIndex(koreanUidToIndex);

            setForeignUsers(foreignUsers);
            setKoreanUsers(koreanUsers);
        };
        // 데이터를 가져옴
        fetchData();
    }, []);

    // 새 파트너를 더 선호하는지 확인하는 함수
    function prefersNewPartner(domesticStudentPreferences, domesticStudent, newPartner, currentPartner) {
        // 모든 선호도를 확인
        for (let i = 0; i < domesticStudentPreferences[domesticStudent].length; i++) {
            if (domesticStudentPreferences[domesticStudent][i] === newPartner) {
                return true;
            }
            if (domesticStudentPreferences[domesticStudent][i] === currentPartner) {
                return false;
            }
        }
        return false;
    }

    // 안정적인 매칭을 찾는 함수
    function stableMatching(internationalStudentPrefernces, domesticStudentPreferences, quota) {
        let n = internationalStudentPrefernces.length;
        let m = domesticStudentPreferences.length;

        let domesticStudentPartners = Array.from(Array(m), () => new Array(n));

        let domesticStudentPartnerCount = new Array(m).fill(0);

        let internationalStudentNextPropose = new Array(n).fill(0);

        let internationalStudentEngaged = new Array(n).fill(false);

        let freeInternationalStudent = n;

        while (freeInternationalStudent > 0) {
            let internationalStudent;
            for (internationalStudent = 0; internationalStudent < n; internationalStudent++) {
                if (!internationalStudentEngaged[internationalStudent]) {
                    break;
                }
            }

            for (let i = internationalStudentNextPropose[internationalStudent]; i < n; i++) {
                let domesticStudent = internationalStudentPrefernces[internationalStudent][i];

                if (domesticStudentPartnerCount[domesticStudent] < quota[domesticStudent]) {
                    domesticStudentPartners[domesticStudent][domesticStudentPartnerCount[domesticStudent]] = internationalStudent;
                    domesticStudentPartnerCount[domesticStudent]++;
                    internationalStudentEngaged[internationalStudent] = true;
                    internationalStudentNextPropose[internationalStudent]++;
                    freeInternationalStudent--;
                    break;
                } else {
                    let replaced = false;

                    for (let j = 0; j < domesticStudentPartnerCount[domesticStudent]; j++) {
                        let currentPartner = domesticStudentPartners[domesticStudent][j];

                        if (prefersNewPartner(domesticStudentPreferences, domesticStudent, internationalStudent, currentPartner)) {
                            domesticStudentPartners[domesticStudent][j] = internationalStudent;
                            internationalStudentEngaged[internationalStudent] = true;
                            internationalStudentEngaged[currentPartner] = false;
                            internationalStudentNextPropose[internationalStudent]++;
                            replaced = true;
                            break;
                        }
                    }
                    if (replaced) {
                        break;
                    } else {
                        internationalStudentNextPropose[internationalStudent]++;
                    }
                }
            }
        }

        let stableMatchingResult = new Array(m);
        for (let i = 0; i < m; i++) {
            stableMatchingResult[i] = domesticStudentPartners[i].slice(0, domesticStudentPartnerCount[i]);
        }

        let uidMatchingResult = [];
        for (let i = 0; i < domesticStudentPreferences.length; i++) {
            const matchedForeignStudentUids = stableMatchingResult[i].map(index => foreignIndexToUid[index]);
            for (let j = 0; j < matchedForeignStudentUids.length; j++) {
                uidMatchingResult.push({ studentUid: matchedForeignStudentUids[j], buddyUid: koreanIndexToUid[i] });
            }
            uidMatchingResult.push({ studentUid: koreanIndexToUid[i], buddyUid: matchedForeignStudentUids });
        }
        return uidMatchingResult;
    }


    // 매칭 결과를 firestore에 업로드하는 함수
    async function uploadToFirebase(result) {
        const resultDoc = doc(db, 'results', 'matchingResults');
        await setDoc(resultDoc, { matchingResults: result });
    }


    // 버튼 클릭 시 알고리즘을 실행하는 함수
    function handleClick() {
        // Get preferences from the user data
        const internationalStudentPrefernces = foreignUsers.map(user => user.preferedBuddy);
        const domesticStudentPreferences = koreanUsers.map(user => user.preferedBuddy);
        console.log(internationalStudentPrefernces);
        console.log(domesticStudentPreferences);
        // Get quota from some data source
        // I'll just put an arbitrary value here. You should replace it with actual quota data
        const quota = koreanUsers.map(user => user.buddyNum);
        // Calculate results
        const uidMatchingResult = stableMatching(internationalStudentPrefernces, domesticStudentPreferences, quota);
        // Update the result state
        setResult(uidMatchingResult);
        uploadToFirebase(uidMatchingResult).catch(console.error);
    }
    // 결과를 보여주는 UI 반환
    return (
        <div>
            <button onClick={handleClick}>Run Algorithm</button>
            <ul>
                {result.map((item, index) => (
                    <li key={index}>Korean student UID: {item.studentUid}, Buddy UID: {item.buddyUid}</li>
                ))}
            </ul>
        </div>
    );
}
