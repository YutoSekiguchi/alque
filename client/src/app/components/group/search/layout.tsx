"use client";

import { useEffect, useState } from "react";
import { TeamDataWithoutPasswordType } from "@/@types/team";
import { getAllTeams } from "@/services/team";
import GroupListLayout from "../group_list/layout";

const GroupSearchLayout: () => JSX.Element = () => {
  const [searchWord, setSearchWord] = useState<string>("");
  const [groups, setGroups] = useState<TeamDataWithoutPasswordType[]>([]);
  const [searchGroups, setSearchGroups] = useState<TeamDataWithoutPasswordType[]>([]);

  const handleChangeSearchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "" || e.target.value === null) {
      setSearchGroups([]);
      setSearchWord("");
      return;
    }
    setSearchWord(e.target.value);
  }

  useEffect(() => {
    const getGroups = async () => {
      if (groups.length !== 0) {
        return;
      }
      const res = await getAllTeams();
      if (res === null) {
        return;
      }
      setGroups(res);
    };
    getGroups();
  }, []);

  useEffect(() => {
    if (searchWord === "") {
      return;
    }
    const filterGroups = groups.filter((group) => {
      return group.Name.includes(searchWord);
    });
    setSearchGroups(filterGroups);
  }, [searchWord]);

  return (
    <div>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input type="search" id="default-search" className="block p-4 pl-10 text-sm w-full text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="新しいグループを探す" onChange={handleChangeSearchWord} />
          <button type="submit" className="text-white absolute right-2.5 bottom-2.5 outline hover:bg-gray-500 font-medium rounded-lg text-sm px-4 py-2 ">Search</button>
        </div>
      <div className="mt-3">
        {
          searchWord !== ""?
          <GroupListLayout groups={searchGroups} type={"search"} />
          :
          <GroupListLayout groups={groups} type={"yours"} />
        }
      </div>
    </div>
  );
};

export default GroupSearchLayout;
