import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../../configIp";

const CommentComment = ({ sort, id, comment, activity, setActivity, onoff }) => {
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
    if (window.confirm("삭제할건가요? 정말요? 다시는 돌이킬 수 없어요! 다시 생각해 보세요!")) {
      const comDelete = async (e) => {
        await axios({
          url: `${url}/${sort}CommentCommentDelete/${id}`,
          method: "POST",
        });
        setActivity(activity + 1);
        setCheck("false");
        return;
      };
      comDelete();
      return;
    } else {
      alert("취소");
    }
  };

  return (
    <>
      {commentComment.map((commentComment, index) =>
        commentComment.secretPostComment_id === comment.commentId ||
        commentComment.postComment_id === comment.commentId ? (
          <div key={index} className="flex space-x-2">
            <div className="group relative flex flex-shrink-0 self-start pt-2">
              <img src="" alt="" className="h-8 w-8 object-fill rounded-full" />
            </div>

            <div className="block">
              {check === "trueUpdate" + commentComment.commentCommentId ? (
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
                  <div className="bg-gray-100 w-auto rounded-xl px-2 pb-2">
                    <div className="font-medium">
                      <div className="text-sm">
                        <small>{comment.commentNick}</small>
                      </div>
                    </div>
                    <div className="text-xs">
                      <input
                        className="text-xs"
                        type="text"
                        placeholder={commentComment.commentCommentContent}
                        value={content}
                        onChange={(e) => {
                          setContent(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>
                  <div className="flex justify-start items-center text-xs w-full">
                    <div className="font-semibold text-gray-700 px-2 flex items-center justify-center space-x-1">
                      <button className="hover:underline" type="submit">
                        확인
                      </button>
                      <button
                        className="hover:underline"
                        onClick={(e) => {
                          setContent(commentComment.commentCommentContent);
                        }}
                      >
                        취소
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="bg-gray-100 w-auto rounded-xl px-2 pb-2">
                  <div className="font-medium">
                    <div className="text-sm">
                      <small>{comment.commentNick}</small>
                    </div>
                  </div>
                  <div className="text-xs">{commentComment.commentCommentContent}</div>
                </div>
              )}

              {check === "delete" + commentComment.commentCommentId ? (
                <>{checkDelete(commentComment.commentCommentId)}</>
              ) : null}

              <div className="flex justify-start items-center text-xs w-full">
                <div className="font-semibold text-gray-700 px-2 flex items-center justify-center space-x-1">
                  {check === "trueUpdate" + commentComment.commentCommentId ? null : (
                    <>
                      <button
                        className="hover:underline"
                        onClick={() => {
                          setCheck("passwordUpdate" + commentComment.commentCommentId);
                        }}
                      >
                        수정
                      </button>
                      <button
                        className="hover:underline"
                        onClick={() => {
                          setCheck("passwordDelete" + commentComment.commentCommentId);
                        }}
                      >
                        삭제
                      </button>
                    </>
                  )}
                </div>
              </div>
              {check === "passwordUpdate" + commentComment.commentCommentId ? (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const data = await axios({
                      url: `${url}/${sort}CommentCheckPassword`,
                      method: "POST",
                      data: { password, commentId: commentComment.commentCommentId },
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
                  }}
                >
                  <label>
                    <strong>비밀번호 : </strong>
                  </label>
                  <input
                    className="border"
                    type="password"
                    placeholder="비밀번호확인"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  ></input>
                  <button>확인</button>
                  <button
                    onClick={() => {
                      setCheck("false");
                    }}
                  >
                    취소
                  </button>
                </form>
              ) : null}

              {check === "passwordDelete" + commentComment.commentCommentId ? (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const data = await axios({
                      url: `${url}/${sort}CommentCheckPassword`,
                      method: "POST",
                      data: { password, commentId: commentComment.commentCommentId },
                    });
                    if (data.data[0].cnt === 1) {
                      setPassword("");
                      setCheck("delete" + commentComment.commentCommentId);
                      console.log("성공");
                    } else {
                      console.log(commentComment.commentCommentId);
                      alert("비밀번호 쓰라요");
                      setPassword("");
                      console.log("오류");
                    }
                  }}
                >
                  <label>
                    <strong>비밀번호 : </strong>
                  </label>
                  <input
                    className="border"
                    type="password"
                    placeholder="비밀번호확인"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  ></input>
                  <button>확인</button>
                  <button
                    onClick={() => {
                      setCheck("false");
                    }}
                  >
                    취소
                  </button>
                </form>
              ) : null}
            </div>
          </div>
        ) : null
      )}
    </>
  );
};

export default CommentComment;
