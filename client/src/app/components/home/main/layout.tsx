import ArticleListLayout from "../article_list/layout";
import GraphArea from "../graph_area/layout";
import { FavoriteCountDataType } from "@/@types/favorite";

interface Props {
  favoriteCountData: FavoriteCountDataType[];
}

const HomeMainLayout: (props: Props) => JSX.Element = (props: Props) => {
  const { favoriteCountData } = props;
  return (
    <>
      <div className="pt-4 w-[55%] border-right">
        <ArticleListLayout favoriteCountData={favoriteCountData} />
      </div>
      <div className="w-[40%] mx-auto fixed h-screen overflow-scroll left-[59%]">
        <GraphArea />
      </div>
    </>
  );
};

export default HomeMainLayout;