import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../config/firebase';

export default function GaleShapelyAlgorithm(props) {
    const [result, setResult] = useState([]);
    const [koreanUsers, setKoreanUsers] = useState([]);
    const [foreignUsers, setForeignUsers] = useState([]);
    const [foreignUidToIndex, setForeignUidToIndex] = useState({});
    const [foreignIndexToUid, setForeignIndexToUid] = useState({});
    const [koreanUidToIndex, setKoreanUidToIndex] = useState({});
    const [koreanIndexToUid, setKoreanIndexToUid] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const usersCollection = collection(db, 'users');
            const userSnapshot = await getDocs(usersCollection).catch(err => console.log(err));
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

            const koreanUsers = userList.filter((user) => user.nationality === 'Korea');
            const foreignUsers = userList.filter((user) => user.nationality !== 'Korea');

            const foreignUidToIndex = {};
            const foreignIndexToUid = {};
            const koreanUidToIndex = {};
            const koreanIndexToUid = {};

            foreignUsers.forEach((user, index) => {
                foreignUidToIndex[user.uid] = index;
                foreignIndexToUid[index] = user.uid;
            });

            koreanUsers.forEach((user, index) => {
                koreanUidToIndex[user.uid] = index;
                koreanIndexToUid[index] = user.uid;
            });

            foreignUsers.forEach(user => {
                user.preferedBuddy = user.preferedBuddy.map(uid => koreanUidToIndex[uid]);
            });

            koreanUsers.forEach(user => {
                user.preferedBuddy = user.preferedBuddy.map(uid => foreignUidToIndex[uid]);
            });

            setForeignIndexToUid(foreignIndexToUid);
            setForeignUidToIndex(foreignUidToIndex);
            setKoreanIndexToUid(koreanIndexToUid);
            setKoreanUidToIndex(koreanUidToIndex);

            setForeignUsers(foreignUsers);
            setKoreanUsers(koreanUsers);

            //console.log(foreignIndexToUid);
            //console.log(koreanIndexToUid);

            //console.log(foreignUsers);
            //console.log(koreanUsers);
        };
        fetchData();
    }, []);
    
    function prefersNewPartner(domesticStudentPreferences, domesticStudent, newPartner, currentPartner) {
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

        let res = [];
        for (let i = 0; i < domesticStudentPreferences.length; i++) {
            const matchedForeignStudentUids = stableMatchingResult[i].map(index => foreignIndexToUid[index]).join(', ');
            res.push(`Domestic Student ${koreanIndexToUid[i]} is matched with International student(s): ${matchedForeignStudentUids}`);
        }        
        return res;
    }

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
        const res = stableMatching(internationalStudentPrefernces, domesticStudentPreferences, quota);

        // Update the result
        setResult(res);
    }

    return (
        <div>
            <button onClick={handleClick}>Run Algorithm</button>
            <ul>
                {result.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}