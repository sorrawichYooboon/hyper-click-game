import React from "react";
import Router from "src/router";
import GoogleAdSense from "./components/GoogleAdsense";

const App: React.FC = () => {
  return (
    <div>
      <GoogleAdSense />
      <Router />
    </div>
  );
};

export default App;
