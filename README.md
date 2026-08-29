# fixzy
Pembukuan servis Cerdas


## Patokan peran FIXZY (2026-08-29)
- **SUPERADMIN** = pemilik sistem dan akun pengujian. Memiliki data bisnis uji sendiri berdasarkan UID akunnya sendiri, bukan data Owner lain.
- **OWNER** = mengelola bisnis miliknya sendiri berdasarkan UID Owner.
- **KARYAWAN** = terikat ke `ownerUid`/`ownerId` Owner dan hanya mengakses bisnis Owner tersebut.
- Menu sistem seperti pembuatan token tetap khusus SUPERADMIN.
- Pada Input Penjualan, stok produk divalidasi ulang dari Firebase di dalam transaksi. Jika stok 2 dan qty 3, transaksi ditolak dan nota tidak dibuat.
