DROP DATABASE IF EXISTS horang;
CREATE DATABASE horang;
USE horang;

#익명게시판
CREATE TABLE post(
    id INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    content TEXT NOT NULL,
    create_date DATETIME DEFAULT NOW(),
    `view` INT(10) DEFAULT 0
);


#비밀게시판
DROP TABLE secretPost;
CREATE TABLE secretPost(
    id INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    content TEXT NOT NULL,
    create_date DATETIME DEFAULT NOW(),
    `view` INT(10) DEFAULT 0
);

#회원
CREATE TABLE `member`(
    id INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    memberId TEXT NOT NULL,
    `password` TEXT NOT NULL,
    email TEXT NOT NULL
);

#익명게시판 댓글
DROP TABLE postComment;
CREATE TABLE postComment(
    commentId INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    commentContent TEXT NOT NULL,
    commentCreateDate DATETIME DEFAULT NOW(),
    post_id INT(11) UNSIGNED NOT NULL,
    FOREIGN KEY(post_id) REFERENCES Post(id) ON DELETE CASCADE
);

#익명게시판 대댓글
DROP TABLE postCommentComment;
CREATE TABLE postCommentComment(
    commentCommentId INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    commentCommentContent TEXT NOT NULL,
    commentCommentCreateDate DATETIME DEFAULT NOW(),
    postComment_id INT(11) UNSIGNED NOT NULL,
    FOREIGN KEY(postComment_id) REFERENCES PostComment(commentId) ON DELETE CASCADE,
    post_id INT(11) UNSIGNED NOT NULL,
    FOREIGN KEY(post_id) REFERENCES Post(id) ON DELETE CASCADE
);

#비밀 게시판 댓글
DROP TABLE  secretPostComment;
CREATE TABLE secretPostComment(
    commentId INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    commentContent TEXT NOT NULL,
    commentCreateDate DATETIME DEFAULT NOW(),
    secretPost_id INT(11) UNSIGNED NOT NULL,
    FOREIGN KEY(secretPost_id) REFERENCES secretPost(id) ON DELETE CASCADE
);

#비밀게시판 대댓글
DROP TABLE secretPostCommentComment;
CREATE TABLE secretPostCommentComment(
    commentCommentId INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    commentCommentContent TEXT NOT NULL,
    commentCommentCreateDate DATETIME DEFAULT NOW(),
    secretPostComment_id INT(11) UNSIGNED NOT NULL,
    FOREIGN KEY(secretPostComment_id) REFERENCES secretPostComment(commentId) ON DELETE CASCADE,
    secretPost_id INT(11) UNSIGNED NOT NULL,
    FOREIGN KEY(secretPost_id) REFERENCES secretPost(id) ON DELETE CASCADE
);

SELECT * FROM post;
SELECT * FROM secretPost;
SELECT * FROM secretPostComment;
SELECT * FROM postComment;
SELECT * FROM secretPostCommentComment;
SELECT * FROM postCommentComment;

INSERT INTO Post
SET title="익명 게시판",
content="내용1";

INSERT INTO secretPost
SET title="님 대가리 깨버릴거임",
content="너무해ㅠㅠ";

INSERT INTO postCommentComment
SET postCommentCommentContent="너무해ㅠㅠ", post_id = 19, postComment_id=1;


SELECT * FROM secretPost a LEFT JOIN `comment`b ON a.id = b.secretPost_id WHERE a.id = 160;

SELECT secretPost_id, COUNT(commentId) `count` FROM `comment` GROUP BY secretPost_id;