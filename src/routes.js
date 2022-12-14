import Register from "views/Register.js";
import Login from "views/Login.js";

import AdminQuests from "./views/admin/AdminQuests";
import AdminCreateUpdateQuest from "./views/admin/AdminCreateUpdateQuest";
import AdminControlQuest from "./views/admin/AdminControlQuest";
import AdminCreateUpdateQuestStage from "./views/admin/AdminCreateUpdateQuestStage";

import PlayerHome from "./views/player/PlayerHome";
import PlayerQuestStage from "./views/player/PlayerQuestStage";
import Rules from "./views/Rules";


var routes = [
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
    component: AdminCreateUpdateQuestStage,
    layout: "/admin",
  },
  {
    path: "/quests/:id/stages/:stage_id/edit",
    name: "Редагування етапу квесту",
    exact: true,
    icon: "ni ni-tv-2 text-primary",
    component: AdminCreateUpdateQuestStage,
    layout: "/admin",
  },
  {
    path: "/quests/create",
    name: "Створити квест",
    exact: true,
    icon: "ni ni-tv-2 text-primary",
    component: AdminCreateUpdateQuest,
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
    path: "/quests/:id/edit",
    name: "Редагувати квест",
    exact: true,
    icon: "ni ni-tv-2 text-primary",
    component: AdminCreateUpdateQuest,
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
  {
    path: "/rules",
    name: "Правила",
    icon: "ni ni-circle-08 text-pink",
    component: Rules,
    visible: true,
    layout: "/auth",
  },
];
export default routes;
