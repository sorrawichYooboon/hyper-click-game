import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoadingPage from "src/pages/LoadingPage";

const lazyLoad = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<LoadingPage />}>
      <Component {...props} />
    </Suspense>
  );

const GamesPage = lazyLoad(lazy(() => import("src/pages")));
const HyperClickGame = lazyLoad(lazy(() => import("src/pages/HyperClickGame")));
const HyperTypingGame = lazyLoad(
  lazy(() => import("src/pages/HyperTypingGame"))
);

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/hyper-click" />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/" element={<GamesPage />} />
        <Route path="/hyper-click" element={<HyperClickGame />} />
        <Route path="/hyper-typing" element={<HyperTypingGame />} />
      </Routes>
    </>
  );
}
