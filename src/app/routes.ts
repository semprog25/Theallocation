import { createHashRouter } from "react-router";
import { LandingPage } from "./components/LandingPage";
import { ApplicationPage } from "./components/ApplicationPage";
import { LoginPage } from "./components/LoginPage";
import { MemberDashboard } from "./components/MemberDashboard";
import { AuctionDetail } from "./components/AuctionDetail";
import { AdminDashboard } from "./components/AdminDashboard";

export const router = createHashRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/apply",
    Component: ApplicationPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/dashboard",
    Component: MemberDashboard,
  },
  {
    path: "/auction/:id",
    Component: AuctionDetail,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
]);