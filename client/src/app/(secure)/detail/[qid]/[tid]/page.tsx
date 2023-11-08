import Title from "@/app/components/common/title";
import DetailMainLayout from "@/app/components/detail/main/layout";
import { HeroiconsOutlineArrowLeft } from "@/app/components/icons/back";
import Link from "next/link";

const Detail: () => JSX.Element = () => {
  return (
    <div className="mb-64">
      <div className="pt-[1rem] pl-[1rem] border-bottom flex items-center">
        <Link href="/home">
          <HeroiconsOutlineArrowLeft className="mb-2 mr-2" />
        </Link>
        <Title title={"ポストする"} />
      </div>
      <div className="w-full flex justify-between">
        <DetailMainLayout />
      </div>
    </div>
  );
}

export default Detail;