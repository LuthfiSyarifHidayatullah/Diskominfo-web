// Profil Page
const ProfilPage = () => {
    return (
        <div className="pt-20">
            {/* Header */}
            <section className="gradient-hero py-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-20 w-64 h-64 bg-yellow-300 rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Profil Diskominfo
                    </h1>
                    <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                        Dinas Komunikasi dan Informatika Kabupaten Bengkayang
                    </p>
                </div>
            </section>

            {/* Tentang */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Tentang <span className="text-blue-600">Kami</span>
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Dinas Komunikasi dan Informatika (Diskominfo) Kabupaten Bengkayang adalah 
                                perangkat daerah yang melaksanakan urusan pemerintahan di bidang komunikasi 
                                dan informatika, statistik, serta persandian.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Diskominfo berperan strategis dalam mendukung transformasi digital pemerintahan 
                                dan pelayanan publik di Kabupaten Bengkayang, Provinsi Kalimantan Barat.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Dengan semangat inovasi dan pelayanan, kami berkomitmen untuk mewujudkan 
                                tata kelola pemerintahan yang transparan, efektif, dan akuntabel melalui 
                                pemanfaatan teknologi informasi dan komunikasi.
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-12 w-full max-w-sm text-center">
                                <div className="text-6xl mb-4">🏛️</div>
                                <h3 className="font-bold text-xl text-gray-900 mb-2">Diskominfo</h3>
                                <p className="text-gray-600 text-sm">Kabupaten Bengkayang</p>
                                <p className="text-gray-500 text-xs mt-1">Kalimantan Barat</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visi Misi */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                                <span className="text-2xl">🎯</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Visi</h3>
                            <p className="text-gray-600 leading-relaxed italic text-lg">
                                "Terwujudnya masyarakat Bengkayang yang informatif dan berdaya saing 
                                melalui pemanfaatan teknologi informasi dan komunikasi yang andal dan 
                                terintegrasi."
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                                <span className="text-2xl">🚀</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Misi</h3>
                            <ul className="space-y-3">
                                {[
                                    'Meningkatkan pengelolaan informasi dan komunikasi publik yang berkualitas.',
                                    'Mengembangkan infrastruktur TIK yang handal dan merata.',
                                    'Mewujudkan tata kelola e-government yang terintegrasi.',
                                    'Meningkatkan keamanan informasi dan persandian daerah.',
                                    'Mengembangkan statistik sektoral yang akurat dan terpercaya.'
                                ].map((misi, index) => (
                                    <li key={index} className="flex items-start space-x-3">
                                        <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                            {index + 1}
                                        </span>
                                        <span className="text-gray-600 text-sm leading-relaxed">{misi}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tugas dan Fungsi */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Tugas & <span className="text-blue-600">Fungsi</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Tugas pokok dan fungsi Dinas Komunikasi dan Informatika Kabupaten Bengkayang
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: 'Pengelolaan Informasi Publik', desc: 'Mengelola dan menyebarluaskan informasi publik melalui berbagai media komunikasi.', icon: '📢' },
                            { title: 'Pengembangan E-Government', desc: 'Mengembangkan sistem pemerintahan elektronik untuk meningkatkan efisiensi layanan.', icon: '🖥️' },
                            { title: 'Infrastruktur TIK', desc: 'Membangun dan memelihara infrastruktur teknologi informasi di lingkungan pemerintah daerah.', icon: '🌐' },
                            { title: 'Keamanan Informasi', desc: 'Menjamin keamanan data dan informasi melalui pengelolaan persandian yang profesional.', icon: '🔒' },
                            { title: 'Statistik Sektoral', desc: 'Mengelola data statistik sektoral untuk mendukung perencanaan pembangunan daerah.', icon: '📊' },
                            { title: 'Pelayanan Publik', desc: 'Menyediakan pelayanan publik berbasis teknologi yang mudah diakses oleh masyarakat.', icon: '🤝' }
                        ].map((item, index) => (
                            <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-blue-50 transition-colors border border-gray-100">
                                <div className="text-3xl mb-4">{item.icon}</div>
                                <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
