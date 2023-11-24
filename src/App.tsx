import React from "react";
import Router from "src/router";
import ReactGA from "react-ga";

const App: React.FC = () => {
  ReactGA.initialize("G-TJJBQRRRY1");

  return (
    <div>
      <Router />
    </div>
  );
};

export default App;
