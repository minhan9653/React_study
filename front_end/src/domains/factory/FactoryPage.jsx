import { useState } from "react";
import ManagementPage from "@/features/management/ManagementPage";
import { factoryColumns } from "./factory.columns";
import { factorySearchFields } from "./factory.search";
import { factoryDescriptionOptions } from "./factory.options";
import {
  fetchFactories,
  createFactory,
  updateFactory,
  deleteFactories,
} from "./factory.api";
import { useSearchPage } from "@/shared/hooks/useSearchPage";
import { useExcelExport } from "@/shared/hooks/useExcelExport";
import { useCreateDeleteUpdate } from "@/shared/hooks/useCreateDeleteUpdate";
import { createFactoryActions } from "./factory.actions";

export default function FactoryPage() {
  /* =========================
     검색 / 데이터
     ========================= */
  const {
    searchValues,
    setSearchValues,
    data,
    setData,
    actions,
  } = useSearchPage(
    {
      factoryId: "",
      factoryName: "",
      useYn: "",
    },
    fetchFactories
  );

  const [selectedIds, setSelectedIds] = useState([]);

  /* =========================
     엑셀
     ========================= */
  const { exportExcel } = useExcelExport();

  function onExcelExport() {
    exportExcel({
      data,
      columns: factoryColumns,
      selectedIds,
      fileName: "factory.xlsx",
    });
  }

  /* =========================
     ✅ 공통 CUD 훅
     ========================= */
  const { addRow, deleteRows, saveRows } =
    useCreateDeleteUpdate({
      data,
      setData,
      selectedIds,
      createFn: createFactory,
      updateFn: updateFactory,
      deleteFn: deleteFactories,
      idKey: "id",
      createTemplate: () => ({
        id: `NEW_${Date.now()}`,
        factoryId: "",
        factoryName: "",
        useYn: "Y",
      }),
    });

  /* =========================
     버튼
     ========================= */
  const pageActions = createFactoryActions({
    actions,
    onExcelExport,
    onAdd: addRow,
    onDelete: deleteRows,
    onSave: saveRows,
  });

  return (
    <ManagementPage
      title="공장 관리"
      searchFields={factorySearchFields}
      searchValues={searchValues}
      onSearchChange={setSearchValues}
      columns={factoryColumns}
      data={data}
      options={{
        factoryDescription: factoryDescriptionOptions,
      }}
      actions={pageActions}
      onSelectChange={setSelectedIds}
      onDataChange={setData}
    />
  );
}
