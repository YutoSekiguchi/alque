import { ReactionWithUserDataType } from "@/@types/reaction";
import { userAtom } from "@/jotai/user";
import { convertToJST } from "@/modules/transform_from_created_at";
import { getReactionsByQID } from "@/services/reaction";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import Reaction from "./reaction";

interface Props {
  questionID: number;
  isChange: boolean;
}

const ReactionList: (props: Props) => JSX.Element = (props: Props) => {
  const { questionID, isChange } = props;
  const [user, ] = useAtom(userAtom);
  const [reactions, setReactions] = useState<ReactionWithUserDataType[]>([]);

  const getReactions = async() => {
    if (user === null) return;
    const res = await getReactionsByQID(questionID, user.Mail);
    if (res === null) return;
    setReactions(res);
  }


  useEffect(() => {
    getReactions();
  } , [isChange]);

  return (
    <div>
      {
        reactions.map((reaction) => {
          return (
            <Reaction
              user={reaction.User}
              reactionSentence={reaction.Reaction.ReactionSentence}
              reactionDate={convertToJST(reaction.Reaction.CreatedAt)}
            />
          );
        }
        )
      }
    </div>
  );
};

export default ReactionList;