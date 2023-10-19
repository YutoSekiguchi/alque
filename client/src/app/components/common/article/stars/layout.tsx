interface Props {
  questionLevel: number;
  size?: number;
  handleChangeQuestionLevel?: (newValue: number) => void;
}

const StarsLayout: (props: Props) => JSX.Element = (props: Props) => {
  const { questionLevel, size, handleChangeQuestionLevel } = props;
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((number) => (
        <div key={number} className="relative">
          <div
            className={`w-full ${questionLevel >= number ? 'text-yellow-500' : 'text-gray-300'}`}
            onClick={handleChangeQuestionLevel!==undefined? () => handleChangeQuestionLevel(number): () => {}}
          >
            <svg className={`h-${size!==undefined? size: 6} w-${size!==undefined? size: 6}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2l2.4 7.2h7.6l-6.2 4.56l2.4 7.2L12 16.4L5.8 21L8.2 13.76L2 9.2h7.6L12 2z" fill="currentColor"/>
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StarsLayout;