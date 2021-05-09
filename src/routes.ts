import IRoute from "./types/OutputTypes";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";

export const routes: IRoute[] = [
    {
        path: "/",
        name: "Home",
        component: Home,
        exact: true
    },
    {
        path: "/create",
        name: "Create",
        component: Create,
        exact: true
    },
    {
        path: "/edit/:id",
        name: "Edit",
        component: Edit,
        exact: true
    }
]
