"use client";

import { useState } from "react";
import SubmitButton from "../../common/form/submit_button/layout";
import TextArea from "../../common/form/text_area/layout";
import TextInput from "../../common/form/text_input/layout";

const NewForm: () => JSX.Element = () => {
  const [imageURL, setImageURL] = useState<string>("");
  const [questionContext, setQuestionContext] = useState<string>("");
  const [questionComment, setQuestionComment] = useState<string>("");


  const handleChangeImageURL = (newValue: string) => {
    setImageURL(newValue);
  }
  const handleChangeQuestionContext = (newValue: string) => {
    setQuestionContext(newValue);
  };
  const handleChangeQuestionComment = (newValue: string) => {
    setQuestionComment(newValue);
  };

  return (
    <>
      <div className="mt-12">
        <TextInput
          label="画像URL"
          placeHolder="Image URL"
          handleChangeValue={handleChangeImageURL}
        />
      </div>
      <div className="mt-6">
        <TextArea
          label="問題文"
          placeHolder="Who is the man in this image?"
          handleChangeValue={handleChangeQuestionContext}
        />
      </div>
      <div className="mt-6">
        <TextArea
          label="コメント"
          placeHolder="This image is my favorite image."
          handleChangeValue={handleChangeQuestionComment}
        />
      </div>
      <div className="mt-6 ml-auto">
        <SubmitButton
          label="投稿する"
        />
      </div>
    </>
  );
}

export default NewForm;