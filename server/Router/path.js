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
  const sql2 =
    "UPDATE secretPost SET view = view + 1 WHERE id = " + request.params.id;
  await db.query(sql1, function (err, result) {
    if (err) throw err;
    console.log(result);
    response.send(result);
  });
  await db.query(sql2, function (err, result) {
    if (err) throw err;
  });
});

/* 비밀게시글 생성 */
router.post("/secretPostCreate", (request, response) => {
  const sql =
    "INSERT INTO secretPost (title, content, member_id) VALUES (?,?,?)";
  db.query(
    sql,
    [request.body.title, request.body.content, request.body.member_id],
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
  const sql =
    "SELECT * FROM secretPostComment WHERE secretPost_id = ? ORDER BY commentId DESC";
  db.query(sql, [request.params.id], function (err, result) {
    if (err) throw err;
    response.send(result);
  });
});

/* 비밀 게시글 댓글 생성*/
router.post("/secretPostCommentCreate/:id", (request, response) => {
  const sql =
    "INSERT INTO secretPostComment (commentNick, commentContent, secretPost_id) VALUES (?,?,?)";
  db.query(
    sql,
    [request.body.nick, request.body.newContent, request.params.id],
    function (err, result) {
      if (err) throw err;
      response.send("success");
    }
  );
});

/* 비밀 게시글 댓글 개수*/
router.get("/secretPostCommentCount", (request, response) => {
  const sql =
    "SELECT secretPost_id, COUNT(commentId) count FROM secretPostComment GROUP BY secretPost_id";
  db.query(sql, function (err, result) {
    if (err) throw err;
    response.send(result);
  });
});

/* 비밀 게시글 댓글 삭제 */
router.post("/secretPostCommentDelete/:id", (request, response) => {
  const sql =
    "DELETE FROM secretPostComment WHERE commentId = " + request.params.id;
  db.query(sql, function (err, result) {
    if (err) throw err;
    response.send("success");
  });
});

/* 비밀 게시글 댓글 수정 */
router.patch("/secretPostCommentUpdate/:id", (request, response) => {
  const sql =
    "UPDATE secretPostComment SET commentContent = ? WHERE commentId = " +
    request.params.id;
  db.query(sql, [request.body.content], function (err, result) {
    if (err) throw err;
    response.send("success");
  });
});

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
  const sql2 =
    "UPDATE post SET view = view + 1 WHERE id = " + request.params.id;
  db.query(sql, function (err, result) {
    if (err) throw err;
    response.send(result);
  });
  await db.query(sql2, function (err, result) {
    if (err) throw err;
  });
});

/* 익명 게시글 생성 */
router.post("/postCreate", (request, response) => {
  const sql = "INSERT INTO Post (title, content, member_id) VALUES (?,?,?)";
  db.query(
    sql,
    [request.body.title, request.body.content, request.body.member_id],
    function (err, result) {
      if (err) throw err;
      console.log("비밀게시물 생성 완료");
      response.redirect("/");
    }
  );
});

/* 익명 게시글 수정 */
router.post("/postUpdate/:id", (request, response) => {
  const sql = "UPDATE post SET ? WHERE id = " + request.params.id;
  db.query(sql, request.body, function (err, result) {
    if (err) throw err;
    response.send("success");
    console.log("익명게시물 업데이트 완료");
  });
});

/* 익명 게시글 삭제 */
router.post("/postDelete/:id", (request, response) => {
  const sql = "DELETE FROM post WHERE id = " + request.params.id;
  db.query(sql, function (err, result) {
    if (err) throw err;
    response.send("success");
    console.log("익명게시물 삭제 완료");
  });
});

/* 익명 게시글 댓글 개수*/
router.get("/postCommentCount", (request, response) => {
  const sql =
    "SELECT post_id, COUNT(commentId) count FROM postComment GROUP BY post_id";
  db.query(sql, function (err, result) {
    if (err) throw err;
    response.send(result);
  });
});

/* 익명 게시글 댓글 조회 */
router.get("/postComment/:id", (request, response) => {
  const sql =
    "SELECT * FROM postComment WHERE post_id = ? ORDER BY commentId DESC";
  db.query(sql, [request.params.id], function (err, result) {
    if (err) throw err;
    response.send(result);
  });
});

/* 익명 게시글 댓글 생성 */
router.post("/postCommentCreate/:id", (request, response) => {
  const sql =
    "INSERT INTO postComment (commentNick, commentPassword, commentContent, post_id) VALUES (?,?,?,?)";
  db.query(
    sql,
    [
      request.body.nick,
      request.body.password,
      request.body.newContent,
      request.params.id,
    ],
    function (err, result) {
      if (err) throw err;
      response.send("success");
    }
  );
});

/* 익명 게시글 댓글 삭제 */
router.post("/postCommentDelete/:id", (request, response) => {
  const sql = "DELETE FROM postComment WHERE commentId = " + request.params.id;
  db.query(sql, function (err, result) {
    if (err) throw err;
    response.send("success");
  });
});

/* 익명 게시글 댓글 수정 */
router.patch("/postCommentUpdate/:id", (request, response) => {
  const sql =
    "UPDATE postComment SET commentContent = ? WHERE commentId = " +
    request.params.id;
  db.query(sql, [request.body.content], function (err, result) {
    if (err) throw err;
    response.send("success");
  });
});

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

//익명게시판 대댓글 조회
router.get("/postCommentComment/:id", (request, response) => {
  const sql =
    "SELECT * FROM postCommentComment WHERE post_id = ? ORDER BY commentCommentId DESC";
  db.query(sql, [request.params.id], function (err, result) {
    if (err) throw err;
    response.send(result);
  });
});
//익명게시판 대댓글 생성
router.post("/postCommentCommentCreate", (request, response) => {
  const sql =
    "INSERT INTO postCommentComment (commentCommentNick, commentCommentPassword, postComment_id, post_id, commentCommentContent) VALUES (?,?,?,?,?)";
  db.query(
    sql,
    [
      request.body.nick,
      request.body.password,
      request.body.commentId,
      request.body.id,
      request.body.content,
    ],
    function (err, result) {
      if (err) throw err;
      response.send("success");
    }
  );
});
//익명게시판 대댓글 수정
router.patch("/postCommentCommentUpdate/:id", (request, response) => {
  const sql =
    "UPDATE postCommentComment SET commentCommentContent = ? WHERE commentCommentId = " +
    request.params.id;
  db.query(sql, [request.body.commentContent], function (err, result) {
    if (err) throw err;
    response.send("success");
  });
});

//익명게시판 대댓글 삭제
router.post("/postCommentCommentDelete/:id", (req, res) => {
  const sql =
    "DELETE FROM postCommentComment WHERE commentCommentId = " + req.params.id;
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.send("success");
  });
});

//비밀게시판 대댓글 조회
router.get("/secretPostCommentComment/:id", (request, response) => {
  const sql =
    "SELECT * FROM secretPostCommentComment WHERE secretPost_id = ? ORDER BY commentCommentId DESC";
  db.query(sql, [request.params.id], function (err, result) {
    if (err) throw err;
    response.send(result);
  });
});

//비밀게시판 대댓글 생성
router.post("/secretPostCommentCommentCreate", (request, response) => {
  const sql =
    "INSERT INTO secretPostCommentComment (commentCommentNick, secretPostComment_id, secretPost_id, commentCommentContent) VALUES (?,?,?,?)";
  db.query(
    sql,
    [
      request.body.nick,
      request.body.commentId,
      request.body.id,
      request.body.content,
    ],
    function (err, result) {
      if (err) throw err;
      response.send("success");
    }
  );
});

//비밀게시판 대댓글 수정
router.patch("/secretPostCommentCommentUpdate/:id", (request, response) => {
  const sql =
    "UPDATE secretPostCommentComment SET commentCommentContent = ? WHERE commentCommentId = " +
    request.params.id;
  db.query(sql, [request.body.commentContent], function (err, result) {
    if (err) throw err;
    response.send("success");
  });
});

//비밀게시판 대댓글 삭제
router.post("/secretPostCommentCommentDelete/:id", (req, res) => {
  const sql =
    "DELETE FROM secretPostCommentComment WHERE commentCommentId = " +
    req.params.id;
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.send("success");
  });
});

// 검색
router.post("/search", (req, res) => {
  console.log(req.body.searchTitle);
  const sql = `SELECT * FROM post WHERE title LIKE "%${req.body.searchTitle}%" ORDER BY id DESC`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

router.post("/secretSearch", (req, res) => {
  console.log(req.body.searchTitle);
  const sql = `SELECT * FROM secretPost WHERE title LIKE "%${req.body.searchTitle}%" ORDER BY id DESC`; 
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

/* 댓글 수정 시 비밀번호 확인 */
router.post("/updatePassword", (req, res) => {
  const sql = `select count(*) as 'cnt' from postComment where commentPassword = "${req.body.password}"`;
  db.query(sql, function (err, result){
    if(err) throw err;
    res.send(result);
  })
})

/* 대댓글 수정 시 비밀번호 확인 */
router.post("/commentUpdatePassword", (req, res) => {
  const sql = `select count(*) as 'cnt' from postCommentComment where commentCommentPassword = "${req.body.password}"`;
  db.query(sql, function (err, result){
    if(err) throw err;
    res.send(result);
  })
})


/* ID 중복 체크 */

router.post("/idCheck", (req, res) => {
  console.log(req.body)
  const sql = `SELECT COUNT(memberId) AS 'cnt' FROM member WHERE memberId = "${req.body.id}";`;
  db.query(sql, function (err, result){
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})


module.exports = router;
