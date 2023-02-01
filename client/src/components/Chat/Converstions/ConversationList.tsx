import { Box, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useState } from "react";
import ConversationModal from "./Modal/Modal";

interface ConversationListProps {
  session: Session;
}

const ConversationList: React.FC<ConversationListProps> = ({ session }) => {
  const [isOpen, setIsopen] = useState(false);
  const onClose = () => {
    setIsopen(false);
  };
  return (
    <Box width="100%">
      <Box
        py={2}
        px={4}
        mb={4}
        bg="blackAlpha.300"
        borderRadius={4}
        cursor="pointer"
        onClick={() => {
          setIsopen(true);
        }}
      >
        <Text textAlign="center" color="whiteAlpha.800" fontWeight={500}>
          Find or start a conversation
        </Text>
        <ConversationModal
          isOpen={isOpen}
          onClose={onClose}
          session={session}
        />
      </Box>
    </Box>
  );
};

export default ConversationList;
