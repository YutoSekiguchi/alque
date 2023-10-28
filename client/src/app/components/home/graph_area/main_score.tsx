interface Props {
  accuracy: number;
  totalCorrectCount: number;
}

const MainScore = (props: Props) => {
  const { accuracy, totalCorrectCount } = props;

  return (
    <>
    {
      accuracy&&totalCorrectCount&&
      <div className="flex items-center justify-around p-6 border-all rounded-xl">
        <p>スコア<span className="ml-2 text-4xl font-extrabold text-blue-500">{Math.round(accuracy * 100)/100}</span></p>
        <p>正解数<span className="ml-2 text-4xl font-extrabold text-green-500">{totalCorrectCount}</span></p>
      </div>
    }
    </>
  );
}

export default MainScore;