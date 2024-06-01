import { Container, Text, VStack, Box, Button, Heading, Flex, Spacer } from "@chakra-ui/react";
import { useSupabaseAuth, SupabaseAuthUI } from "../integrations/supabase/auth.jsx";
import { useState } from "react";

const Index = () => {
  const { session, logout } = useSupabaseAuth();
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  return (
    <Container maxW="container.xl" p={4}>
      <Flex as="header" width="100%" align="center" mb={8}>
        <Heading as="h1" size="lg">Teacher's App</Heading>
        <Spacer />
        {session ? (
          <Flex align="center">
            <Text mr={4}>{session.user.email}</Text>
            <Button colorScheme="teal" onClick={logout}>Logout</Button>
          </Flex>
        ) : (
          <Button colorScheme="teal" onClick={handleLoginClick}>Login</Button>
        )}
      </Flex>

      {showLogin && !session && (
        <Box mb={8}>
          <SupabaseAuthUI />
        </Box>
      )}

      <VStack spacing={8} align="start">
        <Heading as="h2" size="md">Welcome to the Teacher's App</Heading>
        <Text fontSize="lg">
          This app helps teachers keep track of their students and classes. You can:
        </Text>
        <VStack align="start" spacing={4}>
          <Text>- View and manage your classes</Text>
          <Text>- Add new classes and students</Text>
          <Text>- Keep track of student information</Text>
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;