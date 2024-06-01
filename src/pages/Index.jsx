import { Container, Text, VStack, Box, Button, Flex, Heading } from "@chakra-ui/react";

const Index = () => {
  return (
    <Container maxW="container.xl" p={4}>
      <Flex as="header" justify="space-between" align="center" mb={8}>
        <Heading as="h1" size="lg">Teacher's App</Heading>
        <Button colorScheme="teal" variant="outline">Login</Button>
      </Flex>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h2" size="xl" mb={4}>Welcome to Teacher's App</Heading>
          <Text fontSize="lg">Easily manage your classes and students with our intuitive platform.</Text>
        </Box>
        <Box>
          <Heading as="h3" size="lg" mb={4}>Features</Heading>
          <VStack spacing={4} align="start">
            <Text fontSize="md">- Track student progress and attendance</Text>
            <Text fontSize="md">- Organize classes and schedules</Text>
            <Text fontSize="md">- Communicate with students and parents</Text>
            <Text fontSize="md">- Generate reports and analytics</Text>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;