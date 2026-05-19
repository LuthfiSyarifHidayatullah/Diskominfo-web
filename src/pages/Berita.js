// Berita Page - Connected to WordPress REST API
const BeritaPage = () => {
    const [berita, setBerita] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);
    const [searchQuery, setSearchQuery] = React.useState('');

    const WP_API_URL = 'https://diskominfo.bengkayangkab.go.id/wp-json/wp/v2/posts';

    React.useEffect(() => {
        fetchBerita();
    }, [page]);

    const fetchBerita = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                per_page: '9',
                page: page.toString(),
                _embed: 'true'
            });
            if (searchQuery) params.append('search', searchQuery);

            const response = await fetch(`${WP_API_URL}?${params}`);
            if (response.ok) {
                const data = await response.json();
                const total = response.headers.get('X-WP-TotalPages');
                setTotalPages(parseInt(total) || 1);
                setBerita(data);
            } else {
                setBerita(getDummyBerita());
            }
        } catch (error) {
            console.log('WordPress API not available, using fallback');
            setBerita(getDummyBerita());
        }
        setLoading(false);
    };

    const getDummyBerita = () => [
        {
            id: 1,
            title: { rendered: 'Diskominfo Bengkayang Gelar Workshop Literasi Digital untuk Masyarakat' },
            excerpt: { rendered: '<p>Workshop literasi digital diadakan untuk meningkatkan kemampuan masyarakat Bengkayang dalam memanfaatkan teknologi informasi secara bijak dan produktif di era digital.</p>' },
            date: '2024-12-15T10:00:00',
            link: '#',
            _embedded: { 'wp:featuredmedia': [{ source_url: '' }] }
        },
        {
            id: 2,
            title: { rendered: 'Pengembangan Smart City Bengkayang Memasuki Tahap Kedua' },
            excerpt: { rendered: '<p>Pemerintah Kabupaten Bengkayang melanjutkan program pengembangan smart city untuk meningkatkan kualitas layanan publik berbasis teknologi digital.</p>' },
            date: '2024-12-10T08:30:00',
            link: '#',
            _embedded: { 'wp:featuredmedia': [{ source_url: '' }] }
        },
        {
            id: 3,
            title: { rendered: 'Sosialisasi Keamanan Data dan Informasi di Lingkungan Pemerintah' },
            excerpt: { rendered: '<p>Diskominfo mengadakan sosialisasi tentang pentingnya keamanan data dan informasi di era digital kepada seluruh perangkat daerah Kabupaten Bengkayang.</p>' },
            date: '2024-12-05T14:00:00',
            link: '#',
            _embedded: { 'wp:featuredmedia': [{ source_url: '' }] }
        },
        {
            id: 4,
            title: { rendered: 'Pelatihan Pengelolaan Website OPD di Kabupaten Bengkayang' },
            excerpt: { rendered: '<p>Diskominfo menyelenggarakan pelatihan pengelolaan website bagi operator OPD untuk meningkatkan kualitas informasi publik di lingkungan Pemkab Bengkayang.</p>' },
            date: '2024-11-28T09:00:00',
            link: '#',
            _embedded: { 'wp:featuredmedia': [{ source_url: '' }] }
        },
        {
            id: 5,
            title: { rendered: 'Jaringan Internet Masuk ke Pelosok Kecamatan Terbaru' },
            excerpt: { rendered: '<p>Program perluasan jaringan internet berhasil menjangkau wilayah pelosok di beberapa kecamatan Kabupaten Bengkayang untuk pemerataan akses informasi.</p>' },
            date: '2024-11-20T11:00:00',
            link: '#',
            _embedded: { 'wp:featuredmedia': [{ source_url: '' }] }
        },
        {
            id: 6,
            title: { rendered: 'Rapat Koordinasi Pengelolaan Data Statistik Sektoral' },
            excerpt: { rendered: '<p>Rapat koordinasi dilaksanakan untuk membahas pengelolaan dan integrasi data statistik sektoral antar OPD di Kabupaten Bengkayang.</p>' },
            date: '2024-11-15T10:00:00',
            link: '#',
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

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        fetchBerita();
    };

    return (
        <div className="pt-20">
            {/* Header */}
            <section className="gradient-hero py-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 right-20 w-64 h-64 bg-yellow-300 rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Berita & Informasi
                        </h1>
                        <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
                            Berita terkini dari Dinas Komunikasi dan Informatika Kabupaten Bengkayang
                        </p>

                        <form onSubmit={handleSearch} className="max-w-lg mx-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari berita..."
                                    className="w-full px-6 py-4 pr-14 rounded-xl text-gray-900 placeholder-gray-400 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />
                                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* Info Banner */}
            <div className="bg-blue-50 border-b border-blue-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex items-center justify-center space-x-2 text-sm text-blue-700">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Berita ditampilkan dari <strong>diskominfo.bengkayangkab.go.id</strong> via WordPress REST API</span>
                    </div>
                </div>
            </div>

            {/* News Grid */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="bg-white rounded-xl h-80 animate-pulse shadow-sm"></div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {berita.map((item) => (
                                    <article key={item.id} className="news-card bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                                        <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center relative">
                                            <div className="absolute top-3 left-3">
                                                <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                                                    Berita
                                                </span>
                                            </div>
                                            <span className="text-5xl opacity-50">📰</span>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span>{formatDate(item.date)}</span>
                                            </div>
                                            <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 leading-snug hover:text-blue-600 transition-colors cursor-pointer">
                                                {item.title.rendered}
                                            </h3>
                                            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                                                {stripHtml(item.excerpt.rendered)}
                                            </p>
                                            <a 
                                                href={item.link || `https://diskominfo.bengkayangkab.go.id/?p=${item.id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center mt-4 text-blue-600 text-sm font-medium hover:text-blue-700"
                                            >
                                                Baca Selengkapnya
                                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </a>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-center items-center space-x-4 mt-12">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    ← Sebelumnya
                                </button>
                                <span className="text-sm text-gray-600">
                                    Halaman <strong>{page}</strong> dari <strong>{totalPages}</strong>
                                </span>
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Selanjutnya →
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </div>
    );
};
