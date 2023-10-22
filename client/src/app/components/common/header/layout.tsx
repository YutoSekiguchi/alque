import Image from "next/image";
import Link from 'next/link';
import ChangeIcon from "./change_icon";
import UserButton from "./user_button";
import NewButton from "./new_button";

const Header: () => JSX.Element = () => {

  return (
    <header>
      <div className="p-4 w-20 h-screen flex flex-col items-center justify-between border-right fixed">
        <div>
          <Image
            src="/icon.png"
            alt="アルクエ"
            className="mx-auto rounded-full"
            width={60}
            height={60} />
          <ul>
            <li className="mb-2 w-10 h-10 header-icon-wrapper flex items-center justify-center rounded-full mx-auto">
              <Link href="/home">
                <ChangeIcon type="home" />
              </Link>
            </li>
            <li className="mb-2 w-10 h-10 header-icon-wrapper flex items-center justify-center rounded-full mx-auto">
              <Link href="/group">
                <ChangeIcon type="group" />
              </Link>
            </li>
            <li className="mb-2 w-10 h-10 header-icon-wrapper flex items-center justify-center rounded-full mx-auto">
              <Link href="/settings">
                <ChangeIcon type="settings" />
              </Link>
            </li>
            <li className="my-4">
              <NewButton />
            </li>
          </ul>
        </div>
        <div className="mb-8">
          <UserButton />
        </div>
      </div>
    </header>
  );
}

export default Header;