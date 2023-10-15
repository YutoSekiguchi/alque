interface Props {
  label: string;
}

const SubmitButton: (props: Props) => JSX.Element = (props: Props) => {
  const { label } = props;
  return(
    <>
      <button className="bg-sky-500 px-10 py-3 rounded-md">
        {label}
      </button>
    </>
  )
}

export default SubmitButton;