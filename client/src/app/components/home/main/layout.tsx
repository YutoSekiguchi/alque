import ArticleListLayout from "../article_list/layout";

const HomeMainLayout: () => JSX.Element = () => {
  return (
    <>
      <div className="pt-4 w-[55%] border-right">
        <ArticleListLayout />
      </div>
      <div className="w-[40%]">

      </div>
    </>
  );
};

export default HomeMainLayout;