import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Main from "./components/Main";
import Challenge from "./components/Challenge";
import Ctx from "./components/context";

const App = () => {
  const [letter, setLetter] = useState();
  return (
    <Ctx.Provider value={{
      letter,
      setLetter
    }}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/challenge" element={<Challenge />} />
      </Routes>
    </Ctx.Provider>
  );
}

export default App;
