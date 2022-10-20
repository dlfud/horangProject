import axios from "axios";
import { useEffect, useState } from "react";
import CommentCommentCreate from "./CommentCommentCreate";

const CommentComment = ({ sort, id, comment, activity, setActivity }) => {
  const [check, setCheck] = useState("false");
  const [commentContent, setCommentContent] = useState("");
  const [commentComment, setCommentComment] = useState([]);
  const [onoff, setOnoff] = useState(false);

  useEffect(() => {
    const getData3 = async () => {
      const commentComment = await axios({
        url: `http://localhost:5000/${sort}CommentComment/${id}`,
        method: "GET",
      });
      console.log(comment);
      setCommentComment(commentComment.data);
    };
    getData3();

    const loginout = () => {
      console.log(window.sessionStorage.getItem("id"));
      if (window.sessionStorage.getItem("id") === null) {
        setOnoff(false);
      } else {
        setOnoff(true);
      }
    };

    loginout();
  }, [activity]);

  return (
    <>
      {check === "true" + comment.commentId ? (
        <CommentCommentCreate
          sort={sort}
          activity={activity}
          setActivity={setActivity}
          id={id}
          onoff={onoff}
          setCheck={setCheck}
          comment={comment}
        />
      ) : null}
      {check === "true" + comment.commentId ? null : (
        <span
          className="cursor-pointer"
          onClick={(e) => {
            setCheck("true" + comment.commentId);
          }}
        >
          생성
        </span>
      )}

      {commentComment.map((commentComment, index) =>
        commentComment.secretPostComment_id === comment.commentId ||
        commentComment.postComment_id === comment.commentId ? (
          <div key={index}>
            대댓글 :
            {check === "trueUpdate" + commentComment.commentCommentId ? (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const data = await axios({
                    url: `http://localhost:5000/${sort}CommentCommentUpdate/${commentComment.commentCommentId}`,
                    method: "PATCH",
                    data: { commentContent },
                  });
                  if (data.data !== null) {
                    setActivity(activity + 1);
                    console.log(check);
                    setCheck("false");
                    setCommentContent("");
                    console.log("성공");
                  } else {
                    console.log("오류");
                  }
                }}
              >
                <input
                  type="text"
                  placeholder={commentComment.commentCommentContent}
                  value={commentContent}
                  onChange={(e) => {
                    setCommentContent(e.target.value);
                  }}
                ></input>
                <div>
                  <button type="submit">확인</button>
                </div>
              </form>
            ) : (
              <div>{commentComment.commentCommentContent}</div>
            )}
            {check === "trueUpdate" + commentComment.commentCommentId ? null : (
              <span
                className="cursor-pointer"
                onClick={(e) => {
                  setCheck("trueUpdate" + commentComment.commentCommentId);
                }}
              >
                수정
              </span>
            )}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await axios({
                  url: `http://localhost:3000/${sort}CommentCommentDelete/${commentComment.commentCommentId}`,
                  method: "POST",
                });
                setActivity(activity + 1);
              }}
            >
              <button>삭제</button>
            </form>
          </div>
        ) : null
      )}
    </>
  );
};

export default CommentComment;
