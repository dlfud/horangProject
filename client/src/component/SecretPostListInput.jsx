import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";


const SecretPostListInput = ({ secretPost, setSecretPost, setActivity }) => {



  const { title, content, id, create_date, view } = secretPost;
  const createDate = moment({ create_date }).format('YY.MM.DD');
  return (
    <React.Fragment>
      <table>
        <tr>
          <td>{id}</td>
          <td><Link to={`/secretPostDetailPage/${id}`}>{title}</Link></td>
          <td>{createDate}</td>
          <td>{view}</td>
          <td><Link to={`/update/${id}`}>수정</Link></td>
          <td><form onSubmit={ (e) => {
            e.preventDefault();
            axios({
              url: `http://localhost:3000/delete/${id}`,
              method: "POST",
            })
            setActivity("true" + id);
            }}><button>삭제</button></form></td>
</tr>
</table>



    </React.Fragment>);
}

export default SecretPostListInput;