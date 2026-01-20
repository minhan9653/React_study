import { Suspense, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import TabBar from "./TabBar";
import { pageRegistry } from "@/pages/pageRegistry";
import "./AppLayout.css";


export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [tabs, setTabs] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  function handleOpenTab(tab) {
    if (!pageRegistry[tab.path]) return;

    setTabs(prev => {
      const filtered = prev.filter(t => t.path !== tab.path);
      return [
        ...filtered,
        {
          ...tab,
          instanceId: Date.now(),
        },
      ];
    });

    navigate(tab.path);
  }

  function handleSelectTab(path) {
    if (location.pathname === path) return;
    navigate(path);
  }

  function handleCloseTab(path) {
    setTabs(prev => {
      const nextTabs = prev.filter(t => t.path !== path);

      if (location.pathname === path && nextTabs.length > 0) {
        navigate(nextTabs[nextTabs.length - 1].path);
      }

      return nextTabs;  
    });
  }

  return (
    <div className="app-layout">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        onOpenTab={handleOpenTab}
      />

      <div className="app-main">
        <TabBar
          tabs={tabs}
          activePath={location.pathname}
          onSelectTab={handleSelectTab}
          onCloseTab={handleCloseTab}
        />

        <div className="app-content">
          {tabs.map(tab => {
            const Page = pageRegistry[tab.path]?.component;
            if (!Page) return null;
            return (
              <div
                key={tab.instanceId}
                className={`tab-page ${location.pathname === tab.path ? "active" : ""
                  }`}
              >
                {/* ⭐ 핵심 wrapper */}
                <div className="tab-page-inner">
                  <Suspense fallback={<div>로딩 중...</div>}>
                    <Page />
                  </Suspense>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
