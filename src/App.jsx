import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import MessageTemplates from './pages/MessageTemplates';
import TeamMemberBlocklist from './pages/TeamMemberBlocklist';
import UserPreferences from './pages/UserPreferences';
import Notifications from './pages/Notifications';
import AllTasks from './pages/AllTasks';
import TransactionHistory from './pages/TransactionHistory';
import Billing from './pages/Billing';
import PermissionTemplates from './pages/PermissionTemplates';
import UsersManagement from './pages/UsersManagement';
import EnterprisePreferences from './pages/EnterprisePreferences';
import CallFeedback from './pages/CallFeedback';
import LeadFields from './pages/LeadFields';
import ManageWorkspaces from './pages/ManageWorkspaces';

import LeadStage from './pages/LeadStage';
import Integrations from './pages/Integrations';
import ApiTemplates from './pages/ApiTemplates';
import Salesforms from './pages/Salesforms';
import Schedules from './pages/Schedules';
import Workflows from './pages/Workflows';
import AddLead from './pages/AddLead';
import ImportLeads from './pages/ImportLeads';
import Activities from './pages/Activities';
import UnderConstruction from './pages/UnderConstruction';





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search" element={<Search />} />
        <Route path="/add-leads" element={<AddLead />} /> {/* Direct link for sidebar parent item fallback */}
        <Route path="/activities" element={<Activities />} />
        {/* Placeholder Routes redirected to Under Construction */}
        <Route path="/under-construction" element={<UnderConstruction />} />
        <Route path="/campaigns" element={<UnderConstruction />} />
        <Route path="/filters" element={<UnderConstruction />} />
        <Route path="/my-lists" element={<UnderConstruction />} />
        <Route path="/reports" element={<UnderConstruction />} />

        <Route path="/automations" element={<UnderConstruction />} /> {/* Fallback if not Workflows */}

        <Route path="/profile" element={<Profile />} />
        <Route path="/templates" element={<MessageTemplates />} />
        <Route path="/teammember-blocklist" element={<TeamMemberBlocklist />} />
        <Route path="/my-preferences" element={<UserPreferences />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/all-tasks" element={<AllTasks />} />
        <Route path="/transaction-history" element={<TransactionHistory />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/permission-templates" element={<PermissionTemplates />} />
        <Route path="/users" element={<UsersManagement />} />
        <Route path="/enterprise-preferences" element={<EnterprisePreferences />} />
        <Route path="/call-feedback" element={<CallFeedback />} />
        <Route path="/lead-fields" element={<LeadFields />} />
        <Route path="/manage-workspaces" element={<ManageWorkspaces />} />

        <Route path="/lead-stage-configure" element={<LeadStage />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/api-templates" element={<ApiTemplates />} />
        <Route path="/salesforms" element={<Salesforms />} />
        <Route path="/schedules" element={<Schedules />} />
        <Route path="/workflows" element={<Workflows />} />
        <Route path="/add-lead" element={<AddLead />} />
        <Route path="/import-leads" element={<ImportLeads />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;