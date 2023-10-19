interface Props {
  label: string;
  value: number;
  handleChangeValue: (newValue: number) => void;
  options: {label: string, value: number}[];
}

const SelectInput: (props: Props) => JSX.Element = (props: Props) => {
  const { label, value, handleChangeValue, options } = props;
  return (
    <div className="flex flex-col">
      <label className="block mb-2 text-sm font-medium">{label}</label>
      <select
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={value}
        onChange={(e) => {handleChangeValue(Number(e.target.value))}}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;