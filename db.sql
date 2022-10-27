DROP DATABASE IF EXISTS horang;
CREATE DATABASE horang;
USE horang;

#회원
CREATE TABLE `member`(
    memberId VARCHAR(10) NOT NULL PRIMARY KEY,
    `password` TEXT NOT NULL,
    email TEXT NOT NULL
);


#익명게시판
DROP TABLE post;
CREATE TABLE post(
    id INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    content TEXT NOT NULL,
    create_date DATETIME DEFAULT NOW(),
    `view` INT(10) DEFAULT 0,
    member_id  VARCHAR(10),
    FOREIGN KEY(member_id) REFERENCES `member`(memberId) ON DELETE CASCADE
);


#비밀게시판
DROP TABLE secretPost;
CREATE TABLE secretPost(
    id INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    content TEXT NOT NULL,
    create_date DATETIME DEFAULT NOW(),
    `view` INT(10) DEFAULT 0,
    member_id  VARCHAR(10) NOT NULL,
    FOREIGN KEY(member_id) REFERENCES `member`(memberId) ON DELETE CASCADE
);




#익명게시판 댓글
DROP TABLE postComment;
CREATE TABLE postComment(
    commentId INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    commentContent TEXT NOT NULL,
    commentCreateDate DATETIME DEFAULT NOW(),
    commentNick TEXT NOT NULL,
    commentPassword TEXT NOT NULL,
    post_id INT(11) UNSIGNED NOT NULL,
    FOREIGN KEY(post_id) REFERENCES post(id) ON DELETE CASCADE
);

#익명게시판 대댓글
DROP TABLE postCommentComment;
CREATE TABLE postCommentComment(
    commentCommentId INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    commentCommentContent TEXT NOT NULL,
    commentCommentCreateDate DATETIME DEFAULT NOW(),
    commentCommentNick TEXT NOT NULL,
    commentCommentPassword TEXT NOT NULL,
    postComment_id INT(11) UNSIGNED NOT NULL,
    FOREIGN KEY(postComment_id) REFERENCES PostComment(commentId) ON DELETE CASCADE,
    post_id INT(11) UNSIGNED NOT NULL,
    FOREIGN KEY(post_id) REFERENCES post(id) ON DELETE CASCADE
);

#비밀 게시판 댓글
DROP TABLE  secretPostComment;
CREATE TABLE secretPostComment(
    commentId INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    commentContent TEXT NOT NULL,
    commentCreateDate DATETIME DEFAULT NOW(),
    commentNick TEXT NOT NULL,
    secretPost_id INT(11) UNSIGNED NOT NULL,
    FOREIGN KEY(secretPost_id) REFERENCES secretPost(id) ON DELETE CASCADE
);

#비밀게시판 대댓글
DROP TABLE secretPostCommentComment;
CREATE TABLE secretPostCommentComment(
    commentCommentId INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    commentCommentContent TEXT NOT NULL,
    commentCommentCreateDate DATETIME DEFAULT NOW(),
    commentCommentNick TEXT NOT NULL,
    secretPostComment_id INT(11) UNSIGNED NOT NULL,
    FOREIGN KEY(secretPostComment_id) REFERENCES secretPostComment(commentId) ON DELETE CASCADE,
    secretPost_id INT(11) UNSIGNED NOT NULL,
    FOREIGN KEY(secretPost_id) REFERENCES secretPost(id) ON DELETE CASCADE
);

SELECT * FROM `member`;

INSERT INTO post
SET title="익명 게시판",
content="내용1";

INSERT INTO secretPost
SET title="님 대가리 깨버릴거임",
content="너무해ㅠㅠ", member_id = 1;
