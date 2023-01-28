import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

const Chat = () => {
  return (
    <div>
      chat
      <Button colorScheme={"blackAlpha"} onClick={() => signOut()}>
        Logout
      </Button>
    </div>
  );
};

export default Chat;
