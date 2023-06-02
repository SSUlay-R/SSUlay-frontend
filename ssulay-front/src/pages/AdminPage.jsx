import React, {useMemo,  useState} from 'react';
import './AdminPage.css';
import Table from '../components/Table';
import Alert from 'react-bootstrap/Alert';

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

// 교환학생과 내국인 학생 데이터를 분류해야 함. 
const [isMatchingStarted, setIsMatchingStarted] = useState(false);
const [stateMessage, setStateMessage] = useState('');
const handleStartBtn=()=>{
  setIsMatchingStarted(true);
  setStateMessage('* 매칭이 시작되었습니다.')
  //게일섀플리알고리즘 함수 돌리는거. 
}

const handlePageOpenBtn=()=>{
  setStateMessage('* 학생들이 결과 페이지를 확인할 수 있습니다.')
}
  return (
    <>
      <div className="admin-page-contianier">
        <h1 className="admin-page-title">매칭 관리</h1>
        <hr />
        <div className="process-container">
          <button className="process-btn" onClick={handleStartBtn} disabled={isMatchingStarted}>
            매칭 시작
          </button>
          <img className="arrow-img" alt="오른쪽 화살표" src="/assets/arrow.png" ></img>
          <button className="process-btn" onClick={handlePageOpenBtn} disabled={!isMatchingStarted} >
            매칭 확인<br />페이지 오픈
          </button>
        </div>
        <div className="state-message">
        {stateMessage &&(
          <Alert variant='secondary'>{stateMessage}</Alert>
        )}
        </div>

        <div className="matching-result-container">
          <h1 className="admin-page-title">매칭 결과</h1>
          <hr />
          
          <div className="result-table-container"></div>
        </div>
      </div>
    </>
  )
}
