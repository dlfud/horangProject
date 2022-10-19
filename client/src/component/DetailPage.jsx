import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Comment from "./comment/Comment.jsx";

const DetailPage = ({method}) => {
    const [activity, setActivity] = useState(0);
  const [postDetail, setPostDetail] = useState({});
  const [comment, setComment] = useState([]);
  const [commentComment, setCommentComment] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  let sort = ""
  if(method === "0"){sort = "post"}
    else{sort = "secretPost"}    

  useEffect(() => {
    const getData1 = async () => {
      const post = await axios({
        url: `http://localhost:5000/${sort}DetailPage/${id}`,
        method: "GET",
      });
      setPostDetail(...post.data);
    };
    const getData2 = async () => {
      const postComment = await axios({
        url: `http://localhost:5000/${sort}Comment/${id}`,
        method: "GET",
      });
      setComment(postComment.data);
    };

    const getData3 = async ()=>{
      const postCommentComment = await axios({
        url:`http://localhost:5000/${sort}CommentComment/${id}`,
        method:"GET",
      });
      setCommentComment(postCommentComment.data);
    }

    getData1();
    getData2();
    getData3();
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
      <div>조회수 : {postDetail.view}</div>
      <Link to={`/postUpdate/${id}`}>수정</Link>
      <form onSubmit={async (e) => {
        e.preventDefault();
        await axios({
          url: `http://localhost:3000/${sort}Delete/${id}`,
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

      <Comment commentContent={comment} method={method} activity={activity} setActivity={setActivity}/>
    </>);
}

export default DetailPage;