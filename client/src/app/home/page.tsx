import Title from "../components/common/title";
import HomeMainLayout from "../components/home/main/layout";
import { getFavoriteCountByQID } from "@/services/favorite";

const Home = async() => {
  
  const favoriteCountData = await getFavoriteCountByQID();
  return (
    <div className="mb-64">
      <div className="pt-[1rem] pl-[1rem] border-bottom">
        <Title title={"ホーム"} />
      </div>
      <div className="w-full flex justify-between">
        <HomeMainLayout favoriteCountData={favoriteCountData} />
      </div>
    </div>
  );
}

export default Home;