import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { sidebarMenus } from "./sidebar.menu";
import "./Sidebar.css";

function SidebarIcon({ type = "folder" }) {
  return (
    <span className="sidebar-icon">
      {type === "folder" ? "📁" : "📄"}
    </span>
  );
}

export default function Sidebar({ collapsed, onToggle, onOpenTab }) {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ 여러 섹션 열림 상태
  const [openSections, setOpenSections] = useState({});

  /* =========================
     현재 경로에 해당하는 섹션 자동 오픈
     ========================= */
  useEffect(() => {
    const matched = sidebarMenus.find(section =>
      section.items.some(item => item.path === location.pathname)
    );

    if (matched) {
      setOpenSections(prev => ({
        ...prev,
        [matched.section]: true,
      }));
    }
  }, [location.pathname]);

  /* =========================
     섹션 토글 (독립)
     ========================= */
  function handleToggleSection(sectionName) {
    setOpenSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  }

  /* =========================
     메뉴 클릭
     ========================= */
  function handleMenuClick(item) {
    onOpenTab({
      key: item.label,
      path: item.path,
    });

    navigate(item.path);
  }

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* 헤더 */}
      <div className="sidebar-header">
        <button className="hamburger" onClick={onToggle}>☰</button>

        {!collapsed && (
          <div className="sidebar-title">
            <div className="logo">SEOYON E-HWA</div>
            <div className="subtitle">서연이화 텍사스 물류자동화</div>
          </div>
        )}
      </div>

      {/* 메뉴 */}
      <nav className="sidebar-nav">
        {sidebarMenus.map(section => {
          const isOpen = !!openSections[section.section];

          return (
            <div key={section.section} className="sidebar-parent">
              {/* 상위 섹션 */}
              <div
                className="sidebar-parent-item"
                onClick={() => handleToggleSection(section.section)}
              >
                <SidebarIcon type="folder" />
                {!collapsed && <span>{section.section}</span>}
              </div>

              {/* 하위 메뉴 */}
              <div className={`sidebar-children ${isOpen ? "open" : ""}`}>
                {section.items.map(item => (
                  <div
                    key={item.path}
                    className={`sidebar-child ${
                      location.pathname === item.path ? "active" : ""
                    }`}
                    onClick={() => handleMenuClick(item)}
                  >
                    <SidebarIcon type="file" />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </nav>

      {!collapsed && <div className="sidebar-footer">v1.1.1</div>}
    </aside>
  );
}
