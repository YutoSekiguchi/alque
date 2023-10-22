interface Props {
  label: string;
  px?: number;
  py?: number;
  disabled?: boolean;
}

const SubmitButton: (props: Props) => JSX.Element = (props: Props) => {
  const { label, px, py, disabled } = props;
  return(
    <>
      <button className={`bg-blue-400 px-${px? px: 10} py-${py? py: 3} rounded-md text-white`} disabled={disabled? disabled: false}>
        {label}
      </button>
    </>
  )
}

export default SubmitButton;