import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Homepage } from "./components/Homepage";
import { SearchPage } from "./components/SearchPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/homepage" element={<Homepage />}></Route>
          <Route path="/search/:i" element={<SearchPage></SearchPage>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
