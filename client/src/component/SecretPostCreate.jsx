import { useEffect, useState } from "react";
import Create from "./detailPage/Create.jsx";

const SecretPostCreate = () => {
  const [onoff, setOnoff] = useState(false);

  useEffect(() => {
    const loginout = () => {
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
      <div class="flex items-center justify-center mt-20">
        <div class="w-full max-w-lg px-10 py-8 mx-auto MainColor2 rounded-lg shadow-xl">
          <div class="max-w-md mx-auto space-y-6">
            <div className="flex justify-center font-bold text-2xl mb-4">비밀 게시물 업로드</div>
            <div className="border-b-8  border-white  mb-4"></div>
            <div>
              <Create method="1" onoff={onoff} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecretPostCreate;
