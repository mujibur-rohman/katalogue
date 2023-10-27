const SUB_MENUS = [
  {
    path: "/catalogue",
    name: "Catalogue",
  },
  {
    path: "/attributes",
    name: "Attributes",
  },
];
const SUB_MENUS_CATALOGUE = (id: string) => {
  return [
    {
      path: "/catalogue/" + id + "/view",
      name: "Information",
    },
    {
      path: "/catalogue/" + id + "/products",
      name: "Product",
    },
  ];
};

export default { SUB_MENUS, SUB_MENUS_CATALOGUE };
