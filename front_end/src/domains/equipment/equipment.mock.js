// equipment.mock.js

export const equipmentMockData = {
  list: [
    {
      id: 1,
      equipId: "IN-P-11p",
      zoneId: "IN",
      equipType: "Production",
      desc: "RR/BRK",
    },
    {
      id: 2,
      equipId: "IN-P-21p",
      zoneId: "AL",
      equipType: "Production",
      desc: "FRT",
    },
  ],

  options: {
    zoneOptions: ["IN", "AL", "CL", "CV"],
    equipTypeOptions: ["Production"],
  },
};
