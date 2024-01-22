import App from "./components/App";
import Login from "./components/login-page/Login";
import Main from "./components/main-page/Main";
import Profile from "./components/Profile";
import User from "./components/user-page/User";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Login /> },
      // { path: "/Main", element: <Main /> },
      // { path: "/Profile", element: <Profile /> },
      // {
      //   path: "/User/:userId/",
      //   element: <User />,
      // },
    ],
  },
];

export default routes;
