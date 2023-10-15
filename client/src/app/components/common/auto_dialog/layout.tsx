import { Dispatch, SetStateAction, useEffect } from "react";

interface Props {
  text: string;
  setIsShow: Dispatch<SetStateAction<boolean>>
}

const AutoDialog: (props: Props) => JSX.Element = (props: Props) => {
  const { text, setIsShow } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShow(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);


  return(
    <div
      className="fixed top-0 left-0 w-full h-full dialog-background"
      id="exampleModal"
    >
      <div className="dialog p-6 rounded-xl my-32 mx-auto w-2/4 text-center">
        {text}
      </div>
    </div>
  );
}

export default AutoDialog;