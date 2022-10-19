import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Comment = ({commentContent,method, activity, setActivity}) => {
  const [postDetail, setPostDetail] = useState({});
  const [check, setCheck] = useState("false");
  const [checkComment, setCheckComment] = useState("false");
  const [content, setContent] = useState("");
  const [newContent, setNewContent] = useState("");
  const [comment, setComment] = useState([]);
  const [commentComment, setCommentComment] = useState([]);
  const { id } = useParams();

  let sort = ""
  if(method === "0"){sort = "post"}
    else{sort = "secretPost"}  

    return(
    <>
    {   
        commentContent.map((comment, index) =>
        
            <div key={index}>
                <hr/>
                댓글 : {check === "true" + comment.postCommentId ?
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        const data = await axios({
                            url: `http://localhost:5000/${sort}CommentUpdate/${comment.postCommentId}`,
                            method: "PATCH",
                            data: { content }
                        });
                        if (data.data !== null) {
                            setActivity(activity + 1);
                            setCheck("false");
                            setContent("");
                            console.log("성공");
                        } else {
                            console.log("오류");
                        }
                    }}>
                        <input
                            type="text"
                            placeholder={comment.postCommentContent}
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                            }}
                        >
                        </input>
                        <div>
                            <button type="submit">확인</button>
                        </div>
                    </form>
                    :
                    <div>{comment.postCommentContent}</div>}
                {check === "true" + comment.postCommentId ? null :
                    <span className="cursor-pointer" onClick={(e) => { setCheck("true" + comment.postCommentId) }}>수정</span>
                }

                <form onSubmit={async (e) => {
                    e.preventDefault();
                    await axios({
                        url: `http://localhost:3000/${sort}CommentDelete/${comment.postCommentId}`,
                        method: "POST",
                    })
                    setActivity(activity + 1);
                }}>
                    <button>삭제</button>
                </form>
            </div>
        )
    }

    <form
        onSubmit={async (e) => {
            e.preventDefault();
            const data = await axios({
                url: `http://localhost:3000/${sort}CommentCreate/${id}`,
                method: "POST",
                data: {
                    newContent
                }
            });

            if (data.data !== null) {
                setActivity(activity + 1);
                setNewContent("");
                console.log("성공");
            } else {
                console.log("오류");
            }
        }}>
        <div >
            <label>
                <strong >댓글</strong>
            </label>
            <input
                type="text"
                placeholder="내용"
                value={newContent}
                onChange={(e) => {
                    setNewContent(e.target.value);
                }}
            >
            </input>
        </div>
        <div>
            <button type="submit">확인</button>
        </div>
    </form>
    
    </>
    )
}

export default Comment;