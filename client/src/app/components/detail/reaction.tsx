import { UserDataType } from "@/@types/user"

interface Props {
  user: UserDataType;
  reactionSentence: string;
  reactionDate: string;
}

const Reaction = (props: Props) => {
  const { user, reactionSentence, reactionDate } = props;

  return (
    <div className="reaction-list flex items-start py-3 px-2.5 border-bottom">
      <div className="reaction-list__user-image min-w-[40px] w-[40px] mr-3">
        <img src={user.Image} alt="ユーザ画像" className="rounded-full" />
      </div>
      <div className="w-full">
        <div className="flex">
          <div className="reaction-list__user-name text-sm font-semibold mr-3 mb-1">
            {user.Name}
          </div>
          <div className="reaction-list__user-name text-sm ml-auto mr-3 mb-1 text-gray-600 dark:text-gray-400">
            {reactionDate}
          </div>
        </div>
        <div className="reaction-list__reaction-sentence text-sm whitespace-pre-wrap">
          {reactionSentence}
        </div>
      </div>
    </div>
  );
}

export default Reaction;