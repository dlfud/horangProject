import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";



const SecretPostListInput = ({secretPost}) => {
  const {title, content, id, create_date, view} = secretPost;
  const createDate = moment({create_date}).format('YY.MM.DD');
  return(
    <React.Fragment>
        <table>
          <tr>
            <td>{id}</td>
            <td>{title}</td>
            <td>{content}</td>
            <td>{createDate}</td>
            <td>{view}</td>
            <td><Link to = {`/update/${id}`}>수정</Link></td>
          </tr>
        </table>



    </React.Fragment>);
}

export default SecretPostListInput;