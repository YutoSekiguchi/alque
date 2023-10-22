import Title from "../components/common/title";
import HomeMainLayout from "../components/home/main/layout";

const Home: () => JSX.Element = () => {
  return (
    <div className="mb-64">
      <div className="pt-[1rem] pl-[1rem] border-bottom">
        <Title title={"ホーム"} />
      </div>
      <div className="w-full flex justify-between">
        <HomeMainLayout />
      </div>
    </div>
  );
}

export default Home;