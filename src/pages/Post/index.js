import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetPostByIdQuery,
  useCompetitionSignUpMutation,
  useSignUpConfirmationQuery,
  useGetAllStudentsQuery,
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
  Checkbox,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import Select from "react-select";
import { ArrowBackIcon } from "@chakra-ui/icons";
import useCustomToast from "../../components/CustomToast";
import Layout from "../../components/Layout/MainLayout";
import { POST_TYPE } from "../../utils/constants";

const Post = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useCustomToast();
  const [blog, setBlog] = useState(null);
  const [remark, setRemark] = useState("");
  const [signedUp, setSignedUp] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [teamMember, setTeamMember] = useState(null);
  const [studentList, setStudentList] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading, isError } = useGetPostByIdQuery(id);
  const {
    data: hasSignedUpData,
    isLoading: hasSignedUpLoading,
    isError: hasSignedUpError,
  } = useSignUpConfirmationQuery(id, {
    skip: blog?.category !== POST_TYPE.COMPETITION,
  });
  const {
    data: studentData,
    isLoading: studentDataLoading,
    isError: studentDataError,
  } = useGetAllStudentsQuery(null, {
    skip: blog?.category !== POST_TYPE.COMPETITION,
  });

  const [competitionSignUp, { isLoading: signUpLoading }] =
    useCompetitionSignUpMutation();

  useEffect(() => {
    if (data && !isLoading && !isError) {
      setBlog(data.data);

      let content = data.data.content || "";
      const remarkMatch = content.match(/\{remark:\s*([^}]+)\}/);
      if (remarkMatch) {
        setRemark(remarkMatch[1]);
        content = content.replace(remarkMatch[0], "");
        setBlog((prevBlog) => ({
          ...prevBlog,
          content: content,
        }));
      }
    } else if (isError) {
      toast({
        title: "Posts",
        description: "Error getting post",
        status: "error",
      });
    }
  }, [data, isLoading, isError]);

  useEffect(() => {
    if (hasSignedUpData && !hasSignedUpLoading && !hasSignedUpError) {
      if (hasSignedUpData.data) {
        setSignedUp(true);

        const { attributes } = hasSignedUpData.data;

        const selectedCategoryAttr = attributes.find(
          (attr) => attr.value === true
        );
        const teamMemberAttr = attributes.find(
          (attr) => attr.category === "Team Member"
        );

        if (selectedCategoryAttr) {
          setSelectedCategory(selectedCategoryAttr.category);
        }
        if (teamMemberAttr) {
          setTeamMember({
            value: teamMemberAttr.value,
            label: teamMemberAttr.value,
          });
        }
      } else {
        setSignedUp(false);
      }
    } else if (hasSignedUpError) {
      toast({
        title: "Competition",
        description: "Error checking for sign-up confirmation",
        status: "error",
      });
    }
  }, [hasSignedUpData, hasSignedUpLoading, hasSignedUpError]);

  useEffect(() => {
    if (studentData && !studentDataLoading && !studentDataError) {
      setStudentList(studentData?.data);
    } else if (studentDataError) {
      toast({
        title: "Competition",
        description: "Error getting student list for team member checking",
        status: "error",
      });
    }
  }, [studentData, studentDataLoading, studentDataError]);

  const handleCompetitionSignUp = async (blogId) => {
    if (!selectedCategory) {
      toast({
        title: "Competition",
        description: "Please select at least one game to register.",
        status: "warning",
      });
      return;
    }

    const attributes = blog.customAttributes.map((attribute) => {
      if (attribute.category === "Team Member") {
        return {
          category: "Team Member",
          value: teamMember ? teamMember.value : "",
        };
      } else {
        return {
          category: attribute.category,
          value: selectedCategory === attribute.category,
        };
      }
    });

    const payload = { attributes };

    try {
      const response = await competitionSignUp({ blogId, payload }).unwrap();

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

  const handleCheckboxChange = (category) => {
    setSelectedCategory(category);
  };

  const handleTeamMemberChange = (selectedOption) => {
    setTeamMember(selectedOption);
  };

  const teamMemberOptions =
    studentList?.map((student) => ({
      value: student.email,
      label: student.name,
    })) || [];

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
              <VStack align="start" spacing="5" mb="30px">
                {blog?.customAttributes?.map((attribute, index) => {
                  if (attribute.category === "Team Member") {
                    return (
                      <FormControl key={index}>
                        <FormLabel>
                          {attribute.category} {remark && `(${remark})`}
                        </FormLabel>
                        <Select
                          placeholder="Select team member"
                          value={teamMember}
                          onChange={handleTeamMemberChange}
                          options={teamMemberOptions}
                          isSearchable
                          isClearable
                          isDisabled={signedUp}
                        />
                      </FormControl>
                    );
                  } else {
                    return (
                      <Checkbox
                        key={index}
                        isChecked={selectedCategory === attribute.category}
                        onChange={() =>
                          handleCheckboxChange(attribute.category)
                        }
                        isDisabled={signedUp}
                      >
                        {attribute.category}
                      </Checkbox>
                    );
                  }
                })}
              </VStack>
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
