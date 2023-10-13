import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingPage from "src/pages/LoadingPage";

const lazyLoad = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<LoadingPage />}>
      <Component {...props} />
    </Suspense>
  );

const Homepage = lazyLoad(lazy(() => import("src/pages/HomePage")));

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/loading" element={<LoadingPage />} />
      </Routes>
    </>
  );
}
