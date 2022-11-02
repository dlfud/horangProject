import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import e from "cors";
import {url} from "../configIp";

const Join = () => {
 const [iderrMsg, setIderrMsg] = useState('');
 const [pwerrMsg, setPwerrMsg] = useState('');
 const [emailerrMsg, setEmailerrMsg] = useState('');


 const [idMemberErr, setIdMemberErr] = useState(false);
 const [pwMemberErr, setPwMemberErr] = useState(false);
 const [emailMemberErr, setEmailMemberErr] = useState(false);

  const idRef = useRef();
  const pwRef = useRef();
  const emailRef = useRef();
  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

  const navigate = useNavigate();

  const onchangeIdMember = () => {
    if (idRef.current.value.length < 1 || idRef.current.value.length > 9) {
      setIderrMsg("아이디는 1~8자에 맞춰 입력해주세요")
    }else{
      setIderrMsg("")
      setIdMemberErr(true);
    }
  }

  const onchangePwMember = () => {
    if ((pwRef.current.value.length < 10 || pwRef.current.value.length > 20)) {
      setPwerrMsg("비밀번호는 공백없는 10자리~20자리 이내로 입력해주세요")
    }else if((pwRef.current.value.search(/\s/)>-1)){
      setPwerrMsg("비밀번호는 공백없는 10자리~20자리 이내로 입력해주세요")
    }else{
      setPwerrMsg("");
      setPwMemberErr(true);
    }
  }

  const onchangeEmailMember = () => {
    if ((emailRegEx.test(emailRef.current.value)) === false) {
      setEmailerrMsg("이메일형식에 맞춰 입력해주세요")
    }else{
      setEmailerrMsg("");
      setEmailMemberErr(true);
    }
  }


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
      .post(`${url}/join`, {
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

      // checkID(e){
      //   e.preventDefault();
      //   console.log(this.idMemberErr.id)
      // }

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
                onChange={onchangeIdMember}
                placeholder="아이디를 입력하세요"
              ></input>
            </td>
          </tr>
          {iderrMsg}
          <tr>
            <td width="100px">패스워드</td>
            <td align="left" width="200px">
              <input
                type="password"
                name="pw"
                size="20"
                defaultValue=""
                ref={pwRef}
                 onChange={onchangePwMember}
                placeholder="비밀번호를 입력하세요"
              ></input>
            </td>
          </tr>
          {pwerrMsg}
          <tr>
            <td width="100px">이메일</td>
            <td align="left" width="200px">
              <input
                type="email"
                name="email"
                size="20"
                defaultValue=""
                ref={emailRef}
                onChange={onchangeEmailMember}
                placeholder="이메일을 입력하세요"
                required autofocus
              ></input>
            </td>
          </tr>
          {emailerrMsg}
          <tr>
            <td colSpan="2" align="center">
              <button
                type="button"
                onClick={handleMember}
                disabled={!(pwMemberErr&&idMemberErr&&emailMemberErr)}
              >
                회원가입
              </button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
  
};


export default Join;

