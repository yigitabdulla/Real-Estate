import HomePage from "./routes/homePage/HomePage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ListPage from "./routes/listPage/ListPage";
import Layout from "./routes/layout/Layout";
import SinglePage from "./routes/singlePage/SinglePage";
import ProfilePage from "./routes/profilePage/ProfilePage";
import Login from "./routes/login/Login";
import Register from "./routes/register/Register";
import NewPostPage from "./routes/newPostPage/NewPostPage";

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
          element:<ListPage/>
        },
        {
          path:"/:id",
          element:<SinglePage/>
        },
        {
          path:"/profile",
          element:<ProfilePage/>
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/register",
          element:<Register/>
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