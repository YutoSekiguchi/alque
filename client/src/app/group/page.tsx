import Title from "../components/common/title";
import AddGroup from "../components/group/add/layout";
import GroupSearchLayout from "../components/group/search/layout";

const Group: () => JSX.Element = () => {
  return (
    <div className="main">
      <div className="w-full flex justify-between mb-4">
        <Title title={"グループ"} />
        <div className="mr-2">
          <AddGroup />
        </div>
      </div>
      <div>
        <GroupSearchLayout />
      </div>
    </div>
  );
}

export default Group;