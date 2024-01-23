import App from "./components/App";
import Login from "./components/login-page/Login";
import Main from "./components/main-page/Main";
import Profile from "./profile-page/Profile";
import User from "./components/user-page/User";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/main", element: <Main /> },
      // { path: "/Profile", element: <Profile /> },
      {
        path: "/users/:userId/",
        element: <User />,
      },
    ],
  },
];

export default routes;
