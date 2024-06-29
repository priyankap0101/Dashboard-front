import React, { useState, useEffect } from "react";
import { getData } from "../services/dataService";
import IntensityChart from "./IntensityChart";
import LikelihoodChart from "./LikelihoodChart";
import RelevanceChart from "./RelevanceChart";
import YearlyTrendsChart from "./YearlyTrendsChart";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [activeChart, setActiveChart] = useState("intensity");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getData(); // Replace with your actual data fetching logic
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data");
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
  }, []);

  const renderChart = () => {
    switch (activeChart) {
      case "intensity":
        return <IntensityChart data={data} />;
      case "likelihood":
        return <LikelihoodChart data={data} />;
      case "relevance":
        return <RelevanceChart data={data} />;
      case "trends":
        return <YearlyTrendsChart data={data} />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <Header toggleSidebar={() => {}} />
      <div className="flex">
        <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Analytics Dashboard</h1>
          </div>
          <div className="flex justify-center mb-4 space-x-4">
            <button
              className={`px-4 py-2 rounded ${
                activeChart === "intensity"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 dark:text-white"
              }`}
              onClick={() => setActiveChart("intensity")}
            >
              Intensity
            </button>
            <button
              className={`px-4 py-2 rounded ${
                activeChart === "likelihood"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 dark:text-white"
              }`}
              onClick={() => setActiveChart("likelihood")}
            >
              Likelihood
            </button>
            <button
              className={`px-4 py-2 rounded ${
                activeChart === "relevance"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 dark:text-white"
              }`}
              onClick={() => setActiveChart("relevance")}
            >
              Relevance
            </button>
            <button
              className={`px-4 py-2 rounded ${
                activeChart === "trends"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 dark:text-white"
              }`}
              onClick={() => setActiveChart("trends")}
            >
              Trends
            </button>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <ClipLoader color={darkMode ? "#ffffff" : "#000000"} loading={loading} size={50} />
              </div>
            ) : (
              renderChart() || <p className="text-center text-gray-500">No data available</p>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Analytics;
