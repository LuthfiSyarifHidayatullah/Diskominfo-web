// Navbar Component
const Navbar = ({ currentPage, setCurrentPage }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { id: 'home', label: 'Beranda' },
        { id: 'profil', label: 'Profil' },
        { id: 'struktur', label: 'Struktur Organisasi' },
        { id: 'berita', label: 'Berita' },
        { id: 'kontak', label: 'Kontak' },
    ];

    // Navbar selalu pakai background putih kecuali di Home saat belum scroll
    const isTransparent = currentPage === 'home' && !scrolled;

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isTransparent ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md shadow-lg'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-sm">DK</span>
                        </div>
                        <div className="hidden sm:block">
                            <h1 className={`font-bold text-sm leading-tight ${isTransparent ? 'text-white' : 'text-gray-900'}`}>
                                DISKOMINFO
                            </h1>
                            <p className={`text-xs ${isTransparent ? 'text-blue-100' : 'text-gray-500'}`}>
                                Kab. Bengkayang
                            </p>
                        </div>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map(link => (
                            <button
                                key={link.id}
                                onClick={() => setCurrentPage(link.id)}
                                className={`nav-link px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    currentPage === link.id
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : isTransparent
                                            ? 'text-white/90 hover:text-white hover:bg-white/10'
                                            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                }`}
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`md:hidden p-2 rounded-lg ${isTransparent ? 'text-white' : 'text-gray-700'}`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden bg-white rounded-xl shadow-xl mt-2 p-4 fade-in">
                        {navLinks.map(link => (
                            <button
                                key={link.id}
                                onClick={() => { setCurrentPage(link.id); setIsOpen(false); }}
                                className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                    currentPage === link.id
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                                }`}
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};
