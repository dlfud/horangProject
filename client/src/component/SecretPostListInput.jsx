import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";


const SecretPostListInput = ({ offset, limit, secretPost }) => {


  return (
    <>
      <tr>
        <th>No</th>
        <th>제목</th>
        <th>작성일</th>
        <th>조회수</th>
      </tr>
      {secretPost.slice(offset, offset + limit).map((secretPost, index) =>
        <tr key={index}>
          <td>{secretPost.id}</td>
          <td><Link to={`/secretPostDetailPage/${secretPost.id}`}>{secretPost.title}</Link></td>
          <td>{moment(secretPost.create_date).format('YY.MM.DD')}</td>
          <td>{secretPost.view}</td>
        </tr>
      )}
    </>
  )
}

export default SecretPostListInput;