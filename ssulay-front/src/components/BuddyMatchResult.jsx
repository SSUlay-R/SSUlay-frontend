import React, { useMemo } from 'react'
import Table from './Table';
export default function BuddyMatchResult() {

  const columns= useMemo( //accessor:데이터 속성 접근자명, Header: 테이블 속성명
    ()=>[
    {
      accessor:"userName",
      Header: "User name",
    },
    {
      accessor:"name",
      Header:"Name",
    },
    {
      accessor:"nationality",
      Header:"Nationality",
    },
    {
      accessor:"major",
      Header:"Major",
    },
    {
      accessor:"contact",
      Header:"Contact"
    }
  ],[]
  );
  const buddyData = useMemo(
    () => [
      {
        userName: "John",
        interests: "Sports, Music",
        lifestyle: "Fitness",
      },
    ],[] );
  return (
    <>
      <div className="buddy-page-container">
        <h1 className="buddy-page-title">Matched Buddy</h1>
        <hr/>

        <div className="box-container">
        Congratulation! You Matched with your buddy. Check your buddy information below.
        </div> 
        <div className="table-container" style={{marginTop:"50px"}}>
          <Table columns={columns} data={buddyData} />
        </div>
      </div> 
      
    </>
    )
}
