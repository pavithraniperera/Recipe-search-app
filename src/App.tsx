import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {AuthLayout} from "./features/Authlayout.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/SignUp.tsx";
import {MainLayout} from "./features/MainLayout.tsx";
import HomePage from "./pages/HomePage.tsx";
import store from "./store/store.ts";
import RecipeDetailsPage from "./pages/RecipeDetailPage.tsx";
import ProfilePage from "./pages/Profile.tsx";



function App() {
    const routes = createBrowserRouter(
        [
            {
                path: "/",
                element: <AuthLayout />,
                children: [
                    { path: "", element: <Login /> }, // Default to LoginPage
                    { path: "signup", element: <Signup /> },
                ],
            },
            {
                path: "/", // Important: Same base path as AuthLayout, but different layout
                element: <MainLayout />,
                children: [
                    { path: "home", element: <HomePage /> },
                    { path:"recipes/:id" ,element:<RecipeDetailsPage/> },
                    { path:"profile" ,element:<ProfilePage/> },


                ],
            }
        ]
    );


    return (
        <>
               <Provider store={store}>
                   <RouterProvider router={routes} />
               </Provider>




        </>
    )
}

export default App