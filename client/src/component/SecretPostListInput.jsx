import moment from "moment";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import React, { useState } from "react";
import SecretPagination from "./SecretPagination";



const SecretPostListInput = ({ limit, secretPost, post, secretPostComment, postComment }) => {

  let countSecretPost = 0;
  let countPost = 0;
  let [page, setPage] = useState(1);
  let [secretPage, setSecretPage] = useState(1);
  let offset = (page - 1) * limit;
  let secretOffset = (secretPage - 1) * limit;

  const countSecretPostComment = (id) => secretPostComment.map((_comment, index) => {
    if (_comment.secretPost_id === id) {
      countSecretPost = _comment.count;
      return countSecretPost
    }
  })

  const countPostComment = (id) => postComment.map((_comment, index) => {
    if (_comment.post_id === id) {
      countPost = _comment.count;
      return countPost
    }
  })

  return (
    <>
      <div className="container flex justify-between PostHeight mx-2">
        <div className="mr-9">
          <table >
            <thead className="bg-gray-50">
              <tr className="whitespace-nowrap">
                <th className="px-6 py-2 text-xs text-gray-500 ">No</th>
                <th className="px-6 py-2 text-xs text-gray-500">제목</th>
                <th className="px-6 py-2 text-xs text-gray-500">작성일</th>
                <th className="px-6 py-2 text-xs text-gray-500">조회수</th>
              </tr>
            </thead>

            {secretPost.slice(secretOffset, secretOffset + limit).map((secretPost, index) =>
              <tbody key={index} className="bg-white divide-y divide-gray-300 border" >
                <tr className="whitespace-nowrap">
                  <td className="px-6 py-4 text-sm text-gray-500 w-20 text-center">{secretPost.id}</td>
                  <td className="px-6 py-4 TitleWidth" >
                    <Link to={`/secretPostDetailPage/${secretPost.id}`}>
                      {secretPost.title}
                    </Link>
                    <span className="text-violet-300 ml-3"> {countSecretPostComment(secretPost.id)}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-center w-32 ">{moment(secretPost.create_date).format('YY.MM.DD')}</td>
                  <td className="px-6 py-4  text-sm  text-center">{secretPost.view}</td>
                </tr>
              </tbody>
            )}
          </table>
          <div className="text-right mt-4">
            <Link to="/secretPostCreate" className=" p-2 MainColor2 text-sm font-bold"> 글쓰기  </Link>
          </div>
          <div className=" text-center">
            <SecretPagination
              total={secretPost.length}
              limit={limit}
              secretPage={secretPage}
              setSecretPage={setSecretPage}
            />
          </div>
        </div>
        <div className="col-span-1">
          <table >
            <thead className="bg-gray-50">
              <tr className="whitespace-nowrap">
                <th className="px-6 py-2 text-xs text-gray-500 ">No</th>
                <th className="px-6 py-2 text-xs text-gray-500">제목</th>
                <th className="px-6 py-2 text-xs text-gray-500">작성일</th>
                <th className="px-6 py-2 text-xs text-gray-500">조회수</th>
              </tr>
            </thead>

            {post.slice(offset, offset + limit).map((post, index) =>
              <tbody key={index} className="bg-white divide-y divide-gray-300 border" >
                <tr className="whitespace-nowrap">
                  <td className="px-6 py-4 text-sm text-gray-500 w-20 text-center">{post.id}</td>
                  <td className="px-6 py-4 TitleWidth" >
                    <Link to={`/postDetailPage/${post.id}`}>
                      {post.title}
                    </Link>
                    <span className="text-violet-300 ml-3"> {countPostComment(post.id)}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-center w-32 ">{moment(post.create_date).format('YY.MM.DD')}</td>
                  <td className="px-6 py-4  text-sm  text-center">{post.view}</td>
                </tr>
              </tbody>
            )}
          </table>
          <div className="text-right mt-4">
            <Link to="/postCreate" className=" p-2 MainColor2 text-sm font-bold"> 글쓰기  </Link>
          </div>
          <div className=" text-center">
            <Pagination
              total={post.length}
              limit={limit}
              page={page}
              setPage={setPage}
            />
          </div>
        </div>
      </div >
    </>
  )
}

export default SecretPostListInput;