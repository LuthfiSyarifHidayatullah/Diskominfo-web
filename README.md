# Diskominfo Bengkayang - Landing Page

Landing page modern untuk Dinas Komunikasi dan Informatika Kabupaten Bengkayang.

## Tech Stack

- **React 18** (via CDN)
- **Tailwind CSS** (via CDN)
- **Lucide Icons**
- **WordPress REST API** (untuk integrasi berita)

## Fitur

- **Beranda** - Hero banner, statistik, layanan unggulan, berita terbaru
- **Profil** - Visi misi, tugas dan fungsi Diskominfo
- **Struktur Organisasi** - Susunan pegawai per bidang (desain ala roster MPL ID)
- **Berita** - List berita dari WordPress REST API (`diskominfo.bengkayangkab.go.id`)
- **Kontak** - Form kontak, informasi alamat, peta lokasi

## Cara Menjalankan

Cukup buka file `index.html` di browser, atau gunakan live server:

```bash
# Menggunakan Python
python -m http.server 8000

# Menggunakan Node.js
npx serve .

# Menggunakan PHP
php -S localhost:8000
```

## Integrasi WordPress

Halaman berita otomatis mengambil data dari WordPress REST API:
```
https://diskominfo.bengkayangkab.go.id/wp-json/wp/v2/posts
```

Jika API tidak tersedia (403/error), akan menggunakan data fallback.

### Mengaktifkan WordPress REST API

Jika API ter-block, perlu mengaktifkan di WordPress lama:
1. Nonaktifkan plugin security yang memblock REST API
2. Atau tambahkan di `functions.php`:
```php
add_filter('rest_authentication_errors', function($result) {
    if (!empty($result)) {
        return $result;
    }
    return true;
});
```

## Kustomisasi Data Pegawai

Edit file `src/data/pegawai.js` untuk mengubah data pegawai per bidang.
Ganti URL foto, nama, jabatan, dan NIP sesuai data aktual.

## Struktur File

```
├── index.html
├── src/
│   ├── App.js
│   ├── components/
│   │   ├── Navbar.js
│   │   └── Footer.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Profil.js
│   │   ├── StrukturOrganisasi.js
│   │   ├── Berita.js
│   │   └── Kontak.js
│   └── data/
│       ├── pegawai.js
│       └── layanan.js
└── README.md
```

## Deployment

Static HTML + JS, bisa di-deploy di:
- **GitHub Pages**
- **Netlify**
- **Vercel**
- **Shared Hosting** (upload semua file)
