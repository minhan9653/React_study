import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function useExcelExport() {
  function exportExcel({
    data = [],
    columns = [],
    selectedIds = [],
    fileName = "export.xlsx",
  }) {
    if (!Array.isArray(data) || data.length === 0) {
      alert("엑셀로 저장할 데이터가 없습니다.");
      return;
    }

    /* =========================
       1. 대상 데이터 결정
       ========================= */
    const exportData =
      selectedIds.length > 0
        ? data.filter(row => selectedIds.includes(row.id))
        : data;

    /* =========================
       2. 컬럼 평탄화
       (group / children 구조 제거)
       ========================= */
    const flatColumns = columns.flatMap(col =>
      Array.isArray(col.children) ? col.children : [col]
    );

    /* =========================
       3. Header + Row 생성
       ========================= */
    const header = flatColumns.map(col => col.label);

    const rows = exportData.map(row =>
      flatColumns.map(col => row[col.key] ?? "")
    );

    /* =========================
       4. Sheet 생성
       ========================= */
    const worksheet = XLSX.utils.aoa_to_sheet([
      header,
      ...rows,
    ]);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Sheet1"
    );

    /* =========================
       5. 파일 다운로드
       ========================= */
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, fileName);
  }

  return {
    exportExcel,
  };
}
