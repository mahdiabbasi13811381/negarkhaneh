// slider.js - اسلایدر تعاملی با پیش‌نمایش در حالت تمام‌صفحه
document.addEventListener('DOMContentLoaded', function () {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = Array.from(document.querySelectorAll('.slide'));
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');

    // ساخت لایه تمام‌صفحه
    const fullscreenOverlay = document.createElement('div');
    fullscreenOverlay.classList.add('fullscreen-overlay');
    fullscreenOverlay.innerHTML = `
        <button class="fullscreen-close" aria-label="بستن">✕</button>
        <img class="fullscreen-image" alt="">
        <button class="fullscreen-next" aria-label="تصویر بعدی">❯</button>
        <button class="fullscreen-prev" aria-label="تصویر قبلی">❮</button>
        <div class="fullscreen-thumbnails"></div>
    `;
    document.body.appendChild(fullscreenOverlay);

    const fullscreenImage = fullscreenOverlay.querySelector('.fullscreen-image');
    const fullscreenClose = fullscreenOverlay.querySelector('.fullscreen-close');
    const fullscreenNext = fullscreenOverlay.querySelector('.fullscreen-next');
    const fullscreenPrev = fullscreenOverlay.querySelector('.fullscreen-prev');
    const thumbnailsContainer = fullscreenOverlay.querySelector('.fullscreen-thumbnails');

    if (!sliderWrapper || slides.length === 0 || dots.length === 0) {
        console.warn('اسلایدر: المان‌ها یافت نشدند');
        return;
    }

    let currentIndex = 0;
    let uiVisible = true; // مدیریت نمایش عناصر رابط

    // ساخت پیش‌نمایش‌ها
    slides.forEach((slide, index) => {
        const thumb = document.createElement('img');
        thumb.src = slide.src;
        thumb.alt = `پیش‌نمایش ${index + 1}`;
        thumb.classList.add('fullscreen-thumbnail');
        if (index === 0) thumb.classList.add('active');
        thumb.dataset.index = index;

        thumb.addEventListener('click', () => {
            showSlide(parseInt(thumb.dataset.index));
            updateFullscreenImage();
            updateThumbnails();
        });

        thumbnailsContainer.appendChild(thumb);
    });

    const thumbnails = document.querySelectorAll('.fullscreen-thumbnail');

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

    // به‌روزرسانی تصویر تمام‌صفحه
    function updateFullscreenImage() {
        fullscreenImage.src = slides[currentIndex].src;
        fullscreenImage.alt = slides[currentIndex].alt;
    }

    // به‌روزرسانی پیش‌نمایش‌ها
    function updateThumbnails() {
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === currentIndex);
        });
    }

    // کلیک روی نقطه‌ها
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            updateFullscreenImage();
            updateThumbnails();
            showUI(); // نمایش UI در صورت کلیک روی نقطه
        });
    });

    // فلش‌های اسلایدر
    prevBtn?.addEventListener('click', () => {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
        updateFullscreenImage();
        updateThumbnails();
        showUI(); // نمایش UI
    });

    nextBtn?.addEventListener('click', () => {
        const nextIndex = (currentIndex + 1) % slides.length;
        showSlide(nextIndex);
        updateFullscreenImage();
        updateThumbnails();
        showUI(); // نمایش UI
    });

    // باز کردن حالت تمام‌صفحه
    slides.forEach(slide => {
        slide.addEventListener('click', () => {
            updateFullscreenImage();
            updateThumbnails();
            fullscreenOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            showUI(); // اطمینان از نمایش اولیه UI
        });
    });

    // بستن حالت تمام‌صفحه
    function closeFullscreen() {
        fullscreenOverlay.classList.remove('active');
        document.body.style.overflow = '';
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
        updateFullscreenImage();
        updateThumbnails();
        showUI(); // نمایش UI
    });

    fullscreenNext.addEventListener('click', (e) => {
        e.stopPropagation();
        const nextIndex = (currentIndex + 1) % slides.length;
        showSlide(nextIndex);
        updateFullscreenImage();
        updateThumbnails();
        showUI(); // نمایش UI
    });

    // تابع نمایش UI
    function showUI() {
        fullscreenOverlay.classList.remove('ui-hidden');
        uiVisible = true;
    }

    // تابع مخفی کردن UI
    function toggleUI() {
        if (uiVisible) {
            fullscreenOverlay.classList.add('ui-hidden');
        } else {
            fullscreenOverlay.classList.remove('ui-hidden');
        }
        uiVisible = !uiVisible;
    }

    // کلیک روی تصویر در حالت تمام‌صفحه برای مخفی/نمایش UI
    fullscreenImage.addEventListener('click', function (e) {
        e.stopPropagation(); // جلوگیری از بسته شدن
        toggleUI();
    });

    // کلیدهای صفحه‌کلید
    document.addEventListener('keydown', (e) => {
        if (!fullscreenOverlay.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeFullscreen();
        } else if (e.key === 'ArrowLeft') {
            fullscreenPrev.click();
        } else if (e.key === 'ArrowRight') {
            fullscreenNext.click();
        } else if (e.key === ' ') || e.key === 'Enter') {
            // فضای خالی یا Enter برای مخفی کردن/نمایش UI
            e.preventDefault();
            toggleUI();
        }
    });

    // نمایش اسلاید اول
    showSlide(0);
});
