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

INSERT INTO secretPost
SET title = "test 1",
content = "test content 1"

SELECT * FROM secretPost;
