import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import CommentComment from "./CommentComment";
import CommentCreate from "./CommentCreate";
import { url } from "../../configIp";

const Comment = ({ sort, activity, setActivity, id, onoff }) => {
  const [check, setCheck] = useState("false");
  const [content, setContent] = useState("");
  const [comment, setComment] = useState([]);
  const [password, setPassword] = useState("");

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

  const checkDelete = (id) => {
    if (
      window.confirm(
        "삭제할건가요? 정말요? 다시는 돌이킬 수 없어요! 다시 생각해 보세요! 삭제하실 건가요? 2번의 기회를 드릴게요! 잘 생각해보세요! 물론 취소도 기회를 2번! (ps. 삭제 한번 누르면 삭제됨)"
      )
    ) {
      const comDelete = async (e) => {
        await axios({
          url: `${url}/${sort}CommentDelete/${id}`,
          method: "POST",
        });
        console.log("됐지롱");
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
      {comment.map((comment, index) => (
        <div className="flex">
          <div className="bg-white w-full sm:max-w-7xl md:w-1/3 h-auto px-3 py-2 flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center space-x-2">
                <div className="block">
                  <div className="flex space-x-2">
                    {check === "update" + comment.commentId ? (
                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          const data = await axios({
                            url: `${url}/${sort}CommentUpdate/${comment.commentId}`,
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
                              <small>닉네임</small>
                            </div>
                          </div>
                          <div className="text-xs">
                            <input
                              className="text-xs"
                              type="text"
                              placeholder={comment.commentContent}
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
                                setContent(comment.commentContent);
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
                            <small>닉네임</small>
                          </div>
                        </div>
                        <div className="text-xs">{comment.commentContent}</div>
                      </div>
                    )}
                  </div>

                  {check === "delete" + comment.commentId ? <>{checkDelete(comment.commentId)}</> : null}

                  <div className="flex justify-start items-center text-xs w-full">
                    <div className="font-semibold text-gray-700 px-2 flex items-center justify-center space-x-1">
                      {check === "update" + comment.commentId ? null : (
                        <>
                          <a href="#" className="hover:underline">
                            <small>댓글생성</small>
                          </a>
                          {onoff ? (
                            <>
                              <button
                                className="hover:underline"
                                onClick={() => {
                                  setCheck("update" + comment.commentId);
                                }}
                              >
                                수정
                              </button>
                              <button
                                className="hover:underline"
                                onClick={() => {
                                  setCheck("delete" + comment.commentId);
                                }}
                              >
                                삭제
                              </button>
                            </>
                          ) : (
                            <>
                              <a href="#" className="hover:underline">
                                <small>댓글생성</small>
                              </a>
                              <button
                                className="hover:underline"
                                onClick={() => {
                                  setCheck("passwordUpdate" + comment.commentId);
                                }}
                              >
                                수정
                              </button>
                              <button
                                className="hover:underline"
                                onClick={() => {
                                  setCheck("passwordDelete" + comment.commentId);
                                }}
                              >
                                삭제
                              </button>
                            </>
                          )}
                        </>
                      )}

                      {check === "passwordUpdate" + comment.commentId ? (
                        <form
                          onSubmit={async (e) => {
                            e.preventDefault();
                            const data = await axios({
                              url: `${url}/checkPassword`,
                              method: "POST",
                              data: { password, commentId: comment.commentId },
                            });
                            if (data.data.cnt === 1) {
                              console.log("들어옴");
                              setPassword("");
                              setCheck("update" + comment.commentId);
                              console.log("성공");
                            } else {
                              alert("비밀번호를 입력해주세요");
                              console.log("오류");
                            }
                          }}
                        >
                          <input
                            type="password"
                            placeholder="비밀번호확인"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          ></input>
                          <button>확인</button>
                        </form>
                      ) : null}

                      {check === "passwordDelete" + comment.commentId ? (
                        <form
                          onSubmit={async (e) => {
                            e.preventDefault();
                            const data = await axios({
                              url: `${url}/checkPassword`,
                              method: "POST",
                              data: { password, commentId: comment.commentId },
                            });
                            console.log("싫어!", data.data);
                            if (data.data[0].cnt === 1) {
                              setPassword("");
                              setCheck("delete" + comment.commentId);
                              console.log("성공");
                            } else {
                              alert("비번 입력해");
                              console.log("오류");
                            }
                          }}
                        >
                          <input
                            type="password"
                            placeholder="비밀번호확인"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          ></input>
                          <button>확인</button>
                        </form>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 space-y-2">
                    <div className="group relative flex flex-shrink-0 self-start pt-2">
                      <img src="" alt="" className="h-8 w-8 object-fill rounded-full" />
                    </div>
                    <CommentComment
                      sort={sort}
                      id={id}
                      comment={comment}
                      activity={activity}
                      setActivity={setActivity}
                      onoff={onoff}
                    />
                    <div className="flex items-center justify-center space-x-2">
                      <div className="block">
                        <div className="bg-gray-100 w-auto rounded-xl px-2 pb-2">
                          <div className="font-medium">
                            <div className="text-sm">
                              <small>닉네임</small>
                            </div>
                          </div>
                          <div className="text-xs">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita, maiores!
                          </div>
                        </div>
                        <div className="flex justify-start items-center text-xs w-full">
                          <div className="font-semibold text-gray-700 px-2 flex items-center justify-center space-x-1">
                            <a href="#" className="hover:underline">
                              <small>수정</small>
                            </a>
                            <a href="#" className="hover:underline">
                              <small>삭제</small>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <CommentCreate sort={sort} activity={activity} setActivity={setActivity} id={id} onoff={onoff} />
    </>
  );
};

export default Comment;
