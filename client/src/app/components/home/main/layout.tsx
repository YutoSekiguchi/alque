import { ReactionCountDataType } from "@/@types/reaction";
import ArticleListLayout from "../article_list/layout";
import GraphArea from "../graph_area/layout";

interface Props {
  reactionCountData: ReactionCountDataType[];
}

const HomeMainLayout: (props: Props) => JSX.Element = (props: Props) => {
  const { reactionCountData } = props;
  return (
    <>
      <div className="pt-4 w-[55%] border-right">
        <ArticleListLayout reactionCountData={reactionCountData} />
      </div>
      <div className="w-[40%] mx-auto fixed h-screen overflow-scroll left-[59%]">
        <GraphArea />
      </div>
    </>
  );
};

export default HomeMainLayout;