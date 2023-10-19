import { useState } from "react";

interface Props {
  imageURL: string;
  alt: string;
}

const ModalImageLayout: (props: Props) => JSX.Element = (props: Props) => {
  const { imageURL, alt } = props;
  const [isShowModal, setIsShowModal] = useState<boolean>(false); 

  const handleShowModal = () => {
    setIsShowModal(true);
  }

  const handleCloseModal = () => {
    setIsShowModal(false);
  }

  return(
    <div>
      <img src={imageURL} alt={alt} onClick={handleShowModal} className="rounded-xl" />
      {
        isShowModal&&
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={handleCloseModal}>
          <img src={imageURL} alt={alt} className="rounded-xl" />
        </div>
      }
    </div>
  );
};

export default ModalImageLayout;