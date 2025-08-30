// slider.js - اسلایدر تعاملی برای صفحهٔ نگار
document.addEventListener('DOMContentLoaded', function () {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');

    if (!sliderWrapper || slides.length === 0 || dots.length === 0) return;

    let currentIndex = 0;

    // تابع به‌روزرسانی اسلایدر
    function updateSlider() {
        // مخفی کردن همه اسلایدها
        slides.forEach(slide => {
            slide.style.display = 'none';
        });
        // نمایش اسلاید فعلی
        slides[currentIndex].style.display = 'block';

        // به‌روزرسانی نقطه‌ها
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // کلیک روی نقطه‌ها
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });

    // نمایش اسلاید اول در ابتدا
    updateSlider();
});
