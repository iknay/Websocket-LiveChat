import { useCallback, useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { GoSmiley } from "react-icons/go";
import { IoSend } from "react-icons/io5";
import { useChatroomStore } from "../../zustand/chatroom";
import { socket } from "../../socket";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

const MessageBar = () => {
  const { username, chatroomName, addMessage } = useChatroomStore();

  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSendMessage = async () => {
    if (message !== "") {
      const messageData = {
        username: username,
        chatroomName: chatroomName,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      addMessage(messageData);
      setMessage("");
    }
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji);
    setShowEmojiPicker(false); // Hide the emoji picker after selecting an emoji
  };

  const handleReceiveMessage = useCallback(
    (data: any) => {
      addMessage(data);
    },
    [addMessage]
  );

  useEffect(() => {
    socket.on("receive_message", handleReceiveMessage);

    // Cleanup function to avoid multiple bindings
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [handleReceiveMessage]);

  return (
    <div className="flex w-full px-4 py-2 bg-white rounded-xl">
      <button onClick={() => setShowEmojiPicker((prev) => !prev)}>
        <GoSmiley className="size-5 text-primary" />
      </button>
      <Textarea
        className="border-transparent resize-none scrollbar"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            handleSendMessage();
            e.preventDefault();
          }
        }}
      />
      <button onClick={handleSendMessage}>
        <IoSend className="size-5 text-primary" />
      </button>

      {showEmojiPicker && (
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            right: "10px",
            zIndex: 1000,
          }}
        >
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default MessageBar;
