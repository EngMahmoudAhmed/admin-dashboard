import { LoaderCircle } from "lucide-react";

const RecentProductsSection = ({ products, isLoading, isError }) => (
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
              <tr
                key={product.id}
                className="border-t border-slate-500 dark:border-slate-50 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
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
);

export default RecentProductsSection;
