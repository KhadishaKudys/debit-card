import "./App.css";
import Main from "./pages/Main";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    setValues();
  }, []);

  const setValues = () => {
    sessionStorage.setItem("number", "");
    sessionStorage.setItem("name", "");
    sessionStorage.setItem("month", "");
    sessionStorage.setItem("year", "");
    sessionStorage.setItem("cvv", "");
  };

  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
