import { BadgeDollarSign, Boxes, LayoutDashboard, Package } from "lucide-react";
import RecentProductsSection from "./RecentProductsSection";
import StatCard from "./StatCard";

const DashboardHome = ({
  totalProducts,
  publishedProducts,
  draftProducts,
  sectionCount,
  products,
  isLoading,
  isError,
}) => (
  <>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Total Products" value={totalProducts} icon={<Boxes size={18} />} />
      <StatCard label="Published" value={publishedProducts} icon={<BadgeDollarSign size={18} />} />
      <StatCard label="Drafts" value={draftProducts} icon={<Package size={18} />} />
      <StatCard label="Sections" value={sectionCount} icon={<LayoutDashboard size={18} />} />
    </div>

    <RecentProductsSection products={products} isLoading={isLoading} isError={isError} />
  </>
);

export default DashboardHome;
