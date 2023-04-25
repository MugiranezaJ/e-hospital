import React, { useState } from "react";
import Papa from "papaparse";
// import { DownloadIcon } from "@heroicons/react/solid";

const CSVViewer = () => {
  const [csvData, setCsvData] = useState([]);
  const [csvHeaders, setCsvHeaders] = useState([]);

  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: ({ data, meta }) => {
        setCsvData(data);
        setCsvHeaders(meta.fields);
      },
    });
  };

  const handleCSVDownload = () => {
    const csv = Papa.unparse({ fields: csvHeaders, data: csvData });
    const element = document.createElement("a");
    const file = new Blob([csv], { type: "text/csv" });
    element.href = URL.createObjectURL(file);
    element.download = "data.csv";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="max-w-2xl mx-auto my-8">
      <div className="flex flex-row justify-between mb-4">
        <label className="flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded cursor-pointer">
          <span className="mr-2">Upload CSV</span>
          <input
            type="file"
            className="hidden"
            accept=".csv"
            onChange={handleCSVUpload}
          />
        </label>
        <button
          className="flex items-center justify-center px-4 py-2 text-white bg-green-500 rounded"
          onClick={handleCSVDownload}
          disabled={!csvData.length}
        >
          {/* <DownloadIcon className="h-5 w-5 mr-2" /> */}
          Download
        </button>
      </div>
      {csvData.length ? (
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              {csvHeaders.map((header) => (
                <th className="py-3 px-6 text-left">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {csvData.map((row, i) => (
              <tr key={`row-${i}`}>
                {csvHeaders.map((header) => (
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">
          Upload a CSV file to get started.
        </p>
      )}
    </div>
  );
};

export default CSVViewer;
