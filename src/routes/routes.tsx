import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Cart from "../pages/Cart";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true ,path: "", element: <Home />, },
            { path: "cart", element: <Cart /> },
        ],
    },
]);
