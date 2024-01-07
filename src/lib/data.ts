export const menu = [
  {
    name: "Home",
    url: "/",
    submenu: [],
  },
  {
    name: "Heroes",
    url: "/heroes",
    submenu: [
      { name: "All Heroes", url: "/heroes" },
      { name: "Meta", url: "/heroes/meta" },
    ],
  },
  {
    name: "Players",
    url: "/players",
    submenu: [{ name: "Leaderboards", url: "/players/leaderboards" }],
  },
];
