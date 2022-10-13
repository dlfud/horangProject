import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./component/Home.jsx";
import horangLoGo from "./Picture/horangLOGO 1.png";
import Create from "./component/Create.jsx";
import Update from "./component/Update.jsx";
import SecretPostDetailPage from "./component/SecretPostDetailPage.jsx";

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
          <Route exact path="/" element={<Home />} />
          <Route exact path="/create" element={<Create />} />
          <Route exact path="/secretPostDetailPage/:id" element={<SecretPostDetailPage />} />
          <Route exact path="/update/:id" element={<Update />} />
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
