"use client";

import { usePathname } from "next/navigation";
import { MaterialSymbolsHouse } from "../../icons/home";
import { MaterialSymbolsHouseOutline } from "../../icons/home_outline";
import { RiSettings5Line } from "../../icons/settings_outline";
import { RiSettings5Fill } from "../../icons/settings";
import { BxBxsUserPlus } from "../../icons/add_group";
import { BxUserPlus } from "../../icons/add_group_outline";

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
      {
        type==="group" && 
        <>
          {pathname === "/group"?
            <BxBxsUserPlus className="header-icon" />
            :
            <BxUserPlus className="header-icon" />
          }
        </>
      }
    </>
  );
}

export default ChangeIcon;