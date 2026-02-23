import { RouterProvider } from "react-router";
import { router } from "./routes";
import { SparkleBackground } from "./components/SparkleBackground";

export default function App() {
  return (
    <>
      <SparkleBackground />
      <div className="relative" style={{ zIndex: 1 }}>
        <RouterProvider router={router} />
      </div>
    </>
  );
}