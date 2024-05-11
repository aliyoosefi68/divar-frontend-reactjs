import { Navigate, Route, Routes } from "react-router-dom";

//components
import AuthPage from "pages/AuthPage";
import HomePage from "pages/HomePage";
import NewPost from "src/pages/NewPost";
import DashboardPage from "src/pages/DashboardPage";
import AdminPage from "pages/AdminPage";
import NotFound from "pages/404";
import { useQuery } from "@tanstack/react-query";

import { getProfile } from "src/services/user";
import Loader from "../components/module/Loader";
import Options from "src/pages/Options";
import PostDetail from "src/pages/PostDetail";
import CategoryForm from "src/components/templates/CategoryForm";
import AdminDashboard from "src/pages/admin/AdminDashpoard";
import CategoryListAdmin from "src/pages/admin/CategoryListAdmin";

function Router() {
  const { data, isLoading, error } = useQuery(["profile"], getProfile);
  console.log(data);
  if (isLoading) return <Loader />;
  return (
    <Routes>
      <Route index element={<HomePage />} />

      <Route
        path="/dashboard"
        element={data ? <DashboardPage /> : <Navigate to="/auth" />}
      />
      <Route
        path="/new"
        element={data ? <NewPost /> : <Navigate to="/auth" />}
      />
      <Route
        path="/auth"
        element={data ? <Navigate to="/dashboard" /> : <AuthPage />}
      />
      <Route
        path="/admin"
        element={
          data && data.data.role === "ADMIN" ? (
            <AdminPage data={data.data} />
          ) : (
            <Navigate to="/" />
          )
        }
      >
        <Route path="" element={<AdminDashboard />} />
        <Route path="add-option" element={<Options />} />
        <Route path="add-category" element={<CategoryForm />} />
        <Route path="categories-list" element={<CategoryListAdmin />} />
      </Route>

      <Route path="/:id" element={<PostDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
