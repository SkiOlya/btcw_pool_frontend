import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Показать кнопку при прокрутке вниз
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Прокрутка вверх с анимацией
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Анимация прокрутки
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    isVisible && (
      <div className="scroll-to-top" onClick={scrollToTop}>
        <FontAwesomeIcon icon={faUpLong} size="xl" />
      </div>
    )
  );
};

export default ScrollToTopButton;
