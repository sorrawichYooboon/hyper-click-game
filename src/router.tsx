// import { Suspense, lazy } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import ReactGA from "react-ga";
// import LoadingPage from "src/pages/LoadingPage";
import HyperClickGame from "src/pages/HyperClickGame";
import { useEffect } from "react";

// const lazyLoad = (Component: any) => (props: any) =>
//   (
//     <Suspense fallback={<LoadingPage />}>
//       <Component {...props} />
//     </Suspense>
//   );

// const GamesPage = lazyLoad(lazy(() => import("src/pages")));
// const HyperClickGame = lazyLoad(lazy(() => import("src/pages/HyperClickGame")));

export default function Router() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });

  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        {/* <Route path="/loading" element={<LoadingPage />} /> */}
        {/* <Route path="/" element={<GamesPage />} /> */}
        <Route path="/" element={<HyperClickGame />} />
      </Routes>
    </>
  );
}
