export default function SidebarIcon({ type = "folder" }) {
  if (type === "folder") {
    return (
      <span className="sidebar-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 4l2 2h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h6z" />
        </svg>
      </span>
    );
  }

  // 기본 문서 아이콘
  return (
    <span className="sidebar-icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 2h9l5 5v15a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" />
      </svg>
    </span>
  );
}
