export function createFactoryActions({
  actions,
  onExcelExport,
  onAdd,
  onDelete,
  onSave,
}) {
  return {
    ...actions,

    left: [
      {
        key: "excel",
        label: "엑셀 저장",
        onClick: onExcelExport,
      },
    ],

    primary: [
      {
        key: "add",
        label: "추가",
        onClick: onAdd,
      },
      {
        key: "delete",
        label: "삭제",
        onClick: onDelete,
      },
      {
        key: "save",
        label: "저장",
        onClick: onSave,
      },
    ],
  };
}
