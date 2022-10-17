const express = require("express");
const db = require("../config/database.js");
const router = express.Router();

/* 연결확인 */
db.connect(function (err) {
  if (err) throw err;
  console.log("Connected");
});

/* 비밀 게시글 조회 */
router.get("/secretPost", (request, response) => {
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
router.post("/secretPostCreate", (request, response) => {
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
router.post("/secretPostUpdate/:id", (request, response) => {
  const sql = "UPDATE secretPost SET ? WHERE id = " + request.params.id;
  db.query(sql, request.body, function (err, result) {
    if (err) throw err;
    response.send("success");
    console.log("비밀게시물 업데이트 완료");
  });
});

/* 비밀 게시글 삭제 */
router.post("/secretPostDelete/:id", (request, response) => {
  console.log("비밀게시물 삭제 준비");
  const sql = "DELETE FROM secretPost WHERE id = " + request.params.id;
  db.query(sql, function (err, result) {
    if (err) throw err;
    response.send("success");
    console.log("비밀게시물 삭제 완료");
  });
});


/* 비밀 게시글 댓글 조회*/
router.get("/secretPostComment/:id", (request, response) => {
  const sql = "SELECT * FROM secretPostComment WHERE secretPost_id = ? ORDER BY secretPostCommentId DESC";
  db.query(sql, [request.params.id], function (err, result) {
    if (err) throw err;
    response.send(result);
  })
})

/* 비밀 게시글 댓글 생성*/
router.post("/secretPostCommentCreate/:id", (request, response) => {
  const sql = "INSERT INTO secretPostComment (secretPostCommentContent, secretPost_id) VALUES (?,?)";
  db.query(sql, [request.body.content, request.params.id], function (err, result) {
    if (err) throw err;
    response.send("success");
  })
})

/* 비밀 게시글 댓글 개수*/
router.get("/secretPostCommentCount", (request, response) => {
  const sql = "SELECT secretPost_id, COUNT(secretPostCommentId) count FROM secretPostComment GROUP BY secretPost_id";
  db.query(sql, function(err, result) {
    if(err) throw err;
    response.send(result);
  })
})

/* 비밀 게시글 댓글 삭제 */
router.post("/secretPostCommentDelete/:id", (request, response) => {
  const sql = "DELETE FROM secretPostComment WHERE secretPostCommentId = " + request.params.id;
  db.query(sql, function(err, result){
    if(err) throw err;
    response.send("success");
  })
})

/* 비밀 게시글 댓글 수정 */



/* 익명 게시글 조회 */
router.get("/post", (request, response) => {
  const sql = "select * from post ORDER BY id DESC";
  db.query(sql, function (err, result) {
    if (err) throw err;
    response.send(result);
  });
});

/* 익명 게시글 상세 페이지 */
router.get("/postDetailPage/:id", async (request, response) => {
  const sql = "SELECT * FROM post WHERE id = " + request.params.id;
  const sql2 = "UPDATE post SET view = view + 1 WHERE id = " + request.params.id;
  db.query(sql, function(err, result){
    if(err) throw err;
    response.send(result);
  })
  await db.query(sql2, function(err, result){
    if(err)throw err;
  })
})

/* 익명 게시글 생성 */
router.post("/postCreate", (request, response) => {
  const sql = "INSERT INTO Post (title, content) VALUES (?,?)";
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


/* 익명 게시글 수정 */

/* 익명 게시글 삭제 */

/* 익명 게시글 댓글 개수*/

/* 익명 게시글 댓글 조회 */
router.get("/postComment/:id", (request, response) => {
  const sql = "SELECT * FROM postComment WHERE post_id = ? ORDER BY postCommentId DESC";
  db.query(sql, [request.params.id], function(err, result){
    if(err) throw err;
    response.send(result);
  })
})

/* 익명 게시글 댓글 생성 */

/* 익명 게시글 댓글 삭제 */

/* 익명 게시글 댓글 수정 */



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

/* 로그인 */
router.post("/login", (req, res) => {
  console.log(req.body);
  let memberId = req.body.id;
  let password = req.body.pw;

  const sqlQuery = `select count(*) as 'cnt' from member where memberId = "${memberId}" and password = "${password}";`;
  // select count(*) as cnt : 특정테이블에서 특정 조건에 맞는 컬럼의 갯수 등을 출력하려할 때 사용
  db.query(sqlQuery, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;
