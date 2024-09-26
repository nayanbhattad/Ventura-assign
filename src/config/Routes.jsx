import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import IpoDetail from "../pages/IpoDetail";

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ipo/:id" element={<IpoDetail />} />
      </Routes>
    </Layout>
  );
}

export default AppRoutes;
