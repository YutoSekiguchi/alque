import { useEffect, useRef, useState } from "react";
import { userAtom } from "@/jotai/user";
import { useAtom } from "jotai";
import UserButton from "../common/header/user_button";
import SubmitButton from "../common/form/submit_button/layout";
import { PostReactionDataType } from "@/@types/reaction";
import { postReaction } from "@/services/reaction";

interface Props {
  questionID: number;
  setHnadleChange: () => void;
}

const PostMessageContainer: (props: Props) => JSX.Element = (props: Props) => {
  const { questionID, setHnadleChange } = props;
  const [message, setMessage] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [user, ] = useAtom(userAtom);
  const placeHolder = "返信をポスト";

  const handleSubmitReaction = async() => {
    if (user === null) return;
    if (message === "") {
      alert("返信が入力されていません");
      return
    }
    const postReactionData: PostReactionDataType = {
      UID: user.ID,
      QID: questionID,
      ReactionSentence: message,
    }
    await postReaction(postReactionData, user.Mail);
    setMessage("");
    setHnadleChange();
  }

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="post-message-container border-bottom pb-3">
      <div className="post-message-container__input flex px-2 pt-3">
        <div className="py-2.5">
          <UserButton />
        </div>
        <textarea className="transparent-form block pt-2.5 px-2.5 w-full text-lg text-gray-900 dark:placeholder-gray-400 dark:text-white placeholder:text-lg" placeholder={placeHolder} ref={textareaRef} value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      <div className="post-message-container__button mr-6">
        <div className="w-fit ml-auto" onClick={handleSubmitReaction}>
          <SubmitButton label="返信" px={4} py={2} />
        </div>
      </div>
    </div>
  );
}

export default PostMessageContainer;