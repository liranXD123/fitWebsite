import { useState } from "react";
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

  // New state to control which page to show
  const [showPlan, setShowPlan] = useState(false);

  // Function to pass to Home so it can trigger showing Plan
  const handleStart = () => setShowPlan(true);

  return (
    <>
      <Navbar />
      <Home />
    </>
  );
}

export default App;
