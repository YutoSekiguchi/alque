interface Props {
  title: string;
}

const Title: (props: Props) => JSX.Element = (props: Props) => {
  const { title } = props;
  return (
    <h1 className="text-lg font-bold pb-2">{title}</h1>
  );
}

export default Title;