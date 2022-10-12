import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./component/Home.jsx";
import horangLoGo from "./Picture/horangLOGO 1.png";
import Create from "./component/Create.jsx";
import Update from "./component/Update.jsx";
import SecretPostDetailPage from "./component/SecretPostDetailPage.jsx";

const AppRoute = () => {
 return(
<>
<BrowserRouter>
   <div className="LOGObackgroundColor">

      <Link to="/">
        <img src={horangLoGo} alt="horangLoGo"/>
      </Link>
      </div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/create" element={<Create />} />
        <Route exact path="/secretPostDetailPage/:id" element={<SecretPostDetailPage />} />
        <Route exact path="/update/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  </>
 )};

export default AppRoute;
