import axios from "axios";
import { useState } from "react";
import {url} from "../../configIp";

const CommentCreate = ({ sort, activity, setActivity, id, onoff }) => {
  const [newContent, setNewContent] = useState("");
  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const data = await axios({
          url: `${url}/${sort}CommentCreate/${id}`,
          method: "POST",
          data: {
            nick,
            password,
            newContent,
          },
        });

        if (data.data !== null) {
          setActivity(activity + 1);
          setNick("");
          setPassword("");
          setNewContent("");
          console.log("성공");
        } else {
          console.log("오류");
        }
      }}
    >
      <div>
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
              type="text"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>
        )}
        <label>
          <strong>댓글</strong>
        </label>
        <input
          type="text"
          placeholder="내용"
          value={newContent}
          onChange={(e) => {
            setNewContent(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <button type="submit">확인</button>
      </div>
    </form>
  );
};

export default CommentCreate;
