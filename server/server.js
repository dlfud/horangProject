const express = require("express");
const app = express();
const path = require("./Router/path");
const cors = require("cors");
const bodyParser = require("body-parser");

// app.all("/*", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   next();
// });

const corsOptions = {
  origin: `http://localhost:3000`,
  credential: true, // 쿠키 세션에 접근
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
// 이게 있어야지 Create.jsx에서 path로 값을 보낼 수가 있음
// 없으면 request.body undefined 오류뜸
// 순서 유의! path 뒤에 가면 안먹어서 오류뜸

app.use("/", path);

const port = 5000; //React가 3000번 포트를 사용하기 때문에 node 서버가 사용할 포트넘버는 다른 넘버로 지정해준다.

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
