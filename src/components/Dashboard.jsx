import React, { useState, useEffect } from "react";
import { getData } from "../services/dataService";
import FilterComponent from "./FilterComponent";
import IntensityChart from "./IntensityChart";
import LikelihoodChart from "./LikelihoodChart";
import RelevanceChart from "./RelevanceChart";
import YearlyTrendsChart from "./YearlyTrendsChart";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { exportToCSV, exportToPDF } from "../utils/exportUtils";
import Sidebar from "./Sidebar";
import Header from "./Header"; // Ensure you import the Header component here

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [topics, setTopics] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [years, setYears] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeChart, setActiveChart] = useState("intensity");
  const [showExportMenu, setShowExportMenu] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getData();
        setData(result);
        setFilteredData(result);
        extractFilterOptions(result);
      } catch (error) {
        toast.error("Error fetching data");
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filteredResult = data;

      if (filters.endYear && filters.endYear.length > 0) {
        filteredResult = filteredResult.filter((item) =>
          filters.endYear.includes(item.year.toString())
        );
      }
      if (filters.topics && filters.topics.length > 0) {
        filteredResult = filteredResult.filter((item) =>
          filters.topics.includes(item.topic)
        );
      }
      if (filters.sectors && filters.sectors.length > 0) {
        filteredResult = filteredResult.filter((item) =>
          filters.sectors.includes(item.sector)
        );
      }

      setFilteredData(filteredResult);
    };

    applyFilters();
  }, [data, filters]);

  const extractFilterOptions = (data) => {
    const uniqueTopics = [...new Set(data.map((item) => item.topic))];
    const uniqueSectors = [...new Set(data.map((item) => item.sector))];
    const uniqueYears = [...new Set(data.map((item) => item.year.toString()))];

    setTopics(uniqueTopics);
    setSectors(uniqueSectors);
    setYears(uniqueYears);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  const handleExport = (format) => {
    switch (format) {
      case "csv":
        exportToCSV(filteredData, "data_export.csv");
        break;
      case "pdf":
        exportToPDF(filteredData, "data_export.pdf");
        break;
      case "zip":
        const zip = new JSZip();
        zip.file("data_export.csv", exportToCSV(filteredData, null, true));
        zip.file("data_export.pdf", exportToPDF(filteredData, null, true));
        zip.generateAsync({ type: "blob" }).then((content) => {
          saveAs(content, "data_export.zip");
        });
        break;
      default:
        toast.error("Invalid export format");
    }
    setShowExportMenu(false);
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
  }, []);

  const renderChart = () => {
    switch (activeChart) {
      case "intensity":
        return <IntensityChart data={filteredData} />;
      case "likelihood":
        return <LikelihoodChart data={filteredData} />;
      case "relevance":
        return <RelevanceChart data={filteredData} />;
      case "trends":
        return <YearlyTrendsChart data={filteredData} />;
      default:
        return <IntensityChart data={filteredData} />;
    }
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen transition-colors duration-300`}
    >
      <Header /> {/* Include the Header component here */}
      <div className="flex">
        <Sidebar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          setShowExportMenu={setShowExportMenu}
          showExportMenu={showExportMenu}
          handleExport={handleExport}
        />
        <div className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text drop-shadow-lg animate-fade-in">
              Data Visualization Dashboard
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-4 mb-8 lg:grid-cols-3">
            <div
              className={`p-4 rounded-lg shadow-md ${
                darkMode
                  ? "bg-blue-500 text-white"
                  : "bg-blue-300 text-gray-900"
              }`}
            >
              <h2 className="text-xl font-semibold">Total Records</h2>
              <p className="mt-2 text-2xl">{data.length}</p> {/* Display total records initially */}
            </div>
            <div
              className={`p-4 rounded-lg shadow-md ${
                darkMode
                  ? "bg-green-500 text-white"
                  : "bg-green-300 text-gray-900"
              }`}
            >
              <h2 className="text-xl font-semibold">Unique Topics</h2>
              <p className="mt-2 text-2xl">{topics.length}</p>
            </div>
            <div
              className={`p-4 rounded-lg shadow-md ${
                darkMode
                  ? "bg-yellow-500 text-white"
                  : "bg-yellow-300 text-gray-900"
              }`}
            >
              <h2 className="text-xl font-semibold">Unique Sectors</h2>
              <p className="mt-2 text-2xl">{sectors.length}</p>
            </div>
          </div>
          <FilterComponent
            setFilters={setFilters}
            darkMode={darkMode}
            topics={topics}
            sectors={sectors}
            years={years}
          />
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <ClipLoader
                color={darkMode ? "#ffffff" : "#000000"}
                loading={loading}
                size={50}
              />
            </div>
          ) : (
            <>
              <div className="flex justify-center mb-4 space-x-4">
                <button
                  className={`px-4 py-2 rounded ${
                    activeChart === "intensity"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 dark:bg-gray-700 dark:text-white"
                  } transition-colors duration-300`}
                  onClick={() => setActiveChart("intensity")}
                >
                  Intensity
                </button>
                <button
                  className={`px-4 py-2 rounded ${
                    activeChart === "likelihood"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 dark:bg-gray-700 dark:text-white"
                  } transition-colors duration-300`}
                  onClick={() => setActiveChart("likelihood")}
                >
                  Likelihood
                </button>
                <button
                  className={`px-4 py-2 rounded ${
                    activeChart === "relevance"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 dark:bg-gray-700 dark:text-white"
                  } transition-colors duration-300`}
                  onClick={() => setActiveChart("relevance")}
                >
                  Relevance
                </button>
                <button
                  className={`px-4 py-2 rounded ${
                    activeChart === "trends"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 dark:bg-gray-700 dark:text-white"
                  } transition-colors duration-300`}
                  onClick={() => setActiveChart("trends")}
                >
                  Trends
                </button>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                {renderChart()}
              </div>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
