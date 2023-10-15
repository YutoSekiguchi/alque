interface Props {
  label: string;
}

const SubmitButton: (props: Props) => JSX.Element = (props: Props) => {
  const { label } = props;
  return(
    <>
      <button className="bg-blue-400 px-10 py-3 rounded-md text-white">
        {label}
      </button>
    </>
  )
}

export default SubmitButton;