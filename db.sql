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
    id INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    commentContent TEXT NOT NULL,
    create_date DATETIME DEFAULT NOW(),
    secretPost_id INT(11) NOT NULL
);

SELECT * FROM secretPost;
SELECT * FROM `comment`;

INSERT INTO secretPost
SET title="님 대가리 깨버릴거임",
content="너무해ㅠㅠ";

INSERT INTO `comment`
SET commentContent="너무해ㅠㅠ", secretPost_id = 117;


SELECT * FROM (SELECT * FROM secretPost AS a, `comment` AS b WHERE a.id = b.secretPost_id) WHERE a.id = 116;