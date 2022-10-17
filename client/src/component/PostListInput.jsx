import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";


const PostListInput = ({ offset, limit, post, postComment }) => {

  let count = 0;

  const countPostComment = (id) => postComment.map((_comment, index) => {
    if(_comment.post_id === id){
      count = _comment.count;
      return count
    }
  })

  return (
    <>
    <div className="container flex justify-center mx-auto">
     <div className="flex flex-col">
        <div className="w-full">
          <div className="border-b border-gray-200 shadow"></div>
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
        < tbody key={index} className="bg-white divide-y divide-gray-300 border" >
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
      <div className="text-right ">
          <Link to="/postCreate" className=" p-2 MainColor2 text-sm font-bold"> 글쓰기  </Link>
        </div>
      </div>
    </div>
  </div>

    </>
  )
}

export default PostListInput;