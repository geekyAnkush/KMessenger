import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import UserOperations from "../../../../graphql/operations/user";
import ConversationOperations from "../../../../graphql/operations/conversation";
import {
  CreateConversationData,
  CreateConversationInput,
  SearchedUser,
  SearchUsersData,
  SearchUsersInput,
} from "../../../../util/types";
import Participants from "./Participants";
import UserSearchList from "./UserSearchList";
import { Session } from "next-auth";
import { useRouter } from "next/router";

interface ConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: Session;
}

const ConversationModal: React.FC<ConversationModalProps> = ({
  isOpen,
  onClose,
  session,
}) => {
  const {
    user: { id: userId },
  } = session;

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [participants, setParticipants] = useState<Array<SearchedUser>>([]);

  const addParticipant = (user: SearchedUser) => {
    setParticipants((prev) => [...prev, user]);
    setUsername("");
  };

  const removeParticipant = (userId: string) => {
    setParticipants((prev) => prev.filter((p) => p.id !== userId));
  };

  const [searchUsers, { data, loading, error }] = useLazyQuery<
    SearchUsersData,
    SearchUsersInput
  >(UserOperations.Queries.searchUsers);

  const [createConversation, { loading: createConversationLoading }] =
    useMutation<CreateConversationData, CreateConversationInput>(
      ConversationOperations.Mutations.createConversation
    );

  const onCreateConversation = async () => {
    try {
      const participantIds = [userId, ...participants.map((p) => p.id)];
      const { data } = await createConversation({
        variables: { participantIds },
      });
      if (!data?.createConversation) {
        throw new Error("Failed to create conversation");
      }
      const {
        createConversation: { conversationId },
      } = data;
      router.push({ query: { conversationId } });

      setParticipants([]);
      setUsername("");
      onClose();
    } catch (error: any) {
      console.log("CREATE CONVERSATION ERROR --> ", error);
      toast.error(error?.message);
    }
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    searchUsers({ variables: { username } });
  };
  return (
    <Box color={"blackAlpha.100"}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#2D313C" pb={4}>
          <ModalHeader>Create a Conversation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSubmit}>
              <Stack spacing={4}>
                <Input
                  placeholder="Enter a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Button type="submit" disabled={!username} isLoading={loading}>
                  Search
                </Button>
              </Stack>
            </form>
            {data?.searchUsers && (
              <UserSearchList
                users={data.searchUsers}
                addParticipant={addParticipant}
                removeParticipant={removeParticipant}
              />
            )}
            {participants.length !== 0 && (
              <>
                <Participants
                  participants={participants}
                  removeParticipant={removeParticipant}
                />
                <Button
                  bg="brand.100"
                  width="100%"
                  _hover={{ bg: "brand.100" }}
                  mt={6}
                  isLoading={createConversationLoading}
                  onClick={() => onCreateConversation()}
                >
                  Create Conversation
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ConversationModal;
