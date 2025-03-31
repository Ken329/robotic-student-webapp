import { useCallback, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const useCarousel = () => {
  const navigate = useNavigate();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const emblaApiRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (emblaApi) {
      emblaApiRef.current = emblaApi;
      setSelectedIndex(emblaApi.selectedScrollSnap());
      emblaApi.on("select", () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    emblaApiRef.current?.scrollPrev();
  }, []);

  const scrollNext = useCallback(() => {
    emblaApiRef.current?.scrollNext();
  }, []);

  const scrollTo = useCallback((index) => {
    emblaApiRef.current?.scrollTo(index);
  }, []);

  const handleSlideClick = useCallback(
    (id) => {
      navigate(`/post/${id}`);
    },
    [navigate]
  );

  return {
    emblaRef,
    selectedIndex,
    scrollPrev,
    scrollNext,
    scrollTo,
    handleSlideClick,
  };
};

export default useCarousel;
