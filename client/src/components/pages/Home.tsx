import Button from "../ui/button";
import { Input } from "../ui/input";
import logo from "../../assets/whisper.png";

import { socket } from "../../socket";
import { useChatroomStore } from "../../zustand/chatroom";
import { useNavigate } from "react-router-dom";
import { PAGE_ROUTES } from "../../routings/routings";

const Home = () => {
  const navigate = useNavigate();

  const { chatroomName, setChatroomName, username, setUsername } =
    useChatroomStore();

  const joinRoom = async () => {
    if (username !== "" && chatroomName !== "") {
      socket.emit("join_room", chatroomName);
      navigate(PAGE_ROUTES.CHATROOM);
    }
  };

  return (
    <div className="flex flex-col gap-8 h-[100vh] items-center justify-center w-full">
      <div className="flex items-center gap-3">
        <h1 className="text-4xl font-semibold">Whisper</h1>
        <img className="size-16" src={logo} alt="whisper logo" />
      </div>
      <div className="flex flex-col items-center justify-center w-full max-w-[400px] gap-4 mx-3">
        <div className="items-center w-full px-4 space-y-2">
          <Input
            maxLength={40}
            placeholder="Your name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            maxLength={25}
            placeholder="Room name"
            onChange={(e) => setChatroomName(e.target.value)}
          />
        </div>
        <Button onClick={joinRoom} variant="default" className="rounded-full">
          Join Chatroom
        </Button>
      </div>
    </div>
  );
};

export default Home;
