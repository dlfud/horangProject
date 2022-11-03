import axios from "axios";
import { useEffect, useState } from "react";
import CommentCommentCreate from "./CommentCommentCreate";
import {url} from "../../configIp";

const CommentComment = ({
  sort,
  id,
  comment,
  activity,
  setActivity,
  onoff,
}) => {
  const [check, setCheck] = useState("false");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
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
            {
            check === "trueUpdate" + commentComment.commentCommentId ? (
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const data = await axios({
                            url: `${url}/${sort}CommentCommentUpdate/${commentComment.commentCommentId}`,
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
                        placeholder={commentComment.commentCommentContent}
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                    ></input>
                    <div>
                        <button type="submit">확인</button>
                        <button onClick={(e) => { setContent(commentComment.commentCommentContent) }}>취소</button>
                    </div>
                </form>
            ) : (
            <div>{commentComment.commentCommentContent}</div>
        )
        }
        {
            check === "trueUpdate" + commentComment.commentCommentId ? null :
            <>
                {onoff ?
                    <button onClick={() => { setCheck("trueUpdate" + commentComment.commentCommentId); }}>
                        수정
                    </button>
                    :
                    <button onClick={() => { setCheck("password" + commentComment.commentCommentId); }}>
                        수정
                    </button>
                }
            </>
        }
        {
            check === "password" + commentComment.commentCommentId ?
            <form onSubmit={async (e) => {
                e.preventDefault();
                const data = await axios({
                    url: `${url}/commentCheckPassword`,
                    method: "POST",
                    data: { password },
                });
                if (data.data !== null) {
                    console.log("들어옴");
                    setPassword("");
                    setCheck("trueUpdate" + commentComment.commentCommentId);
                    console.log("성공");
                } else {
                    console.log("오류");
                }
            }}>
                <input
                    type="password"
                    placeholder="비밀번호확인"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}>
                </input>
                <button>
                    확인
                </button>
            </form>
            :
            null
        }
            
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
              <button>삭제</button>
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
          className="cursor-pointer"
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
