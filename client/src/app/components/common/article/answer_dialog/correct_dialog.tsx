interface Props {
  handleCloseDialog: () => void;
  correct: boolean;
}

const CorrectDialog: (props: Props) => JSX.Element = (props: Props) => {
  const { handleCloseDialog, correct } = props;

  // ダイアログ本体がクリックされたときに、外側のハンドラが発火するのを防ぐためのハンドラ
  const handleDialogClick = (e: React.MouseEvent) => {
    // e.stopPropagation();
  };

  return (
    <div className="fixed top-0 left-0 dialog-background z-[100] flex w-full h-full items-center justify-center cursor-pointer" onClick={handleCloseDialog}>
      <div className="bg-white px-24 w-[90%] py-12 rounded-xl text-center cursor-not-allowed" onClick={handleDialogClick}>
        <img src={correct? "/correct.jpg": "/mistake.jpg"} alt={correct?"正解": "不正解"} className="w-[40%] h-[40%] mx-auto" />
        <div className="text-blue-500 text-lg font-bold">{correct? "正解！！！": "不正解…"}</div>
        {
          !correct&&
          <div className="text-blue-500 text-lg font-bold">もう一度チャレンジしてみよう</div>
        }
      </div>
    </div>
  );
}

export default CorrectDialog;