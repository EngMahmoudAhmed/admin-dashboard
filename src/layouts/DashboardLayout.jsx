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
import { useAuth } from "../context/AuthContext";
import ComingSoonSection from "./dashboard/ComingSoonSection";
import DashboardHeader from "./dashboard/DashboardHeader";
import DashboardHome from "./dashboard/DashboardHome";
import DashboardSidebar, { NAV_ITEMS } from "./dashboard/DashboardSidebar";
import MobileNavOverlay from "./dashboard/MobileNavOverlay";

const DashboardLayout = () => {
  const { user } = useAuth();
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

  const handleSelectNav = (name) => {
    setActive(name);
    setOpen(false);
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="flex">
        <DashboardSidebar
          open={open}
          onClose={() => setOpen(false)}
          active={active}
          onSelectNav={handleSelectNav}
          className=''
        />

        <MobileNavOverlay visible={open} onClose={() => setOpen(false)} />

        <div className="flex min-h-screen top-0 left-0 min-w-0 flex-1 flex-col">
          <DashboardHeader
            active={active}
            onOpenSidebar={() => setOpen(true)}
            user={user}
            theme={theme}
            onToggleTheme={toggleTheme}
          />

          <main className="flex-1 min-w-0 p-4 lg:p-8">
            {active === "Dashboard" && (
              <DashboardHome
                totalProducts={totalProducts}
                publishedProducts={publishedProducts}
                draftProducts={draftProducts}
                sectionCount={NAV_ITEMS.length}
                products={products}
                isLoading={isLoading}
                isError={isError}
              />
            )}

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
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full"
                  />
              </div>
            )}

            {(active === "Orders" || active === "Users" || active === "Settings") && (
              <ComingSoonSection title={active} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
