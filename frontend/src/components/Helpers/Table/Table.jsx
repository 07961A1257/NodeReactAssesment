import React from "react";

const Table = (props) => {
  const getKeys = () => {
    return Object.keys(props.users[0]);
  };

  const getHeaders = () => {
    const headers = getKeys();

    return headers.map((header, index) => (
      <th key={index}>{header.toUpperCase()}</th>
    ));
  };

  const RenderRow = (props) => {
    return props.keys.map((key, index) => {
      return <td key={props.data[key]}>{props.data[key]}</td>;
    });
  };

  const applyClassName = (index) => {
    return index % 2 === 0 ? "table-light" : "table-warning";
  };

  const getRowData = () => {
    var items = props.users;
    var keys = getKeys();

    return items.map((row, index) => {
      return (
        <tr key={index} className={applyClassName(index)}>
          <RenderRow key={index} data={row} keys={keys} />
        </tr>
      );
    });
  };

  return (
    <table className="table table-bordered">
      <thead className="table-warning text-dark">
        <tr>{getHeaders()}</tr>
      </thead>
      <tbody>{getRowData()}</tbody>
    </table>
  );
};

export default Table;
