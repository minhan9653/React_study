import { useCallback } from "react";

/**
 * 공통 CUD 훅 (최종 안정화)
 */
export function useCreateDeleteUpdate({
  data,
  setData,
  selectedIds,
  createFn,
  updateFn,
  deleteFn,
  createTemplate,
  idKey = "id",
}) {
  /* =========================
     추가 (🔥 여기서 tempKey 생성)
     ========================= */
  const addRow = useCallback(() => {
    setData(prev => [
      {
        ...createTemplate(),
        _tempKey: `TEMP_${Date.now()}_${crypto.randomUUID()}`,
        _isNew: true,
      },
      ...prev,
    ]);
  }, [setData, createTemplate]);

  /* =========================
     삭제
     ========================= */
  const deleteRows = useCallback(async () => {
    if (!selectedIds.length) {
      alert("삭제할 항목을 선택하세요");
      return;
    }

    await deleteFn(selectedIds);

    setData(prev =>
      prev.filter(row => !selectedIds.includes(row[idKey]))
    );
  }, [deleteFn, selectedIds, setData, idKey]);

  /* =========================
     저장
     ========================= */
  const saveRows = useCallback(async () => {
    for (const row of data) {
      if (row._isNew) {
        await createFn(row);
      } else if (row._dirty) {
        await updateFn(row[idKey], row);
      }
    }

    setData(prev =>
      prev.map(row => ({
        ...row,
        _isNew: false,
        _dirty: false,
      }))
    );

    alert("저장 완료");
  }, [data, createFn, updateFn, setData, idKey]);

  return {
    addRow,
    deleteRows,
    saveRows,
  };
}
