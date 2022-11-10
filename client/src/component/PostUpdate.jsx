import Update from "./detailPage/Update.jsx";
import { useParams } from "react-router-dom";

const PostUpdate = () => {
  const { id } = useParams();
  return (
    <>
      <div class='flex items-center justify-center mt-20'>
        <div class='w-full max-w-lg px-10 py-8 mx-auto MainColor2 rounded-lg shadow-xl'>
          <div class='max-w-md mx-auto space-y-6'>
            <div className="flex justify-center font-bold text-2xl mb-4">
              익명 게시물 수정
            </div>
            <div className="border-b-8 border-white mb-4"></div>
            <div>
              <Update method="0" id={id} />
            </div>
          </div>
        </div>
      </div>
    </>);
}

export default PostUpdate;