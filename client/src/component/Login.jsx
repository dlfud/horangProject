import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../configIp";

const Login = () => {
    const idRef = useRef();
    const pwRef = useRef();

    const navigate = useNavigate();

    const handleLogin = () => {
        if (idRef.current.value === "" || idRef.current.value === undefined) {
            alert("아이디를 입력하세요");
            idRef.current.focus();
            return false;
        }
        if (pwRef.current.value === "" || pwRef.current.value === undefined) {
            alert("패스워드를 입력하세요");
            pwRef.current.focus();
            return false;
        }

        console.log(
            "LoginForm:window.sessionStorage(login_id) =>",
            window.sessionStorage.getItem("id")
        );

        axios
            .post(`${url}/login`, {
                id: idRef.current.value,
                pw: pwRef.current.value,
            })
            .then((res) => {
                console.log("handleLogin =>", res);
                if (res.data[0].cnt === 1) {
                    window.sessionStorage.setItem("id", idRef.current.value);
                    // 세션스토리지에 key : id , value : idRef.current.value로 저장
                    // sessionsStorage는 창 닫으면 사라짐, localStorage는 안사라짐
                    navigate("/secrethome");
                } else {
                    alert("아이디, 패스워드가 정확하지 않습니다.");
                    idRef.current.value = "";
                    pwRef.current.value = "";
                    navigate("/");
                }
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const handleMemberForm = () => {
        navigate("/Join"); // 해당 url로 바로 이동
    };

    const handleNoLogin = () => {
        navigate("/Home");
    }

    return (
        <div >
            <div class='flex items-center justify-center mt-20'>
                <div class='w-full max-w-lg px-10 py-8 mx-auto MainColor2 rounded-lg shadow-xl'>
                    <div class='max-w-md mx-auto space-y-6'>
                        <div className="border-b-4 border-white mb-4">
                            <div className="flex justify-center text-white font-bold text-4xl mb-4">
                                <p> LOGIN</p>
                            </div>
                        </div>
                        <form>
                            <table border="1" width="300px" align="center" className="content-around h-28">
                                <tr>
                                    <td width="100px" className="text-white">아이디</td>
                                    <td align="left" width="200px">
                                        <input
                                            type="text"
                                            name="id"
                                            size="20"
                                            ref={idRef}
                                            placeholder="아이디를 입력하세요"
                                            className="rounded-lg text-xs px-6 py-1 text-center"
                                        ></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="100px" className="text-white">패스워드</td>
                                    <td align="left" width="200px">
                                        <input
                                            type="password"
                                            name="pw"
                                            size="20"
                                            ref={pwRef}
                                            placeholder="비밀번호를 입력하세요"
                                            className="rounded-lg text-xs px-6 py-1 text-center"
                                        ></input>
                                    </td>
                                </tr>
                            </table>
                            <div className="flex flex-col text-center mt-3">

                                <div>
                                    <input
                                        type="button"
                                        value="로그인"
                                        onClick={handleLogin}
                                        className="text-gray-400 Main text-sm rounded-lg py-1 px-32"
                                    ></input>
                                </div>
                                <div className="border-b-4 border-white pb-4 my-2">
                                <div>
                                    <input
                                        type="button"
                                        value="회원가입"
                                        onClick={handleMemberForm}
                                        className="text-sm text-white"
                                    ></input>
                                </div>
                                </div>
                                <div>
                                    <input
                                        onClick={handleNoLogin}
                                        value="로그인 없이 이용"
                                        className="text-gray-400 Main text-sm rounded-lg py-1 px-32 mt-3"
                                        type="button"
                                    ></input>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;