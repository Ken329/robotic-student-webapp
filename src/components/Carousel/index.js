import React, { memo } from "react";
import PropTypes from "prop-types";
import { Box, Flex, IconButton, Icon, HStack, Heading } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { GoDotFill } from "react-icons/go";
import useCarousel from "./hooks/useCarousel";

const Carousel = ({ slides }) => {
  const {
    emblaRef,
    selectedIndex,
    scrollPrev,
    scrollNext,
    scrollTo,
    handleSlideClick,
  } = useCarousel();

  return (
    <Box m={{ base: "5%", md: "5%", lg: "2%" }}>
      <Heading as="h3" size="lg" mb="10px">
        Featured
      </Heading>
      <Box position="relative" w="full" overflow="hidden" borderRadius="md">
        <Box ref={emblaRef} overflow="hidden">
          <Flex>
            {slides.map((slide, index) => (
              <Box
                key={index}
                flexShrink={0}
                flexBasis="100%"
                height={{ base: "200px", md: "360px" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="gray.800"
                borderRadius="md"
                cursor="pointer"
                onClick={() => handleSlideClick(slide.id)}
                mr={{ base: "24px", md: "36px" }}
              >
                <Box
                  as="img"
                  src={slide.url}
                  maxH="100%"
                  maxW="100%"
                  objectFit="contain"
                />
              </Box>
            ))}
          </Flex>
        </Box>

        <IconButton
          aria-label="Previous Slide"
          icon={<ChevronLeftIcon boxSize={8} />}
          position="absolute"
          top="50%"
          left={2}
          transform="translateY(-50%)"
          bg="transparent"
          color="white"
          _hover={{ bg: "blackAlpha.800" }}
          onClick={scrollPrev}
        />
        <IconButton
          aria-label="Next Slide"
          icon={<ChevronRightIcon boxSize={8} />}
          position="absolute"
          top="50%"
          right={2}
          transform="translateY(-50%)"
          bg="transparent"
          color="white"
          _hover={{ bg: "blackAlpha.800" }}
          onClick={scrollNext}
        />
      </Box>

      <HStack justify="center" spacing={1} mt={4}>
        {slides.map((_, index) => (
          <Icon
            key={index}
            as={GoDotFill}
            boxSize={
              index === selectedIndex ? { base: 5, md: 6 } : { base: 4, md: 5 }
            }
            color={index === selectedIndex ? "blue.400" : "gray.500"}
            cursor="pointer"
            onClick={() => scrollTo(index)}
          />
        ))}
      </HStack>
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

export default memo(Carousel);
