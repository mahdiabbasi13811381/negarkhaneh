#نقشه سایت#
your-hugo-site/
├── content/
│   ├── negar/          # پوشه آثار هنری (همان gallery)
│   │   ├── _index.md   # صفحه اصلی بخش نگار
│   │   ├── desert-project.md
│   │   └── architecture-project.md
│   ├── about.md        # صفحه درباره من
│   └── contact.md      # صفحه تماس
├── layouts/
│   ├── _default/
│   │   ├── baseof.html # پایه اصلی
│   │   └── single.html # قالب صفحات تکی
│   ├── negar/
│   │   ├── list.html   # لیست آثار
│   │   └── single.html # صفحه تک اثر
│   └── partials/       # بخش‌های قابل استفاده مجدد
│       ├── header.html
│       ├── nav.html
│       └── footer.html
├── static/
│   ├── css/
│   │   └── styles.css  # فایل CSS شما
│   └── images/         # تصاویر آپلود شده
└── config.toml         # تنظیمات

