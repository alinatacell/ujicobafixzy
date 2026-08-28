# FIXZY — AUDIT FINAL VERSI UJI COBA

## Aturan akses final
- SUPERADMIN: mengelola sistem/aplikasi dan boleh CRUD penuh untuk testing pada data milik Superadmin sendiri. Tidak boleh mengakses data bisnis Owner lain.
- OWNER: mengelola data bisnis miliknya sendiri dan karyawan yang terhubung.
- KARYAWAN: terikat pada satu Owner dan hanya mengakses data yang diizinkan.
- Data Superadmin, setiap Owner, dan Owner lain harus terisolasi.
- `ownerUid` adalah identitas utama kepemilikan data bisnis.
- Update data bisnis tidak boleh memindahkan `ownerUid`.
- Tidak ada fallback global Superadmin pada koleksi bisnis.

## Saldo/token
- Owner/Reseller/Superadmin dapat mengajukan saldo.
- Minimum request saldo: Rp50.000.
- Approval saldo: Superadmin.
- Owner/Reseller dapat membeli token dengan saldo sendiri setelah saldo tersedia.
- Pembelian minimum tetap 3 token sesuai UI paket saat ini.
- Token yang dibeli diikat ke UID pembeli.
- Superadmin dapat menguji alur saldo/token menggunakan saldo/data miliknya sendiri.

## Pemeriksaan teknis
- HTML: 27 file.
- Inline JavaScript: 79 blok.
- Syntax JavaScript: 0 error.
- Query bisnis global tanpa filter `ownerUid`: 0 ditemukan.
- Pembacaan global koleksi `servis`, `penjualan`, `stok`, `pengeluaran`, dan `absensi`: 0 ditemukan.
- Referensi `FIXED.html` yang tidak ada: 0.
- Jalur penolakan Superadmin pada input penjualan: dihapus.
- Superadmin sekarang memakai UID sendiri sebagai business UID.
- Tombol hapus pada data servis/penjualan tersedia untuk Owner dan Superadmin pada data yang sedang dimiliki.
- Halaman pengelolaan karyawan/izin/absensi dapat digunakan Superadmin untuk testing data sendiri.

## Rules
`firestore.rules` ikut disertakan. Rules mempertahankan isolasi `ownerUid`, mengunci perpindahan kepemilikan, dan memberi Superadmin CRUD pada data testing miliknya sendiri.

Untuk alur saldo/token, Rules juga mengizinkan Owner/Reseller menggunakan saldo sendiri dan mengambil token yang masih tersedia; saldo minimum Rp50.000 dipaksa di Rules.

## Catatan runtime
Audit ini adalah audit kode statis. Sebelum Rules dipublish ke Firebase produksi, lakukan uji nyata di project Firebase uji coba dengan minimal: Superadmin, Owner A, Owner B, dan satu Karyawan Owner A. Tes baca/tambah/edit/hapus serta percobaan membuka ID dokumen Owner lain.
