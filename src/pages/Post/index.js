import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetPostByIdQuery,
  useCompetitionSignUpMutation,
  useSignUpConfirmationQuery,
} from "../../redux/slices/posts/api";
import {
  Box,
  Image,
  Heading,
  Text,
  HStack,
  VStack,
  Container,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import useCustomToast from "../../components/CustomToast";
import Layout from "../../components/Layout/MainLayout";
import { POST_TYPE } from "../../utils/constants";

const Post = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useCustomToast();
  const [blog, setBlog] = useState(null);
  const [signedUp, setSignedUp] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading, isError } = useGetPostByIdQuery(id);
  const {
    data: hasSignedUpData,
    isLoading: hasSignedUpLoading,
    isError: hasSignedUpError,
  } = useSignUpConfirmationQuery(id, {
    skip: blog?.category !== POST_TYPE.COMPETITION,
  });

  const [competitionSignUp, { isLoading: signUpLoading }] =
    useCompetitionSignUpMutation();

  useEffect(() => {
    if ((data, !isLoading, !isError)) {
      setBlog(data?.data);
    } else if (isError) {
      toast({
        title: "Posts",
        description: "Error getting post",
        status: "error",
      });
    }
  }, [data, isLoading, isError]);

  useEffect(() => {
    if ((hasSignedUpData, !hasSignedUpLoading, !hasSignedUpError)) {
      setSignedUp(hasSignedUpData?.data ? true : false);
    } else if (hasSignedUpError) {
      toast({
        title: "Competition",
        description: "Error checking for sign-up confirmation",
        status: "error",
      });
    }
  }, [hasSignedUpData, hasSignedUpLoading, hasSignedUpError]);

  const handleCompetitionSignUp = async (blogId) => {
    try {
      const response = await competitionSignUp(blogId).unwrap();

      if (response?.success) {
        toast({
          title: "Competition",
          description: "Registration successful",
          status: "success",
        });
        setSignedUp(true);
      }
    } catch (error) {
      toast({
        title: "Competition",
        description: error?.data?.message,
        status: "error",
      });
    }
  };

  const handleSignUp = () => {
    onOpen();
  };

  return (
    <Layout isLoading={isLoading}>
      <Container maxW="container.md" p={0}>
        <Button
          onClick={() => navigate("/dashboard")}
          leftIcon={<ArrowBackIcon />}
          mb="2"
        >
          Back to Dashboard
        </Button>
        <Box
          maxW="full"
          w="100%"
          bg="white"
          p="6"
          borderRadius="15px"
          boxShadow="md"
          overflow="hidden"
        >
          <HStack align="start" spacing="1" mb="10px">
            <Text
              fontSize={{ base: "xs", md: "md", lg: "md" }}
              color="gray.500"
            >
              By
            </Text>
            <Text
              fontSize={{ base: "xs", md: "md", lg: "md" }}
              color="#27374d"
              fontWeight="600"
            >
              Admin
            </Text>
            <Text
              fontSize={{ base: "xs", md: "md", lg: "md" }}
              color="gray.500"
            >
              • {new Date(blog?.createdAt).toLocaleDateString()} • {blog?.views}{" "}
              views
            </Text>
          </HStack>

          <Box
            height="auto"
            width="100%"
            overflow="hidden"
            borderRadius="xl"
            mb="4"
          >
            <Image
              src={blog?.url}
              alt={blog?.title}
              objectFit="cover"
              width="100%"
              height="auto"
            />
          </Box>
          <VStack spacing="2" alignItems="flex-start" mb="4">
            <Heading fontSize="2xl">{blog?.title}</Heading>
          </VStack>
          <Box className="ql-editor">{parse(`${blog?.content}`)}</Box>
          {blog?.category === POST_TYPE.COMPETITION && (
            <VStack marginTop="30px">
              {signedUp ? (
                <Text
                  fontSize={{ base: "md", md: "md", lg: "md" }}
                  color="green"
                  fontWeight="600"
                >
                  You have signed up for this competition!
                </Text>
              ) : (
                <Button
                  size={{ base: "sm", md: "md", lg: "lg" }}
                  colorScheme="orange"
                  onClick={() => {
                    handleSignUp();
                  }}
                  isDisabled={signUpLoading}
                >
                  Register Now
                </Button>
              )}
            </VStack>
          )}
        </Box>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Competition Registration</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Do you want to register for this competition? This action cannot be
            undone.
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="green"
              onClick={() => {
                handleCompetitionSignUp(id);
                onClose();
              }}
              ml={3}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
};

export default Post;
