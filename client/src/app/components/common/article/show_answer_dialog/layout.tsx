import { AnswerDataType } from "@/@types/answer";
import ModalImageLayout from "../../modal_image/layout";
import ShowAnswerDialogData from "./data";

interface Props {
  handleCloseShowAnswer: () => void;
  articleAnswerData: AnswerDataType[];
  answerImageUrl: string;
  questionID: number;
}

const ShowAnswerDialog = (props: Props) => {
  const { handleCloseShowAnswer, articleAnswerData, answerImageUrl, questionID } = props;

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full dialog-background z-50 overflow-scroll flex"
        id="exampleModal"
      >
        <div className="dialog p-6 rounded-xl w-[90%] m-auto">
          <div className="flex items-center justify-center">
            <div className="w-[45%] mx-auto">
              <div className="mb-1">
                答え画像
              </div>
              <ModalImageLayout
                imageURL={answerImageUrl}
                alt="解答画像"
              />
            </div>
            <div className="w-[45%] mx-auto">
              <ShowAnswerDialogData articleAnswerData={articleAnswerData} questionID={questionID} />
            </div>
          </div>
          <div className="flex items-center justify-around mt-6">
            <div onClick={handleCloseShowAnswer}>
              <button className={` border hover:bg-gray-100 dark:hover:bg-gray-700 px-10 py-3 rounded-md`}>
                閉じる
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowAnswerDialog;
