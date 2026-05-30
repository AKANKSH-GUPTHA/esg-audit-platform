import {
  LayoutDashboard,
  Building2,
  Leaf,
  FileText,
  Upload,
} from "lucide-react";

function Sidebar() {

  return (

    <aside className="sidebar">

      <h1 className="sidebar-logo">
        ESG AI
      </h1>

      <nav className="sidebar-menu">

        <a href="#" className="sidebar-item">
          <LayoutDashboard size={28} />
          <span>Dashboard</span>
        </a>

        <a href="#" className="sidebar-item">
          <Building2 size={28} />
          <span>Tenants</span>
        </a>

        <a href="#" className="sidebar-item">
          <Leaf size={28} />
          <span>Emissions</span>
        </a>

        <a href="#" className="sidebar-item">
          <FileText size={28} />
          <span>Audit Logs</span>
        </a>

        <a href="#" className="sidebar-item">
          <Upload size={28} />
          <span>Upload Data</span>
        </a>

      </nav>

    </aside>
  );
}

export default Sidebar;