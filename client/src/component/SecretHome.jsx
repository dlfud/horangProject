import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SecretPostListInput from "./SecretPostListInput";
import "../index.css";


const SecretHomeR = () => {
    const [secretPost, setSecretPost] = useState([]);
    const [secretPostComment, setSecretPostComment] = useState([]);
    const [limit, setLimit] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        const getData1 = async () => {
            const secretPost = await axios({
              url: `http://localhost:5000/secretPost`,
              method: "GET",
            });
            setSecretPost(secretPost.data);
          };
      
          const getData2 = async () => {
            const secretPostComment = await axios({
              url: `http://localhost:5000/secretPostCommentCount`,
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

        <div className="grid gap-4 place-content-center">

            <div>
                <p className="font-bold text-2xl"> 게시물</p>
            </div>
            <label>
                페이지 당 표시할 게시물 수:&nbsp;
                <select
                    type="number"
                    value={limit}
                    onChange={({ target: { value } }) => setLimit(Number(value))}
                >
                    <option value="10">10</option>
                    <option value="12">12</option>
                    <option value="20">20</option>
                </select>
                <input
                    onClick={handleLogout}
                    value="로그아웃"
                    type="button"
                ></input>
            </label>

            <SecretPostListInput limit={limit} secretPost={secretPost} secretPostComment={secretPostComment}/>

        </div>
    );
}

export default SecretHomeR;