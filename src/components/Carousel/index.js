import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const Carousel = ({ slides }) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSlideClick = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <Box position="relative" overflow="hidden" m="2%" borderRadius="10px">
      <Flex
        height={{ base: "200px", md: "400px" }}
        transition="transform 0.5s ease-in-out"
        transform={`translateX(-${currentSlide * 100}%)`}
      >
        {slides.map((slide, index) => (
          <Box
            key={index}
            flex="0 0 100%"
            height="100%"
            background={`url(${slide.url}) center/cover no-repeat`}
            backgroundSize={{ base: "cover", md: "contain" }}
            backgroundPosition={{ base: "center", md: "center" }}
            backgroundRepeat="no-repeat"
            bgColor={{ base: "transparent", md: "black" }}
            cursor="pointer"
            onClick={() => handleSlideClick(slide.id)}
          ></Box>
        ))}
      </Flex>
      <IconButton
        icon={<ChevronLeftIcon />}
        position="absolute"
        top="50%"
        left="10px"
        transform="translateY(-50%)"
        onClick={prevSlide}
      />
      <IconButton
        icon={<ChevronRightIcon />}
        position="absolute"
        top="50%"
        right="10px"
        transform="translateY(-50%)"
        onClick={nextSlide}
      />
    </Box>
  );
};

Carousel.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Carousel;
