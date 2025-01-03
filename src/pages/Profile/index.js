/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  makeSelectUserData,
  makeSelectUserStatus,
} from "../../redux/slices/app/selector";
import { useRenewStudentAccountMutation } from "../../redux/slices/app/api";
import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Grid,
  Text,
} from "@chakra-ui/react";
import Layout from "../../components/Layout/MainLayout";
import { ALLOWED_EDIT_ATTRIBUTES } from "../../utils/constants";

const Profile = () => {
  const userData = useSelector(makeSelectUserData());
  const status = useSelector(makeSelectUserStatus());
  const [profileData, setProfileData] = useState({});
  const [editable, setIsEditable] = useState(false);

  const [renewStudentAccount, { isLoading: renewLoading }] =
    useRenewStudentAccountMutation();

  const isExpired = useMemo(() => status === "expired", [status]);

  useEffect(() => {
    if (userData) {
      setProfileData(userData);
    }
  }, [userData]);

  const getValue = (field) => profileData[field] || "-";

  const allowedEdit = useCallback(
    (key) => {
      const allowed = Object.values(ALLOWED_EDIT_ATTRIBUTES).includes(key);
      return allowed && isExpired;
    },
    [status]
  );

  return (
    <Layout>
      <Flex
        minH={"100vh"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
        borderRadius={"xl"}
      >
        <Stack p={6} w="100%" spacing={4}>
          <Heading lineHeight={1.1} fontSize={{ base: "xl", sm: "2xl" }}>
            Student Info
          </Heading>
          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input
              placeholder="fullName"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={getValue("fullName").toUpperCase()}
              isReadOnly={!allowedEdit("fullName")}
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
                isReadOnly={!allowedEdit("race")}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Nationality</FormLabel>
              <Input
                placeholder="nationality"
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={getValue("nationality").toUpperCase()}
                isReadOnly={!allowedEdit("nationality")}
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
                isReadOnly={!allowedEdit("nric")}
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
                isReadOnly={!allowedEdit("passport")}
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
                isReadOnly={!allowedEdit("gender")}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                placeholder="dob"
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={getValue("dob").toUpperCase()}
                isReadOnly={!allowedEdit("dob")}
              />
            </FormControl>
          </Grid>

          <FormControl>
            <FormLabel>
              School{" "}
              {isExpired && (
                <Text as="span" color="red">
                  - editable
                </Text>
              )}
            </FormLabel>
            <Input
              placeholder="school"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={getValue("school").toUpperCase()}
              isReadOnly={!allowedEdit("school")}
            />
          </FormControl>

          <FormControl>
            <FormLabel>MOE Email</FormLabel>
            <Input
              placeholder="moe email"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={getValue("moeEmail")}
              isReadOnly={!allowedEdit("moeEmail")}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Personal Email</FormLabel>
            <Input
              placeholder="personal email"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={getValue("personalEmail")}
              isReadOnly={!allowedEdit("personalEmail")}
            />
          </FormControl>

          <FormControl>
            <FormLabel>
              Contact Number{" "}
              {isExpired && (
                <Text as="span" color="red">
                  - editable
                </Text>
              )}
            </FormLabel>
            <Input
              placeholder="contact number"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={getValue("contact").toUpperCase()}
              isReadOnly={!allowedEdit("contact")}
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
                isReadOnly={!allowedEdit("centerName")}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Joined Date</FormLabel>
              <Input
                placeholder="joinedDate"
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={getValue("joinedDate").toUpperCase()}
                isReadOnly={!allowedEdit("joinedDate")}
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
              isReadOnly={!allowedEdit("roboticId")}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Student Level</FormLabel>
            <Input
              placeholder="level"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={getValue("levelName").toUpperCase()}
              isReadOnly={!allowedEdit("levelName")}
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
              isReadOnly={!allowedEdit("parentName")}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Relationship to student</FormLabel>
            <Input
              placeholder="relationship"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={getValue("relationship").toUpperCase()}
              isReadOnly={!allowedEdit("relationship")}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="parentEmail"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={getValue("parentEmail")}
              isReadOnly={!allowedEdit("parentEmail")}
            />
          </FormControl>
          <FormControl>
            <FormLabel>
              Contact Number{" "}
              {isExpired && (
                <Text as="span" color="red">
                  - editable
                </Text>
              )}
            </FormLabel>
            <Input
              placeholder="parentContact"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={getValue("parentContact").toUpperCase()}
              isReadOnly={!allowedEdit("parentContact")}
            />
          </FormControl>
        </Stack>
      </Flex>
    </Layout>
  );
};

export default Profile;
