// equipment.columns.js
export const equipmentColumns = [
  { key: "equipId", label: "설비 ID" },

  {
    key: "zoneId",
    label: "구역 ID",
    editable: true,
    optionKey: "zoneOptions",   // 🔥 옵션의 출처만 지정
  },

  {
    key: "equipType",
    label: "설비 유형",
    editable: true,
    optionKey: "equipTypeOptions",
  },

  { key: "desc", label: "설명", editable: true },
];
