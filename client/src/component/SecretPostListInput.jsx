import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";


const SecretPostListInput = ({ secretPost, setActivity }) => {
  const { id } = secretPost;
  return (
    <React.Fragment>
     
      <table>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>작성일</th>
            <th>조회수</th>
            <th>수정</th>
            <th>삭제</th>
            </tr>
          {secretPost.map(secretPost=>
          <tr>
          <td>{secretPost.id}</td>
          <td><Link to={`/secretPostDetailPage/${id}`}>{secretPost.title}</Link></td>
          <td>{moment(secretPost.create_date).format('YY.MM.DD')}</td>
          <td>{secretPost.view}</td>
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
            )}

</table>

    </React.Fragment>
)}

export default SecretPostListInput;