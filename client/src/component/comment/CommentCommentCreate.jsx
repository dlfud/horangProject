import axios from "axios";
import { useState } from "react";
import {url} from "../../configIp";

const CommentCommentCreate = ({
  sort,
  activity,
  setActivity,
  id,
  onoff,
  setCheck,
  comment,
}) => {
  const [content, setContent] = useState("");
  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const data = await axios({
            url: `${url}/${sort}CommentCommentCreate`,
            method: "POST",
            data: {
              nick,
              password,
              commentId: comment.commentId,
              id,
              content,
            },
          });

          if (data.data !== null) {
            setActivity(activity + 1);
            setCheck("false");
            setContent("");
            console.log("성공");
          } else {
            console.log("오류");
          }
        }}
      >
        <div className="inline-block mt-12">
          {onoff ? null : (
            <div>
              <label>
                <strong>닉네임</strong>
              </label>
              <input
                type="text"
                placeholder="닉네임"
                value={nick}
                onChange={(e) => {
                  setNick(e.target.value);
                }}
              ></input>
              <label>
                <strong>비밀번호</strong>
              </label>
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>
            </div>
          )}
          <label>
            <strong>대댓글</strong>
          </label>
          <input
            type="text"
            placeholder="내용"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></input>
        </div>
        <div className="inline-block border-2">
          <button type="submit">확인</button>
        </div>
      </form>
    </>
  );
};

export default CommentCommentCreate;
