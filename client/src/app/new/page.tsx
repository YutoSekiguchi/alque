import SubmitButton from "../components/common/form/submit_button/layout";
import TextArea from "../components/common/form/text_area/layout";
import TextInput from "../components/common/form/text_input/layout";
import Title from "../components/common/title";
import NewForm from "../components/new/form/layout";

const New: () => JSX.Element = () => {
  return (
    <div className="main w-full">
      <Title title={"投稿を作成"} />
      <div className="w-full">
        <NewForm />
      </div>
    </div>
  );
};

export default New;
