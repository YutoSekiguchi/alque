const UnComplete = () => {
  return (
    <div className="uncomplete py-6 fixed w-full flex justify-center items-center">
      <div className="uncomplete__container">
        <div className="uncomplete__container__content text-center">
          <h1 className="font-bold">未実装</h1>
          <p>実装されるまでお待ちください</p>
        </div>
      </div>
    </div>
  );
}

export default UnComplete;