const express = require("express");
const db = require("../config/database.js");
const router = express.Router();

/* 연결확인 */
db.connect(function (err) {
  if (err) throw err;
  console.log("Connected");
});

/* 비밀 게시글 조회 */
router.get("/", (request, response) => {
  const sql = "select * from secretPost ORDER BY id DESC";
  db.query(sql, function (err, result) {
    if (err) throw err;
    response.send(result);
  });
});

/* 비밀 게시글 상세페이지 */
router.get("/secretPostDetailPage/:id", async (request, response) => {
  const sql1 = "SELECT * FROM secretPost WHERE id = " + request.params.id;
  const sql2 = "UPDATE secretPost SET view = view + 1 WHERE id = " + request.params.id;
  await db.query(sql1, function (err, result) {
    if (err) throw err;
    console.log(result);
    response.send(result);
  });
  await db.query(sql2, function(err, result){
    if(err)throw err;
  })
});

/* 비밀게시글 생성 */
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

/* 비밀 게시글 업데이트 */
router.post("/update/:id", (request, response) => {
  const sql = "UPDATE secretPost SET ? WHERE id = " + request.params.id;
  db.query(sql, request.body, function (err, result) {
    if (err) throw err;
    response.send("success");
    console.log("비밀게시물 업데이트 완료");
  });
});

/* 비밀 게시글 삭제 */
router.post("/delete/:id", (request, response) => {
  console.log("비밀게시물 삭제 준비");
  const sql = "DELETE FROM secretPost WHERE id = " + request.params.id;
  db.query(sql, function (err, result) {
    if (err) throw err;
    response.send("success");
    console.log("비밀게시물 삭제 완료");
  });
});


/* 비밀 게시글 댓글 조회*/
router.get("/comment/:id", (request, response) => {
  const sql = "SELECT * FROM comment WHERE secretPost_id = ? ORDER BY commentId DESC";
  db.query(sql, [request.params.id], function (err, result) {
    if (err) throw err;
    response.send(result);
  })
})

/* 비밀 게시글 댓글 생성*/
router.post("/commentCreate/:id", (request, response) => {
  const sql = "INSERT INTO comment (commentContent, secretPost_id) VALUES (?,?)";
  db.query(sql, [request.body.content, request.params.id], function (err, result) {
    if (err) throw err;
    response.send("success");
  })
})



/* 회원등록 */
router.post("/join", (req, res) => {
  console.log(req.body);
  let memberId = req.body.id;
  let password = req.body.pw;
  let email = req.body.email;

  const sqlQuery = `insert into member set memberId = "${memberId}" , password = "${password}" , email ="${email}";`;
  db.query(sqlQuery, (err, result) => {
    if (err) throw err;
    res.send("success");
  });
});


/* 비밀 게시글 댓글 개수*/
router.get("/commentCount", (request, response) => {
  const sql = "SELECT secretPost_id, COUNT(commentId) count FROM comment GROUP BY secretPost_id";
  db.query(sql, function(err, result) {
    if(err) throw err;
    response.send(result);
  })
})


module.exports = router;
