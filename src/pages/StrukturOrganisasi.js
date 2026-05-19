// Struktur Organisasi Page - MPL ID Roster Style
const StrukturOrganisasiPage = () => {
    const [activeBidang, setActiveBidang] = React.useState('pimpinan');
    const [isAnimating, setIsAnimating] = React.useState(false);

    const currentBidang = BIDANG_DATA.find(b => b.id === activeBidang);

    const handleBidangChange = (bidangId) => {
        if (bidangId === activeBidang) return;
        setIsAnimating(true);
        setTimeout(() => {
            setActiveBidang(bidangId);
            setIsAnimating(false);
        }, 200);
    };

    const getRoleBadge = (role) => {
        switch (role) {
            case 'LEADER':
                return { label: 'Kepala Dinas', color: 'bg-yellow-400 text-yellow-900' };
            case 'SECRETARY':
                return { label: 'Sekretaris', color: 'bg-blue-400 text-blue-900' };
            case 'HEAD':
                return { label: 'Kepala Bidang', color: 'bg-purple-400 text-purple-900' };
            case 'MEMBER':
                return { label: 'Staff', color: 'bg-gray-200 text-gray-700' };
            default:
                return { label: 'Anggota', color: 'bg-gray-200 text-gray-700' };
        }
    };

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

            {/* Bidang Tabs - Like Team Selection in MPL */}
            <section className="bg-white shadow-sm sticky top-16 md:top-20 z-30 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex overflow-x-auto py-4 space-x-2 scrollbar-hide">
                        {BIDANG_DATA.map((bidang) => (
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
                        <div className={`inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r ${currentBidang.color} text-white text-sm font-semibold mb-4 shadow-lg`}>
                            {currentBidang.nama}
                        </div>
                        <p className="text-gray-600 max-w-lg mx-auto">
                            {currentBidang.deskripsi}
                        </p>
                    </div>

                    {/* Roster Cards - MPL Style Grid */}
                    <div className={`transition-all duration-200 ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
                        {/* Leader/Head - Featured Card */}
                        {currentBidang.anggota.filter(a => a.role !== 'MEMBER').length > 0 && (
                            <div className="flex flex-wrap justify-center gap-6 mb-10">
                                {currentBidang.anggota.filter(a => a.role !== 'MEMBER').map((pegawai, index) => (
                                    <div key={index} className="roster-card bg-white rounded-2xl shadow-lg border border-gray-100 w-72 overflow-hidden">
                                        {/* Card Top Gradient */}
                                        <div className={`h-32 bg-gradient-to-br ${currentBidang.color} relative flex items-end justify-center`}>
                                            <div className="absolute inset-0 opacity-20">
                                                <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white/30 rounded-full"></div>
                                                <div className="absolute bottom-4 left-4 w-8 h-8 border border-white/20 rounded-full"></div>
                                            </div>
                                            {/* Profile Image */}
                                            <div className="relative -mb-12">
                                                <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
                                                    <img 
                                                        src={pegawai.foto} 
                                                        alt={pegawai.nama}
                                                        className="roster-img w-full h-full object-cover"
                                                    />
                                                </div>
                                                {pegawai.role === 'LEADER' && (
                                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
                                                        <span className="text-sm">👑</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {/* Card Content */}
                                        <div className="pt-14 pb-6 px-6 text-center">
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${getRoleBadge(pegawai.role).color}`}>
                                                {getRoleBadge(pegawai.role).label}
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
                                ))}
                            </div>
                        )}

                        {/* Members - Regular Cards */}
                        {currentBidang.anggota.filter(a => a.role === 'MEMBER').length > 0 && (
                            <div>
                                <div className="flex items-center justify-center mb-6">
                                    <div className="h-px bg-gray-200 flex-1 max-w-[100px]"></div>
                                    <span className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Anggota Tim</span>
                                    <div className="h-px bg-gray-200 flex-1 max-w-[100px]"></div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                                    {currentBidang.anggota.filter(a => a.role === 'MEMBER').map((pegawai, index) => (
                                        <div key={index} className="roster-card bg-white rounded-xl shadow-md border border-gray-100 w-full max-w-[260px] overflow-hidden">
                                            <div className={`h-16 bg-gradient-to-r ${currentBidang.color} relative flex items-end justify-center`}>
                                                <div className="relative -mb-8">
                                                    <div className="w-16 h-16 rounded-full border-3 border-white shadow-lg overflow-hidden bg-white">
                                                        <img 
                                                            src={pegawai.foto} 
                                                            alt={pegawai.nama}
                                                            className="roster-img w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="pt-10 pb-5 px-4 text-center">
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
                                    ))}
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
                        {BIDANG_DATA.map((bidang) => (
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
