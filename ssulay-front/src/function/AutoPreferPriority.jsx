import React, { useEffect, useState } from 'react';
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from '../config/firebase';
import axios from 'axios';

export default function AutoPreferPriority() {
  const [users, setUsers] = useState([]);
  const [interestTag, setInterestTag] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userSnapshot = await getDocs(collection(db, 'users'));
        const userList = userSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            uid: doc.id,
            nationality: data.nationality,
            preferedList: data.preferedBuddy,
            name: data.userName,
          };
        });
        setUsers(userList);

        const interestTagSnapshot = await getDocs(collection(db, 'interestTag'));
        const interestTagList = interestTagSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            owner: doc.id,
            interests: Object.values(data).flat(),
          };
        });
        setInterestTag(interestTagList);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const updatePreferences = async () => {
      if (users.length > 0 && interestTag.length > 0) {
        await Promise.all(users.map(async (user) => {
          const nonPreferedList = setNonPreferedList(user);
          const preferedInterests = setPreferedInterests(user.preferedList);
          const similarityArr = await getSimilarity(preferedInterests, nonPreferedList);

          if (similarityArr.length !== 0) {
            const sortedSimilarity = sortSimilarity(similarityArr);
            const updatedPreferedBuddy = [...user.preferedList, ...sortedSimilarity];

            await updateDoc(doc(db, 'users', user.uid), {
              preferedBuddy: updatedPreferedBuddy
            });
          }
        }));
      }
    };

    updatePreferences();
  }, [users, interestTag]);

  function setNonPreferedList(user) {
    const { uid, preferedList, nationality } = user;
    const nonPreferedList = [];
    users.forEach((otherUser) => {
      if (nationality === 'Korea' && otherUser.nationality !== 'Korea' && !preferedList.includes(otherUser.uid)) {
        nonPreferedList.push(otherUser.uid);
      } else if (nationality !== 'Korea' && otherUser.nationality === 'Korea' && !preferedList.includes(otherUser.uid)) {
        nonPreferedList.push(otherUser.uid);
      }
    });
    return nonPreferedList;
  }

  function setPreferedInterests(preferedList) {
    const preferedInterests = [];
    preferedList.forEach(uid => {
      const targetInterest = interestTag.find(tag => tag.owner === uid);
      if (targetInterest) {
        preferedInterests.push(...targetInterest.interests);
      }
    });
    return preferedInterests;
  }

  async function getSimilarity(preferedInterests, nonPreferedList) {
    const similarityArr = [];
    const preferedInterestsStr = preferedInterests.join(',');

    await Promise.all(
      nonPreferedList.map(async uid => {
        const targetUser = interestTag.find(tag => tag.owner === uid);
        if (targetUser) {
          const targetInterests = targetUser.interests.join(',');
          try {
            const response = await axios.get('/similarity', {
              params: { keyword1: preferedInterestsStr, keyword2: targetInterests },
            });
            const similarity = response.data.similarity;
            similarityArr.push({ uid, similarity });
          } catch (error) {
            console.error(error);
          }
        }
      })
    );
    return similarityArr;
  }

  function sortSimilarity(similarityArr) {
    return similarityArr.sort((a, b) => b.similarity - a.similarity).map(item => item.uid);
  }

  return null; // or you can return any component you want
}
