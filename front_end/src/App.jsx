import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import FactoryPage from "./domains/factory/FactoryPage";
import EquipmentPage from "./domains/equipment/equipmentPage";

function App() {
  return (
    <Routes>
      {/* 공통 레이아웃 */}
      <Route element={<AppLayout />}>
        {/* ⭐ 핵심: / 접근 시 factory로 이동 */}
        <Route index element={<Navigate to="factory" replace />} />

        {/* 실제 페이지 */}
        <Route path="factory" element={<FactoryPage />} />
        <Route path="equipment" element={<EquipmentPage />} />
      </Route>
    </Routes>
  );
}

export default App;
