import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import App from "./App.jsx";
const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <BrowserRouter> */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>

    {/* <Routes>
        <Route path="/" element={<App />} />
      </Routes> */}
    {/* <App /> */}
    {/* </BrowserRouter> */}
  </StrictMode>
);