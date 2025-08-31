// slider.js - اسلایدر تعاملی با انیمیشن اسلاید و حالت تمام‌صفحه
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
    let uiVisible = true; // نمایش/مخفی‌کردن عناصر رابط

    // ساخت تام‌نیل‌ها
    slides.forEach((slide, index) => {
        const thumb = document.createElement('img');
        thumb.src = slide.src;
        thumb.alt = `پیش‌نمایش ${index + 1}`;
        thumb.classList.add('fullscreen-thumbnail');
        if (index === 0) thumb.classList.add('active');
        thumb.dataset.index = index;

        thumb.addEventListener('click', () => {
            showSlide(parseInt(thumb.dataset.index));
            updateFullscreenImage(0); // بدون انیمیشن در کلیک تام‌نیل
            updateThumbnails();
            showUI(); // نمایش UI
        });

        thumbnailsContainer.appendChild(thumb);
    });

    const thumbnails = document.querySelectorAll('.fullscreen-thumbnail');

    // نمایش اسلاید
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

    // به‌روزرسانی تصویر تمام‌صفحه با انیمیشن اسلاید
    function updateFullscreenImage(direction = 0) {
        const img = fullscreenImage;

        // direction: 1 = بعدی، -1 = قبلی، 0 = بدون انیمیشن
        if (direction === 0) {
            img.classList.remove('slide-out-left', 'slide-out-right', 'slide-in-left', 'slide-in-right');
            img.src = slides[currentIndex].src;
            img.alt = slides[currentIndex].alt;
            return;
        }

        const slideOut = direction > 0 ? 'slide-out-left' : 'slide-out-right';
        const slideIn = direction > 0 ? 'slide-in-left' : 'slide-in-right';

        img.classList.add(slideOut);

        img.addEventListener('animationend', function onAnimationEnd() {
            img.removeEventListener('animationend', onAnimationEnd);

            img.src = slides[currentIndex].src;
            img.alt = slides[currentIndex].alt;

            img.classList.remove(slideOut);
            img.classList.add(slideIn);

            img.addEventListener('animationend', function onRevealEnd() {
                img.classList.remove(slideIn);
            }, { once: true });

        }, { once: true });
    }

    // به‌روزرسانی تام‌نیل‌ها
    function updateThumbnails() {
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === currentIndex);
        });
    }

    // کلیک روی نقطه‌ها
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            updateFullscreenImage(0);
            updateThumbnails();
            showUI();
        });
    });

    // دکمه‌های اسلایدر (صفحه اصلی)
    prevBtn?.addEventListener('click', () => {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
        updateFullscreenImage(-1);
        updateThumbnails();
        showUI();
    });

    nextBtn?.addEventListener('click', () => {
        const nextIndex = (currentIndex + 1) % slides.length;
        showSlide(nextIndex);
        updateFullscreenImage(1);
        updateThumbnails();
        showUI();
    });

    // باز کردن حالت تمام‌صفحه
    slides.forEach(slide => {
        slide.addEventListener('click', () => {
            updateFullscreenImage(0);
            updateThumbnails();
            fullscreenOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            showUI();
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

    // دکمه‌های اسلاید در حالت تمام‌صفحه
    fullscreenPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
        updateFullscreenImage(-1);
        updateThumbnails();
        showUI();
    });

    fullscreenNext.addEventListener('click', (e) => {
        e.stopPropagation();
        const nextIndex = (currentIndex + 1) % slides.length;
        showSlide(nextIndex);
        updateFullscreenImage(1);
        updateThumbnails();
        showUI();
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
        e.stopPropagation();
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
        } else if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            toggleUI();
        }
    });

    // نمایش اسلاید اول
    showSlide(0);
});
