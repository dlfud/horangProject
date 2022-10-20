import Update from "./detailPage/Update.jsx";
import { useParams} from "react-router-dom";

const SecretPostUpdate = () => {
  const {id} = useParams();
  return(
  <>
  <h1>비밀 게시물 수정</h1>
 
  <div>
    <Update method="1" id={id}/>
  </div>
  </>);
}

export default SecretPostUpdate;