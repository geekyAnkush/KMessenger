import { useMutation } from "@apollo/client";
import { Button, Center, Image, Input, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import UserOperations from "../../graphql/operations/user";
import { CreateUsernameData, CreateUsernameVariables } from "../../utils/types";

export interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FunctionComponent<IAuthProps> = ({
  session,
  reloadSession,
}) => {
  const [username, setUsername] = useState("");
  const [createUsername, { loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(UserOperations.Mutations.createUsername);
  const onSubmit = async () => {
    if (!username) return;
    try {
      const { data } = await createUsername({ variables: { username } });
      if (!data?.createUsername) {
        throw new Error();
      }
      if (data?.createUsername.error) {
        const {
          createUsername: { error },
        } = data;
        throw new Error(error);
      }
      toast.success("username successfully created! 🚀 ");
      reloadSession();
    } catch (error: any) {
      toast.error(error?.message);
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
            <Button
              colorScheme={"blackAlpha"}
              width="100%"
              onClick={onSubmit}
              isLoading={loading}
            >
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
