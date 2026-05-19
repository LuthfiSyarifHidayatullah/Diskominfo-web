// Struktur Organisasi Page - MPL ID Roster Style
// Fetches data from backend API, falls back to static data

const StrukturOrganisasiPage = () => {
    const [activeBidang, setActiveBidang] = React.useState('');
    const [isAnimating, setIsAnimating] = React.useState(false);
    const [bidangData, setBidangData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    // Warna card berdasarkan tipe jabatan
    const TIPE_JABATAN_STYLES = {
        pimpinan: {
            cardBg: 'from-yellow-600 to-amber-500',
            badge: 'bg-yellow-400 text-yellow-900',
            label: 'Pimpinan',
            ringColor: 'ring-yellow-400'
        },
        sekretaris: {
            cardBg: 'from-blue-700 to-blue-500',
            badge: 'bg-blue-400 text-blue-900',
            label: 'Sekretaris',
            ringColor: 'ring-blue-400'
        },
        jafung: {
            cardBg: 'from-purple-700 to-purple-500',
            badge: 'bg-purple-400 text-purple-900',
            label: 'Jabatan Fungsional',
            ringColor: 'ring-purple-400'
        },
        pelaksana: {
            cardBg: 'from-slate-600 to-slate-400',
            badge: 'bg-slate-200 text-slate-700',
            label: 'Pelaksana',
            ringColor: 'ring-slate-400'
        }
    };

    // Warna bidang
    const BIDANG_COLORS = [
        'from-blue-900 to-blue-700',
        'from-purple-700 to-purple-500',
        'from-emerald-700 to-emerald-500',
        'from-orange-700 to-orange-500',
        'from-rose-700 to-rose-500',
        'from-cyan-700 to-cyan-500',
        'from-indigo-700 to-indigo-500'
    ];

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Try fetching from backend API
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

        // Fallback to BIDANG_DATA if defined (static data)
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

    const getBidangColor = (index) => {
        return BIDANG_COLORS[index % BIDANG_COLORS.length];
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
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(pegawai.nama)}&background=4f46e5&color=fff&size=200&font-size=0.35`;
    };

    const isPimpinanLevel = (tipe) => ['pimpinan', 'sekretaris', 'jafung'].includes(tipe);

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

    const bidangIndex = bidangData.findIndex(b => b.id === activeBidang);
    const currentColor = getBidangColor(bidangIndex);

    // Separate leaders and members based on tipeJabatan
    const leaders = currentBidang.anggota.filter(a => isPimpinanLevel(a.tipeJabatan || a.role));
    const members = currentBidang.anggota.filter(a => !isPimpinanLevel(a.tipeJabatan || a.role));

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
                            Susunan pegawai Dinas Komunikasi dan Informatika Kabupaten Bengkayang per bidang
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
                                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${style.cardBg}`}></div>
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
                    {/* Bidang Info Header */}
                    <div className={`text-center mb-12 transition-opacity duration-200 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                        <div className={`inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r ${currentColor} text-white text-sm font-semibold mb-4 shadow-lg`}>
                            {currentBidang.nama}
                        </div>
                        <p className="text-gray-600 max-w-lg mx-auto">
                            {currentBidang.deskripsi}
                        </p>
                    </div>

                    {/* Roster Cards */}
                    <div className={`transition-all duration-200 ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
                        {/* Leaders - Featured Cards */}
                        {leaders.length > 0 && (
                            <div className="flex flex-wrap justify-center gap-6 mb-10">
                                {leaders.map((pegawai, index) => {
                                    const style = getStyle(pegawai.tipeJabatan || 'pimpinan');
                                    return (
                                        <div key={pegawai.id || index} className="roster-card bg-white rounded-2xl shadow-lg border border-gray-100 w-72 overflow-hidden">
                                            <div className={`h-32 bg-gradient-to-br ${style.cardBg} relative flex items-end justify-center`}>
                                                <div className="absolute inset-0 opacity-20">
                                                    <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white/30 rounded-full"></div>
                                                    <div className="absolute bottom-4 left-4 w-8 h-8 border border-white/20 rounded-full"></div>
                                                </div>
                                                <div className="relative -mb-12">
                                                    <div className={`w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white ring-2 ${style.ringColor}`}>
                                                        <img
                                                            src={getFotoUrl(pegawai)}
                                                            alt={pegawai.nama}
                                                            className="roster-img w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    {pegawai.tipeJabatan === 'pimpinan' && (
                                                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
                                                            <span className="text-sm">👑</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="pt-14 pb-6 px-6 text-center">
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${style.badge}`}>
                                                    {style.label}
                                                </span>
                                                <h3 className="font-bold text-lg text-gray-900 mb-1">
                                                    {pegawai.nama}
                                                </h3>
                                                <p className="text-blue-600 text-sm font-medium mb-2">
                                                    {pegawai.jabatan}
                                                </p>
                                                <p className="text-gray-400 text-xs font-mono">
                                                    NIP: {pegawai.nip}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Members - Regular Cards */}
                        {members.length > 0 && (
                            <div>
                                <div className="flex items-center justify-center mb-6">
                                    <div className="h-px bg-gray-200 flex-1 max-w-[100px]"></div>
                                    <span className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Anggota Tim</span>
                                    <div className="h-px bg-gray-200 flex-1 max-w-[100px]"></div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                                    {members.map((pegawai, index) => {
                                        const style = getStyle(pegawai.tipeJabatan || 'pelaksana');
                                        return (
                                            <div key={pegawai.id || index} className="roster-card bg-white rounded-xl shadow-md border border-gray-100 w-full max-w-[260px] overflow-hidden">
                                                <div className={`h-16 bg-gradient-to-r ${style.cardBg} relative flex items-end justify-center`}>
                                                    <div className="relative -mb-8">
                                                        <div className={`w-16 h-16 rounded-full border-3 border-white shadow-lg overflow-hidden bg-white ring-2 ${style.ringColor}`}>
                                                            <img
                                                                src={getFotoUrl(pegawai)}
                                                                alt={pegawai.nama}
                                                                className="roster-img w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="pt-10 pb-5 px-4 text-center">
                                                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-2 ${style.badge}`}>
                                                        {style.label}
                                                    </span>
                                                    <h4 className="font-semibold text-gray-900 text-sm mb-1">
                                                        {pegawai.nama}
                                                    </h4>
                                                    <p className="text-blue-600 text-xs font-medium mb-1">
                                                        {pegawai.jabatan}
                                                    </p>
                                                    <p className="text-gray-400 text-xs font-mono">
                                                        NIP: {pegawai.nip}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
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
