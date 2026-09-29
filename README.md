# React Todo App

React Todo App adalah aplikasi daftar tugas (to-do list) modern yang dibangun menggunakan React dan Vite. Aplikasi ini memungkinkan pengguna untuk mengelola tugas sehari-hari dengan fitur yang lebih lengkap dibanding to-do list sederhana, seperti prioritas, kategori, tanggal, pencarian, dan dark mode. Project ini cocok sebagai latihan transisi dari Vanilla JavaScript ke React, karena konsep yang sama (CRUD + localStorage) dibuat ulang dengan pendekatan component-based.

## Fitur

- Tambah Tugas : Menambah tugas baru dengan teks, prioritas, kategori, dan tanggal
- Edit Tugas : Mengubah isi, prioritas, kategori, dan tanggal (double-click atau tombol edit)Centang SelesaiMenandai tugas sudah dikerjakan
- Hapus Tugas : Menghapus satu tugas atau semua yang sudah selesai
- Prioritas : Tinggi (merah), Sedang (kuning), Rendah (hijau)
- Kategori : Work, Personal, Study, Health, Lainnya
- Tanggal : Bisa menambahkan deadlinePencarianMencari berdasarkan nama tugas atau kategori
- Filter : Semua / Aktif / Selesai
- Dark Mode : Mode gelap yang tersimpan otomatis
- localStorage : Data tidak hilang saat di-refresh
- ResponsiveTampil baik di HP dan desktop

## Cara Menjalankan

```bash
npm install
npm run dev
```

# Tech Stack

- React 18 → Library UI
- Vite → Build tool modern (sangat cepat)
- CSS Biasa → Styling tanpa framework
- localStorage → Penyimpanan data di browser

# Struktur Folder

```
react-todo-app/
├── public/
├── src/
│   ├── components/
│   │   ├── TodoForm.jsx      → Form tambah tugas
│   │   ├── TodoList.jsx      → Daftar tugas
│   │   └── TodoItem.jsx      → Satu item tugas
│   ├── App.jsx               → Komponen utama (state management)
│   ├── App.css               → Styling
│   ├── index.css             → Reset CSS
│   └── main.jsx              → Entry point
├── index.html
├── package.json
└── README.md
```
