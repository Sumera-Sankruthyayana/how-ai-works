import AppLayout from "./features/ui/AppLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Tokenization from "./pages/Tokenization";
import Embedding from "./pages/Embedding";
import QueryKeyvalue from "./pages/QueryKeyValue";
import DotProduct from "./pages/DotProduct";
import Softmax from "./pages/SoftMax";
import WeightedSum from "./pages/WeightedSum";
import ContextualOutput from "./pages/ContextualOutput";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Introduction from "./pages/Introduction";
import Error from "./features/ui/Error";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Introduction />,
      },
      {
        path: "/introduction",
        element: <Introduction />,
      },
      {
        path: "/tokenization",
        element: <Tokenization />,
      },
      {
        path: "/embedding",
        element: <Embedding />,
      },
      {
        path: "/querykeyvalue",
        element: <QueryKeyvalue />,
      },
      {
        path: "/dotproduct",
        element: <DotProduct />,
      },
      {
        path: "/softmax",
        element: <Softmax />,
      },
      {
        path: "/weightedsum",
        element: <WeightedSum />,
      },
      {
        path: "/contextualoutput",
        element: <ContextualOutput />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
