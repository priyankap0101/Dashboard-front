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
              <section className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-2">
                {[
                  { component: IntensityChart, name: "IntensityChart" },
                  { component: LikelihoodChart, name: "LikelihoodChart" },
                  { component: RelevanceChart, name: "RelevanceChart" },
                  { component: YearlyTrendsChart, name: "YearlyTrendsChart" },
                ].map(({ component: ChartComponent, name }, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
                  >
                    <h2 className="mb-4 text-xl font-semibold">{name}</h2>
                    <ChartComponent data={filteredData} />
                  </div>
                ))}
              </section>

              <button
                className="fixed p-4 text-white bg-gray-800 rounded-full bottom-8 right-8 hover:bg-gray-900"
                onClick={() => setShowExportMenu(!showExportMenu)}
              >
                Export Data
              </button>

              {showExportMenu && (
                <div className="fixed p-4 bg-white rounded-lg shadow-lg bottom-24 right-8">
                  <h3 className="mb-2 text-lg font-semibold">Export Options</h3>
                  <button
                    className="block p-2 mb-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    onClick={() => handleExport("csv")}
                  >
                    Export as CSV
                  </button>
                  <button
                    className="block p-2 mb-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                    onClick={() => handleExport("pdf")}
                  >
                    Export as PDF
                  </button>
                  <button
                    className="block p-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
                    onClick={() => handleExport("zip")}
                  >
                    Export as ZIP
                  </button>
                </div>
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
