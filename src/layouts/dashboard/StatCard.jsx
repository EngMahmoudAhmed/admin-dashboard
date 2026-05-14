const StatCard = ({ label, value, icon }) => (
  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
    <div className="mb-3 inline-flex rounded-lg p-2 text-slate-600 ">{icon}</div>
    <p className="text-sm">{label}</p>
    <p className="mt-1 text-2xl font-semibold ">{value}</p>
  </div>
);

export default StatCard;
