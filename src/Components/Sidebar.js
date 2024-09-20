import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from '../Images/User.png'; // Adjust the path to your image
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Sidebar = ({ collapsed, toggleSidebar }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to navigate to the dashboard
  const handleProfileClick = () => {
    navigate('/'); // Navigate to the dashboard
  };

  // Menu items with their respective navigation paths
  const menuItems = [
    { icon: '🏠', text: 'Dashboard', path: '/' },
    { icon: '🛠️', text: 'Add Asset', path: '/machineform' },
    { icon: '📊', text: 'Breakdown', path: '/breakdownform' },
    { icon: '🔧', text: 'Maintenance Schedule', path: '/maintenanceschedule' },
    { icon: '👷', text: 'Add Part', path: '/part' },
    { icon: '🔨', text: 'Add Skills', path: '/skillsform' },
    { icon: '✔️', text: 'Add Users', path: '/workforce' },
    { icon: '📈', text: 'Production Plan', path: '/productionplan' },
    { icon: '📂', text: 'Add Tool Data', path: '/toolslife' },
    { icon: '🛠️', text: 'TPMS', path: '/tpms' },
    { icon: '🔔', text: 'Add Shift', path: '/shift' },
    { icon: '📊', text: 'PMC Parameters', path: '/pmc' },
    { icon: '🔧', text: 'Operator Performance', path: '/operator' },
    { icon: '📊', text: 'DownTime', path: '/downtime' },
  ];

  return (
    <div
      className="bg-dark text-white position-fixed d-flex flex-column"
      style={{
        width: collapsed ? '70px' : '240px', // Adjust width when collapsed
        height: '100vh', // Full viewport height
        transition: 'width 0.3s ease', // Smooth transition for width
        zIndex: 1000,
        overflow: 'hidden', // Hide overall sidebar overflow
      }}
    >
      {/* Profile Section */}
      <div className="text-center" style={{ marginTop: '5rem' }}>
        <img
          src={logo}
          alt="User Profile"
          className="rounded-circle"
          style={{

            width: collapsed ? '40px' : '60px',
            height: collapsed ? '40px' : '60px',
            objectFit: 'cover',
            transition: 'width 0.3s ease',
          }}
          // onClick={handleProfileClick} // Handle click on the profile image
          onClick={toggleSidebar}
        />
        {!collapsed && <div className="mt-2" style={{marginBottom: "1rem"}}>Shyam Gaikwad</div>}
      </div>

      {/* Collapse Button */}
      {/* <div className="text-center mb-3">
        <button className="btn btn-dark w-100" onClick={toggleSidebar}>
          <i className={bi ${collapsed ? 'bi-caret-right' : 'bi-caret-left'}}></i>
        </button>
      </div> */}

      {/* Sidebar Menu */}
      <div
        className="overflow-auto flex-grow-1" // Enable scrolling here
        style={{
          msOverflowStyle: 'none', // IE and Edge scrollbar hiding
          scrollbarWidth: 'none', // Firefox scrollbar hiding
          overflowY: 'auto', // Scroll vertically
        }}
      >
        {menuItems.map((item, index) => (
          <div className="col-12 mb-2" key={index}>
            <button
              className="d-flex align-items-center text-white text-decoration-none px-3 py-2 bg-transparent border-0 w-100"
              onClick={() => navigate(item.path)} // Navigate to the respective path
            >
              <span className="me-1">{item.icon}</span>
              <span className={`menu-text ${collapsed ? 'd-none' : ''}`}>{item.text}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;