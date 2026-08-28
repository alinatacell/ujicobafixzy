# FIXZY — SECURITY AUDIT / UJI COBA

Audit ini dibuat setelah seluruh HTML pada ZIP diperiksa ulang terhadap aturan akses FIXZY.

## Aturan akses yang dipakai
- SUPERADMIN: sistem/aplikasi + data miliknya sendiri untuk testing; tidak boleh mengakses data bisnis Owner lain.
- OWNER: data bisnis miliknya sendiri + karyawan miliknya.
- KARYAWAN: data Owner yang menaunginya sesuai izin.
- Kepemilikan bisnis menggunakan `ownerUid`.
- Query bisnis menggunakan `ownerUid` sejak query Firebase.
- Update tidak boleh memindahkan `ownerUid`.
- Tidak ada fallback global Superadmin.

## Hasil pemeriksaan teknis
- Jumlah HTML: 27
- Syntax JavaScript: OK (0 error pada seluruh HTML).
- Query bisnis tanpa filter `ownerUid`: 0 ditemukan pada pemeriksaan statis.
- Query bisnis menggunakan `ownerId` sebagai filter: 0 ditemukan.
- Pembacaan global koleksi bisnis: 0 ditemukan.
- Fallback global Superadmin: dihapus.

## File yang diperbaiki / diverifikasi
- `about.html` — **OK** — Sesuai isolasi owner dan Rules final.
- `absensi-karyawan.html` — **OK** — OK; halaman pengelolaan karyawan dibatasi Owner.
- `cek-paket.html` — **OK** — OK terhadap Rules; aktivasi token dibatasi Superadmin karena koleksi tokens/resellerTokens hanya dapat dibaca Superadmin.
- `daftar-pengguna.html` — **OK** — OK terhadap Rules; Superadmin hanya melihat profilnya sendiri, bukan daftar Owner.
- `dashboard-admin.html` — **OK** — Sesuai isolasi owner dan Rules final.
- `data-karyawan.html` — **OK** — OK; halaman pengelolaan karyawan dibatasi Owner.
- `data-penjualan.html` — **OK** — Sesuai isolasi owner dan Rules final.
- `data-servis.html` — **OK** — Sesuai isolasi owner dan Rules final.
- `index.html` — **OK** — Sesuai isolasi owner dan Rules final.
- `izin-akses.html` — **OK** — OK; halaman pengelolaan karyawan dibatasi Owner.
- `login.html` — **OK** — Sesuai isolasi owner dan Rules final.
- `page.html` — **OK** — Sesuai isolasi owner dan Rules final.
- `pengaturan.html` — **OK** — OK; halaman pengelolaan karyawan dibatasi Owner.
- `pengeluaran.html` — **OK** — Sesuai isolasi owner dan Rules final.
- `penjualan (8).html` — **OK** — Sesuai isolasi owner dan Rules final.
- `penjualan.html` — **OK** — Sesuai isolasi owner dan Rules final.
- `register.html` — **OK** — OK terhadap Rules; registrasi token browser dinonaktifkan karena Rules final tidak mengizinkan browser membaca registrationTokens.
- `request-saldo.html` — **OK** — Sesuai isolasi owner dan Rules final.
- `ringkasan-pendapatan.html` — **OK** — Sesuai isolasi owner dan Rules final.
- `saldo-token.html` — **OK** — OK terhadap Rules; inventory resellerTokens hanya dibaca Superadmin. Pembelian token Owner/Reseller dari browser dinonaktifkan.
- `servisan.html` — **OK** — Sesuai isolasi owner dan Rules final.
- `sponsor.html` — **OK** — Sesuai isolasi owner dan Rules final.
- `stock.html` — **OK** — Sesuai isolasi owner dan Rules final.
- `tampil-stock.html` — **OK** — Sesuai isolasi owner dan Rules final.
- `token-perpanjangan.html` — **OK** — Sesuai isolasi owner dan Rules final.
- `token-registrasi.html` — **OK** — Sesuai isolasi owner dan Rules final.
- `token-reseller.html` — **OK** — Sesuai isolasi owner dan Rules final.

## File sistem
- `firestore.rules` — disertakan sebagai referensi Rules yang dipakai.
- `sponsors` diberi rule Superadmin-only karena koleksi ini dipakai `sponsor.html` dan tidak ada match pada Rules yang diberikan.

## Catatan penting
Rules yang diberikan masih mempunyai kelemahan pada update dokumen `users/{uid}` karena `userId == myUid()` mengizinkan user mengubah profilnya sendiri tanpa mengunci role/ownerUid. Ini tidak diperbaiki di HTML karena berada di Security Rules. Untuk keamanan produksi, Rules tersebut sebaiknya dikunci sebelum deployment.

Audit ini adalah audit statis kode. Pengujian runtime Owner A vs Owner B tetap harus dilakukan pada Firebase Uji Coba dengan dua akun nyata sebelum Rules dipublish ke project produksi.