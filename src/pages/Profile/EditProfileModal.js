import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const EditProfileModal = ({ isOpen, onClose, profileData, onSave }) => {
  const [formValues, setFormValues] = useState({
    school: profileData.school || "",
    contact: profileData.contact || "",
    parentContact: profileData.parentContact || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formValues);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile Data</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>School</FormLabel>
            <Input
              name="school"
              value={formValues.school}
              onChange={handleChange}
              placeholder="school name"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Contact Number</FormLabel>
            <Input
              name="contact"
              value={formValues.contact}
              onChange={handleChange}
              placeholder="personal contact number"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Parent Contact Number</FormLabel>
            <Input
              name="parentContact"
              value={formValues.parentContact}
              onChange={handleChange}
              placeholder="parent contact number"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

EditProfileModal.propTypes = {
  isOpen: PropTypes.any.isRequired,
  onClose: PropTypes.any.isRequired,
  profileData: PropTypes.any.isRequired,
  onSave: PropTypes.any.isRequired,
};

export default EditProfileModal;
