import Title from "../components/common/title";
import AddGroup from "../components/group/add/layout";

const Group: () => JSX.Element = () => {
  return (
    <div className="main">
      <Title title={"グループ"} />
      <div className="w-full">
        <AddGroup />
      </div>
    </div>
  );
}

export default Group;