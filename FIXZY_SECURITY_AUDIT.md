# FIXZY Uji Coba — Audit V4

Tanggal: 28 Agustus 2026

## Prinsip final
- Menu ditentukan oleh `index.html` berdasarkan role yang login.
- Superadmin adalah tester: menjalankan HTML/fungsi bisnis yang sama seperti Owner, tetapi memakai `ownerUid` Superadmin sendiri.
- Owner memakai HTML/fungsi yang sama dengan `ownerUid` Owner sendiri.
- Karyawan memakai data Owner yang menaunginya dan hanya izin yang diberikan.
- Data bisnis antar akun tidak boleh silang.
- Superadmin boleh melihat **daftar akun aplikasi** untuk pemantauan kapasitas, tetapi bukan data bisnis Owner.
- Semua tampilan wajib responsif.

## Perbaikan V4
1. `data-penjualan.html`
   - Edit data menggunakan `updateDoc` pada dokumen yang sama.
   - Kepemilikan tidak dipindahkan saat edit.
   - Verifikasi dokumen sesudah update.
   - Reload memakai `getDocsFromServer`.
2. `data-servis.html`
   - Verifikasi dokumen sesudah edit dan reload Firebase.
3. `izin-akses.html`
   - Scroll halaman/popup diperkuat untuk Android/desktop.
   - Popup memakai batas tinggi viewport dan scroll internal.
4. `daftar-pengguna.html`
   - Superadmin membaca koleksi `users` untuk daftar akun aplikasi.
   - Tidak membaca koleksi bisnis.
   - Tampilan responsif.
5. `ringkasan-pendapatan.html`
   - Profil dan data bisnis ditentukan dari UID/`ownerUid` aktif.
   - Data transaksi dibaca dari Firebase Server.
6. `tampil-stock.html`
   - Stok difilter dengan `ownerUid` aktif dan dibaca dari server.
   - Timeout/error dibuat eksplisit agar tidak menggantung pada “Memuat”.
7. Lima halaman yang sebelumnya tidak memiliki media query diberi standar responsif: `cek-paket.html`, `login.html`, `register.html`, `request-saldo.html`, `token-registrasi.html`.
8. `firestore.rules`
   - Hanya perubahan yang diperlukan pada `users`: Superadmin boleh membaca daftar akun aplikasi.
   - Tidak ada fallback global `/{document=**}`.

## Pemeriksaan statis
- Seluruh file HTML di paket diperiksa.
- JavaScript inline: 0 syntax error berdasarkan `node --check`.
- Query bisnis global tanpa filter `ownerUid`: tidak ditemukan.
- Fallback global Firestore: tidak ditemukan.
- Referensi halaman/asset rusak yang terdeteksi secara statis: tidak ditemukan.
- Media query/responsive standard: seluruh HTML memiliki media-query atau standar responsif.

## Catatan pengujian Firebase nyata
Sebelum Rules dipasang ke produksi, lakukan uji nyata dengan akun Superadmin, Owner A, Owner B, dan Karyawan. Pemeriksaan statis tidak dapat menggantikan pengujian `permission-denied`, data aktual, indeks Firestore, dan alur transaksi saldo/token di project Firebase.
