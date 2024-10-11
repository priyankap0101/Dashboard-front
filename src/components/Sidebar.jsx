import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FaChartPie,
  FaChartLine,
  FaUserFriends,
  FaShoppingCart,
  FaTruck,
  FaSchool,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaUser,
} from "react-icons/fa";

const Sidebar = ({ darkMode, toggleDarkMode }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const linkStyle = `flex items-center p-3 space-x-3 rounded-md transition-transform duration-300 ease-in-out transform hover:scale-105`;
  const linkActiveStyle = `bg-indigo-600 text-white shadow-lg`;
  const linkHoverStyle = `hover:bg-indigo-500 hover:text-white`;
  const baseTextStyle = `text-base font-semibold`;

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleAnalyticsClick = () => {
    if (isAnalyticsOpen) {
      // Navigate to the dashboard when closing the dropdown
      navigate("/analytics");
    }
    setIsAnalyticsOpen(!isAnalyticsOpen);
  };

  // Reset the analytics dropdown state when navigating to a different route
  useEffect(() => {
    if (location.pathname !== "/dashboard") {
      setIsAnalyticsOpen(false);
    }
  }, [location]);

  return (
    <div className="flex">
      <aside
        className={`transition-transform duration-300 ${
          isSidebarCollapsed ? "w-20" : "w-64"
        } min-h-screen p-6 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        } shadow-md`}
      >
        <button
          className="mb-4 text-2xl lg:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          {isSidebarCollapsed ? <FaBars /> : <FaTimes />}
        </button>

        {!isSidebarCollapsed && (
          <div className="flex items-center mb-6 space-x-3">
            <FaUserCircle size={40} />
            <div>
              <p className="text-lg font-semibold">John Doe</p>
              <p className="text-sm text-gray-600">Admin</p>
            </div>
          </div>
        )}

        <nav className={`${isSidebarCollapsed ? "hidden" : "block"} lg:block`}>
          <ul className="space-y-4">
            <li>
              <div
                className={`${linkStyle} ${baseTextStyle}   ${linkHoverStyle}  `}
                onClick={handleAnalyticsClick} // Handle Analytics toggle and navigation
                aria-label="Analytics"
              >
                <FaChartLine size={20} />
                {!isSidebarCollapsed && <span>Analytics</span>}
              </div>

              {isAnalyticsOpen && ( // Conditionally render the nested links
                <ul className="ml-6 space-y-2">
                  <li>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        `${linkStyle} ${baseTextStyle} ${linkHoverStyle} ${
                          isActive ? linkActiveStyle : ""
                        }`
                      }
                      aria-label="Dashboard"
                    >
                      <FaChartPie size={18} />
                      {!isSidebarCollapsed && <span>Dashboard</span>}
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <NavLink
                to="/crm"
                className={({ isActive }) =>
                  `${linkStyle} ${baseTextStyle} ${linkHoverStyle} ${
                    isActive ? linkActiveStyle : ""
                  }`
                }
                aria-label="CRM"
              >
                <FaUserFriends size={20} />
                {!isSidebarCollapsed && <span>CRM</span>}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ecommerce"
                className={({ isActive }) =>
                  `${linkStyle} ${baseTextStyle} ${linkHoverStyle} ${
                    isActive ? linkActiveStyle : ""
                  }`
                }
                aria-label="E-commerce"
              >
                <FaShoppingCart size={20} />
                {!isSidebarCollapsed && <span>E-commerce</span>}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/logistics"
                className={({ isActive }) =>
                  `${linkStyle} ${baseTextStyle} ${linkHoverStyle} ${
                    isActive ? linkActiveStyle : ""
                  }`
                }
                aria-label="Logistics"
              >
                <FaTruck size={20} />
                {!isSidebarCollapsed && <span>Logistics</span>}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/resource"
                className={({ isActive }) =>
                  `${linkStyle} ${baseTextStyle} ${linkHoverStyle} ${
                    isActive ? linkActiveStyle : ""
                  }`
                }
                aria-label="Resource Allocation"
              >
                <FaSchool size={20} />
                {!isSidebarCollapsed && <span>Resource Allocation</span>}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `${linkStyle} ${baseTextStyle} ${linkHoverStyle} ${
                    isActive ? linkActiveStyle : ""
                  }`
                }
                aria-label="Register"
              >
                <FaUser size={20} />
                {!isSidebarCollapsed && <span>Register</span>}
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* <div
          className={`flex items-center mt-8 ${
            isSidebarCollapsed ? "justify-center" : ""
          }`}
        >
          <button
            className={`w-full py-3 rounded-md flex items-center justify-center transition-all duration-300 ${
              darkMode
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-300 text-gray-800 hover:bg-gray-400"
            } shadow-md`}
            onClick={toggleDarkMode}
            aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? (
              <>
                <FaSun className="mr-2" />
                {!isSidebarCollapsed && "Light Mode"}
              </>
            ) : (
              <>
                <FaMoon className="mr-2" />
                {!isSidebarCollapsed && "Dark Mode"}
              </>
            )}
          </button>
        </div> */}
      </aside>

      <div className="flex-grow">{/* Main content goes here */}</div>
    </div>
  );
};

export default Sidebar;
