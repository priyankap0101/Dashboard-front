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


const Analytics = () => {
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
  
    
  
  
  
   
  
    const toggleDarkMode = () => {
      setDarkMode(!darkMode);
      localStorage.setItem("darkMode", !darkMode);
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
        <Header /> {/* Include the Header component here */}
        <div className="flex">
          <Sidebar
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            setShowExportMenu={setShowExportMenu}
            showExportMenu={showExportMenu}
            
          />
         
        </div>
        <ToastContainer />
      </div>
    );
  };
  

export default Analytics;
