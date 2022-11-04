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

  const checkDelete = (id) => {
    if (window.confirm("삭제할건가요? 정말요? 다시는 돌이킬 수 없어요! 다시 생각해 보세요! 삭제하실 건가요? 2번의 기회를 드릴게요! 잘 생각해보세요! 물론 취소도 기회를 2번! (ps. 삭제 한번 누르면 삭제됨)")) {
        const comDelete = async (e) => {
          await axios({
            url: `${url}/${sort}CommentCommentDelete/${id}`,
            method: "POST",
          });
          setActivity(activity + 1);
          setCheck("false");
          return;
        }
        comDelete();
        return;
      }
    else{
      alert("취소");
    }
  }

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

        {check === "delete" + commentComment.commentCommentId ? 
          <>
          {checkDelete(commentComment.commentCommentId)}
          </>
        :
        null}

        {
          check === "trueUpdate" + commentComment.commentCommentId ? null :
          <>
              {onoff ?
                <> 
                  <button onClick={() => {setCheck("update" + commentComment.commentCommentId);}}>
                    수정
                  </button>
                  <button onClick={() => {setCheck("delete" + commentComment.commentCommentId);}}>
                    삭제
                  </button>
                </>
                : 
                <> 
                  <button onClick={() => {setCheck("passwordUpdate" + commentComment.commentCommentId);}}>
                    수정
                  </button>
                  <button onClick={() => {setCheck("passwordDelete" + commentComment.commentCommentId);}}>
                    삭제
                  </button>
                </>
              }
          </>
        }
        {
          check === "passwordUpdate" + commentComment.commentCommentId ?
          <form onSubmit={async (e) => {
              e.preventDefault();
              const data = await axios({
                  url: `${url}/commentCheckPassword`,
                  method: "POST",
                  data: { password, commentId:commentComment.commentCommentId },
              });
              if (data.data[0].cnt === 1) {
                  setPassword("");
                  setCheck("trueUpdate" + commentComment.commentCommentId);
                  console.log("성공");
              } else {
                  alert("비밀번호 쓰세요");
                  setPassword("");
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

        {check === "passwordDelete" + commentComment.commentCommentId ? 
          <form onSubmit={async (e) => {
            e.preventDefault();
            const data = await axios({
              url: `${url}/commentCheckPassword`,
              method: "POST",
              data: { password, commentId:commentComment.commentCommentId },
            });
            if (data.data[0].cnt === 1) {
              setPassword("");
              setCheck("delete" + commentComment.commentCommentId);
              console.log("성공");
            } else {
              console.log(commentComment.commentCommentId)
              alert("비밀번호 쓰라요");
              setPassword("");
              console.log("오류");
            }
          }}>
            <input 
              type="password"
              placeholder="비밀번호확인"
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}>
            </input>
            <button>
              확인
            </button>
          </form>
          :
          null}
            
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
