import React, { useState, useEffect } from "react";
import { getData } from "../services/dataService";

import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import Header from "./Header";

import TopicChart from "./TopicChart";
import SwotChart from "./SwotChart";
import ImpactChart from "./ImpactChart";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale } from 'chart.js';
import { Line, Pie, Radar } from 'react-chartjs-2';
import CityChart from "./CityChart";
import PESTLEChart from "./PESTLEChart";

// Registering components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

// Your chart component
const YourChartComponent = () => {
  return <Line data={data} options={options} />;
};


const Analytics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
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

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <Header toggleSidebar={() => {}} />
      <div className="flex">
        <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-900">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              Analytics Dashboard
            </h1>
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <ClipLoader
                color={darkMode ? "#ffffff" : "#000000"}
                loading={loading}
                size={50}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
              <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-semibold text-center dark:text-gray-100">
                  City
                </h2>
                <CityChart data={data} />
              </div>
              <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-semibold text-center dark:text-gray-100">
                  Topic
                </h2>
                <TopicChart data={data} />
              </div>
              <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-semibold text-center dark:text-gray-100">
                  SWOT
                </h2>
                <SwotChart data={data} />
              </div>
              {/* <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-semibold text-center dark:text-gray-100">
                  Impact
                </h2>
                <ImpactChart data={data} />
              </div> */}
              <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
     
      <div className="charts-container">
        {/* Other charts */}
        <PESTLEChart data={data} />
      </div>
    </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Analytics;
