// Home Page Component
const HomePage = ({ setCurrentPage }) => {
    const [berita, setBerita] = React.useState([]);
    const [loadingBerita, setLoadingBerita] = React.useState(true);

    React.useEffect(() => {
        fetchBerita();
    }, []);

    const fetchBerita = async () => {
        try {
            const response = await fetch('https://diskominfo.bengkayangkab.go.id/wp-json/wp/v2/posts?per_page=3&_embed');
            if (response.ok) {
                const data = await response.json();
                setBerita(data);
            } else {
                setBerita(getDummyBerita());
            }
        } catch (error) {
            console.log('WordPress API not available, using fallback data');
            setBerita(getDummyBerita());
        }
        setLoadingBerita(false);
    };

    const getDummyBerita = () => [
        {
            id: 1,
            title: { rendered: 'Diskominfo Bengkayang Gelar Workshop Literasi Digital' },
            excerpt: { rendered: '<p>Workshop literasi digital untuk meningkatkan kemampuan masyarakat dalam memanfaatkan teknologi informasi secara bijak dan produktif.</p>' },
            date: '2024-12-15T10:00:00',
            _embedded: { 'wp:featuredmedia': [{ source_url: '' }] }
        },
        {
            id: 2,
            title: { rendered: 'Pengembangan Smart City Bengkayang Tahap 2' },
            excerpt: { rendered: '<p>Pemerintah Kabupaten Bengkayang melanjutkan pengembangan smart city untuk meningkatkan kualitas layanan publik berbasis digital.</p>' },
            date: '2024-12-10T08:30:00',
            _embedded: { 'wp:featuredmedia': [{ source_url: '' }] }
        },
        {
            id: 3,
            title: { rendered: 'Sosialisasi Keamanan Data dan Informasi Publik' },
            excerpt: { rendered: '<p>Diskominfo mengadakan sosialisasi tentang pentingnya keamanan data dan informasi di era digital kepada seluruh perangkat daerah.</p>' },
            date: '2024-12-05T14:00:00',
            _embedded: { 'wp:featuredmedia': [{ source_url: '' }] }
        }
    ];

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    const stripHtml = (html) => {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };

    return (
        <div>
            {/* Hero Section */}
            <section className="gradient-hero min-h-screen flex items-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-300 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="fade-in">
                            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-blue-100 text-sm mb-6 border border-white/20">
                                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                                Melayani Masyarakat Bengkayang
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                Dinas Komunikasi &
                                <span className="text-yellow-300"> Informatika</span>
                            </h1>
                            <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-lg">
                                Mewujudkan tata kelola pemerintahan yang transparan, efektif, dan 
                                inovatif melalui pemanfaatan teknologi informasi dan komunikasi 
                                di Kabupaten Bengkayang.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button 
                                    onClick={() => setCurrentPage('profil')}
                                    className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                >
                                    Tentang Kami
                                </button>
                                <button 
                                    onClick={() => setCurrentPage('kontak')}
                                    className="px-8 py-3 bg-transparent text-white font-semibold rounded-xl border-2 border-white/50 hover:bg-white/10 transition-all"
                                >
                                    Hubungi Kami
                                </button>
                            </div>
                        </div>
                        
                        <div className="hidden lg:flex justify-center">
                            <div className="relative">
                                <div className="w-80 h-80 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="flex justify-center mb-4">
                                            <img src="/src/assets/bengkayang.png" alt="Logo Kabupaten Bengkayang" className="w-40 h-40 object-contain" />
                                        </div>
                                        <p className="text-white font-semibold text-lg">Kab. Bengkayang</p>
                                        <p className="text-blue-200 text-sm">Kalimantan Barat</p>
                                    </div>
                                </div>
                                <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400/20 rounded-xl backdrop-blur-sm border border-yellow-300/30 flex items-center justify-center">
                                    <span className="text-2xl">📡</span>
                                </div>
                                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-400/20 rounded-xl backdrop-blur-sm border border-green-300/30 flex items-center justify-center">
                                    <span className="text-xl">💻</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-white shadow-sm relative -mt-16 mx-4 sm:mx-8 lg:mx-auto max-w-6xl rounded-2xl z-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8">
                    {[
                        { number: '50+', label: 'Pegawai', icon: '👥' },
                        { number: '20+', label: 'Layanan Digital', icon: '🖥️' },
                        { number: '100+', label: 'Berita Terbit', icon: '📰' },
                        { number: '7', label: 'Kecamatan Terlayani', icon: '🏘️' },
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-2xl mb-2">{stat.icon}</div>
                            <div className="text-2xl md:text-3xl font-bold text-blue-700">{stat.number}</div>
                            <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Layanan Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Layanan <span className="text-blue-600">Kami</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Berbagai layanan yang kami sediakan untuk mendukung transformasi digital 
                            di Kabupaten Bengkayang.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {LAYANAN_DATA.map((layanan) => (
                            <div key={layanan.id} className="bg-white rounded-xl p-6 card-hover shadow-sm border border-gray-100">
                                <div className={`w-12 h-12 ${layanan.color} rounded-xl flex items-center justify-center mb-4`}>
                                    <i data-lucide={layanan.icon} className="w-6 h-6 text-white"></i>
                                </div>
                                <h3 className="font-semibold text-lg text-gray-900 mb-2">{layanan.judul}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{layanan.deskripsi}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Berita Terbaru Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                Berita <span className="text-blue-600">Terbaru</span>
                            </h2>
                            <p className="text-gray-600">Informasi dan kegiatan terkini dari Diskominfo Bengkayang</p>
                        </div>
                        <button 
                            onClick={() => setCurrentPage('berita')}
                            className="hidden md:inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-md"
                        >
                            Lihat Semua
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {loadingBerita ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-gray-100 rounded-xl h-72 animate-pulse"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {berita.map((item) => (
                                <article key={item.id} className="news-card bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                                    <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                                        <span className="text-4xl">📰</span>
                                    </div>
                                    <div className="p-6">
                                        <div className="text-sm text-blue-600 font-medium mb-2">
                                            {formatDate(item.date)}
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-snug">
                                            {item.title.rendered}
                                        </h3>
                                        <p className="text-gray-600 text-sm line-clamp-2">
                                            {stripHtml(item.excerpt.rendered)}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    <div className="md:hidden text-center mt-8">
                        <button 
                            onClick={() => setCurrentPage('berita')}
                            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
                        >
                            Lihat Semua Berita
                        </button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 gradient-hero relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 right-20 w-64 h-64 bg-yellow-300 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 left-20 w-48 h-48 bg-white rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Butuh Informasi Lebih Lanjut?
                    </h2>
                    <p className="text-blue-100 mb-8 text-lg">
                        Hubungi kami untuk pertanyaan seputar layanan Diskominfo Kabupaten Bengkayang
                    </p>
                    <button 
                        onClick={() => setCurrentPage('kontak')}
                        className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-all shadow-lg text-lg"
                    >
                        Hubungi Kami
                    </button>
                </div>
            </section>
        </div>
    );
};
