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
import { FiDownload } from "react-icons/fi";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

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
  const [searchTerm, setSearchTerm] = useState("");

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

      // Apply search filter
      if (searchTerm) {
        filteredResult = filteredResult.filter((item) =>
          item.topic.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredData(filteredResult);
    };

    applyFilters();
  }, [data, filters, searchTerm]);

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
        toast.success("Data exported as CSV");
        break;
      case "pdf":
        exportToPDF(filteredData, "data_export.pdf");
        toast.success("Data exported as PDF");
        break;
      case "zip":
        const zip = new JSZip();
        zip.file("data_export.csv", exportToCSV(filteredData, null, true));
        zip.file("data_export.pdf", exportToPDF(filteredData, null, true));
        zip.generateAsync({ type: "blob" }).then((content) => {
          saveAs(content, "data_export.zip");
          toast.success("Data exported as ZIP");
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
        <main className="flex-1 p-4 lg:p-6">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold">Data Visualization Dashboard</h1>
            <input
              type="text"
              className={`w-64 p-2 rounded-md focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-gray-800 text-gray-200 focus:ring-blue-500"
                  : "bg-white text-gray-800 focus:ring-blue-500"
              }`}
              placeholder="Search by topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
              <section className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-2">
                {[
                  { component: IntensityChart, name: "Intensity Chart" },
                  { component: LikelihoodChart, name: "Likelihood Chart" },
                  { component: RelevanceChart, name: "Relevance Chart" },
                  { component: YearlyTrendsChart, name: "Yearly Trends Chart" },
                ].map(({ component: ChartComponent, name }, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className={`p-4 rounded-lg shadow-lg ${
                      darkMode ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    <h2 className="mb-4 text-xl font-semibold">{name}</h2>
                    <ChartComponent data={filteredData} />
                  </motion.div>
                ))}
              </section>

              <Tooltip id="download-tooltip" effect="solid" />

              <motion.button
                className="fixed flex items-center justify-center p-4 text-white bg-blue-600 rounded-full bottom-8 right-8 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                onClick={() => setShowExportMenu(!showExportMenu)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                data-tip="Download Options"
                data-for="download-tooltip"
              >
                <FiDownload className="mr-2" />
                Export Data
              </motion.button>

              {showExportMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`fixed p-4 rounded-lg shadow-lg bottom-24 right-8 ${
                    darkMode
                      ? "bg-gray-700 text-gray-200"
                      : "bg-white text-gray-800"
                  }`}
                >
                  <h3 className="mb-2 text-lg font-semibold">Export Options</h3>
                  <button
                    className={`block w-full p-2 mb-2 rounded-md ${
                      darkMode
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                    onClick={() => handleExport("csv")}
                  >
                    Export as CSV
                  </button>
                  <button
                    className={`block w-full p-2 mb-2 rounded-md ${
                      darkMode
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                    onClick={() => handleExport("pdf")}
                  >
                    Export as PDF
                  </button>
                  <button
                    className={`block w-full p-2 rounded-md ${
                      darkMode
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                    onClick={() => handleExport("zip")}
                  >
                    Export as ZIP
                  </button>
                </motion.div>
              )}
            </>
          )}
        </main>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
