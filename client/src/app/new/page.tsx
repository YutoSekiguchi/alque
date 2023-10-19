import Title from "../components/common/title";
import NewMainLayout from "../components/new/main/layout";

const New: () => JSX.Element = () => {
  return (
    <div className="main w-full">
      <Title title={"投稿を作成"} />
      <div className="w-full flex">
        <NewMainLayout />
      </div>
    </div>
  );
};

export default New;
