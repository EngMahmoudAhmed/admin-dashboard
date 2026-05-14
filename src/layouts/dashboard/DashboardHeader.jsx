import { Menu, Moon, Search, Sun } from "lucide-react";

const DashboardHeader = ({ active, onOpenSidebar, user, theme, onToggleTheme }) => (
  <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800  backdrop-blur">
    <div className="flex h-16 items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-3">
        <button type="button" onClick={onOpenSidebar} className="lg:hidden">
          <Menu />
        </button>
        <h1 className="text-lg font-semibold">{active}</h1>
      </div>

      <div className="hidden items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm md:flex">
        <Search size={16} />
        Search analytics, products...
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onToggleTheme}
          className="p-2 rounded-lg cursor-pointer hover:bg-white dark:hover:bg-slate-800 transition"
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? <Moon size={20} color={"#000"} /> : <Sun size={20} />}
        </button>

        <img src="https://i.pravatar.cc/40" alt="user avatar" className="h-10 w-10 rounded-full cursor-pointer" />
        <div className="hidden sm:block cursor-pointer">
          <h3 className="text-sm font-medium ">Admin</h3>
          <p className="text-xs">{user?.email ?? "—"}</p>
        </div>
      </div>
    </div>
  </header>
);

export default DashboardHeader;
