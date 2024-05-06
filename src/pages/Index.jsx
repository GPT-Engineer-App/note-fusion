import { useState } from "react";
import { Box, Button, Container, Flex, IconButton, Input, Text, useColorMode, VStack, useColorModeValue, Textarea, Heading, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaSun, FaMoon } from "react-icons/fa";

const NoteCard = ({ note, onDelete }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
      <Flex justifyContent="space-between" alignItems="center">
        <Heading fontSize="xl">{note.title}</Heading>
        <IconButton aria-label="Delete note" icon={<FaTrash />} onClick={() => onDelete(note.id)} />
      </Flex>
      <Text mt={4}>{note.content}</Text>
    </Box>
  );
};

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const addNote = () => {
    if (!newNoteTitle || !newNoteContent) {
      toast({
        title: "Error",
        description: "Both title and content are required to add a note.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newNote = {
      id: Date.now(),
      title: newNoteTitle,
      content: newNoteContent,
    };
    setNotes([...notes, newNote]);
    setNewNoteTitle("");
    setNewNoteContent("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8}>
        <Flex width="full" justifyContent="space-between" alignItems="center">
          <Heading>Note Keeper</Heading>
          <IconButton aria-label="Toggle color mode" icon={colorMode === "light" ? <FaMoon /> : <FaSun />} onClick={toggleColorMode} />
        </Flex>
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" width="full" bg={useColorModeValue("gray.100", "gray.700")}>
          <VStack spacing={4}>
            <Input placeholder="Note title" value={newNoteTitle} onChange={(e) => setNewNoteTitle(e.target.value)} />
            <Textarea placeholder="Note content" value={newNoteContent} onChange={(e) => setNewNoteContent(e.target.value)} />
            <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={addNote}>
              Add Note
            </Button>
          </VStack>
        </Box>
        <VStack spacing={4} align="stretch">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} onDelete={deleteNote} />
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
