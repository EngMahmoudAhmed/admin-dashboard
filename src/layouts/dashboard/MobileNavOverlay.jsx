const MobileNavOverlay = ({ visible, onClose }) =>
  visible ? (
    <div
      role="presentation"
      onClick={onClose}
      className="fixed inset-0 z-40 bg-slate-900/40 dark:bg-slate-950/60 lg:hidden"
    />
  ) : null;

export default MobileNavOverlay;
