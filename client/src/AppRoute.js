import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./component/Home.jsx";
import horangLoGo from "./Picture/horangLOGO 1.png";
import SecretPostCreate from "./component/SecretPostCreate.jsx";
import SecretPostUpdate from "./component/SecretPostUpdate.jsx";
import Join from "./component/Join.jsx";
import PostCreate from "./component/PostCreate";
import SecretPostDetailPage from "./component/SecretPostDetailPage.jsx";
import PostDetailPage from "./component/PostDetailPage.jsx";
import PostUpdate from "./component/PostUpdate.jsx";
import Login from "./component/Login.jsx";
import SecretHome from "./component/SecretHome.jsx";
import { useState } from "react";

const AppRoute = () => {
  const [onoff, setOnoff] = useState(false);

  const loginout = () => {
    console.log(window.sessionStorage.getItem("id"));
    if (window.sessionStorage.getItem("id") === null) {
      setOnoff(false);
    } else {
      setOnoff(true);
    }
  };
  return (
    <>
      <BrowserRouter>
        <header className="LOGObackgroundColor">
          {onoff ? (
            <Link to="/secrethome">
              <img src={horangLoGo} alt="horangLoGo" onClick={loginout} />
            </Link>
          ) : (
            <Link to="/home">
              <img src={horangLoGo} alt="horangLoGo" onClick={loginout} />
            </Link>
          )}
        </header>

        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route
            exact
            path="/secretPostCreate"
            element={<SecretPostCreate />}
          />
          <Route
            exact
            path="/secretPostDetailPage/:id"
            element={<SecretPostDetailPage />}
          />
          <Route
            exact
            path="/secretPostUpdate/:id"
            element={<SecretPostUpdate />}
          />

          <Route exact path="/postCreate" element={<PostCreate />} />
          <Route
            exact
            path="/postDetailPage/:id"
            element={<PostDetailPage />}
          />
          <Route exact path="/postUpdate/:id" element={<PostUpdate />} />
          <Route exact path="/join" element={<Join />} />
          <Route exact path="/" element={<Login />} />
          <Route exact path="/secrethome" element={<SecretHome />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoute;
