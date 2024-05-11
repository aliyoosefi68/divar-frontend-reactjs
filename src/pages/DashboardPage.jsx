import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";

import { getProfile } from "src/services/user";

function DashboardPage() {
  const { data, isLoading, error } = useQuery(["profile"], getProfile);
  const navigate = useNavigate();

  if (data.data.role === "ADMIN") navigate("/admin");

  return <div>DashboardPage</div>;
}

export default DashboardPage;
