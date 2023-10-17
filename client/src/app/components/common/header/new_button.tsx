"use client";

import { useRouter } from 'next/navigation';
import { BxListPlus } from '../../icons/new';

const NewButton: () => JSX.Element = () => {
  const router = useRouter();
  const moveNewPage = () => {
    router.push("/new");
  }
  return(
    <>
        <button className='rounded-full bg-blue-400 w-12 h-12 text-white hover:bg-blue-500' onClick={moveNewPage}>
          <BxListPlus className='w-6 h-6 mx-auto' />
        </button>
    </>
  );
}

export default NewButton;