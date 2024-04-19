import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import DataGrid from "./dataGrid/dataGrid.tsx";
import "./index.css";
import { queryClient } from "./queryClient.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <Layout>
        <App />
      </Layout> */}
      <DataGrid/>
    </QueryClientProvider>
  </React.StrictMode>
);
