import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const PostListInput = ({ offset, limit, post, postComment }) => {
  let count = 0;
  const [onoff, setOnoff] = useState(false);
  const [postOX, setPostOX] = useState(false);

  useEffect(() => {
    postNullCheck();
  });
  const countPostComment = (id) =>
    postComment.map((_comment, index) => {
      if (_comment.post_id === id) {
        count = _comment.count;
        return count;
      }
    });

  const loginout = () => {
    console.log(window.sessionStorage.getItem("id"));
    if (window.sessionStorage.getItem("id") === null) {
      alert("로그인 필요");
      setOnoff(false);
    } else {
      setOnoff(true);
    }
  };

  const postNullCheck = () => {
    if (post.length !== 0) {
      setPostOX(true);
    }
  };
  return (
    <>
      <p className="font-bold text-2xl">익명 게시물</p>
      <div className="flex justify-center mx-auto">
        <div className="flex flex-col">
          <div className="w-full">
            {postOX ? (
              <>
                <div className="shadow overflow-auto">
                  <table className="mt-5">
                    <thead className="bg-gray-50 border">
                      <tr className="whitespace-nowrap">
                        <th className="px-6 py-2 text-xs text-gray-500 ">No</th>
                        <th className="px-6 py-2 text-xs text-gray-500">
                          제목
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-500">
                          작성일
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-500">
                          조회수
                        </th>
                      </tr>
                    </thead>

                    {post.slice(offset, offset + limit).map((post, index) => (
                      <tbody
                        key={index}
                        className="bg-white divide-y divide-gray-300 border"
                      >
                        <tr className="whitespace-nowrap">
                          <td className="px-6 py-4 text-sm text-gray-500 text-center tdWidth">
                            {post.id}
                          </td>
                          <td className="px-6 py-4 TitleWidth">
                            <Link to={`/postDetailPage/${post.id}`}>
                              {post.title}
                            </Link>
                            <span className="text-violet-300 ml-3 tdWidth">
                              {countPostComment(post.id)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-center tdWidth ">
                            {moment(post.create_date).format("YY.MM.DD")}
                          </td>
                          <td className="px-6 py-4  text-sm  text-center tdWidth">
                            {post.view}
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </>
            ) : (
              <div className="bg-white divide-y divide-gray-300 border postOXWidth mt-5">
                게시물을 생성해주세요
              </div>
            )}
            <div className="text-right mt-4">
              {onoff ? (
                <Link
                  to="/postCreate"
                  className=" p-2 MainColor2 text-sm font-bold"
                >
                  <button onClick={loginout}>글쓰기</button>
                </Link>
              ) : (
                <button
                  className=" p-2 MainColor2 text-sm font-bold  rounded-lg"
                  onClick={loginout}
                >
                  글쓰기
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostListInput;
