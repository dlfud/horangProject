import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import SecretPostListInput from "./SecretPostListInput";
import "../index.css";
import SecretPagination from "./SecretPagination"
import {url} from "../configIp";

/* 게시판 */

const SecretHomeR = () => {
    const [secretPost, setSecretPost] = useState([]);
    const [secretPostComment, setSecretPostComment] = useState([]);
    const [secretPage, setSecretPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const offset = (secretPage - 1) * limit;
    const navigate = useNavigate();
    const [searchTitle, setSearchTitle] = useState("");
    const [search, setSearch] = useState([]);

    useEffect(() => {
        const getData1 = async () => {
            const secretPost = await axios({
                url: `${url}/secretPost`,
                method: "GET",
            });
            setSecretPost(secretPost.data);
        };

        const getData2 = async () => {
            const secretPostComment = await axios({
                url: `${url}/secretPostCommentCount`,
                method: "GET",
            });
            setSecretPostComment(secretPostComment.data);
        };
        getData1();
        getData2();
    }, []);

    const handleLogout = () => {
        console.log("로그아웃");
        window.sessionStorage.clear();
        console.log(
            "로그아웃 완료", window.sessionStorage.getItem("id")
        );
        navigate("/");
    }



    return (

        <div className="flex Main">
            <div className=" px-3 Side w-70">
                <div className="space-y-3">
                    <div className="flex-1">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            <li className="rounded-sm">
                                <form
                                    onSubmit={async (e) => {
                                        e.preventDefault();
                                        const search = await axios({
                                            url: `${url}/secretSearch`,
                                            method: "POST",
                                            data: {
                                                searchTitle
                                            }
                                        });
                                        console.log(search.data);
                                        setSearch(search.data);
                                        navigate("/secrethome");
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
                            </li>
                            <li className="rounded-sm">
                                <Link to="/home"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-8 h-8 "
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                        />
                                    </svg>
                                    <span className="text-base">익명게시판</span>
                                </Link>
                            </li>
                            <li className="rounded-sm">
                                <Link to="/secrethome"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-8 h-8 "
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                        />
                                    </svg>
                                    <span className="text-base">게시판</span>
                                </Link>
                            </li>
                            <li className="rounded-sm">
                                <a
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-8 h-8"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <span className="text-base">내글조회</span>
                                </a>
                            </li>
                            <li className="rounded-sm">
                                <a
                                    onClick={handleLogout}
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-8 h-8"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    <span className="text-base">Logout</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container mx-auto mt-12">
                <div className="grid ">
                    <div>
                        <label>
                            페이지 당 표시할 게시물 수:&nbsp;
                            <select
                                type="number"
                                value={limit}
                                onChange={({ target: { value } }) => setLimit(Number(value))}
                            >
                                <option value="10">10</option>
                                <option value="14">14</option>
                                <option value="18">18</option>
                            </select>
                        </label>
                    </div>
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                        <div >
                            <SecretPostListInput offset={offset} limit={limit} secretPost={secretPost} secretPostComment={secretPostComment} />
                        </div>
                    </div>
                    <div className="w-full px-4 py-5 mt-2 bg-white rounded-lg shadow overflow-auto max-h-96">
                        <table className="">
                            <thead className="bg-gray-50 border">
                                <tr className="whitespace-nowrap">
                                    <th className="px-6 py-2 text-xs text-gray-500 ">No</th>
                                    <th className="px-6 py-2 text-xs text-gray-500 SearchTitleWidth">제목</th>
                                </tr>
                            </thead>
                            {search.map((search, index) => (
                                <tbody
                                    key={index}
                                    className="bg-white divide-y divide-gray-300 border "
                                >
                                    <tr className="whitespace-nowrap">
                                        <td className="px-6 py-4 text-sm text-gray-500 text-center tdWidth">
                                            {search.id}
                                        </td>
                                        <td className="px-6 py-4 SearchTitleWidth ">
                                            <Link to={`/secretPostDetailPage/${secretPost.id}`}>
                                                {search.title}
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
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
            </div>
        </div>
    );
}

export default SecretHomeR;