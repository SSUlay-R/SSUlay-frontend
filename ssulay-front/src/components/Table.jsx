import React,{useState} from 'react';
import { useTable } from "react-table";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import "./Table.css";

export default function Table({ columns, data, handleSelectRow,handleRankRow }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
    const [selectedRank, setSelectedRank] = useState({});
  const handleSelect = (row) => {
    if (handleSelectRow) {
      handleSelectRow(row.original); // 선택된 행의 원본 데이터를 부모 컴포넌트로 전달
    }
  };
  const handleRankSelect = (eventKey, row) => {
    const rank = parseInt(eventKey);
    setSelectedRank({ ...selectedRank, [row.id]: rank });

    if (handleRankRow) {
      handleRankRow(row.original, rank);
    }
  };

  return (
    <table className="table-container" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
            {handleSelectRow && <th>Select</th>}
            {handleRankRow && <th>Rank</th>}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr className="row-tr" {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
              {handleSelectRow && (
                <td className='last-td'>
                  <button className="select-btn" onClick={() => handleSelect(row)}>select</button>
                </td>
              )}
              {handleRankRow && (
                <td className="last-td">
                <DropdownButton
                    className="dorpdown-btn"
                    id="dropdown-basic-button"
                    title={selectedRank[row.id] || "rank"}
                    onSelect={(eventKey) => handleRankSelect(eventKey, row)}
                  >
                    <Dropdown.Item eventKey={0}>none</Dropdown.Item>
                    <Dropdown.Item eventKey={1}>1</Dropdown.Item>
                    <Dropdown.Item eventKey={2}>2</Dropdown.Item>
                    <Dropdown.Item eventKey={3}>3</Dropdown.Item>
                  </DropdownButton>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
