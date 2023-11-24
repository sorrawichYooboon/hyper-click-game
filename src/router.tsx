import { Routes, Route, Navigate } from "react-router-dom";
import HyperClickGame from "src/pages/HyperClickGame";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<HyperClickGame />} />
      </Routes>
    </>
  );
}
