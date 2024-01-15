import React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthLayout from "./Layouts/AuthLayout";
import "./App.css";
const queryClient = new QueryClient();

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthLayout />
        </QueryClientProvider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
