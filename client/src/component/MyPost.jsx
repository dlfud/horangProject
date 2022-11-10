import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { url } from "../configIp";

const MyPost = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [mySecretPosts, setMySecretPosts] = useState([]);
  const [postOX, setPostOX] = useState(false);
  const nick = window.sessionStorage.getItem("id");

  useEffect(() => {
    const getData1 = async () => {
      const data = await axios({
        url: `${url}/myPost`,
        method: "POST",
        data: { nick },
      });
      setMyPosts(data.data);
    };

    const getData2 = async () => {
      const data = await axios({
        url: `${url}/mySecretPost`,
        method: "POST",
        data: { nick },
      });
      setMySecretPosts(data.data);
    };

    getData1();
    getData2();

    postNullCheck();
  }, []);

  const postNullCheck = () => {
    if (myPosts.length || mySecretPosts.length !== 0) {
      setPostOX(true);
    }
  };
  return (
    <>
      {postOX ? (
        <>
          <div className="shadow overflow-auto">
            <table className="mt-5">
              <thead className="bg-gray-50 border">
                <tr className="whitespace-nowrap">
                  <th className="px-6 py-2 text-xs text-gray-500 ">No</th>
                  <th className="px-6 py-2 text-xs text-gray-500">제목</th>
                  <th className="px-6 py-2 text-xs text-gray-500">작성일</th>
                  <th className="px-6 py-2 text-xs text-gray-500">조회수</th>
                </tr>
              </thead>

              {myPosts.map((myPost, index) => (
                <tbody key={index} className="bg-white divide-y divide-gray-300 border">
                  <tr className="whitespace-nowrap">
                    <td className="px-6 py-4 text-sm text-gray-500 text-center tdWidth">{myPost.id}</td>
                    <td className="px-6 py-4 TitleWidth">
                      <Link to={`/postDetailPage/${myPost.id}`}>{myPost.title}</Link>
                      {/* <span className="text-violet-300 ml-3 tdWidth">{countPostComment(myPost.id)}</span> */}
                    </td>
                    <td className="px-6 py-4 text-sm text-center tdWidth ">
                      {moment(myPost.create_date).format("YY.MM.DD")}
                    </td>
                    <td className="px-6 py-4  text-sm  text-center tdWidth">{myPost.view}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>

          <div className="shadow overflow-auto">
            <table className="mt-5">
              <thead className="bg-gray-50 border">
                <tr className="whitespace-nowrap">
                  <th className="px-6 py-2 text-xs text-gray-500 ">No</th>
                  <th className="px-6 py-2 text-xs text-gray-500">제목</th>
                  <th className="px-6 py-2 text-xs text-gray-500">작성일</th>
                  <th className="px-6 py-2 text-xs text-gray-500">조회수</th>
                </tr>
              </thead>

              {mySecretPosts.map((mySecretPost, index) => (
                <tbody key={index} className="bg-white divide-y divide-gray-300 border">
                  <tr className="whitespace-nowrap">
                    <td className="px-6 py-4 text-sm text-gray-500 text-center tdWidth">{mySecretPost.id}</td>
                    <td className="px-6 py-4 TitleWidth">
                      <Link to={`/postDetailPage/${mySecretPost.id}`}>{mySecretPost.title}</Link>
                      {/* <span className="text-violet-300 ml-3 tdWidth">{countPostComment(myPost.id)}</span> */}
                    </td>
                    <td className="px-6 py-4 text-sm text-center tdWidth ">
                      {moment(mySecretPost.create_date).format("YY.MM.DD")}
                    </td>
                    <td className="px-6 py-4  text-sm  text-center tdWidth">{mySecretPost.view}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </>
      ) : (
        <div className="bg-white divide-y divide-gray-300 border postOXWidth mt-5">게시물이 없습니다.</div>
      )}
    </>
  );
};

export default MyPost;
