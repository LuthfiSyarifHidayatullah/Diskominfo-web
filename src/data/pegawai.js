// Data Pegawai Diskominfo Bengkayang - Struktur per Bidang
const BIDANG_DATA = [
    {
        id: 'pimpinan',
        nama: 'Pimpinan',
        deskripsi: 'Kepala Dinas dan Sekretaris',
        color: 'from-blue-900 to-blue-700',
        anggota: [
            {
                nama: 'Nama Kepala Dinas',
                jabatan: 'Kepala Dinas',
                nip: '19XX0101 200X01 X XXX',
                foto: 'https://ui-avatars.com/api/?name=Kepala+Dinas&background=1e3a8a&color=fff&size=200&font-size=0.35',
                role: 'LEADER'
            },
            {
                nama: 'Nama Sekretaris',
                jabatan: 'Sekretaris',
                nip: '19XX0101 200X01 X XXX',
                foto: 'https://ui-avatars.com/api/?name=Sekretaris&background=2563eb&color=fff&size=200&font-size=0.35',
                role: 'SECRETARY'
            }
        ]
    },
    {
        id: 'aptika',
        nama: 'Bidang Aptika',
        deskripsi: 'Aplikasi dan Teknologi Informasi & Komunikasi',
        color: 'from-purple-700 to-purple-500',
        anggota: [
            {
                nama: 'Kepala Bidang Aptika',
                jabatan: 'Kabid Aptika',
                nip: '19XX0101 200X01 X XXX',
                foto: 'https://ui-avatars.com/api/?name=Kabid+Aptika&background=7c3aed&color=fff&size=200&font-size=0.35',
                role: 'HEAD'
            },
            {
                nama: 'Staff Aptika 1',
                jabatan: 'Analis Sistem Informasi',
                nip: '19XX0101 200X01 X XXX',
                foto: 'https://ui-avatars.com/api/?name=Staff+A1&background=8b5cf6&color=fff&size=200&font-size=0.35',
                role: 'MEMBER'
            },
            {
                nama: 'Staff Aptika 2',
                jabatan: 'Programmer',
                nip: '19XX0101 200X01 X XXX',
                foto: 'https://ui-avatars.com/api/?name=Staff+A2&background=a78bfa&color=fff&size=200&font-size=0.35',
                role: 'MEMBER'
            },
            {
                nama: 'Staff Aptika 3',
                jabatan: 'Pengelola TIK',
                nip: '19XX0101 200X01 X XXX',
                foto: 'https://ui-avatars.com/api/?name=Staff+A3&background=c4b5fd&color=fff&size=200&font-size=0.33',
                role: 'MEMBER'
            }
        ]
    },
    {
        id: 'ips',
        nama: 'Bidang IPS',
        deskripsi: 'Informasi dan Komunikasi Publik',
        color: 'from-emerald-700 to-emerald-500',
        anggota: [
            {
                nama: 'Kepala Bidang IPS',
                jabatan: 'Kabid IPS',
                nip: '19XX0101 200X01 X XXX',
                foto: 'https://ui-avatars.com/api/?name=Kabid+IPS&background=047857&color=fff&size=200&font-size=0.35',
                role: 'HEAD'
            },
            {
                nama: 'Staff IPS 1',
                jabatan: 'Pengelola Informasi Publik',
                nip: '19XX0101 200X01 X XXX',
                foto: 'https://ui-avatars.com/api/?name=Staff+I1&background=059669&color=fff&size=200&font-size=0.35',
                role: 'MEMBER'
            },
            {
                nama: 'Staff IPS 2',
                jabatan: 'Pranata Humas',
                nip: '19XX0101 200X01 X XXX',
                foto: 'https://ui-avatars.com/api/?name=Staff+I2&background=10b981&color=fff&size=200&font-size=0.35',
                role: 'MEMBER'
            },
            {
                nama: 'Staff IPS 3',
                jabatan: 'Dokumentasi',
                nip: '19XX0101 200X01 X XXX',
                foto: 'https://ui-avatars.com/api/?name=Staff+I3&background=34d399&color=fff&size=200&font-size=0.35',
                role: 'MEMBER'
            }
        ]
    },
    {
        id: 'statistik',
        nama: 'Bidang Statistik & Persandian',
        deskripsi: 'Statistik Sektoral dan Persandian',
        color: 'from-orange-700 to-orange-500',
        anggota: [
            {
                nama: 'Kepala Bidang Statistik',
                jabatan: 'Kabid Statistik & Persandian',
                nip: '19XX0101 200X01 X XXX',
                foto: 'https://ui-avatars.com/api/?name=Kabid+Stat&background=c2410c&color=fff&size=200&font-size=0.35',
                role: 'HEAD'
            },
            {
                nama: 'Staff Statistik 1',
                jabatan: 'Analis Data',
                nip: '19XX0101 200X01 X XXX',
                foto: 'https://ui-avatars.com/api/?name=Staff+S1&background=ea580c&color=fff&size=200&font-size=0.35',
                role: 'MEMBER'
            },
            {
                nama: 'Staff Statistik 2',
                jabatan: 'Sandiman',
                nip: '19XX0101 200X01 X XXX',
                foto: 'https://ui-avatars.com/api/?name=Staff+S2&background=f97316&color=fff&size=200&font-size=0.35',
                role: 'MEMBER'
            }
        ]
    },
    {
        id: 'sekretariat',
        nama: 'Sub Bagian Umum & Kepegawaian',
        deskripsi: 'Administrasi Umum dan Kepegawaian',
        color: 'from-rose-700 to-rose-500',
        anggota: [
            {
                nama: 'Kasubag Umum',
                jabatan: 'Kepala Sub Bagian Umum',
                nip: '19XX0101 200X01 X XXX',
                foto: 'https://ui-avatars.com/api/?name=Kasubag&background=be123c&color=fff&size=200&font-size=0.35',
                role: 'HEAD'
            },
            {
                nama: 'Staff Umum 1',
                jabatan: 'Penata Keuangan',
                nip: '19XX0101 200X01 X XXX',
                foto: 'https://ui-avatars.com/api/?name=Staff+U1&background=e11d48&color=fff&size=200&font-size=0.35',
                role: 'MEMBER'
            },
            {
                nama: 'Staff Umum 2',
                jabatan: 'Administrasi',
                nip: '19XX0101 200X01 X XXX',
                foto: 'https://ui-avatars.com/api/?name=Staff+U2&background=f43f5e&color=fff&size=200&font-size=0.35',
                role: 'MEMBER'
            }
        ]
    }
];
