import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/auth/Login";
import Home from "../pages/home/Home";
import Layout from "../layout/Layout";
import APIDataFetchers from "../pages/dataFetchers/apiDataFetchers/APIDataFetchers";
import ScrapperForm from '../components/ScraperForm/ScrapperForm'
import Subscription from "../pages/subscription/Subscription";
import { AutomateFlow } from "../pages/automateFlow/AutomateFlow";
import Services from "../pages/services/Services";
import Airflow from "../pages/airflow/Airlflow";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/select-subscription",
    element: (
      <Layout>
        <Subscription />
      </Layout>
    ),
  },
  {
    path: "/automate-flow",
    element: (
      <Layout>
        <AutomateFlow />
      </Layout>
    ),
  },
  {
    path: "/automate-flow",
    element: (
      <Layout>
        <AutomateFlow />
      </Layout>
    ),
  },
  {
    path: "/airflow",
    element: (
      <Layout>
        <Services />
      </Layout>
    ),
  },
  {
    path: "/airflow1",
    element: (
      <Layout>
        <Airflow />
      </Layout>
    ),
  },
  {
    path: "/scrapers/:scrapers",
    element: (
      <Layout>
        <ScrapperForm />
      </Layout>
    ),
  },
  {
    path: "/:dataFetcher",
    element: (
      <Layout>
        <APIDataFetchers />
      </Layout>
    ),
  },
 
]);

export default router;
