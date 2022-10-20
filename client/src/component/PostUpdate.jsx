import Update from "./detailPage/Update.jsx";
import { useParams} from "react-router-dom";

const PostUpdate = () => {
  const {id} = useParams();
  return(
  <>
  <h1>익명 게시물 수정</h1>
 
  <div>
    <Update method="0" id={id}/>
  </div>
  </>);
}

export default PostUpdate;