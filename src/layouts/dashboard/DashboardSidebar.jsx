import {
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Users,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import supabase from "../../lib/supabase";

const NAV_ITEMS = [
  { name: "Dashboard", Icon: LayoutDashboard },
  { name: "Products", Icon: Package },
  { name: "Orders", Icon: ShoppingCart },
  { name: "Users", Icon: Users },
  { name: "Settings", Icon: Settings },
];

const DashboardSidebar = ({ open, onClose, active, onSelectNav }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  };

  return (
    <aside
      className={` fixed z-50 h-screen w-72 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 lg:static lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-5">
        <div>
          <p className="text-xs uppercase tracking-wide">Modern</p>
          <h2 className="text-xl font-semibold">Admin Dashboard</h2>
        </div>
        <button type="button" onClick={onClose} className="cursor-pointer lg:hidden">
          <X size={20} />
        </button>
      </div>

      <nav className="p-4">
        <ul className="space-y-1.5">
          {NAV_ITEMS.map(({ name, Icon }) => (
            <li key={name}>
              <button
                type="button"
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${active === name ? "bg-slate-900 dark:bg-blue-600 text-white" : " hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"}`}
                onClick={() => onSelectNav(name)}
              >
                <Icon size={18} />
                {name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 w-full border-t border-slate-200 dark:border-slate-800 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
export { NAV_ITEMS };
