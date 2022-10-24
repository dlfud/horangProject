import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = ({ method, onoff }) => {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //   const [member, setMember] = useState({});
  //   let memberId = window.sessionStorage.getItem("id");
  //   console.log(memberId);
  let sort = "";

  if (method === "0") {
    sort = "post";
  } else {
    sort = "secretPost";
  }

  //   if (onoff) {
  //     //로그인되어 있으면 회원정보 가져옴
  //     const getData1 = async () => {
  //       const member = await axios({
  //         url: `http://localhost:5000/member`,
  //         method: "GET",
  //         data: {
  //           memberId,
  //         },
  //       });
  //       console.log(member.data);
  //       setMember(...member.data);
  //     };

  //     getData1();
  //   }

  return (
    <>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const data = await axios({
              url: `http://localhost:3000/${sort}Create`,
              // 위의 주소는 5000번대가 아닌 3000번대로 (전송주소!)
              method: "POST",
              data: {
                title,
                content,
              },
            });

            if (data.data !== null) {
              if (sort === "post") {
                nav("/home");
              } else {
                nav("/secrethome");
              }
              //navigate 기능을 활용하여 Access-Control-Allow-Origin 관련 오류를 막을 수 있음?
              // 그냥 보내면 server에서 create를 못읽음
              console.log("성공");
            } else {
              console.log("오류");
            }
          }}
        >
          <div>
            <label>
              <strong>제목</strong>
            </label>
            <input
              type="text"
              placeholder="제목"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <label>
              <strong>내용</strong>
            </label>
            <input
              type="text"
              placeholder="내용"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <button type="submit">확인</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Create;
