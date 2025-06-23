document.addEventListener('DOMContentLoaded', function() {
    // Функционал слайдера
    const sliderContainer = document.querySelector('.slider__container');
    const slides = document.querySelectorAll('.slider__slide');
    const prevBtn = document.querySelector('.slider__arrow--prev');
    const nextBtn = document.querySelector('.slider__arrow--next');
    const dots = document.querySelectorAll('.slider__button');

    let currentSlide = 0;
    const slideCount = slides.length;
    let slideInterval;

    function goToSlide(slideIndex) {
        sliderContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === slideIndex);
        });

        currentSlide = slideIndex;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        goToSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        goToSlide(currentSlide);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    startAutoSlide();

    sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
    sliderContainer.addEventListener('mouseleave', startAutoSlide);

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
            rect.bottom >= 0
        );
    }

    function handleScrollAnimation() {
        const elements = document.querySelectorAll('.animate-block:not(.show)');
        
        elements.forEach((element) => {
            if (isElementInViewport(element)) {
                element.classList.add('show');
            }
        });
    }
    handleScrollAnimation();

    let isScrolling;
    window.addEventListener('scroll', function() {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(function() {
            handleScrollAnimation();
        }, 50);
    }, false);
});