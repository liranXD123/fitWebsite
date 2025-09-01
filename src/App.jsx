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

  const [showPlan, setShowPlan] = useState(false);

  return (
    <>
      <Navbar />
      {!showPlan ? (
        <Home onStart={() => setShowPlan(true)} />
      ) : (
        <Plan userData={userData} setUserData={setUserData} />
      )}
      {console.log(userData)}
    </>
  );
}

export default App;
