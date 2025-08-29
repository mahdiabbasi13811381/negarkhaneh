// script.js
// Admin Panel Toggle
const adminToggle = document.getElementById('adminToggle');
const adminPanel = document.getElementById('adminPanel');
const closePanel = document.getElementById('closePanel');

adminToggle.addEventListener('click', () => {
    adminPanel.classList.add('open');
});

closePanel.addEventListener('click', () => {
    adminPanel.classList.remove('open');
});

// Apply Changes
document.getElementById('applyChanges').addEventListener('click', function() {
    // Font changes
    const fontSelector = document.getElementById('fontSelector');
    const titleFontSelector = document.getElementById('titleFontSelector');
    
    document.body.style.fontFamily = fontSelector.value;
    document.querySelectorAll('.site-title, .project-title, .profile-name').forEach(el => {
        el.style.fontFamily = `${titleFontSelector.value}, serif`;
    });
    
    // Color changes
    const textColor = document.getElementById('textColor').value;
    const bgColor = document.getElementById('bgColor').value;
    const titleColor = document.getElementById('titleColor').value;
    const primaryColor = document.getElementById('primaryColor').value;
    
    document.body.style.color = textColor;
    document.body.style.backgroundColor = bgColor;
    document.querySelectorAll('.site-title, .project-title, .profile-name').forEach(el => {
        el.style.color = titleColor;
    });
    document.querySelectorAll('.nav-link, .view-project, .btn').forEach(el => {
        el.style.color = primaryColor;
    });
    document.querySelectorAll('.btn, .nav-container').forEach(el => {
        el.style.backgroundColor = primaryColor;
    });
    
    // Layout changes
    const galleryLayout = document.getElementById('galleryLayout').value;
    const projectLayout = document.getElementById('projectLayout').value;
    
    const gallery = document.querySelector('.gallery');
    gallery.style.gridTemplateColumns = `repeat(${galleryLayout}, 1fr)`;
    
    const projectSections = document.querySelectorAll('.project-content');
    projectSections.forEach(section => {
        if (projectLayout === 'column') {
            section.style.flexDirection = 'column';
        } else {
            section.style.flexDirection = 'row';
        }
    });
    
    alert('تغییرات با موفقیت اعمال شد!');
});

// Reset Settings
document.getElementById('resetSettings').addEventListener('click', function() {
    // Reset to default values
    document.getElementById('fontSelector').value = 'Poppins';
    document.getElementById('titleFontSelector').value = 'Playfair Display';
    document.getElementById('textColor').value = '#333333';
    document.getElementById('bgColor').value = '#f8f8f8';
    document.getElementById('titleColor').value = '#222222';
    document.getElementById('primaryColor').value = '#667eea';
    document.getElementById('galleryLayout').value = '3';
    document.getElementById('projectLayout').value = 'row';
    
    // Apply default styles
    document.body.style.fontFamily = 'Poppins, Vazir, sans-serif';
    document.body.style.color = '#333';
    document.body.style.backgroundColor = '#f8f8f8';
    
    document.querySelectorAll('.site-title, .project-title, .profile-name').forEach(el => {
        el.style.fontFamily = 'Playfair Display, serif';
        el.style.color = '#222';
    });
    
    const gallery = document.querySelector('.gallery');
    gallery.style.gridTemplateColumns = 'repeat(3, 1fr)';
    
    const projectSections = document.querySelectorAll('.project-content');
    projectSections.forEach(section => {
        section.style.flexDirection = 'row';
    });
    
    alert('تنظیمات به حالت پیش‌فرض بازگشت!');
});
