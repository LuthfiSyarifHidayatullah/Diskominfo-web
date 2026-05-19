// Struktur Organisasi Page - MPL ID Roster Style
// Card foto pegawai dengan hover warna sesuai tipe jabatan

const StrukturOrganisasiPage = () => {
    const [activeBidang, setActiveBidang] = React.useState('');
    const [isAnimating, setIsAnimating] = React.useState(false);
    const [bidangData, setBidangData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    // Warna HOVER card berdasarkan tipe jabatan
    const TIPE_JABATAN_STYLES = {
        kepala_dinas: {
            hoverBorder: 'hover:border-red-500',
            hoverShadow: 'hover:shadow-red-200',
            hoverRing: 'group-hover:ring-red-500',
            hoverBg: 'group-hover:bg-red-500',
            badge: 'bg-red-100 text-red-700 group-hover:bg-red-500 group-hover:text-white',
            label: 'Kepala Dinas',
            dotColor: 'bg-red-500'
        },
        sekretaris: {
            hoverBorder: 'hover:border-blue-500',
            hoverShadow: 'hover:shadow-blue-200',
            hoverRing: 'group-hover:ring-blue-500',
            hoverBg: 'group-hover:bg-blue-500',
            badge: 'bg-blue-100 text-blue-700 group-hover:bg-blue-500 group-hover:text-white',
            label: 'Sekretaris / Kabid',
            dotColor: 'bg-blue-500'
        },
        kasubag: {
            hoverBorder: 'hover:border-emerald-500',
            hoverShadow: 'hover:shadow-emerald-200',
            hoverRing: 'group-hover:ring-emerald-500',
            hoverBg: 'group-hover:bg-emerald-500',
            badge: 'bg-emerald-100 text-emerald-700 group-hover:bg-emerald-500 group-hover:text-white',
            label: 'Kasubag',
            dotColor: 'bg-emerald-500'
        },
        pelaksana: {
            hoverBorder: 'hover:border-orange-500',
            hoverShadow: 'hover:shadow-orange-200',
            hoverRing: 'group-hover:ring-orange-500',
            hoverBg: 'group-hover:bg-orange-500',
            badge: 'bg-orange-100 text-orange-700 group-hover:bg-orange-500 group-hover:text-white',
            label: 'Pelaksana',
            dotColor: 'bg-orange-500'
        },
        jafung: {
            hoverBorder: 'hover:border-gray-500',
            hoverShadow: 'hover:shadow-gray-200',
            hoverRing: 'group-hover:ring-gray-500',
            hoverBg: 'group-hover:bg-gray-500',
            badge: 'bg-gray-100 text-gray-700 group-hover:bg-gray-500 group-hover:text-white',
            label: 'Jafung',
            dotColor: 'bg-gray-500'
        },
        pppk: {
            hoverBorder: 'hover:border-yellow-500',
            hoverShadow: 'hover:shadow-yellow-200',
            hoverRing: 'group-hover:ring-yellow-500',
            hoverBg: 'group-hover:bg-yellow-500',
            badge: 'bg-yellow-100 text-yellow-700 group-hover:bg-yellow-500 group-hover:text-white',
            label: 'PPPK',
            dotColor: 'bg-yellow-500'
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/export');
            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    setBidangData(data);
                    setActiveBidang(data[0].id);
                    setLoading(false);
                    return;
                }
            }
        } catch (e) {
            console.log('Backend not available, using static data');
        }

        if (typeof BIDANG_DATA !== 'undefined' && BIDANG_DATA.length > 0) {
            setBidangData(BIDANG_DATA);
            setActiveBidang(BIDANG_DATA[0].id);
        }
        setLoading(false);
    };

    const currentBidang = bidangData.find(b => b.id === activeBidang);

    const handleBidangChange = (bidangId) => {
        if (bidangId === activeBidang) return;
        setIsAnimating(true);
        setTimeout(() => {
            setActiveBidang(bidangId);
            setIsAnimating(false);
        }, 200);
    };

    const getStyle = (tipeJabatan) => {
        return TIPE_JABATAN_STYLES[tipeJabatan] || TIPE_JABATAN_STYLES.pelaksana;
    };

    const getFotoUrl = (pegawai) => {
        if (pegawai.foto && pegawai.foto.startsWith('/uploads/')) {
            return pegawai.foto;
        }
        if (pegawai.foto && pegawai.foto.startsWith('http')) {
            return pegawai.foto;
        }
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(pegawai.nama)}&background=e2e8f0&color=475569&size=200&font-size=0.35`;
    };

    if (loading) {
        return (
            <div className="pt-20 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500">Memuat data...</p>
                </div>
            </div>
        );
    }

    if (!currentBidang) {
        return (
            <div className="pt-20 min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Tidak ada data bidang tersedia.</p>
            </div>
        );
    }

    return (
        <div className="pt-20">
            {/* Header */}
            <section className="gradient-hero py-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-20 w-64 h-64 bg-yellow-300 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-20 w-48 h-48 bg-white rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Struktur Organisasi
                        </h1>
                        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                            Susunan pegawai Dinas Komunikasi dan Informatika Kabupaten Bengkayang
                        </p>
                    </div>
                </div>
            </section>

            {/* Legend - Tipe Jabatan */}
            <section className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
                        <span className="text-gray-500 font-medium">Keterangan Warna:</span>
                        {Object.entries(TIPE_JABATAN_STYLES).map(([key, style]) => (
                            <div key={key} className="flex items-center space-x-1.5">
                                <div className={`w-3 h-3 rounded-full ${style.dotColor}`}></div>
                                <span className="text-gray-600 font-medium">{style.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bidang Tabs */}
            <section className="bg-white shadow-sm sticky top-16 md:top-20 z-30 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex overflow-x-auto py-4 space-x-2 scrollbar-hide">
                        {bidangData.map((bidang) => (
                            <button
                                key={bidang.id}
                                onClick={() => handleBidangChange(bidang.id)}
                                className={`bidang-tab whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                    activeBidang === bidang.id
                                        ? 'active'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {bidang.nama}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Roster Display */}
            <section className="py-16 bg-gray-50 min-h-[60vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Bidang Info */}
                    <div className={`text-center mb-12 transition-opacity duration-200 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentBidang.nama}</h2>
                        <p className="text-gray-600 max-w-lg mx-auto">{currentBidang.deskripsi}</p>
                    </div>

                    {/* Cards Grid */}
                    <div className={`transition-all duration-200 ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                            {currentBidang.anggota.map((pegawai, index) => {
                                const style = getStyle(pegawai.tipeJabatan || 'pelaksana');
                                return (
                                    <div
                                        key={pegawai.id || index}
                                        className={`group bg-white rounded-2xl border-2 border-gray-100 w-full max-w-[260px] overflow-hidden cursor-pointer
                                            transition-all duration-300 ease-out
                                            hover:-translate-y-2 hover:shadow-xl ${style.hoverBorder} ${style.hoverShadow}`}
                                    >
                                        {/* Top color bar - appears on hover */}
                                        <div className={`h-1 bg-gray-100 transition-colors duration-300 ${style.hoverBg}`}></div>

                                        {/* Photo */}
                                        <div className="pt-6 pb-3 flex justify-center">
                                            <div className={`w-28 h-28 rounded-full overflow-hidden border-4 border-gray-100 shadow-md
                                                transition-all duration-300
                                                group-hover:border-transparent ring-0 group-hover:ring-4 ${style.hoverRing}`}>
                                                <img
                                                    src={getFotoUrl(pegawai)}
                                                    alt={pegawai.nama}
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                />
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="pb-6 px-4 text-center">
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 transition-colors duration-300 ${style.badge}`}>
                                                {style.label}
                                            </span>
                                            <h4 className="font-bold text-gray-900 text-sm mb-1 leading-tight">
                                                {pegawai.nama}
                                            </h4>
                                            <p className="text-gray-500 text-xs font-medium mb-1">
                                                {pegawai.jabatan}
                                            </p>
                                            <p className="text-gray-300 text-xs font-mono">
                                                {pegawai.nip}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Count Summary */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-center text-lg font-semibold text-gray-900 mb-8">Ringkasan Per Bidang</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {bidangData.map((bidang) => (
                            <button
                                key={bidang.id}
                                onClick={() => { handleBidangChange(bidang.id); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
                                className="bg-gray-50 hover:bg-blue-50 rounded-xl p-4 text-center transition-colors border border-gray-100 hover:border-blue-200"
                            >
                                <div className="text-2xl font-bold text-blue-700">{bidang.anggota.length}</div>
                                <div className="text-xs text-gray-600 mt-1 font-medium">{bidang.nama}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
