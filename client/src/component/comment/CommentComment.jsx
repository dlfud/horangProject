import axios from "axios";
import { useEffect, useState } from "react";
import CommentCommentCreate from "./CommentCommentCreate";
import {url} from "../../configIp";
import CommentCommentUpdate from "./CommentCommentUpdate";

const CommentComment = ({
  sort,
  id,
  comment,
  activity,
  setActivity,
  onoff,
}) => {
  const [check, setCheck] = useState("false");
  const [commentComment, setCommentComment] = useState([]);

  useEffect(() => {
    const getData3 = async () => {
      const commentComment = await axios({
        url: `${url}/${sort}CommentComment/${id}`,
        method: "GET",
      });
      setCommentComment(commentComment.data);
    };
    getData3();
  }, [activity]);

  return (
    <>
    <div>
      {commentComment.map((commentComment, index) =>
        commentComment.secretPostComment_id === comment.commentId ||
        commentComment.postComment_id === comment.commentId ? (
          <div key={index}>
            <CommentCommentUpdate sort={sort} comment={commentComment} activity={activity} setActivity={setActivity} onoff={onoff}/>
            
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await axios({
                  url: `${url}/${sort}CommentCommentDelete/${commentComment.commentCommentId}`,
                  method: "POST",
                });
                setActivity(activity + 1);
              }}
            >
              <button className="float-right border-2 mr-2">삭제</button>
            </form>
          </div>
        ) : null
      )}
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
          className="cursor-pointer float-right border-2 mr-2"
          onClick={(e) => {
            setCheck("true" + comment.commentId);
          }}
        >
          생성
        </span>
      )}
      </div>
    </>
  );
};

export default CommentComment;
