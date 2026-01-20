import { useState } from "react";
import ManagementPage from "@/features/management/ManagementPage";
import { equipmentColumns } from "./equipment.columns";
import { equipmentSearchFields } from "./equipment.search";
import { equipmentMockData } from "./equipment.mock";
import { useExcelExport } from "@/shared/hooks/useExcelExport";

export default function EquipmentPage() {
  /* =========================
     테이블 데이터
     ========================= */
  const [data, setData] = useState(equipmentMockData);
  const [selectedIds, setSelectedIds] = useState([]);

  /* =========================
     엑셀 공통 훅
     ========================= */
  const { exportExcel } = useExcelExport();

  /* =========================
     검색 (임시)
     ========================= */
  function onSearch() {
    console.log("설비 조회");
  }

  function onReset() {
    console.log("설비 초기화");
  }

  /* =========================
     관리 버튼 (임시)
     ========================= */
  function onAdd() {
    alert("설비 추가");
  }

  function onDelete() {
    alert(`설비 삭제: ${selectedIds.join(", ")}`);
  }

  function onSave() {
    alert("설비 저장");
  }

  /* =========================
     ✅ 엑셀 저장 (실제 로직)
     ========================= */
  function onExcelExport() {
    exportExcel({
      data: data.list,          // 테이블 row 배열
      columns: equipmentColumns,
      selectedIds,
      fileName: "equipment.xlsx",
    });
  }

  /* =========================
     액션 정의
     ========================= */
  const actions = {
    search: [
      { key: "search", label: "조회", onClick: onSearch },
      { key: "reset", label: "초기화", onClick: onReset },
    ],

    left: [
      {
        key: "excel",
        label: "엑셀 저장",
        onClick: onExcelExport,   // 🔥 실제 훅 연결
      },
    ],

    primary: [
      { key: "add", label: "추가", onClick: onAdd },
      { key: "delete", label: "삭제", onClick: onDelete },
      { key: "save", label: "저장", onClick: onSave },
    ],
  };

  return (
    <ManagementPage
      title="설비 관리"
      searchFields={equipmentSearchFields}
      columns={equipmentColumns}
      data={data.list}           // ⭐ 배열만
      options={data.options}     // ⭐ select 옵션
      actions={actions}
      onSelectChange={setSelectedIds}
      onDataChange={updatedList =>
        setData(prev => ({
          ...prev,
          list: updatedList,
        }))
      }
    />
  );
}
