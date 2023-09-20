import { Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Challenge from "./components/Challenge";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/challenge" element={<Challenge />} />
    </Routes>
  );
}

export default App;
