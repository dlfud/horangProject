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
      <div class="flex">
        <div class="bg-white w-full sm:max-w-7xl md:w-1/3 h-auto px-3 py-2 flex flex-col space-y-2">
          <div class="flex items-center space-x-2">
            <div class="flex items-center justify-center space-x-2">
              <div class="block">
                <div class="flex justify-center items-center space-x-2">
                  <div class="bg-gray-100 w-auto rounded-xl px-2 pb-2">
                    <div class="font-medium">
                      <div class="text-sm">
                        <small></small>
                      </div>
                    </div>
                    <div class="text-xs">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita, maiores!
                    </div>
                  </div>
                </div>
                <div class="flex justify-start items-center text-xs w-full">
                  <div class="font-semibold text-gray-700 px-2 flex items-center justify-center space-x-1">
                    <a href="#" class="hover:underline">
                      <small>댓글생성</small>
                    </a>
                    <a href="#" class="hover:underline">
                      <small>수정</small>
                    </a>
                    <a href="#" class="hover:underline">
                      <small>삭제</small>
                    </a>
                  </div>
                </div>

                <div class="flex items-center space-x-2 space-y-2">
                  <div class="group relative flex flex-shrink-0 self-start pt-2">
                    <img src="" alt="" class="h-8 w-8 object-fill rounded-full" />
                  </div>
                  <div class="flex items-center justify-center space-x-2">
                    <div class="block">
                      <div class="bg-gray-100 w-auto rounded-xl px-2 pb-2">
                        <div class="font-medium">
                          <div class="text-sm">
                            <small>Hasan Muhammad</small>
                          </div>
                        </div>
                        <div class="text-xs">
                          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita, maiores!
                        </div>
                      </div>
                      <div class="flex justify-start items-center text-xs w-full">
                        <div class="font-semibold text-gray-700 px-2 flex items-center justify-center space-x-1">
                          <a href="#" class="hover:underline">
                            <small>수정</small>
                          </a>
                          <a href="#" class="hover:underline">
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

      <div>
        {comment.map((comment, index) => (
          <div key={index}>
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
                  <button
                    onClick={(e) => {
                      setContent(comment.commentContent);
                    }}
                  >
                    취소
                  </button>
                </div>
              </form>
            ) : (
              <div>{comment.commentContent}</div>
            )}

            {check === "delete" + comment.commentId ? <>{checkDelete(comment.commentId)}</> : null}

            {check === "update" + comment.commentId ? null : (
              <>
                {onoff ? (
                  <>
                    <button
                      onClick={() => {
                        setCheck("update" + comment.commentId);
                      }}
                    >
                      수정
                    </button>
                    <button
                      onClick={() => {
                        setCheck("delete" + comment.commentId);
                      }}
                    >
                      삭제
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setCheck("passwordUpdate" + comment.commentId);
                      }}
                    >
                      수정
                    </button>
                    <button
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
      </div>
      <CommentCreate sort={sort} activity={activity} setActivity={setActivity} id={id} onoff={onoff} />
    </>
  );
};

export default Comment;
