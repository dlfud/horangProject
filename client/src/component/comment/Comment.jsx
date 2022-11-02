import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import CommentComment from "./CommentComment";
import CommentCreate from "./CommentCreate";
import {url} from "../../configIp";
import CommentUpdate from "./CommentUpdate";

const Comment = ({ sort, activity, setActivity, id, onoff }) => {
  const [comment, setComment] = useState([]);

  useEffect(() => {
    const getData2 = async () => {
      const comment = await axios({
        url: `${url}/${sort}Comment/${id}`,
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
          <CommentUpdate sort={sort} comment={comment} activity={activity} setActivity={setActivity} onoff={onoff}/>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await axios({
                url: `${url}/${sort}CommentDelete/${comment.commentId}`,
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
            onoff={onoff}
          />
        </div>
      ))}

      <CommentCreate
        sort={sort}
        activity={activity}
        setActivity={setActivity}
        id={id}
        onoff={onoff}
      />
    </>
  );
};

export default Comment;
