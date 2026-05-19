// Data Pegawai Diskominfo Bengkayang - Struktur per Bidang (Fallback Data)
// Data ini digunakan jika backend API tidak tersedia
const BIDANG_DATA = [
    {
        id: 'pimpinan',
        nama: 'Pimpinan',
        deskripsi: 'Kepala Dinas dan Sekretaris',
        anggota: [
            {
                nama: 'Nama Kepala Dinas',
                jabatan: 'Kepala Dinas',
                nip: '19XX0101 200X01 X XXX',
                tipeJabatan: 'kepala_dinas',
                foto: 'https://ui-avatars.com/api/?name=Kepala+Dinas&background=e2e8f0&color=475569&size=200&font-size=0.35'
            },
            {
                nama: 'Nama Sekretaris',
                jabatan: 'Sekretaris',
                nip: '19XX0101 200X01 X XXX',
                tipeJabatan: 'sekretaris',
                foto: 'https://ui-avatars.com/api/?name=Sekretaris&background=e2e8f0&color=475569&size=200&font-size=0.35'
            }
        ]
    },
    {
        id: 'aptika',
        nama: 'Bidang Aptika',
        deskripsi: 'Aplikasi dan Teknologi Informasi & Komunikasi',
        anggota: [
            {
                nama: 'Kepala Bidang Aptika',
                jabatan: 'Kabid Aptika',
                nip: '19XX0101 200X01 X XXX',
                tipeJabatan: 'jafung',
                foto: 'https://ui-avatars.com/api/?name=Kabid+Aptika&background=7c3aed&color=fff&size=200&font-size=0.35'
            },
            {
                nama: 'Staff Aptika 1',
                jabatan: 'Analis Sistem Informasi',
                nip: '19XX0101 200X01 X XXX',
                tipeJabatan: 'jafung',
                foto: 'https://ui-avatars.com/api/?name=Staff+A1&background=8b5cf6&color=fff&size=200&font-size=0.35'
            },
            {
                nama: 'Staff Aptika 2',
                jabatan: 'Programmer',
                nip: '19XX0101 200X01 X XXX',
                tipeJabatan: 'pelaksana',
                foto: 'https://ui-avatars.com/api/?name=Staff+A2&background=64748b&color=fff&size=200&font-size=0.35'
            },
            {
                nama: 'Staff Aptika 3',
                jabatan: 'Pengelola TIK',
                nip: '19XX0101 200X01 X XXX',
                tipeJabatan: 'pelaksana',
                foto: 'https://ui-avatars.com/api/?name=Staff+A3&background=64748b&color=fff&size=200&font-size=0.33'
            }
        ]
    },
    {
        id: 'ips',
        nama: 'Bidang IPS',
        deskripsi: 'Informasi dan Komunikasi Publik',
        anggota: [
            {
                nama: 'Kepala Bidang IPS',
                jabatan: 'Kabid IPS',
                nip: '19XX0101 200X01 X XXX',
                tipeJabatan: 'jafung',
                foto: 'https://ui-avatars.com/api/?name=Kabid+IPS&background=7c3aed&color=fff&size=200&font-size=0.35'
            },
            {
                nama: 'Staff IPS 1',
                jabatan: 'Pengelola Informasi Publik',
                nip: '19XX0101 200X01 X XXX',
                tipeJabatan: 'pelaksana',
                foto: 'https://ui-avatars.com/api/?name=Staff+I1&background=64748b&color=fff&size=200&font-size=0.35'
            },
            {
                nama: 'Staff IPS 2',
                jabatan: 'Pranata Humas',
                nip: '19XX0101 200X01 X XXX',
                tipeJabatan: 'jafung',
                foto: 'https://ui-avatars.com/api/?name=Staff+I2&background=8b5cf6&color=fff&size=200&font-size=0.35'
            },
            {
                nama: 'Staff IPS 3',
                jabatan: 'Dokumentasi',
                nip: '19XX0101 200X01 X XXX',
                tipeJabatan: 'pelaksana',
                foto: 'https://ui-avatars.com/api/?name=Staff+I3&background=64748b&color=fff&size=200&font-size=0.35'
            }
        ]
    },
    {
        id: 'statistik',
        nama: 'Bidang Statistik & Persandian',
        deskripsi: 'Statistik Sektoral dan Persandian',
        anggota: [
            {
                nama: 'Kepala Bidang Statistik',
                jabatan: 'Kabid Statistik & Persandian',
                nip: '19XX0101 200X01 X XXX',
                tipeJabatan: 'jafung',
                foto: 'https://ui-avatars.com/api/?name=Kabid+Stat&background=7c3aed&color=fff&size=200&font-size=0.35'
            },
            {
                nama: 'Staff Statistik 1',
                jabatan: 'Analis Data',
                nip: '19XX0101 200X01 X XXX',
                tipeJabatan: 'pelaksana',
                foto: 'https://ui-avatars.com/api/?name=Staff+S1&background=64748b&color=fff&size=200&font-size=0.35'
            },
            {
                nama: 'Staff Statistik 2',
                jabatan: 'Sandiman',
                nip: '19XX0101 200X01 X XXX',
                tipeJabatan: 'jafung',
                foto: 'https://ui-avatars.com/api/?name=Staff+S2&background=8b5cf6&color=fff&size=200&font-size=0.35'
            }
        ]
    },
    {
        id: 'sekretariat',
        nama: 'Sub Bagian Umum & Kepegawaian',
        deskripsi: 'Administrasi Umum dan Kepegawaian',
        anggota: [
            {
                nama: 'Kasubag Umum',
                jabatan: 'Kepala Sub Bagian Umum',
                nip: '19XX0101 200X01 X XXX',
                tipeJabatan: 'jafung',
                foto: 'https://ui-avatars.com/api/?name=Kasubag&background=7c3aed&color=fff&size=200&font-size=0.35'
            },
            {
                nama: 'Staff Umum 1',
                jabatan: 'Penata Keuangan',
                nip: '19XX0101 200X01 X XXX',
                tipeJabatan: 'pelaksana',
                foto: 'https://ui-avatars.com/api/?name=Staff+U1&background=64748b&color=fff&size=200&font-size=0.35'
            },
            {
                nama: 'Staff Umum 2',
                jabatan: 'Administrasi',
                nip: '19XX0101 200X01 X XXX',
                tipeJabatan: 'pelaksana',
                foto: 'https://ui-avatars.com/api/?name=Staff+U2&background=64748b&color=fff&size=200&font-size=0.35'
            }
        ]
    }
];
