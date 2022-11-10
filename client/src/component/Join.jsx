import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../configIp";

const Join = () => {
  const [iderrMsg, setIderrMsg] = useState("");
  const [pwerrMsg, setPwerrMsg] = useState("");
  const [passworderrMsg, setPassworderrMsg] = useState("");
  const [emailerrMsg, setEmailerrMsg] = useState("");

  const [idMemberErr, setIdMemberErr] = useState(false);
  const [pwMemberErr, setPwMemberErr] = useState(false);
  const [passwordMemberErr, setPasswordMemberErr] = useState(false);
  const [emailMemberErr, setEmailMemberErr] = useState(false);

  const [usingId, setUsingId] = useState(false);

  const idRef = useRef();
  const pwRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

  const navigate = useNavigate();

  const onchangeIdMember = () => {
    if (idRef.current.value.length < 1 || idRef.current.value.length > 9) {
      setIderrMsg("아이디는 1~8자에 맞춰 입력해주세요");
    } else {
      setIderrMsg("");
      setIdMemberErr(true);
    }
  };

  const onchangePwMember = () => {
    if (pwRef.current.value.length < 10 || pwRef.current.value.length > 20) {
      setPwerrMsg("비밀번호는 공백없는 10자리~20자리 이내로 입력해주세요");
    } else if (pwRef.current.value.search(/\s/) > -1) {
      setPwerrMsg("비밀번호는 공백없는 10자리~20자리 이내로 입력해주세요");
    } else {
      setPwerrMsg("");
      setPwMemberErr(true);
    }
  };

  const onchangePasswordMember = () => {
    if (pwRef.current.value !== passwordRef.current.value) {
      setPassworderrMsg("비밀번호가 일치하지 않습니다.");
    } else {
      setPassworderrMsg("");
      setPasswordMemberErr(true);
    }
  };

  const onchangeEmailMember = () => {
    if (emailRegEx.test(emailRef.current.value) === false) {
      setEmailerrMsg("이메일형식에 맞춰 입력해주세요");
    } else {
      setEmailerrMsg("");
      setEmailMemberErr(true);
    }
  };

  const handleMember = () => {
    if (usingId === false) {
      alert("아이디 중복 확인을 진행하여 주시길 바랍니다.");
      return false;
    }
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
  };

  const checkID = (e) => {
    e.preventDefault();
    axios
      .post(`${url}/idCheck`, {
        id: idRef.current.value,
      })
      .then((res) => {
        if (res.data[0].cnt === 1) {
          alert("아이디가 중복되었습니다.");
        } else {
          alert("사용가능한 아이디입니다.");
          setUsingId(true);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className="flex items-center justify-center mt-20">
      <div className="w-full max-w-lg px-10 py-8 mx-auto MainColor2 rounded-lg shadow-xl">
        <div className="max-w-md mx-auto space-y-6">
          <div className="border-b-4 border-white mb-4">
            <div className="flex justify-center text-white font-bold text-4xl mb-4">
              <p> JOIN</p>
            </div>
          </div>
          <form>
            <table border="1" width="360px" align="center" className="content-around h-40">
              <tr>
                <td width="100px" className="text-center text-white">
                  ID
                </td>
                <td align="left" width="200px">
                  <input
                    type="text"
                    name="id"
                    size="20"
                    defaultValue=""
                    ref={idRef}
                    onChange={onchangeIdMember}
                    placeholder="아이디를 입력하세요"
                    className="rounded-lg text-xs px-6 py-1 text-center"
                  ></input>
                </td>
                <td width="60px">
                  <button onClick={checkID} className="float-right mr-6 rounded-lg text-xs text-white">
                    확인
                  </button>
                </td>
              </tr>
              <tr>
                <td></td>
                <td align="left" width="20px" className="text-xs text-red-500">
                  {iderrMsg}
                </td>
              </tr>

              <tr>
                <td width="100px" className="text-center text-white">
                  PW
                </td>
                <td align="left" width="200px">
                  <input
                    type="password"
                    name="pw"
                    size="20"
                    defaultValue=""
                    ref={pwRef}
                    onChange={onchangePwMember}
                    placeholder="비밀번호를 입력하세요"
                    className="rounded-lg text-xs px-6 py-1 text-center"
                  ></input>
                </td>
              </tr>
              <tr>
                <td width="100px"></td>
                <td align="left" width="200px" className="text-xs text-red-500">
                  {pwerrMsg}
                </td>
              </tr>
              <tr>
                <td width="100px" className="text-center text-white">
                  PW 확인
                </td>
                <td align="left" width="200px">
                  <input
                    type="password"
                    name="password"
                    size="20"
                    defaultValue=""
                    ref={passwordRef}
                    onChange={onchangePasswordMember}
                    placeholder="비밀번호를 확인하세요"
                    className="rounded-lg text-xs px-6 py-1 text-center"
                  ></input>
                </td>
              </tr>
              <tr>
                <td width="100px"></td>
                <td align="left" width="200px" className="text-xs text-red-500">
                  {passworderrMsg}
                </td>
              </tr>
              <tr>
                <td width="100px" className="text-center text-white">
                  Email
                </td>
                <td align="left" width="200px">
                  <input
                    type="email"
                    name="email"
                    size="20"
                    defaultValue=""
                    ref={emailRef}
                    onChange={onchangeEmailMember}
                    placeholder="이메일을 입력하세요"
                    className="rounded-lg text-xs px-6 py-1 text-center"
                    required
                    autofocus
                  ></input>
                </td>
              </tr>
              <tr>
                <td width="100px"></td>
                <td align="left" width="200px" className="text-xs text-red-500">
                  {emailerrMsg}
                </td>
              </tr>
            </table>
            <div className="flex justify-center mt-3">
              <button
                className="text-gray-400 Main text-sm rounded-lg py-1 px-32"
                type="button"
                onClick={handleMember}
                disabled={!(passwordMemberErr && pwMemberErr && idMemberErr && emailMemberErr)}
              >
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Join;
