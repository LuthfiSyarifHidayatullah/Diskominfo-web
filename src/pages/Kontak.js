// Kontak Page
const KontakPage = () => {
    const [formData, setFormData] = React.useState({
        nama: '',
        email: '',
        subjek: '',
        pesan: ''
    });
    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setFormData({ nama: '', email: '', subjek: '', pesan: '' });
    };

    return (
        <div className="pt-20">
            {/* Header */}
            <section className="gradient-hero py-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute bottom-10 left-20 w-64 h-64 bg-yellow-300 rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Hubungi Kami
                    </h1>
                    <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                        Sampaikan pertanyaan, masukan, atau pengaduan Anda kepada Diskominfo Bengkayang
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Contact Info */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                                    <span className="text-xl">📍</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Alamat Kantor</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Jl. Raya Bengkayang<br />
                                    Kabupaten Bengkayang<br />
                                    Kalimantan Barat, Indonesia
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                                    <span className="text-xl">📧</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                                <p className="text-gray-600 text-sm">diskominfo@bengkayangkab.go.id</p>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                                    <span className="text-xl">📞</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Telepon</h3>
                                <p className="text-gray-600 text-sm">(0562) XXXXXX</p>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                                    <span className="text-xl">🕐</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Jam Operasional</h3>
                                <p className="text-gray-600 text-sm">
                                    Senin - Jumat: 08:00 - 16:00 WIB<br />
                                    Sabtu - Minggu: Tutup
                                </p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Kirim Pesan</h3>
                                
                                {submitted && (
                                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center space-x-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Pesan berhasil dikirim! Kami akan segera merespons.</span>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.nama}
                                                onChange={(e) => setFormData({...formData, nama: e.target.value})}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                                                placeholder="Nama Anda"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                                                placeholder="email@example.com"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Subjek</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.subjek}
                                            onChange={(e) => setFormData({...formData, subjek: e.target.value})}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                                            placeholder="Subjek pesan"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Pesan</label>
                                        <textarea
                                            required
                                            rows="5"
                                            value={formData.pesan}
                                            onChange={(e) => setFormData({...formData, pesan: e.target.value})}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm resize-none"
                                            placeholder="Tulis pesan Anda di sini..."
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                                    >
                                        Kirim Pesan
                                    </button>
                                </form>
                            </div>

                            {/* Map Placeholder */}
                            <div className="mt-6 bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                                <div className="h-64 bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
                                    <div className="text-center">
                                        <span className="text-4xl block mb-2">🗺️</span>
                                        <p className="text-gray-500 text-sm">Peta Lokasi Kantor Diskominfo</p>
                                        <p className="text-gray-400 text-xs mt-1">Kabupaten Bengkayang, Kalimantan Barat</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
