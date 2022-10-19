import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import CommentComment from "./CommentComment";

const Comment = ({ sort, activity, setActivity, id }) => {
  const [check, setCheck] = useState("false");
  const [content, setContent] = useState("");
  const [newContent, setNewContent] = useState("");
  const [comment, setComment] = useState([]);

  //   let sort = "";
  //   if (method === "0") {
  //     sort = "post";
  //   } else {
  //     sort = "secretPost";
  //   }

  useEffect(() => {
    const getData2 = async () => {
      const comment = await axios({
        url: `http://localhost:5000/${sort}Comment/${id}`,
        method: "GET",
      });
      setComment(comment.data);
    };

    getData2();
  }, [activity, id]);

  return (
    <>
      {comment.map((comment, index) => (
        <div key={index}>
          <hr />
          댓글 :{" "}
          {check === "true" + comment.commentId ? (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const data = await axios({
                  url: `http://localhost:5000/${sort}CommentUpdate/${comment.commentId}`,
                  method: "PATCH",
                  data: { content },
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
              <input
                type="text"
                placeholder={comment.commentContent}
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              ></input>
              <div>
                <button type="submit">확인</button>
              </div>
            </form>
          ) : (
            <div>{comment.commentContent}</div>
          )}
          {check === "true" + comment.commentId ? null : (
            <span
              className="cursor-pointer"
              onClick={(e) => {
                setCheck("true" + comment.commentId);
              }}
            >
              수정
            </span>
          )}
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await axios({
                url: `http://localhost:3000/${sort}CommentDelete/${comment.commentId}`,
                method: "POST",
              });
              setActivity(activity + 1);
            }}
          >
            <button>삭제</button>
          </form>
          <CommentComment
            sort={sort}
            id={id}
            comment={comment}
            activity={activity}
            setActivity={setActivity}
          />
        </div>
      ))}

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const data = await axios({
            url: `http://localhost:3000/${sort}CommentCreate/${id}`,
            method: "POST",
            data: {
              newContent,
            },
          });

          if (data.data !== null) {
            setActivity(activity + 1);
            setNewContent("");
            console.log("성공");
          } else {
            console.log("오류");
          }
        }}
      >
        <div>
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
    </>
  );
};

export default Comment;
