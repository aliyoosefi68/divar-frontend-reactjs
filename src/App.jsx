import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import defaultOptions from "configs/reactQueryConfig";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "./components/layouts/Layout";
import PostContextProvider from "./context/PostContext";

function App() {
  const queryClient = new QueryClient({ defaultOptions });

  return (
    <QueryClientProvider client={queryClient}>
      <PostContextProvider>
        <BrowserRouter>
          <Layout>
            <Router />
          </Layout>
        </BrowserRouter>
        <ReactQueryDevtools />
      </PostContextProvider>
    </QueryClientProvider>
  );
}

export default App;
