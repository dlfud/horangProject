import axios from "axios";
import { useState } from "react";
import {url} from "../../configIp";

const CommentUpdate = ({sort, comment, activity, setActivity, onoff}) => {
    const [check, setCheck] = useState("false");
    const [content, setContent] = useState("");
    const [password, setPassword] = useState("");

    return <>
        {
            check === "true" + comment.commentId ? (
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
                        <button onClick={(e) => { setContent(comment.commentContent) }}>취소</button>
                    </div>
                </form>
            ) : (
            <div>{comment.commentContent}</div>
        )
        }
        {
            check === "true" + comment.commentId ? null :
            <>
                {onoff ?
                    <button onClick={() => { setCheck("true" + comment.commentId); }}>
                        수정
                    </button>
                    :
                    <button onClick={() => { setCheck("password" + comment.commentId); }}>
                        수정
                    </button>
                }
            </>
        }
        {
            check === "password" + comment.commentId ?
            <form onSubmit={async (e) => {
                e.preventDefault();
                const data = await axios({
                    url: `${url}/updatePassword`,
                    method: "POST",
                    data: { password },
                });
                if (data.data !== null) {
                    console.log("들어옴");
                    setPassword("");
                    setCheck("true" + comment.commentId);
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

export default CommentUpdate;