import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/Register.js";
import Login from "views/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";

import AdminQuests from "./views/admin/AdminQuests";
import AdminCreateQuest from "./views/admin/AdminCreateQuest";
import AdminControlQuest from "./views/admin/AdminControlQuest";
import AdminCreateQuestStage from "./views/admin/AdminCreateQuestStage";

import PlayerHome from "./views/player/PlayerHome";
import PlayerQuestStage from "./views/player/PlayerQuestStage";


var routes = [
  // {
  //   path: "/index",
  //   name: "Dashboard",
  //   icon: "ni ni-tv-2 text-primary",
  //   component: Index,
  //   visible: true,
  //   layout: "/admin",
  // },
  {
    path: "/index",
    name: "Головна сторінка",
    icon: "ni ni-tv-2 text-primary",
    component: PlayerHome,
    visible: true,
    layout: "/player",
  },
  {
    path: "/quests/:id/playing",
    name: "Грати квест",
    exact: true,
    icon: "ni ni-tv-2 text-primary",
    component: PlayerQuestStage,
    layout: "/player",
  },
  {
    path: "/quests/:id/stages/create",
    name: "Створити етап квесту",
    exact: true,
    icon: "ni ni-tv-2 text-primary",
    component: AdminCreateQuestStage,
    layout: "/admin",
  },
  {
    path: "/quests/create",
    name: "Створити квест",
    exact: true,
    icon: "ni ni-tv-2 text-primary",
    component: AdminCreateQuest,
    layout: "/admin",
  },
  {
    path: "/quests/:id",
    name: "Контролювати квест",
    exact: true,
    icon: "ni ni-tv-2 text-primary",
    component: AdminControlQuest,
    layout: "/admin",
  },
  {
    path: "/index",
    name: "Квести",
    icon: "ni ni-tv-2 text-primary",
    component: AdminQuests,
    visible: true,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    visible: false,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    visible: false,
    layout: "/auth",
  },
];
export default routes;
