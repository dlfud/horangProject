import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { url } from "../configIp";
import Pagination from "./Pagination";
import SecretPagination from "./SecretPagination";
import Nav from "./Nav";

const MyPost = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [mySecretPosts, setMySecretPosts] = useState([]);
  const [onoff, setOnoff] = useState(false);
  const nick = window.sessionStorage.getItem("id");
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const [secretPage, setSecretPage] = useState(1);
  const offset = (page - 1) * limit;

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

    const loginout = () => {
      console.log(window.sessionStorage.getItem("id"));
      if (window.sessionStorage.getItem("id") === null) {
        setOnoff(false);
      } else {
        setOnoff(true);
      }
    };

    loginout();

    getData1();
    getData2();
  }, []);

  return (
    <>
      <div className="flex Main">
        <div className=" px-3 Side w-70">
          <div className="space-y-3">
            <div className="flex-1">
              <Nav onoff={onoff} />
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-12 ">
          <div className="grid ">
            <div className="my-12">
              <div className="text-4xl">익명게시판</div>
              {myPosts.length !== 0 ? (
                <>
                  <div className="overflow-auto border-white border-b-8 pb-10">
                    <table className="mt-5">
                      <thead className="bg-gray-50">
                        <tr className="whitespace-nowrap">
                          <th className="px-6 py-2 text-xs text-gray-500 ">No</th>
                          <th className="px-6 py-2 text-xs text-gray-500">제목</th>
                          <th className="px-6 py-2 text-xs text-gray-500">작성일</th>
                          <th className="px-6 py-2 text-xs text-gray-500">조회수</th>
                        </tr>
                      </thead>

                      {myPosts.slice(offset, offset + limit).map((myPost, index) => (
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
                    <div className=" text-center">
                      <Pagination total={myPosts.length} limit={limit} page={page} setPage={setPage} />
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-white divide-y divide-gray-300 border postOXWidth mt-5 text-center mx-auto">
                  익명게시물이 없습니다.
                </div>
              )}
            </div>
            <div>
              <div className="text-4xl">비밀게시판</div>
              {mySecretPosts.length !== 0 ? (
                <>
                  <div className="overflow-auto ">
                    <table className="mt-5">
                      <thead className="bg-gray-50">
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
                    <div className=" text-center">
                      <SecretPagination
                        total={mySecretPosts.length}
                        limit={limit}
                        secretPage={secretPage}
                        setSecretPage={setSecretPage}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-white divide-y divide-gray-300 border postOXWidth mt-5 text-center mx-auto">
                  비밀게시물이 없습니다.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPost;
