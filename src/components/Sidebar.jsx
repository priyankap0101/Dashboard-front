import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaChartBar, // Dashboard icon
  FaChartLine, // Analytics icon
  FaUserFriends,
  FaShoppingCart,
  FaTruck,
  FaSchool,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Sidebar = ({ darkMode, toggleDarkMode }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const linkStyle = `flex items-center p-3 space-x-3 rounded-md transition-all duration-300`;
  const linkActiveStyle = `bg-indigo-500 text-white shadow-lg`;
  const linkHoverStyle = `hover:bg-indigo-400 hover:text-white`;
  const baseTextStyle = `text-base font-semibold`;

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex">
      <aside
        className={`transition-all duration-300 ${
          isSidebarCollapsed ? "w-20" : "w-64"
        } min-h-screen p-6 ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        } border-r ${
          darkMode ? "border-gray-700" : "border-gray-300"
        }`}
      >
        <button
          className="mb-4 text-2xl lg:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          {isSidebarCollapsed ? <FaBars /> : <FaTimes />}
        </button>
        <nav className={`${isSidebarCollapsed ? "hidden" : "block"} lg:block`}>
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${linkStyle} ${baseTextStyle} ${linkHoverStyle} ${
                    isActive ? linkActiveStyle : ""
                  }`
                }
              >
                <FaChartBar size={20} />
                {!isSidebarCollapsed && <span>Dashboard</span>}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/analytics"
                className={({ isActive }) =>
                  `${linkStyle} ${baseTextStyle} ${linkHoverStyle} ${
                    isActive ? linkActiveStyle : ""
                  }`
                }
              >
                <FaChartLine size={20} />
                {!isSidebarCollapsed && <span>Analytics</span>}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/crm"
                className={({ isActive }) =>
                  `${linkStyle} ${baseTextStyle} ${linkHoverStyle} ${
                    isActive ? linkActiveStyle : ""
                  }`
                }
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
              >
                <FaSchool size={20} />
                {!isSidebarCollapsed && <span>Register</span>}
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Dark Mode Toggle */}
        <div
          className={`flex items-center mt-8 ${
            isSidebarCollapsed ? "justify-center" : ""
          }`}
        >
          <button
            className={`w-full py-3 rounded-md flex items-center justify-center transition-all duration-300 ${
              darkMode
                ? "bg-indigo-500 text-white hover:bg-indigo-600"
                : "bg-gray-300 text-gray-800 hover:bg-gray-400"
            } shadow-md`}
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
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
        </div>
      </aside>

      <div className="flex-grow">
        {/* Main content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;
