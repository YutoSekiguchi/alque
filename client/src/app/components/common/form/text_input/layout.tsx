interface Props {
  label: string;
  placeHolder: string;
  handleChangeValue: (newValue: string) => void;
}

const TextInput: (props: Props) => JSX.Element = (props: Props) => {
  const { label, placeHolder, handleChangeValue } = props;
  const handleInputChange = (event: any) => {
    const value = event.target.value;
    console.log(value);
    handleChangeValue(value);
  };
  return (
    <>
      <label htmlFor="question_image" className="block mb-2 text-sm font-medium">{label}</label>
      <input type="text" id="qusestion_image" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeHolder} onChange={handleInputChange}></input>
    </>
  );
}

export default TextInput;