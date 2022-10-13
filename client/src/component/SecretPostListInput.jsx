import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";


const SecretPostListInput = ({ offset, limit, secretPost, comment }) => {

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
    
      {secretPost.slice(offset, offset + limit).map((secretPost, index) =>
        < tbody key={index} className="bg-white divide-y divide-gray-300 border" >
          <tr className="whitespace-nowrap">
          <td className="px-6 py-4 text-sm text-gray-500 w-20 text-center">{secretPost.id}</td>
          <td className="px-6 py-4 TitleWidth text-center" ><Link to={`/secretPostDetailPage/${secretPost.id}`}>{secretPost.title}</Link></td>
          <td className="px-6 py-4 text-sm text-center w-32 ">{moment(secretPost.create_date).format('YY.MM.DD')}</td>
          <td className="px-6 py-4  text-sm  text-center">{secretPost.view}</td>
          </tr>
          </tbody>
      )}
      </table>
      </div>
    </div>
  </div>

    </>
  )
}

export default SecretPostListInput;