import { Button, Center, Image, Input, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FunctionComponent<IAuthProps> = ({
  session,
  reloadSession,
}) => {
  const [username, setUsername] = useState("");
  const onSubmit = async () => {
    try {
      // create username mutation via graphQl api
    } catch (error) {
      console.log("onSubmit error -> ", error);
    }
  };
  return (
    <Center height="100vh">
      <Stack align="center">
        {session ? (
          <>
            <Text fontSize="3xl">Create a Username</Text>
            <Input
              placeholder="Enter a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button colorScheme={"blackAlpha"} width="100%" onClick={onSubmit}>
              Save
            </Button>
          </>
        ) : (
          <Stack align="center" spacing={8}>
            <Text fontSize="3xl">Kmessages</Text>
            <Button
              onClick={() => signIn("google")}
              leftIcon={
                <Image height="20px" src="/images/googlelogo.png" alt="logo" />
              }
              colorScheme={"blackAlpha"}
            >
              Continue with Google
            </Button>
          </Stack>
        )}
      </Stack>
    </Center>
  );
};

export default Auth;
