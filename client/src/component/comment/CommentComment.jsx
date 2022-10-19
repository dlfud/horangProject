
const CommentComment = () => {
    const [activity, setActivity] = useState(0);
    const [postDetail, setPostDetail] = useState({});
    const [check, setCheck] = useState("false");
    const [checkComment, setCheckComment] = useState("false");
    const [content, setContent] = useState("");
    const [commentContent, setCommentContent] = useState("");
    const [newContent, setNewContent] = useState("");
    const [comment, setComment] = useState([]);
    const [commentComment, setCommentComment] = useState([]);
    const { id } = useParams();
    return (
        <>
    {
        checkComment === "trueCreate" + comment.postCommentCommentId ?
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    const data = await axios({
                        url: `http://localhost:3000/postCommentCommentCreate`,
                        method: "POST",
                        data: {
                            postCommnetId: comment.postCommentId,
                            postId: id,
                            newContent
                        }
                    });

                    if (data.data !== null) {
                        setActivity(activity + 1);
                        setCheckComment("false");
                        setNewContent("");
                        console.log("성공");
                    } else {
                        console.log("오류");
                    }
                }}>
                <div >
                    <label>
                        <strong >대댓글</strong>
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
            :
            null
    }
    {
        checkComment === "trueCreate" + comment.postCommentCommentId ? null :
        <span className="cursor-pointer" onClick={(e) => { setCheckComment("trueCreate" + comment.postCommentCommentId) }}>생성</span>
    }

    {
        commentComment.map((commentComment, index) =>
            commentComment.postComment_id === comment.postCommentId ?
                <div key={index}>
                    대댓글 : {checkComment === "trueUpdate" + commentComment.postCommentCommentId ?
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const data = await axios({
                                url: `http://localhost:5000/postCommentCommentUpdate/${commentComment.postCommentCommentId}`,
                                method: "PATCH",
                                data: { commentContent }
                            });
                            if (data.data !== null) {
                                setActivity(activity + 1);
                                setCheckComment("false");
                                setCommentContent("");
                                console.log("성공");
                            } else {
                                console.log("오류");
                            }
                        }}>
                            <input
                                type="text"
                                placeholder={commentComment.postCommentCommentContent}
                                value={commentContent}
                                onChange={(e) => {
                                    setCommentContent(e.target.value);
                                }}
                            >
                            </input>
                            <div>
                                <button type="submit">확인</button>
                            </div>
                        </form>
                        :
                        <div>{commentComment.postCommentCommentContent}</div>}
                    {checkComment === "trueUpdate" + commentComment.postCommentCommentId ? null :
                        <span className="cursor-pointer" onClick={(e) => { setCheckComment("trueUpdate" + commentComment.postCommentCommentId) }}>수정</span>
                    }

                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        await axios({
                            url: `http://localhost:3000/postCommentCommentDelete/${commentComment.postCommentCommentId}`,
                            method: "POST",
                        })
                        setActivity(activity + 1);
                    }}><button>삭제</button></form>
                </div>
                :
                null
        )
    }
    </>
    )
    
}

export default CommentComment;