import React, { useState, useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import MainLayout from "../layouts/mainLayout";

export default function Comparision() {
  const [excelFiles, setExcelFiles] = useState([]);
  const [error, setError] = useState(null);
  const [showOriginalFiles, setShowOriginalFiles] = useState(false);

  const processFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        resolve({ name: file.name, data: json });
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const onDrop = useCallback((acceptedFiles) => {
    Promise.all(acceptedFiles.map(processFile)).then((newFiles) => {
      setExcelFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setError(null);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
    },
    multiple: true,
    onDropRejected: () => {
      setError("Please upload only Excel files (.xlsx or .xls)");
    },
  });

  const sharedColumns = useMemo(() => {
    if (excelFiles.length < 2) return [];
    const allColumns = excelFiles.map((file) => Object.keys(file.data[0]));
    return allColumns.reduce((shared, current) =>
      shared.filter((column) => current.includes(column)),
    );
  }, [excelFiles]);

  const deleteFile = (indexToDelete) => {
    setExcelFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToDelete),
    );
  };

  const replaceFile = async (indexToReplace, newFile) => {
    const processedFile = await processFile(newFile);
    setExcelFiles((prevFiles) =>
      prevFiles.map((file, index) =>
        index === indexToReplace ? processedFile : file,
      ),
    );
  };

  return (
    <MainLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Excel File Comparison
        </h1>

        <div
          {...getRootProps()}
          className={`mb-6 p-10 border-2 border-dashed rounded-lg text-center cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 ${
            isDragActive
              ? "border-blue-400 bg-blue-100 dark:bg-blue-900"
              : "border-gray-300 bg-gray-50 dark:bg-gray-800"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center">
            <svg
              className="w-16 h-16 mb-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            {isDragActive ? (
              <p className="text-lg font-semibold text-blue-500 dark:text-blue-300">
                Drop the Excel files here ...
              </p>
            ) : (
              <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                Drag 'n' drop Excel files here, or click to select files
              </p>
            )}
          </div>
        </div>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {excelFiles.length > 0 && (
          <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Uploaded Files
            </h2>
            <ul className="space-y-2">
              {excelFiles.map((file, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">
                    {file.name}
                  </span>
                  <div>
                    <label className="mr-2 px-3 py-1 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">
                      Replace
                      <input
                        type="file"
                        className="hidden"
                        accept=".xlsx,.xls"
                        onChange={(e) => replaceFile(index, e.target.files[0])}
                      />
                    </label>
                    <button
                      onClick={() => deleteFile(index)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {excelFiles.length > 1 && (
          <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Shared Columns
            </h2>
            {sharedColumns.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {sharedColumns.map((column) => (
                  <span
                    key={column}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    {column}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-700 dark:text-gray-300">
                No Shared Columns Found
              </p>
            )}
          </div>
        )}

        {excelFiles.length > 0 && (
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setShowOriginalFiles(!showOriginalFiles)}
              className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              {showOriginalFiles
                ? "Hide Original Files"
                : "Show Original Files"}
            </button>
          </div>
        )}

        {showOriginalFiles &&
          excelFiles.map((file, fileIndex) => (
            <div
              key={file.name}
              className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
            >
              <h2 className="text-xl font-semibold p-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white">
                {file.name}
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      {Object.keys(file.data[0]).map((column) => (
                        <th
                          key={column}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                    {file.data.slice(0, 10).map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {Object.values(row).map((value, valueIndex) => (
                          <td
                            key={valueIndex}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300"
                          >
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
      </div>
    </MainLayout>
  );
}
