// slider.js - اسلایدر تعاملی با حالت تمام‌صفحه
document.addEventListener('DOMContentLoaded', function () {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = Array.from(document.querySelectorAll('.slide'));
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');

    // Full-screen elements
    const fullscreenOverlay = document.createElement('div');
    fullscreenOverlay.classList.add('fullscreen-overlay');
    fullscreenOverlay.innerHTML = `
        <button class="fullscreen-close" aria-label="بستن">✕</button>
        <img class="fullscreen-image" alt="">
        <button class="fullscreen-next" aria-label="تصویر بعدی">❯</button>
        <button class="fullscreen-prev" aria-label="تصویر قبلی">❮</button>
    `;
    document.body.appendChild(fullscreenOverlay);

    const fullscreenImage = fullscreenOverlay.querySelector('.fullscreen-image');
    const fullscreenClose = fullscreenOverlay.querySelector('.fullscreen-close');
    const fullscreenNext = fullscreenOverlay.querySelector('.fullscreen-next');
    const fullscreenPrev = fullscreenOverlay.querySelector('.fullscreen-prev');

    if (!sliderWrapper || slides.length === 0 || dots.length === 0) {
        console.warn('اسلایدر: المان‌ها یافت نشدند');
        return;
    }

    let currentIndex = 0;

    // تابع نمایش اسلاید
    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.display = 'none';
        });

        const slideToShow = slides[index];
        slideToShow.style.display = 'block';
        setTimeout(() => {
            slideToShow.classList.add('active');
        }, 50);

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

    // کلیک روی فلش‌های اسلایدر (چپ و راست)
    prevBtn?.addEventListener('click', () => {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    });

    nextBtn?.addEventListener('click', () => {
        const nextIndex = (currentIndex + 1) % slides.length;
        showSlide(nextIndex);
    });

    // باز کردن حالت تمام‌صفحه با کلیک روی تصویر
    slides.forEach(slide => {
        slide.addEventListener('click', () => {
            fullscreenImage.src = slide.src;
            fullscreenImage.alt = slide.alt;
            fullscreenOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // جلوگیری از اسکرول
        });
    });

    // بستن حالت تمام‌صفحه
    function closeFullscreen() {
        fullscreenOverlay.classList.remove('active');
        document.body.style.overflow = ''; // بازگرداندن اسکرول
    }

    fullscreenClose.addEventListener('click', closeFullscreen);
    fullscreenOverlay.addEventListener('click', (e) => {
        if (e.target === fullscreenOverlay) closeFullscreen();
    });

    // پیمایش در حالت تمام‌صفحه
    fullscreenPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
        fullscreenImage.src = slides[prevIndex].src;
        fullscreenImage.alt = slides[prevIndex].alt;
    });

    fullscreenNext.addEventListener('click', (e) => {
        e.stopPropagation();
        const nextIndex = (currentIndex + 1) % slides.length;
        showSlide(nextIndex);
        fullscreenImage.src = slides[nextIndex].src;
        fullscreenImage.alt = slides[nextIndex].alt;
    });

    // کلیدهای چپ/راست صفحه‌کلید
    document.addEventListener('keydown', (e) => {
        if (!fullscreenOverlay.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeFullscreen();
        } else if (e.key === 'ArrowLeft') {
            fullscreenPrev.click();
        } else if (e.key === 'ArrowRight') {
            fullscreenNext.click();
        }
    });

    // نمایش اسلاید اول
    showSlide(0);
});
