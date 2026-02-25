import { RouterProvider } from "react-router";
import { router } from "./routes";
import { SparkleBackground } from "./components/SparkleBackground";
import { PrivacyShield } from "./components/PrivacyShield";

export default function App() {
  return (
    <>
      <SparkleBackground />
      <PrivacyShield />
      <div className="relative" style={{ zIndex: 1 }}>
        <RouterProvider router={router} />
      </div>
    </>
  );
}