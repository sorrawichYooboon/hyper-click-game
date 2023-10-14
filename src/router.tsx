import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoadingPage from "src/pages/LoadingPage";

const lazyLoad = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<LoadingPage />}>
      <Component {...props} />
    </Suspense>
  );

const GamesPage = lazyLoad(lazy(() => import("src/pages/GamesPage")));
const HyperClickGame = lazyLoad(
  lazy(() => import("src/pages/GamesPage/HyperClickGame"))
);
const HyperTypingGame = lazyLoad(
  lazy(() => import("src/pages/GamesPage/HyperTypingGame"))
);

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/games" />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/games/hyper-click" element={<HyperClickGame />} />
        <Route path="/games/hyper-typing" element={<HyperTypingGame />} />
      </Routes>
    </>
  );
}
