import { lazy } from "react";

export const pageRegistry = {
  "/factory": {
    label: "공장관리",
    component: lazy(() => import("@/domains/factory/FactoryPage")),
  },
  "/equipment": {
    label: "설비관리",
    component: lazy(() => import("@/domains/equipment/EquipmentPage")),
  },
  // zone 페이지 없어도 에러 안 남
};
