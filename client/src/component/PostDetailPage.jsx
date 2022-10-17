import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";


const SecretPostDetailPage = () => {
  const [activity, setActivity] = useState(0);
  const [postDetail, setPostDetail] = useState({});
  const [check, setCheck] = useState("false");
  const [content, setContent] = useState("");
  const [newContent, setNewContent] = useState("");
  const [comment, setComment] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getData1 = async () => {
      const post = await axios({
        url: `http://localhost:5000/postDetailPage/${id}`,
        method: "GET",
      });
      setPostDetail(...post.data);
    };
    const getData2 = async () => {
      const postComment = await axios({
        url: `http://localhost:5000/postComment/${id}`,
        method: "GET",
      });
      setComment(postComment.data);
    };

    getData1();
    getData2();
  }, [activity, id]);

  const loginout = () => {
    if(window.sessionStorage.getItem("id")===null){
      navigate("/home");
    }else{
      navigate("/secrethome");
    }
  }

  return (
    <>
      <h1>익명 게시물 상세페이지</h1>
      <div>조회수 : {postDetail.view}</div>
      <Link to={`/postUpdate/${id}`}>수정</Link>
      <form onSubmit={async (e) => {
        e.preventDefault();
        await axios({
          url: `http://localhost:3000/postDelete/${id}`,
          method: "POST",
        })
        navigate("/home");
      }}><button>삭제</button></form>
      <input onClick={loginout} value="목록" type="button"></input>
      <div>
        제목 : {postDetail.title}
      </div>
      <div>
        내용 : {postDetail.content}
      </div>

      {comment.map((comment, index) =>
        <div key={index}>
          댓글 : { check === "true"+comment.postCommentId ?
           <form onSubmit={async (e) => {
            e.preventDefault();
            const data = await axios({
              url:`http://localhost:5000/postCommentUpdate/${comment.postCommentId}`,
              method:"PATCH",
              data:{content}
            });
            if (data.data !== null) {
              setActivity(activity + 1);
              setCheck("false"+comment.postCommentId);
              setContent("");
              console.log("성공");
            } else {
              console.log("오류");
            }
           }}>
            <input
            type="text"
            placeholder="내용"
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
          {check === "false"+comment.postCommentId ? null : 
            <span className="cursor-pointer" onClick={(e) => {setCheck("true"+comment.postCommentId)}}>수정</span> 
          }

          <form onSubmit={async (e) => {
            e.preventDefault();
            await axios({
              url:`http://localhost:3000/postCommentDelete/${comment.postCommentId}`,
              method:"POST",
            })
            setActivity(activity + 1);
          }}>
            <button>삭제</button>
          </form>
        </div>
      )}

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const data = await axios({
            url: `http://localhost:3000/postCommentCreate/${id}`,
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
    </>);
}

export default SecretPostDetailPage;