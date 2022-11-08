import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../../configIp";

const Create = ({ method, onoff }) => {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  let memberId = "익명";
  let sort = "";

  if (method === "0") {
    sort = "post";
  } else {
    sort = "secretPost";
  }

  if (onoff) {
    memberId = window.sessionStorage.getItem("id");
  }

  return (
    <>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const data = await axios({
              url: `${url}/${sort}Create`,
              method: "POST",
              data: {
                title,
                content,
                member_id: memberId,
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
              alert("게시물 생성이 완료되었습니다.");
            } else {
              alert("오류가 발생하였습니다.");
            }
          }}

        >
         <table border="1" width="360px" align="center" className="content-around h-40">
              <tr>
                <td width="100px" className="text-center">제목</td>
                <td align="left" width="200px">
                  <input
                    type="text"
                    size="20"
                    placeholder="제목"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    className="rounded-lg text-xs px-6 py-1 text-center"
                  ></input>
                </td>
              </tr>
              <tr>
                <td width="100px" className="text-center">내용</td>
                <td align="left" width="200px">
                  <input
                    type="password"
                    size="20"
                    placeholder="내용"
                    value={content}
                    onChange={(e) => {
                     setContent(e.target.value);
                    }}
                    className="rounded-lg text-xs px-6 py-1 text-center"
                  ></input>
                </td>
              </tr>
             
              <tr>
                <td width="100px"></td>
                <td align="left" width="200px" className="text-xs text-red-500">
                 제목과 내용을 입력하여 주세요
                </td>
              </tr>
	             <tr>
                <td width="100px"></td>
                <td align="right" width="200px">
                 <button type="submit"
                  className="text-gray-400 Main text-sm rounded-lg py-1 px-10">확인</button>
                </td>
              </tr>
            </table>
        </form>
      </div>
    </>
  );
};

export default Create;
