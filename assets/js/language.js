let translations = {};

async function loadTranslations() {
    const loader = document.getElementById('loader'); 
    try {
        // 1. Tambahkan timestamp agar file JSON tidak di-cache oleh browser
        const response = await fetch('./languages.json?v=' + new Date().getTime());
        
        // --- PERBAIKAN DI SINI: Harus pakai response.ok ---
        if (!response.ok) throw new Error("File JSON tidak ditemukan di server");
        
        translations = await response.json();
        
        // 2. Ambil bahasa yang tersimpan atau default ke 'id'
        const savedLang = localStorage.getItem('preferredLang') || 'id';
        setLanguage(savedLang);

        // --- 3. Sembunyikan Loader ---
        if (loader) {
            loader.classList.add('opacity-0');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500); 
        }
    } catch (error) {
        console.error("Gagal memuat bahasa:", error);
        // Tetap hilangkan loader jika error agar user tetap bisa melihat web
        if (loader) {
            loader.classList.add('opacity-0');
            setTimeout(() => loader.style.display = 'none', 500);
        }
    }
}

function setLanguage(lang) {
    // Validasi apakah data bahasa tersedia di JSON
    if (!translations[lang]) {
        console.warn(`Data untuk bahasa "${lang}" tidak ditemukan di JSON.`);
        return;
    }

    // Update semua elemen dengan data-key
    document.querySelectorAll('[data-key]').forEach(elem => {
        const key = elem.getAttribute('data-key');
        if (translations[lang][key]) {
            elem.innerHTML = translations[lang][key];
        }
    });

    // Simpan pilihan & update UI
    localStorage.setItem('preferredLang', lang);
    updateButtonStyles(lang);
    
    // Update atribut lang di HTML tag (bagus untuk SEO)
    document.documentElement.lang = lang;
}

function updateButtonStyles(lang) {
    // Style untuk tombol aktif dan tidak aktif
    const activeClass = "text-indigo-600 font-bold pointer-events-none"; 
    const inactiveClass = "text-slate-500 hover:text-indigo-600 cursor-pointer transition-colors";

    const buttonMappings = {
        'id': ['lang-id-desktop', 'lang-id-mobile'],
        'en': ['lang-en-desktop', 'lang-en-mobile']
    };

    // Reset dan atur ulang style setiap tombol
    Object.keys(buttonMappings).forEach(key => {
        buttonMappings[key].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.className = (key === lang) ? activeClass : inactiveClass;
            }
        });
    });
}

// Jalankan fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', loadTranslations);

// Ganti bagian ini di language.js milikmu:
document.addEventListener('click', (e) => {
    // Cari element terdekat yang punya ID (jika yang diklik ikon di dalam button)
    const target = e.target.closest('button') || e.target;
    const targetId = target.id;

    if (targetId) {
        // Hanya jalankan setLanguage jika ID-nya mengandung lang-id atau lang-en
        if (targetId === 'lang-id-desktop' || targetId === 'lang-id-mobile') {
            setLanguage('id');
        } else if (targetId === 'lang-en-desktop' || targetId === 'lang-en-mobile') {
            setLanguage('en');
        }
    }
});