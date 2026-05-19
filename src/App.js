// Main App Component with Simple Router
const App = () => {
    const [currentPage, setCurrentPage] = React.useState('home');

    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    React.useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    });

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage setCurrentPage={setCurrentPage} />;
            case 'profil':
                return <ProfilPage />;
            case 'struktur':
                return <StrukturOrganisasiPage />;
            case 'berita':
                return <BeritaPage />;
            case 'kontak':
                return <KontakPage />;
            default:
                return <HomePage setCurrentPage={setCurrentPage} />;
        }
    };

    return (
        <div className="min-h-screen">
            <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <main>
                {renderPage()}
            </main>
            <Footer setCurrentPage={setCurrentPage} />
        </div>
    );
};

// Render App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
