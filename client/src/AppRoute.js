import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./component/Home.jsx";
import horangLoGo from "./Picture/horangLOGO 1.png";
import SecretPostCreate from "./component/SecretPostCreate.jsx";
import SecretPostUpdate from "./component/SecretPostUpdate.jsx";
import Join from "./component/Join.jsx";
import PostCreate from "./component/PostCreate";
import SecretPostDetailPage from "./component/SecretPostDetailPage.jsx";
import PostDetailPage from "./component/PostDetailPage.jsx"
import Login from "./component/Login.jsx";

const AppRoute = () => {
  return (
    <>

      <BrowserRouter>
        <header className="LOGObackgroundColor mb-10">
          <Link to="/">
            <img src={horangLoGo} alt="horangLoGo" />
          </Link>
        </header>

        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/secretPostCreate" element={<SecretPostCreate />} />
          <Route exact path="/secretPostDetailPage/:id" element={<SecretPostDetailPage />} />
          <Route exact path="/secretPostUpdate/:id" element={<SecretPostUpdate />} />

          <Route exact path="/postCreate" element={<PostCreate />} />
          <Route exact path="/postDetailPage/:id" element={<PostDetailPage />} />
          <Route exact path="/join" element={<Join/>}/>
          <Route exact path="/" element={<Login/>}/>
        </Routes>

        <footer className="LOGObackgroundColor w-full absolute bottom-0">
          <span>팀명 : 호랑이 </span>
          <span>팀프로젝트명 : 호랑이 </span>
          <span>팀원명 : 박선호, 윤이령 </span>
        </footer>
      </BrowserRouter>
    </>
  )
};

export default AppRoute;
