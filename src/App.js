
// working
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import Alerts from './Components/Alerts';
import Report from './Components/Report'
import Summary from './Components/Summary'
import { Alert } from 'bootstrap/dist/js/bootstrap.bundle.min';
import Footer from './Components/Footer';
import Maintenance from './Components/Maintenance';
import Monitoring from './Components/Monitoring';
import PartForm from './View/Part';
import MachineForm from './View/MachineForm';
import BreakdownForm from './View/BreakdownForm';
import MaintenanceScheduleForm from './View/MaintenanceSheduleForm';
import Skillsform from './View/SkillsForm';
import WorkForceForm from './View/WorkForceForm';
import ProductionPlan from './View/ProductionPlan';
import Toollifeform from './View/ToolsLife';
import TPMSForm from './View/TPMSForm';
import Shiftform from './View/ShiftForm';
import PmcParameter from './View/PMCParameter';
import OperatorPerformance from './View/OperatorPerformance';
import DowntimeForm from './View/DownTime';
import Files from './Components/Files';


const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <Router>
      <div className="d-flex">
        {/* Sidebar */}
        <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
        
        {/* Main content area */}
        <div
          className="main-content"
          style={{
            marginLeft: collapsed ? '60px' : '260px', 
            transition: 'margin-left 0.3s ease',
            width: collapsed ? 'calc(100% - 60px)' : 'calc(100% - 260px)',
          }}
        >
          <div className="p-0">
            <Navbar collapsed={collapsed} toggleSidebar={toggleSidebar} />
            
            {/* Routes for different pages */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/machine/:machineId" element={<Summary />} />  {/* Machine detail page route */}
              <Route path="/report" element={<Report />} />
              <Route path="/summary" element={<Summary />} />
              <Route path="/alert" element={<Alerts />} />
              <Route path="/maintenance" element={<Maintenance />} />
              <Route path="/monitoring" element={<Monitoring />} />
              <Route path="/part" element={<PartForm />} />
              <Route path="/machineform" element={<MachineForm />} />
              <Route path="/breakdownform" element={<BreakdownForm />} />
              <Route path="/maintenanceschedule" element={<MaintenanceScheduleForm />} />
              <Route path="/skillsform" element={<Skillsform />} />
              <Route path="/workforce" element={<WorkForceForm />} />
              <Route path="/productionplan" element={<ProductionPlan />} />
              <Route path="/toolslife" element={<Toollifeform />} />
              <Route path="/tpms" element={<TPMSForm />} />
              <Route path="/shift" element={<Shiftform />} />
              <Route path="/pmc" element={<PmcParameter />} />
              <Route path="/operator" element={<OperatorPerformance />} />
              <Route path="/downtime" element={<DowntimeForm />} />
              <Route path="/machine/:machineid/files" element={<Files />} />
            </Routes>
          </div>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default Layout;



