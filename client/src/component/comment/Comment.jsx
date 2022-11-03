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
      <CommentCreate
        sort={sort}
        activity={activity}
        setActivity={setActivity}
        id={id}
        onoff={onoff}
      />

      <hr/>
      {comment.map((comment, index) => (
        <div key={index}>
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
            className="inline-block float-right"
          >
            <button className="border-2 mr-2">삭제</button>
          </form>

          <hr/>
          <div className="mt-3">대댓글</div>
          <hr/>
          <div  className="flex flex-col">
          <CommentComment
            sort={sort}
            id={id}
            comment={comment}
            activity={activity}
            setActivity={setActivity}
            onoff={onoff}
          />
          </div>
        </div>
      ))}
    </>
  );
};

export default Comment;
