DROP DATABASE IF EXISTS horang;
CREATE DATABASE horang;
USE horang;

CREATE TABLE post(
    id INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    content TEXT NOT NULL,
    create_date DATETIME DEFAULT NOW(),
    `view` INT(10) DEFAULT 0
);

DROP TABLE secretPost;
CREATE TABLE secretPost(
    id INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    content TEXT NOT NULL,
    create_date DATETIME DEFAULT NOW(),
    `view` INT(10) DEFAULT 0
);

DROP TABLE  `comment`;
CREATE TABLE `comment`(
    commentId INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    commentContent TEXT NOT NULL,
    commentCreateDate DATETIME DEFAULT NOW(),
    secretPost_id INT(11) UNSIGNED NOT NULL,
    FOREIGN KEY(secretPost_id) REFERENCES secretPost(id) ON DELETE CASCADE
);

SELECT * FROM post;
SELECT * FROM secretPost;
SELECT * FROM `comment`;

INSERT INTO Post
SET title="익명 게시판",
content="내용1";

INSERT INTO secretPost
SET title="님 대가리 깨버릴거임",
content="너무해ㅠㅠ";

INSERT INTO `comment`
SET commentContent="너무해ㅠㅠ", secretPost_id = 1;


SELECT * FROM secretPost a LEFT JOIN `comment`b ON a.id = b.secretPost_id WHERE a.id = 160;

SELECT secretPost_id, COUNT(commentId) `count` FROM `comment` GROUP BY secretPost_id;