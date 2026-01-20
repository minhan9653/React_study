import "./TabBar.css";

export default function TabBar({
  tabs,
  activePath,
  onSelectTab,
  onCloseTab,
}) {
  return (
    <div className="tab-bar">
      {tabs.map(tab => (
        <div
          key={tab.path}
          className={`tab-item ${
            activePath === tab.path ? "active" : ""
          }`}
          onClick={() => onSelectTab(tab.path)}
        >
          <span className="tab-title">{tab.label || tab.key}</span>

          <span
            className="tab-close"
            onClick={e => {
              e.stopPropagation();
              onCloseTab(tab.path);
            }}
          >
            ✕
          </span>
        </div>
      ))}
    </div>
  );
}
