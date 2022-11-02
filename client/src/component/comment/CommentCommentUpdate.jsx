import axios from "axios";
import { useState } from "react";
import {url} from "../../configIp";

const CommentCommentUpdate = ({sort, comment, activity, setActivity, onoff}) => {
    const [check, setCheck] = useState("false");
    const [content, setContent] = useState("");
    const [password, setPassword] = useState("");

    return <>
        {
            check === "trueUpdate" + comment.commentCommentId ? (
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const data = await axios({
                            url: `${url}/${sort}CommentCommentUpdate/${comment.commentCommentId}`,
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
                        placeholder={comment.commentCommentContent}
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                    ></input>
                    <div>
                        <button type="submit">확인</button>
                        <button onClick={(e) => { setContent(comment.commentCommentContent) }}>취소</button>
                    </div>
                </form>
            ) : (
            <div>{comment.commentCommentContent}</div>
        )
        }
        {
            check === "trueUpdate" + comment.commentCommentId ? null :
            <>
                {onoff ?
                    <button onClick={() => { setCheck("trueUpdate" + comment.commentCommentId); }}>
                        수정
                    </button>
                    :
                    <button onClick={() => { setCheck("password" + comment.commentCommentId); }}>
                        수정
                    </button>
                }
            </>
        }
        {
            check === "password" + comment.commentCommentId ?
            <form onSubmit={async (e) => {
                e.preventDefault();
                const data = await axios({
                    url: `${url}/commentUpdatePassword`,
                    method: "POST",
                    data: { password },
                });
                if (data.data !== null) {
                    console.log("들어옴");
                    setPassword("");
                    setCheck("trueUpdate" + comment.commentCommentId);
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
    </>
    
}

export default CommentCommentUpdate;