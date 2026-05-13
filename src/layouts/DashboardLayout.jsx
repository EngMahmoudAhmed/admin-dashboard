import {
  BadgeDollarSign,
  Boxes,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  Menu,
  Moon,
  Package,
  Search,
  Settings,
  ShoppingCart,
  Sun,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/ProductsApi";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";
import { useAdminProducts } from "../hooks/useAdminProducts";
import { useUpdateProduct } from "../hooks/useUpdateProduct";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { useAddProduct } from "../hooks/useAddProduct";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import supabase from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Dashboard");
  const [editingProduct, setEditingProduct] = useState(null);

  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { data: adminProducts } = useAdminProducts();
  const deleteMutation = useDeleteProduct();
  const updateMutation = useUpdateProduct();
  const addMutation = useAddProduct();

  const navLinks = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Products", icon: <Package size={18} /> },
    { name: "Orders", icon: <ShoppingCart size={18} /> },
    { name: "Users", icon: <Users size={18} /> },
    { name: "Settings", icon: <Settings size={18} /> },
  ];

  const totalProducts = products.length;
  const publishedProducts = products.filter((item) => item.is_published).length;
  const draftProducts = totalProducts - publishedProducts;

  const handleAdd = (data) => {
    addMutation.mutate(data);
  };

  const handleUpdate = (data) => {
    updateMutation.mutate({
      id: editingProduct.id,
      updatedData: data,
    });
    setEditingProduct(null);
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="flex">
        <aside
          className={`fixed top-0 left-0 z-50 h-screen w-72 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 lg:static lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-5">
            <div>
              <p className="text-xs uppercase tracking-wide">Modern</p>
              <h2 className="text-xl font-semibold">Admin Dashboard</h2>
            </div>
            <button onClick={() => setOpen(false)} className="cursor-pointer lg:hidden">
              <X size={20} />
            </button>
          </div>

          <nav className="p-4">
            <ul className="space-y-1.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${active === link.name ? "bg-slate-900 dark:bg-blue-600 text-white" : " hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"}`}
                    onClick={() => {
                      setActive(link.name);
                      setOpen(false);
                    }}
                  >
                    {link.icon}
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="absolute bottom-0 w-full border-t border-slate-200 dark:border-slate-800 p-4">
            <button
              type="button"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate("/login", { replace: true });
              }}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </aside>

        {open && (
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-slate-900/40 dark:bg-slate-950/60 lg:hidden"
          />
        )}

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800  backdrop-blur">
            <div className="flex h-16 items-center justify-between px-4 lg:px-8">
              <div className="flex items-center gap-3">
                <button onClick={() => setOpen(true)} className="lg:hidden">
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
                  onClick={toggleTheme}
                  className="p-2 rounded-lg cursor-pointer hover:bg-white dark:hover:bg-slate-800 transition"
                  title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                >
                  {theme === "light" ? <Moon size={20} color={'#000'} /> : <Sun size={20} />}
                </button>

                <img src="https://i.pravatar.cc/40" alt="user avatar" className="h-10 w-10 rounded-full cursor-pointer" />
                <div className="hidden sm:block cursor-pointer">
                  <h3 className="text-sm font-medium ">Admin</h3>
                  <p className="text-xs">{user?.email ?? "—"}</p>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 lg:p-8">
            {/* Dashboard Section */}
            {active === "Dashboard" && (
              <>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <StatCard label="Total Products" value={totalProducts} icon={<Boxes size={18} />} />
                  <StatCard label="Published" value={publishedProducts} icon={<BadgeDollarSign size={18} />} />
                  <StatCard label="Drafts" value={draftProducts} icon={<Package size={18} />} />
                  <StatCard label="Sections" value={navLinks.length} icon={<LayoutDashboard size={18} />} />
                </div>

                <section className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
                  <h2 className="text-base font-semibold">Recent Products</h2>
                  <p className="mt-1 text-sm">Live data from Supabase via TanStack Query.</p>

                  {isLoading ? (
                    <div className="mt-6 flex items-center gap-2 text-sm ">
                      <LoaderCircle className="animate-spin" size={16} />
                      Loading products...
                    </div>
                  ) : null}

                  {isError ? (
                    <p className="mt-6 rounded-lg bg-rose-50 dark:bg-rose-950 p-3 text-sm text-rose-700 dark:text-rose-300">
                      Could not load products. Check your Supabase table/keys.
                    </p>
                  ) : null}

                  {!isLoading && !isError ? (
                    <div className="mt-5 overflow-hidden rounded-xl border border-slate-500 dark:border-slate-800">
                      <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-5">
                          <tr>
                            <th className="px-4 py-3 font-medium">Name</th>
                            <th className="px-4 py-3 font-medium">Price</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.slice(0, 6).map((product) => (
                            <tr key={product.id} className="border-t border-slate-500 dark:border-slate-50 hover:bg-slate-50 dark:hover:bg-slate-800">
                              <td className="px-4 py-3">{product.name ?? "Untitled product"}</td>
                              <td className="px-4 py-3">${product.price ?? 0}</td>
                              <td className="px-4 py-3">
                                <span
                                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${product.is_published ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300" : "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"}`}
                                >
                                  {product.is_published ? "Published" : "Draft"}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                </section>
              </>
            )}

            {/* Products Management Section */}
            {active === "Products" && (
              <div className="space-y-8">
                <ProductForm
                  onSubmit={editingProduct ? handleUpdate : handleAdd}
                  defaultValues={editingProduct || {}}
                  isEdit={!!editingProduct}
                />
                <ProductTable
                  products={adminProducts}
                  onEdit={setEditingProduct}
                  onDelete={handleDelete}
                />
              </div>
            )}

            {/* Other Sections Placeholder */}
            {(active === "Orders" || active === "Users" || active === "Settings") && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center">
                <h2 className="text-xl font-semibold">{active}</h2>
                <p className="mt-2 ">This section is coming soon...</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon }) => (
  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
    <div className="mb-3 inline-flex rounded-lg p-2 text-slate-600 ">{icon}</div>
    <p className="text-sm">{label}</p>
    <p className="mt-1 text-2xl font-semibold ">{value}</p>
  </div>
);

export default DashboardLayout;