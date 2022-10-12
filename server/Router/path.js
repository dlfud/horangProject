const { application } = require("express");
const express = require("express");
const db = require("../config/database.js");
const router = express.Router();

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected");
});

router.get("/", (request, response) => {
  const sql = "select * from secretPost";
  db.query(sql, function (err, result) {
    if (err) throw err;
    response.send(result);
  });
});

/* 상세페이지 */

router.get("/secretPostDetailPage/:id", (request, response) => {
  const sql = "SELECT * FROM secretPost a LEFT JOIN `comment` b ON a.id = b.secretPost_id WHERE a.id = " + request.params.id;
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    response.send(result);
  });
});

/* 보내기 */

router.post("/create", (request, response) => {
  const sql = "INSERT INTO secretPost (title, content) VALUES (?,?)";
  db.query(
    sql,
    [request.body.title, request.body.content],
    function (err, result) {
      if (err) throw err;
      console.log("비밀게시물 생성 완료");
      response.redirect("/");
    }
  );
});

/* 업데이트 */

router.post("/update/:id", (request, response) => {
  const sql = "UPDATE secretPost SET ? WHERE id = " + request.params.id;
  db.query(sql, request.body, function (err, result) {
    if (err) throw err;
    response.send("success");
    console.log("비밀게시물 업데이트 완료");
  });
});

/* 삭제 */

router.post("/delete/:id", (request, response) => {
  console.log("비밀게시물 삭제 준비");
  const sql = "DELETE FROM secretPost WHERE id = " + request.params.id;
  db.query(sql, function (err, result) {
    if (err) throw err;
    response.send("success");
    console.log("비밀게시물 삭제 완료");
  });
});


/*댓글 조회*/
router.get("/comment/:id", (request, respomse) => {
  const {id} = request.body;
  db.query(`SELECT * FROM comment WHERE secretPost_id = ?`, [id], function (err, result) {
    if (err) throw err;
    response.send(result);
  })
})

/*댓글 생성*/
router.post("/commentCreate/:id", (request, response) => {
  const { id, content } = request.body;
  db.query(`INSERT INTO comment SET content = ?, secretPost_id = ?`, [content, id], function (err, result) {
    if (err) throw err;
    response.send("success");
  })
})

module.exports = router;
