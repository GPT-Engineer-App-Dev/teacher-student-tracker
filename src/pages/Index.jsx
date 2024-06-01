import { Container, Text, VStack, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { usePosts, useAddPost } from "../integrations/supabase/index.js";

const Index = () => {
  const { data: posts, isLoading, error } = usePosts();
  const addPostMutation = useAddPost();
  const [newPost, setNewPost] = useState({ name: "", body: "" });

  const handleAddPost = () => {
    addPostMutation.mutate(newPost);
    setNewPost({ name: "", body: "" });
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Posts</Text>
        {posts && posts.map(post => (
          <VStack key={post.id} spacing={2} align="start">
            <Text fontWeight="bold">{post.name}</Text>
            <Text>{post.body}</Text>
          </VStack>
        ))}
        <Input
          placeholder="Post Name"
          value={newPost.name}
          onChange={(e) => setNewPost({ ...newPost, name: e.target.value })}
        />
        <Input
          placeholder="Post Body"
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
        />
        <Button onClick={handleAddPost}>Add Post</Button>
      </VStack>
    </Container>
  );
};

export default Index;