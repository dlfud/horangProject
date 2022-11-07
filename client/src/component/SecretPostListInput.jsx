import moment from "moment";
import { Link } from "react-router-dom";
import React, {useState, useEffect} from "react";



const SecretPostListInput = ({ offset, limit, secretPost, secretPostComment}) => {

  let countSecretPost = 0;
  const [secretPostOX, setSecretPostOX] = useState(false);

  useEffect(() => {
    postNullCheck();
  })
  const postNullCheck = () => {
    if (secretPost.length !== 0) {
      setSecretPostOX(true);
    }
  }

  const countSecretPostComment = (id) => secretPostComment.map((_comment, index) => {
    if (_comment.secretPost_id === id) {
      countSecretPost = _comment.count;
      return countSecretPost
    }
  })

  return (
    <>
      <p className="font-bold text-2xl">게시물</p>
      <div className="container flex justify-between PostHeight mx-2">
        <div className="mr-9">
          {secretPostOX?
          <table >
            <thead className="bg-gray-50">
              <tr className="whitespace-nowrap">
                <th className="px-6 py-2 text-xs text-gray-500 ">No</th>
                <th className="px-6 py-2 text-xs text-gray-500">제목</th>
                <th className="px-6 py-2 text-xs text-gray-500">작성일</th>
                <th className="px-6 py-2 text-xs text-gray-500">조회수</th>
              </tr>
            </thead>

            {secretPost.slice(offset, offset + limit).map((secretPost, index) =>
              <tbody key={index} className="bg-white divide-y divide-gray-300 border" >
                <tr className="whitespace-nowrap">
                  <td className="px-6 py-4 text-sm text-gray-500 w-20 text-center tdWidth">{secretPost.id}</td>
                  <td className="px-6 py-4 TitleWidth" >
                    <Link to={`/secretPostDetailPage/${secretPost.id}`}>
                      {secretPost.title}
                    </Link>
                    <span className="text-violet-300 ml-3 tdWidth"> {countSecretPostComment(secretPost.id)}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-center w-32 tdWidth">{moment(secretPost.create_date).format('YY.MM.DD')}</td>
                  <td className="px-6 py-4  text-sm  text-center tdWidth">{secretPost.view}</td>
                </tr>
              </tbody>
            )}
          </table>
            :
            <div className="bg-white divide-y divide-gray-300 border postOXWidth mt-5">
              게시물을 생성해주세요
            </div>
          }
          <div className="text-right mt-4">
            <Link to="/secretPostCreate" className=" p-2 MainColor2 text-sm font-bold"> 글쓰기  </Link>
          </div>
        </div>
      </div >
    </>
  )
}

export default SecretPostListInput;