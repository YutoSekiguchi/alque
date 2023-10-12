"use client";

import { usePathname } from "next/navigation";
import { MaterialSymbolsHouse } from "../../icons/home";
import { MaterialSymbolsHouseOutline } from "../../icons/home_outline";
import { RiSettings5Line } from "../../icons/settings_outline";
import { RiSettings5Fill } from "../../icons/settings";

interface Props {
  type: string;
}

const ChangeIcon: (props: Props) => JSX.Element = (props: Props) => {
  const { type } = props
  const pathname = usePathname();
  return (
    <>
      {
        type==="home"&&
        <>
          {pathname === "/home"?
            <MaterialSymbolsHouse className="header-icon" />
            :
            <MaterialSymbolsHouseOutline className="header-icon" />
          }
        </>
      }
      {
        type==="settings"&&
        <>
          {pathname === "/settings"?
            <RiSettings5Fill className="header-icon" />
            :
            <RiSettings5Line className="header-icon" />
          }
        </>
      }
    </>
  );
}

export default ChangeIcon;