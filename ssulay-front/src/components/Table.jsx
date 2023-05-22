import React from 'react';
import { useTable } from "react-table";
import "./Table.css";

export default function Table({ columns, data, handleSelectRow }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const handleSelect = (row) => {
    if (handleSelectRow) {
      handleSelectRow(row.original); // 선택된 행의 원본 데이터를 부모 컴포넌트로 전달
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
                <td>
                  <button className="select-btn" onClick={() => handleSelect(row)}>select</button>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
