export const factorySearchFields = [
  { name: "factoryCode", label: "공장", type: "text" },
  { name: "factoryName", label: "공장 명", type: "text" },
  {
    name: "useYn",
    label: "유효상태",
    type: "select",
    options: [
      { label: "전체", value: "" },
      { label: "사용", value: "Y" },
      { label: "미사용", value: "N" },
    ],
  },
];
