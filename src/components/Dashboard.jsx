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
import Header from "./Header";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [topics, setTopics] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [years, setYears] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const dummyEngagementData = [
    { metric: "Clicks", value: 500 },
    { metric: "Views", value: 1500 },
    { metric: "Shares", value: 200 },
  ];

  const dummySentimentData = [
    { sentiment: "Positive", percentage: 60 },
    { sentiment: "Negative", percentage: 20 },
    { sentiment: "Neutral", percentage: 20 },
  ];

  const dummyRegionData = [
    { region: "North America", percentage: 40 },
    { region: "Europe", percentage: 30 },
    { region: "Asia", percentage: 20 },
    { region: "Other", percentage: 10 },
  ];

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

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen transition-colors duration-300`}
    >
      <Header
        toggleSidebar={() => {}}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <div className="flex">
        <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">
              Data Visualization Dashboard
            </h1>
          </div>

          <div className="mb-6">
            <FilterComponent
              filters={filters}
              setFilters={setFilters}
              topics={topics}
              sectors={sectors}
              years={years}
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center">
              <ClipLoader color={"#123abc"} loading={loading} size={150} />
            </div>
          ) : (
            <>
              <div className="space-y-8">
                <div className="p-4 text-white bg-blue-500 rounded-lg shadow-lg dark:bg-blue-700">
                  <h2 className="text-xl font-semibold">Total Records</h2>
                  <p className="mt-2 text-2xl font-bold">
                    {filteredData.length}
                  </p>
                </div>
                <div className="p-4 text-white bg-green-500 rounded-lg shadow-lg dark:bg-green-700">
                  <h2 className="text-xl font-semibold">Unique Topics</h2>
                  <p className="mt-2 text-2xl font-bold">{topics.length}</p>
                </div>
                <div className="p-4 text-white bg-purple-500 rounded-lg shadow-lg dark:bg-purple-700">
                  <h2 className="text-xl font-semibold">Unique Sectors</h2>
                  <p className="mt-2 text-2xl font-bold">{sectors.length}</p>
                </div>
              </div>

              {/* Key Data Visualizations */}
              <div className="mt-12 space-y-8">
                <h2 className="mb-4 text-2xl font-bold">
                  Key Data Visualizations
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <IntensityChart data={filteredData} />
                  <LikelihoodChart data={filteredData} />
                  <RelevanceChart data={filteredData} />
                  <YearlyTrendsChart data={filteredData} />
                </div>
              </div>

              {/* Engagement Metrics */}
              <div className="mt-12 space-y-8">
                <h2 className="mb-4 text-2xl font-bold">Engagement Metrics</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {dummyEngagementData.map((item, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg shadow-md ${
                        darkMode ? "bg-blue-800" : "bg-blue-100"
                      }`}
                    >
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        {item.metric}
                      </h3>
                      <p className="mt-2 text-2xl font-bold text-gray-800 dark:text-gray-100">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sentiment Analysis */}
              <div className="mt-12 space-y-8">
                <h2 className="mb-4 text-2xl font-bold">Sentiment Analysis</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {dummySentimentData.map((item, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg shadow-md ${
                        darkMode ? "bg-purple-800" : "bg-purple-100"
                      }`}
                    >
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        {item.sentiment}
                      </h3>
                      <p className="mt-2 text-2xl font-bold text-gray-800 dark:text-gray-100">
                        {item.percentage}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Region Distribution */}
              <div className="mt-12 space-y-8">
                <h2 className="mb-4 text-2xl font-bold">Region Distribution</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {dummyRegionData.map((item, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg shadow-md ${
                        darkMode ? "bg-red-800" : "bg-red-100"
                      }`}
                    >
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        {item.region}
                      </h3>
                      <p className="mt-2 text-2xl font-bold text-gray-800 dark:text-gray-100">
                        {item.percentage}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
