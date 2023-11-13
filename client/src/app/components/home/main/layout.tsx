import { ReactionCountDataType } from "@/@types/reaction";
import ArticleListLayout from "../article_list/layout";
import GraphArea from "../graph_area/layout";
import { FavoriteCountDataType } from "@/@types/favorite";

interface Props {
  reactionCountData: ReactionCountDataType[];
  favoriteCountData: FavoriteCountDataType[];
}

const HomeMainLayout: (props: Props) => JSX.Element = (props: Props) => {
  const { reactionCountData, favoriteCountData } = props;
  return (
    <>
      <div className="pt-4 w-[55%] border-right">
        <ArticleListLayout reactionCountData={reactionCountData} favoriteCountData={favoriteCountData} />
      </div>
      <div className="w-[40%] mx-auto fixed h-screen overflow-scroll left-[59%]">
        <GraphArea />
      </div>
    </>
  );
};

export default HomeMainLayout;