import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams} from "react-router-dom";

const Update = () => {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const {id} = useParams();
  console.log(id);
  return(
  <>
  <h1>비밀 게시물 수정</h1>
 
  <div>
    <form
    onSubmit={async(e) => {
       e.preventDefault();
       const data = await axios({
        url: `http://localhost:3000/update/${id}`,
        method: "POST",
        data: {
          title, 
          content
        }
       });     

       if(data.data!==null){
        nav(`/secretPostDetailPage/${id}`);
        console.log("성공");
       }else{
        console.log("오류");
       }
    }}>
         <div >
            <label >
              <strong >제목</strong>
            </label>
            <input
              type="text"
              placeholder="제목"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            >
            </input>
          </div>
          <div >
            <label>
              <strong >내용</strong>
            </label>
            <input
              type="text"
              placeholder="내용"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            >
            </input>
          </div>
          <div>
         
              <button type="submit">확인</button>
         
          </div>
      </form>
  </div>
  </>);
}

export default Update;