// import {
//   createBrowserRouter,
//   RouterProvider,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import LeftBar from "./components/leftBar/LeftBar";
// import RightBar from "./components/rightBar/RightBar";
// import Home from "./pages/home/Home";
// import Profile from "./pages/profile/Profile";
// import Login from "./pages/login/Login";
// import Register from "./pages/register/Register";
// import { useContext } from "react";
// import { DarkModeContext } from "./context/darkModeContext";
// import { AuthContext } from "./context/authContext";

// function App() {
//   const { currentUser, isLoggedIn } = useContext(AuthContext); // Assuming you have an "isLoggedIn" state in your AuthContext

//   const { darkMode } = useContext(DarkModeContext);

//   const Layout = () => {
//     return (
//       <div className={`theme-${darkMode ? "dark" : "light"}`}>
//         <div style={{ display: "flex" }}>
//           <LeftBar />
//           <div style={{ flex: 6 }}>
//             <Routes>
//               <Route
//                 path="/"
//                 element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
//               />
//               <Route path="/profile/:id" element={<Profile />} />
//             </Routes>
//           </div>
//           <RightBar />
//         </div>
//       </div>
//     );
//   };

//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Layout />,
//     },
//     {
//       path: "/home",
//       element: <Home />,
//     },
//     {
//       path: "/profile/:id",
//       element: <Profile />,
//     },
//     {
//       path: "/login",
//       element: <Login />,
//     },
//     {
//       path: "/register",
//       element: <Register />,
//     },
//   ]);

//   return (
//     <div>
//       <RouterProvider router={router} />
//     </div>
//   );
// }

// export default App;


// import Login from "./pages/login/Login";
// import Register from "./pages/register/Register";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
//   Outlet,
//   Navigate,
// } from "react-router-dom";
// import Navbar from "./components/navbar/Navbar";
// import LeftBar from "./components/leftBar/LeftBar";
// import RightBar from "./components/rightBar/RightBar";
// import Home from "./pages/home/Home";
// import Profile from "./pages/profile/Profile";
// import { useContext } from "react";
// import { DarkModeContext } from "./context/darkModeContext";
// import { AuthContext } from "./context/authContext";

// function App() {

//   const {currentUser} = useContext(AuthContext);

//   const { darkMode } = useContext(DarkModeContext);




//   const Layout = () => {
//     return (
//       <div className={`theme-${darkMode ? "dark" : "light"}`}>
//         <Navbar />
//         <div style={{ display: "flex" }}>
//           <LeftBar />
//           <div style={{ flex: 6 }}>
//             <Outlet />
//           </div>
//           <RightBar />
//         </div>
//       </div>
//     );
//   };

//   const ProtectedRoute = ({ children }) => {
//     // console.log(children);
//     // // if (!currentUser) {
//     // //   return <Navigate to="/login" />;
//     // // }

//     return children;
//   };

//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: (
//         <ProtectedRoute>
//           <Layout />
//         </ProtectedRoute>
//       ),
//       children: [
//         {
//           path: "/",
//           element: <Home />,
//         },
//         {
//           path: "/profile/:id",
//           element: <Profile />,
//         },
//       ],
//     },
//     {
//       path: "/login",
//       element: <Login />,
//     },
//     {
//       path: "/register",
//       element: <Register />,
//     },
//   ]);

//   return (
//     <div>
//       <RouterProvider router={router} />
//     </div>
//   );
// }

// export default App;

import Login from "./pages/login/Login";
import './index.css'
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Settings from './components/Settings/Settings'
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import SettingsPage from './pages/settings/SettingsPage'
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import SearchBar from "./components/SearchBar/SearchBar";
import Messages from './pages/Messages/Messages';


function App() {
  const { currentUser, setIsLoggedIn, setCurrentUser } = useContext(
    AuthContext
  );
  // const { darkMode } = useContext(DarkModeContext);

  const Layout = () => {
    return (
      <div className="search">
        <div>
          <Navbar />
          <div style={{ display: "flex" }}>
            {window.location.pathname !== '/settings' && <LeftBar />}
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            {window.location.pathname !== '/settings' && <RightBar />}
          </div>
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
        {
          path: "/Messages",
          element: <Messages />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,

    },

    {
      path: "/settings",
      element: <Settings />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ]);

  return (
    <div>

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
