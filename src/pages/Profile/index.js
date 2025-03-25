import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  makeSelectUserData,
  makeSelectUserStatus,
} from "../../redux/slices/app/selector";
import {
  useGetUserDataQuery,
  useRenewStudentAccountMutation,
} from "../../redux/slices/app/api";
import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Grid,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Layout from "../../components/Layout/MainLayout";
import useCustomToast from "../../components/CustomToast";
import EditProfileModal from "./EditProfileModal";

const Profile = () => {
  const navigate = useNavigate();
  const toast = useCustomToast();
  const userData = useSelector(makeSelectUserData());
  const status = useSelector(makeSelectUserStatus());
  const [profileData, setProfileData] = useState({});
  const [editable] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [renewStudentAccount] = useRenewStudentAccountMutation();
  const { refetch } = useGetUserDataQuery();

  const isExpired = useMemo(() => status === "expired", [status]);

  useEffect(() => {
    if (userData) {
      setProfileData(userData);
    }
  }, [userData]);

  const getValue = (field) => profileData[field] || "-";

  const handleSave = async (updatedData) => {
    try {
      const response = await renewStudentAccount({
        payload: updatedData,
      }).unwrap();

      if (response?.success) {
        toast({
          title: "Profile",
          description: "Successfully update profile data",
          status: "success",
        });
      }
      refetch();
    } catch (error) {
      toast({
        title: "Profile",
        description: error?.data?.message || "Failed to update profile data",
        status: "error",
      });
    }
  };

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
            <Heading lineHeight={1.1} fontSize={{ base: "xl", sm: "2xl" }}>
              Student Info
            </Heading>
            {isExpired && (
              <Button onClick={onOpen} colorScheme="blue" size="sm">
                Update Profile Data
              </Button>
            )}
          </Flex>
          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input
              placeholder="fullName"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={getValue("fullName").toUpperCase()}
              isReadOnly={!editable}
            />
          </FormControl>

          <Grid templateColumns="repeat(2, 1fr)" gap={4} w="100%">
            <FormControl>
              <FormLabel>Race</FormLabel>
              <Input
                placeholder="race"
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={getValue("race").toUpperCase()}
                isReadOnly={!editable}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Nationality</FormLabel>
              <Input
                placeholder="nationality"
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={getValue("nationality").toUpperCase()}
                isReadOnly={!editable}
              />
            </FormControl>
          </Grid>
          {profileData?.nationality?.toLowerCase() === "malaysia" ? (
            <FormControl>
              <FormLabel>My Kad / NRIC</FormLabel>
              <Input
                placeholder="nric"
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={getValue("nric").toUpperCase()}
                isReadOnly={!editable}
              />
            </FormControl>
          ) : (
            <FormControl>
              <FormLabel>Passport</FormLabel>
              <Input
                placeholder="passport"
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={getValue("passport").toUpperCase()}
                isReadOnly={!editable}
              />
            </FormControl>
          )}
          <Grid templateColumns="repeat(2, 1fr)" gap={4} w="100%">
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <Input
                placeholder="gender"
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={getValue("gender").toUpperCase()}
                isReadOnly={!editable}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                placeholder="dob"
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={getValue("dob").toUpperCase()}
                isReadOnly={!editable}
              />
            </FormControl>
          </Grid>

          <FormControl>
            <FormLabel>School</FormLabel>
            <Input
              placeholder="school"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={getValue("school").toUpperCase()}
              isReadOnly={!editable}
            />
          </FormControl>

          <FormControl>
            <FormLabel>MOE Email</FormLabel>
            <Input
              placeholder="moe email"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={getValue("moeEmail")}
              isReadOnly={!editable}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Personal Email</FormLabel>
            <Input
              placeholder="personal email"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={getValue("personalEmail")}
              isReadOnly={!editable}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Contact Number</FormLabel>
            <Input
              placeholder="contact number"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={getValue("contact").toUpperCase()}
              isReadOnly={!editable}
            />
          </FormControl>

          <Grid
            templateColumns="calc(62% - 8px) calc(38% - 8px)"
            gap={4}
            w="100%"
          >
            <FormControl>
              <FormLabel>Centre</FormLabel>
              <Input
                placeholder="centre"
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={getValue("centerName").toUpperCase()}
                isReadOnly={!editable}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Joined Date</FormLabel>
              <Input
                placeholder="joinedDate"
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={getValue("joinedDate").toUpperCase()}
                isReadOnly={!editable}
              />
            </FormControl>

            {/* <FormControl>
              <FormLabel>T-Shirt Size</FormLabel>
              <Input
                placeholder="size"
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={getValue("size").toUpperCase()}
                isReadOnly={!editable}
              />
            </FormControl> */}
          </Grid>

          <FormControl>
            <FormLabel>Student ID</FormLabel>
            <Input
              placeholder="studentId"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={getValue("roboticId").toUpperCase()}
              isReadOnly={!editable}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Student Level</FormLabel>
            <Input
              placeholder="level"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={getValue("levelName").toUpperCase()}
              isReadOnly={!editable}
            />
          </FormControl>

          <Heading
            lineHeight={1.1}
            fontSize={{ base: "xl", sm: "2xl" }}
            marginTop={"10px"}
          >
            Parent Info
          </Heading>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="parentName"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={getValue("parentName").toUpperCase()}
              isReadOnly={!editable}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Relationship to student</FormLabel>
            <Input
              placeholder="relationship"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={getValue("relationship").toUpperCase()}
              isReadOnly={!editable}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="parentEmail"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={getValue("parentEmail")}
              isReadOnly={!editable}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Contact Number</FormLabel>
            <Input
              placeholder="parentContact"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={getValue("parentContact").toUpperCase()}
              isReadOnly={!editable}
            />
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
