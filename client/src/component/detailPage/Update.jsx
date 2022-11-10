import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../../configIp";

const Update = ({ method, id }) => {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [detail, setDetail] = useState([]);

  let sort = "";
  if (method === "0") {
    sort = "post";
  } else {
    sort = "secretPost";
  }

  useEffect(() => {
    const getData = async () => {
      const detail = await axios({
        url: `${url}/${sort}DetailPage/${id}`,
        method: "GET",
      });
      setDetail(...detail.data);
    };
    getData();
  }, []);

  return (
    <>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const data = await axios({
              url: `${url}/${sort}Update/${id}`,
              method: "POST",
              data: {
                title,
                content,
              },
            });

            if (data.data !== null) {
              nav(`/${sort}DetailPage/${id}`);
              console.log("성공");
            } else {
              console.log("오류");
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
                  placeholder={detail.title}
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
                  type="text"
                  size="20"
                  placeholder={detail.content}
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

export default Update;
