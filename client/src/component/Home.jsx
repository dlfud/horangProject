import axios from "axios";
import React, { useState, useEffect } from "react";
import PostListInput from "./PostListInput";
import Pagination from "./Pagination";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../configIp";
import Nav from "./Nav";

/* 익명 게시판 */
const HomeR = () => {
  const [post, setPost] = useState([]);
  const [postComment, setPostComment] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const [onoff, setOnoff] = useState(false);
  const navigate = useNavigate();
  const [searchTitle, setSearchTitle] = useState("");
  const [search, setSearch] = useState([]);
  const [postOX, setPostOX] = useState(false);

  useEffect(() => {
    const getData1 = async () => {
      const post = await axios({
        url: `${url}/post`,
        method: "GET",
      });
      setPost(post.data);
    };

    const getData2 = async () => {
      const postComment = await axios({
        url: `${url}/postCommentCount`,
        method: "GET",
      });
      setPostComment(postComment.data);
    };

    getData1();
    getData2();

    const loginout = () => {
      if (window.sessionStorage.getItem("id") === null) {
        setOnoff(false);
      } else {
        setOnoff(true);
      }
    };

    loginout();
    postNullCheck();
  }, []);

  const postNullCheck = () => {
    if (post !== null) {
      setPostOX(true);
    }
  };

  return (
    <div className="flex Main">
      <div className=" px-3 Side w-70">
        <div className="space-y-3">
          <div className="flex-1">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const search = await axios({
                  url: `${url}/search`,
                  method: "POST",
                  data: {
                    searchTitle,
                  },
                });
                setSearch(search.data);
                navigate("/home");
              }}
            >
              <input
                className="text-base w-10/12"
                placeholder="Search"
                onChange={(e) => {
                  setSearchTitle(e.target.value);
                }}
              ></input>
              <button type="submit">확인</button>
            </form>

            <Nav onoff={onoff} />

            <div className=" absolute bottom-0 text-stone-500">
              <p>
                【 팀명 】<br /> 호랑이{" "}
              </p>
              <p>
                【 프로젝트명 】<br /> 호랑이{" "}
              </p>
              <p>
                【 팀원명 】<br /> 박선호, 윤이령{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-12">
        <div className="grid ">
          <div>
            <label>
              페이지 당 표시할 게시물 수:&nbsp;
              <select type="number" value={limit} onChange={({ target: { value } }) => setLimit(Number(value))}>
                <option value="6">6</option>
                <option value="8">8</option>
                <option value="10">10</option>
              </select>
            </label>
          </div>
          <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
            <div>
              <PostListInput offset={offset} limit={limit} post={post} postComment={postComment} />
            </div>
          </div>

          <div className="w-full px-4 py-5 mt-2 bg-white rounded-lg shadow overflow-auto max-h-96 scroll-py-2.5">
            <table>
              <thead className="bg-gray-50 border">
                <tr className="whitespace-nowrap">
                  <th className="px-6 py-2 text-xs text-gray-500 ">No</th>
                  <th className="px-6 py-2 text-xs text-gray-500 SearchTitleWidth">제목</th>
                </tr>
              </thead>
              {search.map((search, index) => (
                <tbody key={index} className="bg-white divide-y divide-gray-300 border ">
                  <tr className="whitespace-nowrap">
                    <td className="px-6 py-4 text-sm text-gray-500 text-center tdWidth">{search.id}</td>
                    <td className="px-6 py-4 SearchTitleWidth ">
                      <Link to={`/postDetailPage/${post.id}`}>{search.title}</Link>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>

          <div className=" text-center">
            <Pagination total={post.length} limit={limit} page={page} setPage={setPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeR;
