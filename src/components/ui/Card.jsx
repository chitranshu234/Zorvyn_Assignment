export default function Card({ children, className = '', hover = false, gradient = '', onClick, style }) {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`
        ${hover ? 'dash-card-hover cursor-pointer' : 'dash-card'}
        ${gradient}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
