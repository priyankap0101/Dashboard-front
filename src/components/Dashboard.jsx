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
  const [expandedChart, setExpandedChart] = useState(null);

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

      if (filters.endYear?.length) {
        filteredResult = filteredResult.filter((item) =>
          filters.endYear.includes(item.year.toString())
        );
      }
      if (filters.topics?.length) {
        filteredResult = filteredResult.filter((item) =>
          filters.topics.includes(item.topic)
        );
      }
      if (filters.sectors?.length) {
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
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
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

  const handleShowMore = (chartType) => {
    setExpandedChart(expandedChart === chartType ? null : chartType);
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"
      } min-h-screen transition-colors duration-300`}
    >
      <Header
        toggleSidebar={() => {}}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <div className="flex">
        <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-1 p-6 lg:p-8">
          <header className="mb-6">
            <h1 className="text-4xl font-bold">Data Visualization Dashboard</h1>
          </header>

          <section className="mb-6">
            <FilterComponent
              filters={filters}
              setFilters={setFilters}
              topics={topics}
              sectors={sectors}
              years={years}
            />
          </section>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <ClipLoader color={"#4A90E2"} loading={loading} size={150} />
            </div>
          ) : (
            <>
              <section className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="p-6 text-white bg-blue-600 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold">Total Records</h2>
                  <p className="mt-2 text-3xl font-bold">
                    {filteredData.length}
                  </p>
                </div>
                <div className="p-6 text-white bg-green-600 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold">Unique Topics</h2>
                  <p className="mt-2 text-3xl font-bold">{topics.length}</p>
                </div>
                <div className="p-6 text-white bg-purple-600 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold">Unique Sectors</h2>
                  <p className="mt-2 text-3xl font-bold">{sectors.length}</p>
                </div>
              </section>

              <section className="mt-12">
                <h2 className="mb-6 text-2xl font-bold">
                  Key Data Visualizations
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    { component: IntensityChart, name: "IntensityChart" },
                    { component: LikelihoodChart, name: "LikelihoodChart" },
                    { component: RelevanceChart, name: "RelevanceChart" },
                    { component: YearlyTrendsChart, name: "YearlyTrendsChart" },
                  ].map(({ component: ChartComponent, name }) => (
                    <div
                      key={name}
                      className={`relative transition-all duration-300 ${
                        expandedChart === name ? "lg:col-span-2" : "col-span-1"
                      } bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4`}
                      style={{
                        height: expandedChart === name ? "auto" : "500px",
                      }}
                    >
                      <ChartComponent data={filteredData} />
                      <button
                        onClick={() => handleShowMore(name)}
                        className="absolute px-4 py-2 text-blue-600 transition-transform bg-white border border-blue-600 rounded-lg shadow-lg bottom-2 right-2 dark:bg-gray-700 dark:text-gray-200 hover:scale-105"
                      >
                        {expandedChart === name ? "Show Less" : "Show More"}
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="flex justify-end mt-12">
                <button
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="px-4 py-2 font-semibold text-white transition-colors bg-blue-700 rounded-lg shadow-lg hover:bg-blue-800"
                >
                  Export Data
                </button>
              </section>

              {showExportMenu && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="p-8 bg-white rounded-lg shadow-lg dark:bg-gray-900 dark:text-gray-200">
                    <h3 className="mb-4 text-xl font-bold">
                      Choose Export Format
                    </h3>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleExport("csv")}
                        className="px-4 py-2 font-semibold text-white transition-colors bg-green-500 rounded-lg shadow-lg hover:bg-green-600"
                      >
                        Export as CSV
                      </button>
                      <button
                        onClick={() => handleExport("pdf")}
                        className="px-4 py-2 font-semibold text-white transition-colors bg-red-500 rounded-lg shadow-lg hover:bg-red-600"
                      >
                        Export as PDF
                      </button>
                      <button
                        onClick={() => handleExport("zip")}
                        className="px-4 py-2 font-semibold text-white transition-colors bg-purple-500 rounded-lg shadow-lg hover:bg-purple-600"
                      >
                        Export as ZIP
                      </button>
                      <button
                        onClick={() => setShowExportMenu(false)}
                        className="px-4 py-2 font-semibold text-white transition-colors bg-gray-500 rounded-lg shadow-lg hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <ToastContainer />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
