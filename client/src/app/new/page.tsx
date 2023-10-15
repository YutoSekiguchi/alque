import SubmitButton from "../components/common/form/submit_button/layout";
import TextArea from "../components/common/form/text_area/layout";
import TextInput from "../components/common/form/text_input/layout";
import Title from "../components/common/title";

const New: () => JSX.Element = () => {
  return (
    <div className="main w-full">
      <Title title={"投稿を作成"} />
      <div className="w-full">
        <div className="mt-12">
          <TextInput
            label="画像URL"
            placeHolder="Image URL"
          />
        </div>
        <div className="mt-6">
          <TextArea
            label="問題文"
            placeHolder="Who is the man in this image?"
          />
        </div>
        <div className="mt-6">
          <TextArea
            label="コメント"
            placeHolder="This image is my favorite image."
          />
        </div>
        <div className="mt-6 ml-auto">
          <SubmitButton
            label="投稿する"
          />
        </div>
      </div>
    </div>
  );
};

export default New;
