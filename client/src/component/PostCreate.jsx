import { useEffect } from "react";
import { useState } from "react";
import Create from "./detailPage/Create.jsx";

const PostCreate = () => {
  const [onoff, setOnoff] = useState(false);

  useEffect(() => {
    const loginout = () => {
      console.log(window.sessionStorage.getItem("id"));
      if (window.sessionStorage.getItem("id") === null) {
        setOnoff(false);
      } else {
        setOnoff(true);
      }
    };

    loginout();
  }, []);

  return (
    <>
      <h1>익명 게시물 업로드</h1>
      <div>
        <Create method="0" onoff={onoff} />
      </div>
    </>
  );
};

export default PostCreate;
