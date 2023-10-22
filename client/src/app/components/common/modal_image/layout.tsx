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
      {
        imageURL!==""&&
        <img src={imageURL} alt={alt} onClick={handleShowModal} className="rounded-xl max-h-[400px] mx-auto" /> 
      }
      {
        isShowModal&&
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center overflow-scroll" onClick={handleCloseModal}>
          <img src={imageURL} alt={alt} className="rounded-xl w-[65%]" />
        </div>
      }
    </div>
  );
};

export default ModalImageLayout;