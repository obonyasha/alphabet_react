import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Main from "./components/Main";
import Challenge from "./components/Challenge";
import Ctx from "./components/context";
import letterImages from "../src/assets/letterImages.json";
import testWords from "../src/assets/testWords.json";
import alphabet from "../src/assets/alphabet.json"

const App = () => {
  let alphaStore = JSON.parse(localStorage.getItem("alphabet"));
  let letterImagesStore = JSON.parse(localStorage.getItem("letterImages"));
  let testWordsStore = JSON.parse(localStorage.getItem("testWords"));

  useEffect(() => {
    localStorage.setItem("alphabet", JSON.stringify(alphabet));
    localStorage.setItem("letterImages", JSON.stringify(letterImages));
    localStorage.setItem("testWords", JSON.stringify(testWords))
  }, [alphaStore])


  return (
    <Ctx.Provider value={{
      alphaStore,
      letterImagesStore,
      testWordsStore
    }}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/challenge" element={<Challenge />} />
      </Routes>
    </Ctx.Provider>
  );
}

export default App;
