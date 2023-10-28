import ArticleListLayout from "../article_list/layout";
import GraphArea from "../graph_area/layout";

const HomeMainLayout: () => JSX.Element = () => {
  return (
    <>
      <div className="pt-4 w-[55%] border-right">
        <ArticleListLayout />
      </div>
      <div className="w-[40%] mx-auto fixed h-screen overflow-scroll left-[59%]">
        <GraphArea />
      </div>
    </>
  );
};

export default HomeMainLayout;