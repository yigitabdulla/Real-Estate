import HomePage from "./routes/homePage/HomePage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ListPage from "./routes/listPage/ListPage";
import {Layout, RequireAuth } from "./routes/layout/Layout";
import SinglePage from "./routes/singlePage/SinglePage";
import ProfilePage from "./routes/profilePage/ProfilePage";
import Login from "./routes/login/Login";
import Register from "./routes/register/Register";
import NewPostPage from "./routes/newPostPage/NewPostPage";
import ProfileUpdatePage from "./routes/profileUpdatePage/ProfileUpdatePage";
import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loaders";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[
        {
          path:"/",
          element:<HomePage/>
        },
        {
          path:"/list",
          element:<ListPage/>,
          loader: listPageLoader
        },
        {
          path:"/:id",
          element:<SinglePage/>,
          loader: singlePageLoader
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/register",
          element:<Register/>
        }
      ]
    },

    {
      path: "/",
      element: <RequireAuth />,
      children:[
        {
          path:"/profile",
          element:<ProfilePage/>,
          loader: profilePageLoader
        },
        {
          path:"/profile/update",
          element:<ProfileUpdatePage/>
        },
        {
          path:"/add",
          element:<NewPostPage/>
        }
      ]
    }
  ]);

  return (

    <RouterProvider router={router}/>
  );
}

export default App;