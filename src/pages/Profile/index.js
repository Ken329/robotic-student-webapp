import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Grid,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Layout from "../../components/Layout/MainLayout";
import useProfile from "./hooks/useProfile";
import EditProfileModal from "./EditProfileModal";

const Profile = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { profileData, isExpired, getValue, handleSave } = useProfile();

  return (
    <Layout>
      <Button
        leftIcon={<ArrowBackIcon />}
        color="#27374d"
        variant="link"
        onClick={() => navigate("/dashboard")}
        mb="4"
      >
        Back to Dashboard
      </Button>
      <Flex minH="100vh" justify="center" bg="gray.50" borderRadius="xl">
        <Stack p={6} w="100%" spacing={4}>
          <Flex direction="row" align="center" gap={2}>
            <Heading fontSize={{ base: "xl", sm: "2xl" }}>Student Info</Heading>
            {isExpired && (
              <Button onClick={onOpen} colorScheme="blue" size="sm">
                Update Profile
              </Button>
            )}
          </Flex>

          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input value={getValue("fullName").toUpperCase()} isReadOnly />
          </FormControl>

          <Grid templateColumns="repeat(2, 1fr)" gap={4} w="100%">
            <FormControl>
              <FormLabel>Race</FormLabel>
              <Input value={getValue("race").toUpperCase()} isReadOnly />
            </FormControl>
            <FormControl>
              <FormLabel>Nationality</FormLabel>
              <Input value={getValue("nationality").toUpperCase()} isReadOnly />
            </FormControl>
          </Grid>

          {profileData?.nationality?.toLowerCase() === "malaysia" ? (
            <FormControl>
              <FormLabel>MyKad / NRIC</FormLabel>
              <Input value={getValue("nric").toUpperCase()} isReadOnly />
            </FormControl>
          ) : (
            <FormControl>
              <FormLabel>Passport</FormLabel>
              <Input value={getValue("passport").toUpperCase()} isReadOnly />
            </FormControl>
          )}

          <Grid templateColumns="repeat(2, 1fr)" gap={4} w="100%">
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <Input value={getValue("gender").toUpperCase()} isReadOnly />
            </FormControl>
            <FormControl>
              <FormLabel>Date of Birth</FormLabel>
              <Input value={getValue("dob").toUpperCase()} isReadOnly />
            </FormControl>
          </Grid>

          <FormControl>
            <FormLabel>School</FormLabel>
            <Input value={getValue("school").toUpperCase()} isReadOnly />
          </FormControl>

          <FormControl>
            <FormLabel>MOE Email</FormLabel>
            <Input value={getValue("moeEmail")} isReadOnly />
          </FormControl>

          <FormControl>
            <FormLabel>Contact Number</FormLabel>
            <Input value={getValue("contact").toUpperCase()} isReadOnly />
          </FormControl>

          <Grid
            templateColumns="calc(62% - 8px) calc(38% - 8px)"
            gap={4}
            w="100%"
          >
            <FormControl>
              <FormLabel>Centre</FormLabel>
              <Input value={getValue("centerName").toUpperCase()} isReadOnly />
            </FormControl>
            <FormControl>
              <FormLabel>Joined Date</FormLabel>
              <Input value={getValue("joinedDate").toUpperCase()} isReadOnly />
            </FormControl>
          </Grid>

          <Heading fontSize={{ base: "xl", sm: "2xl" }} mt={10}>
            Parent Info
          </Heading>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input value={getValue("parentName").toUpperCase()} isReadOnly />
          </FormControl>
          <FormControl>
            <FormLabel>Relationship</FormLabel>
            <Input value={getValue("relationship").toUpperCase()} isReadOnly />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input value={getValue("parentEmail")} isReadOnly />
          </FormControl>
          <FormControl>
            <FormLabel>Contact Number</FormLabel>
            <Input value={getValue("parentContact").toUpperCase()} isReadOnly />
          </FormControl>
        </Stack>

        <EditProfileModal
          isOpen={isOpen}
          onClose={onClose}
          profileData={profileData}
          onSave={handleSave}
        />
      </Flex>
    </Layout>
  );
};

export default Profile;
