DROP DATABASE IF EXISTS horang;
CREATE DATABASE horang;
USE horang;

CREATE TABLE secretPost(
    id INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    content TEXT NOT NULL,
    create_date DATETIME DEFAULT NOW(),
    `view` INT(10) DEFAULT 1
);

DROP TABLE  `comment`;
CREATE TABLE `comment`(
    commentId INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    commentContent TEXT NOT NULL,
    commentCreateDate DATETIME DEFAULT NOW(),
    secretPost_id INT(11) UNSIGNED NOT NULL,
    FOREIGN KEY(secretPost_id) REFERENCES secretPost(id) ON DELETE CASCADE
);

SELECT * FROM secretPost;
SELECT * FROM `comment`;

INSERT INTO secretPost
SET title="님 대가리 깨버릴거임",
content="너무해ㅠㅠ";

INSERT INTO `comment`
SET commentContent="너무해ㅠㅠ", secretPost_id = 117;


SELECT * FROM secretPost a LEFT JOIN `comment`b ON a.id = b.secretPost_id WHERE a.id = 114;
