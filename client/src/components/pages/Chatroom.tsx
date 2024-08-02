import background from "../../assets/ChatBackground.png";
import { useChatroomStore } from "../../zustand/chatroom";
import MessageBar from "../custom/MessageBar";
import { FaUser } from "react-icons/fa6";
import { TbCopy, TbCopyCheckFilled } from "react-icons/tb";
import Button from "../ui/button";
import { useState } from "react";

const Chatroom = () => {
  const { messageData, username, chatroomName } = useChatroomStore();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(chatroomName);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  return (
    <div className="max-w-[820px] h-screen px-8 mx-auto flex flex-col items-center justify-center">
      <div className="flex items-center justify-between w-full h-16 gap-1 px-6 bg-white rounded-t-3xl">
        <div className="flex gap-2">
          <span className="bg-[#F2F2F7] p-2 rounded-full">
            <FaUser />
          </span>
          <p className="text-2xl font-semibold text-black">{username}</p>
        </div>

        <div className="flex items-center gap-2">
          <p>Room Name:</p>
          <p className="text-base font-medium text-textGray-700">
            {chatroomName}
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-[#e7e7e7] duration-200"
            onClick={handleCopy}
          >
            {copied ? (
              <TbCopyCheckFilled className="size-4" />
            ) : (
              <TbCopy className="size-4" />
            )}
          </Button>
        </div>
      </div>
      <div
        style={{ backgroundImage: `url(${background})` }}
        className="w-full p-6 bg-no-repeat rounded-b-3xl h-[620px]"
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 h-[500px] scrollbar">
            {messageData.map((data: any) => {
              return (
                <div key={data?.id}>
                  {username === data.username ? (
                    <div className="relative flex flex-col items-end w-full pl-10">
                      <div className="max-w-[450px] w-full px-4 py-3 text-white bg-primary rounded-xl">
                        <p>{data?.message}</p>
                        <div className="flex gap-2 text-xs">
                          <p className="flex justify-end w-full ">
                            {data?.time}
                          </p>
                          <p className="font-medium">{data?.username}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col w-full pr-10 justify-self-start">
                      <div className="max-w-[450px] w-full px-4 py-3 bg-white text-textGray-700 rounded-xl">
                        <p>{data?.message}</p>
                        <div className="flex gap-2 text-xs">
                          <p className="flex justify-end w-full ">
                            {data?.time}
                          </p>
                          <p className="font-medium">{data?.username}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="px-1.5">
            <MessageBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatroom;
