interface Props {
  alpha?: boolean;
}

const LoadingDialogLayout: (props: Props) => JSX.Element = (props: Props) => {
  const {alpha} = props;
  return (
    <div className="fixed top-0 left-0 dialog-background z-[100] flex w-full h-full items-center justify-center">
      <div className={`flex items-center space-x-4 px-24 py-12 rounded-xl ${!alpha && "bg-white"}`}>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-900 mr-4"></div>
        <div className="text-blue-500 text-lg font-bold">ローディング中...</div>
      </div>
    </div>
  );
}

export default LoadingDialogLayout;