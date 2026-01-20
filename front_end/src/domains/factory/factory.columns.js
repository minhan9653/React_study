// domains/factory/factory.columns.js
export const factoryColumns = [
  {
    group: "기본 정보",
    children: [
      { key: "plantId", label: "공장 ID" ,editable : true },
      { key: "plantNameKoKr", label: "공장명" },
      { key: "plantNameEnUs", label: "영문명" },
    ],
  },

  {
    group: "위치 / 설명",
    children: [
      { key: "address", label: "주소", editable: true },
      {
        key: "description",
        label: "설명",
        editable: true,
        optionKey: "factoryDescription",
      },
    ],
  },

  {
    group: "관리 정보",
    children: [
      { key: "creator", label: "등록자" },
      { key: "createdTime", label: "등록일시" },
      { key: "modifier", label: "수정자" },
      { key: "modifiedTime", label: "수정일시" },
    ],
  },
];
