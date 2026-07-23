export function ProTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="pro-tip">
      <div className="pro-tip-label">💡 Pro Tip</div>
      {children}
    </div>
  );
}
