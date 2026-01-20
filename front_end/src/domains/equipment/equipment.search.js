export const equipmentSearchFields = [
  { name: "factory", label: "공장", type: "select" ,
        options: [
      { label: "A공장"},
      { label: "B공장" },
      { label: "C공장" },
    ],
  },
  { name: "equipId", label: "설비 ID", type: "text" },
  { name: "zoneId", label: "구역 ID", type: "select" },
  { name: "equipType", label: "설비 유형", type: "select" },
  { name: "useYn", label: "유효 상태", type: "select" },
];
