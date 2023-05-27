import React, {useMemo, useEffect, useState} from 'react';
import './AdminPage.css';
import Table from '../components/Table';

export default function AdminPage() {

  const columns= useMemo(
    ()=>[
      {
        accessor:"userName",
        Header:"이름",
      },
      {
        accessor:"buddyName",
        Header:"버디",
      },
      {
        accessor:"buddyNationality",
        Header:"버디 국적"
      },
      {
        accessor:"studentNum",
        Header:"학번",
      },
      {
        accessor: "email",
        Header:"이메일"
      }
      
    ],[]
  );

  //여기에 matchedList data 불러와주세요
  
  //버튼 상태관리
  const [searchPageOpenBtn,setSearchPageOpemBtn ]= useState(true);
  const [matchingStartBtn, setMatchingStartBtn]= useState(false);
  const [resultPageOpenBtn, setResultPageOpenBtn]= useState(false);
  
  const handleSearchPageBtn=()=>{
    //유저들 isSubmittedForm 확인후  상태 메시지 보내기. 
    //버디검색페이지 오픈되어있음을 데베에 전달
  }
  const handleMatchingStartBtn=()=>{
    //
  }
  const handleResultPageOpenBtn=()=>{

  }
  return (
    <>
      <div className="admin-page-contianier">
        <h1 className="admin-page-title">매칭 관리</h1>
        <hr/>
        <div className="process-container">
          <button className="process-btn" onClick={handleSearchPageBtn}>버디 검색 <br/> 페이지 오픈</button>
          <img className="arrow-img" alt="오른쪽 화살표" src="/assets/arrow.png"></img>
          <button className="process-btn" onClick={handleMatchingStartBtn}>매칭 시작</button>
          <img className="arrow-img" alt="오른쪽 화살표" src="/assets/arrow.png"></img>
          <button className="process-btn" onClick={handleResultPageOpenBtn}>매칭 확인<br/>페이지 오픈</button> {/* 학생들 매칭 결과페이지 접근 여부 */}
        </div>
        <div className="matching-result-container">
          <h1 className="admin-page-title">매칭 결과</h1>
          <hr/>
          <div className="result-table-container">

          </div>
        </div>
      </div>
    </>
  )
}
