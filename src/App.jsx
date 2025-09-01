import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home";
import Plan from "./pages/Plan.jsx";

function App() {
  const [userData, setUserData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    goal: "",
    experience: "",
  });

  // control which top-level page to show
  const [showPlan, setShowPlan] = useState(false);

  const handleStart = () => setShowPlan(true);

  // helper passed down to children to update the shared userData
  const handleUpdateUserData = (patch) => {
    setUserData((prev) => ({ ...prev, ...patch }));
  };

  // (optional) debugging: uncomment to see updates in console
  // console.log("userData:", userData);

  return (
    <>
      <Navbar />
      {!showPlan ? (
        <Home onStart={handleStart} />
      ) : (
        // pass the setter (or handler) to Plan so deeper pages can update userData
        <Plan userData={userData} setUserData={handleUpdateUserData} />
      )}
      {console.log(userData)}
    </>
  );
}

export default App;
