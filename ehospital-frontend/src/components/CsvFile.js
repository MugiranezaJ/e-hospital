import React from "react";
import { useSelector } from "react-redux";

const MedicinesTable = () => {
  const { auth } = useSelector((state) => state);
  const medicines = auth?.medecinesData.split("\n"); //.map((line) => line.split(','));

  const headerRow = medicines[0]?.split(",");

  const dataRows = medicines?.slice(1);
  const rowData = dataRows.map((row) => row.split(","));

  const downloadCsv = () => {
    const csvData = headerRow.join(",") + "\n" + rowData.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "medicines.csv";
    link.click();
  }
  

  return (
    <div className="container mx-auto">
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
          {headerRow.map((cell, index) => (
              <th className="px-4 text-left py-2 w-1/3 capitalize" key={index}>
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowData.map((medicine, index) => {
            return (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
              >
                <td className="border px-4 py-2">{medicine[0]}</td>
                <td className="border px-4 py-2">{medicine[1]}</td>
                <td className="border px-4 py-2">{medicine[2]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={downloadCsv}>Download CSV</button>
    </div>
  );
};

export default MedicinesTable;
