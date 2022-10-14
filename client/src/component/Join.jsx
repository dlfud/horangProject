import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCallback } from "react";

const Join = () => {

  const idRef = useRef();
  const pwRef = useRef();
  const emailRef = useRef();

  const navigate = useNavigate();

  const handleMember = () => {
    if (idRef.current.value === "" || idRef.current.value === undefined) {
      alert("아이디를 입력해주세요");
      idRef.current.focus();
      return false;
    }
    if (pwRef.current.value === "" || pwRef.current.value === undefined) {
      alert("패스워드를 입력해주세요");
      pwRef.current.focus();
      return false;
    }
    if (emailRef.current.value === "" || emailRef.current.value === undefined) {
      alert("이메일을 입력해주세요");
      emailRef.current.focus();
      return false;
    }

    axios
      .post("http://localhost:3000/join", {
        id: idRef.current.value,
        pw: pwRef.current.value,
        email: emailRef.current.value,
      })
      .then((res) => {
        console.log("handleMember =>", res);
        // 로그인 성공여부는 res.data.affectedRows가 0인지 1인지 확인하면 됨
        if (res.data !== null) alert("회원가입 성공");
        else alert("회원가입 실패");
        navigate("/");
      })
      .catch((e) => {
        console.error(e);
      });
  }
  
  return (
    <div>
      <p></p>
      <form>
        <table border="1" width="300px" align="center">
          <tr>
            <td width="100px">아이디</td>
            <td align="left" width="200px">
              <input
                type="text"
                name="id"
                size="20"
                defaultValue=""
                ref={idRef}
                placeholder="아이디를 입력하세요"
              ></input>
            </td>
          </tr>
          <tr>
            <td width="100px">패스워드</td>
            <td align="left" width="200px">
              <input
                type="password"
                name="pw"
                size="20"
                defaultValue=""
                ref={pwRef}
                placeholder="비밀번호를 입력하세요"
              ></input>
            </td>
          </tr>
          <tr>
            <td width="100px">이메일</td>
            <td align="left" width="200px">
              <input
                type="email"
                name="email"
                size="20"
                defaultValue=""
                ref={emailRef}
                placeholder="이메일을 입력하세요"
                required autofocus
              ></input>
            </td>
          </tr>
          <tr>
            <td colSpan="2" align="center">
              <button
                type="button"
                onClick={handleMember}
              >회원등록</button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
  
};


export default Join;

