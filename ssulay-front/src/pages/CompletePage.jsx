import React, { useEffect, useState } from 'react';
import './CompletePage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function CompletePage() {
  const [similarityArr, setSimilarityArr] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const preferedInterests = ['sports', 'apple', 'dance','television','pizza']; // 더미 데이터로 채워주세요
      const tagInterests = ['baseball', 'study', 'cafe']; // 더미 데이터로 채워주세요
      let totalSimilarity=0;
      const arr = [];
      for (const preferedInterest of preferedInterests) {
        let avgSimilarity = 0;
        const count = preferedInterests.length * tagInterests.length;
        // const weight = 1 / Math.sqrt(count);

        for (const tagInterest of tagInterests) {
          let similarity = null;
          try {
            const response = await axios.get('/similarity', {
              params: { keyword1: preferedInterest, keyword2: tagInterest },
            });
            similarity = response.data.similarity;
            avgSimilarity += similarity
            console.log(`Similarity between ${preferedInterest} and ${tagInterest}: ${similarity}`);
          } catch (error) {
            console.error(error);
          }
        }
          avgSimilarity /= tagInterests.length;
          totalSimilarity += avgSimilarity;
          arr.push({ similarity: avgSimilarity });

      }
      const similarityAverage = totalSimilarity / preferedInterests.length;
      setSimilarityArr(arr);
      console.log(`similarity Average: ${similarityAverage}`);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <div className="explain-container">
          Thank you for submitting the form. You’ll be notified when we’re ready for you to be matched with a buddy.
        </div>
        <Link to="/">
          <button className="submit-btn">Confirm</button>
        </Link>
        {similarityArr.length > 0 ? (
            <p>Similarity: {similarityArr.map((item) => item.similarity).join(', ')}</p>
          
        ) : (
          <p>Loading</p>
        )}
      </div>
    </>
  );
}
