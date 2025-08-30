// slider.js - اسلایدر تعاملی با فلش و انیمیشن نرم
document.addEventListener('DOMContentLoaded', function () {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = Array.from(document.querySelectorAll('.slide'));
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');

    if (!sliderWrapper || slides.length === 0 || dots.length === 0) {
        console.warn('اسلایدر: المان‌ها یافت نشدند');
        return;
    }

    let currentIndex = 0;

    // تابع نمایش اسلاید با انیمیشن
    function showSlide(index) {
        // مخفی کردن همه
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.display = 'none'; // برای اولین بار
        });

        // نمایش اسلاید جدید
        const slideToShow = slides[index];
        slideToShow.style.display = 'block';
        setTimeout(() => {
            slideToShow.classList.add('active');
        }, 50);

        // به‌روزرسانی نقطه‌ها
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        currentIndex = index;
    }

    // کلیک روی نقطه‌ها
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // کلیک روی فلش‌ها
    prevBtn?.addEventListener('click', () => {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    });

    nextBtn?.addEventListener('click', () => {
        const nextIndex = (currentIndex + 1) % slides.length;
        showSlide(nextIndex);
    });

    // نمایش اسلاید اول
    showSlide(0);
});
