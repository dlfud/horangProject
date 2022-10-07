import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./component/HomeR.jsx";
import horangLoGo from "./Picture/horangLOGO 1.png";

function App() {
  <BrowserRouter>
    <Link to="/">
      <img src={horangLoGo} alt="horangLoGo" className="inline h-6 w-8 " />
    </Link>

    <Routes>
      <Route exact path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>;
}

export default App;
