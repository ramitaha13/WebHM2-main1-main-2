import React, { useState, useMemo } from "react";
import MainLayout from "../layouts/mainLayout";
import * as XLSX from "xlsx";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

export default function UploadFile() {
  const [excelFiles, setExcelFiles] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentColumn, setCurrentColumn] = useState(0);
  const [currentFilter, setCurrentFilter] = useState("");
  const [filters, setFilters] = useState({});
  const [typeError, setTypeError] = useState("");

  const handleFile = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) =>
      [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ].includes(file.type),
    );

    if (validFiles.length !== files.length) {
      setTypeError("Please upload only Excel files.");
    } else {
      setTypeError("");
    }

    setExcelFiles(validFiles);
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    const data = [];

    for (let file of excelFiles) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const workbook = XLSX.read(event.target.result, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);

        // Format date columns
        json.forEach((row) => {
          Object.keys(row).forEach((key) => {
            if (row[key] instanceof Date) {
              row[key] = row[key].toLocaleDateString("en-US");
            }
          });
        });

        data.push(json);
      };
      reader.readAsBinaryString(file);
    }

    setExcelData(data);
  };

  const selectFile = (index) => {
    setCurrentFileIndex(index);
    setCurrentPage(0);
    setCurrentColumn(0);
  };

  const handleFilterChange = (filter, value) => {
    setFilters((prev) => ({ ...prev, [filter]: value }));
  };

  const clearFilter = (filter) => {
    setFilters((prev) => {
      const updated = { ...prev };
      delete updated[filter];
      return updated;
    });
  };

  const filteredData = useMemo(() => {
    if (!excelData[currentFileIndex]) return [];
    return excelData[currentFileIndex].filter((row) => {
      return Object.entries(filters).every(([key, value]) => {
        return row[key]?.toString().toLowerCase().includes(value.toLowerCase());
      });
    });
  }, [excelData, currentFileIndex, filters]);

  const currentPageData = useMemo(() => {
    const startIndex = currentPage * 10;
    return filteredData.slice(startIndex, startIndex + 10);
  }, [filteredData, currentPage]);

  const totalPages = useMemo(
    () => Math.ceil(filteredData.length / 10),
    [filteredData],
  );

  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0));
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  const prevColumn = () => setCurrentColumn((prev) => Math.max(prev - 1, 0));
  const nextColumn = () =>
    setCurrentColumn((prev) => {
      if (currentPageData.length === 0) return prev;
      return Math.min(prev + 1, Object.keys(currentPageData[0]).length - 1);
    });

  const downloadFilteredExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "FilteredData");
    XLSX.writeFile(wb, "filtered_data.xlsx");
  };

  return (
    <MainLayout>
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Upload Excel & Visualize Data
        </h3>

        <form className="mb-6" onSubmit={handleFileSubmit}>
          <input
            type="file"
            multiple
            accept=".xlsx,.xls"
            className="block w-full text-sm text-gray-500 dark:text-gray-300
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              dark:file:bg-blue-900 dark:file:text-blue-200
              dark:hover:file:bg-blue-800"
            required
            onChange={handleFile}
          />
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
          >
            UPLOAD
          </button>
          {typeError && (
            <div
              className="mt-4 p-4 bg-red-100 text-red-700 rounded dark:bg-red-900 dark:text-red-200"
              role="alert"
            >
              {typeError}
            </div>
          )}
        </form>

        {excelFiles.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              Uploaded Files
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {excelFiles.map((file, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    index === currentFileIndex
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                      : "border-gray-200 hover:border-blue-300 dark:border-gray-700 dark:hover:border-blue-500"
                  }`}
                  onClick={() => selectFile(index)}
                >
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {excelData.length > 0 && (
          <div className="mt-6">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
              <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Current File: {excelFiles[currentFileIndex]?.name || "N/A"}
              </h4>

              <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <h5 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">
                  Filters
                </h5>
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    className="px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md text-gray-700 dark:text-gray-200"
                    onChange={(e) => setCurrentFilter(e.target.value)}
                    value={currentFilter}
                  >
                    <option value="">Select a filter</option>
                    {excelData[currentFileIndex] &&
                      Object.keys(excelData[currentFileIndex][0]).map(
                        (column) => (
                          <option key={column} value={column}>
                            {column}
                          </option>
                        ),
                      )}
                  </select>
                  {currentFilter && (
                    <input
                      type="text"
                      className="px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md text-gray-700 dark:text-gray-200"
                      placeholder={`Filter ${currentFilter}`}
                      onChange={(e) =>
                        handleFilterChange(currentFilter, e.target.value)
                      }
                      value={filters[currentFilter] || ""}
                    />
                  )}
                </div>
                <div className="mt-2">
                  <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Active Filters:
                  </h6>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {Object.entries(filters).map(
                      ([key, value]) =>
                        value && (
                          <span
                            key={key}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm dark:bg-blue-900 dark:text-blue-200 flex items-center"
                          >
                            {key}: {value}
                            <button
                              className="ml-1 text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-100"
                              onClick={() => clearFilter(key)}
                            >
                              ×
                            </button>
                          </span>
                        ),
                    )}
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <div className="flex justify-between items-center mb-4">
                  <button
                    onClick={downloadFilteredExcel}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
                  >
                    Download Filtered Excel
                  </button>
                </div>
                <table className="min-w-full bg-white dark:bg-gray-800">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      {currentPageData.length > 0 &&
                        Object.keys(currentPageData[0]).map((key, index) => (
                          <th
                            key={key}
                            className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 ${
                              index === currentColumn
                                ? "bg-yellow-200 dark:bg-yellow-900"
                                : ""
                            }`}
                          >
                            {key}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {currentPageData.map((row, index) => (
                      <tr key={index}>
                        {Object.keys(row).map((key, colIndex) => (
                          <td
                            key={key}
                            className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300 ${
                              colIndex === currentColumn
                                ? "bg-yellow-100 dark:bg-yellow-800"
                                : ""
                            }`}
                          >
                            {row[key]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <button
                      onClick={prevPage}
                      disabled={currentPage === 0}
                      className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 mr-2 transition-colors duration-200"
                    >
                      Previous Page
                    </button>
                    <button
                      onClick={nextPage}
                      disabled={currentPage === totalPages - 1}
                      className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 transition-colors duration-200"
                    >
                      Next Page
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={prevColumn}
                      disabled={currentColumn === 0}
                      className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 mr-2 transition-colors duration-200"
                    >
                      Previous Column
                    </button>
                    <button
                      onClick={nextColumn}
                      disabled={
                        currentPageData.length === 0 ||
                        currentColumn ===
                          Object.keys(currentPageData[0]).length - 1
                      }
                      className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 transition-colors duration-200"
                    >
                      Next Column
                    </button>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Page {currentPage + 1} of {totalPages}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
