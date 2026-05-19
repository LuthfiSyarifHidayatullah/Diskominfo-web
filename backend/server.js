/**
 * Backend Server - Diskominfo Bengkayang
 * CRUD API untuk data pegawai dengan upload foto
 * 
 * Menggunakan HANYA Node.js built-in modules (tanpa npm dependencies)
 * Storage: JSON file
 * Upload: multipart/form-data parser manual
 * 
 * Jalankan: node server.js
 * Default port: 3000
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'pegawai.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure directories exist
if (!fs.existsSync(path.join(__dirname, 'data'))) fs.mkdirSync(path.join(__dirname, 'data'));
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);

// Initialize data file if not exists
if (!fs.existsSync(DATA_FILE)) {
    const initialData = {
        bidang: [
            {
                id: 'pimpinan',
                nama: 'Pimpinan',
                deskripsi: 'Kepala Dinas dan Sekretaris',
                urutan: 1
            },
            {
                id: 'aptika',
                nama: 'Bidang Aptika',
                deskripsi: 'Aplikasi dan Teknologi Informasi & Komunikasi',
                urutan: 2
            },
            {
                id: 'ips',
                nama: 'Bidang IPS',
                deskripsi: 'Informasi dan Komunikasi Publik',
                urutan: 3
            },
            {
                id: 'statistik',
                nama: 'Bidang Statistik & Persandian',
                deskripsi: 'Statistik Sektoral dan Persandian',
                urutan: 4
            },
            {
                id: 'sekretariat',
                nama: 'Sub Bagian Umum & Kepegawaian',
                deskripsi: 'Administrasi Umum dan Kepegawaian',
                urutan: 5
            }
        ],
        pegawai: [
            {
                id: randomUUID(),
                nama: 'Nama Kepala Dinas',
                jabatan: 'Kepala Dinas',
                nip: '19XX0101 200X01 X XXX',
                tipeJabatan: 'pimpinan',
                bidangId: 'pimpinan',
                foto: '',
                urutan: 1
            },
            {
                id: randomUUID(),
                nama: 'Nama Sekretaris',
                jabatan: 'Sekretaris',
                nip: '19XX0101 200X01 X XXX',
                tipeJabatan: 'sekretaris',
                bidangId: 'pimpinan',
                foto: '',
                urutan: 2
            }
        ]
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
}

// ============ UTILITY FUNCTIONS ============

function readData() {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

function writeData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end(JSON.stringify(data));
}

function getBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (e) {
                resolve(body);
            }
        });
        req.on('error', reject);
    });
}

// Simple multipart form data parser
function parseMultipart(req) {
    return new Promise((resolve, reject) => {
        const contentType = req.headers['content-type'] || '';
        const boundaryMatch = contentType.match(/boundary=(.+)/);
        if (!boundaryMatch) {
            reject(new Error('No boundary found'));
            return;
        }

        const boundary = boundaryMatch[1];
        const chunks = [];

        req.on('data', chunk => chunks.push(chunk));
        req.on('end', () => {
            const buffer = Buffer.concat(chunks);
            const parts = {};
            const files = {};

            const content = buffer.toString('binary');
            const sections = content.split(`--${boundary}`);

            for (const section of sections) {
                if (section === '--\r\n' || section === '--' || section.trim() === '') continue;

                const headerEnd = section.indexOf('\r\n\r\n');
                if (headerEnd === -1) continue;

                const header = section.substring(0, headerEnd);
                const body = section.substring(headerEnd + 4, section.length - 2); // remove trailing \r\n

                const nameMatch = header.match(/name="([^"]+)"/);
                const filenameMatch = header.match(/filename="([^"]+)"/);

                if (!nameMatch) continue;
                const fieldName = nameMatch[1];

                if (filenameMatch) {
                    const filename = filenameMatch[1];
                    const ext = path.extname(filename).toLowerCase();
                    const newFilename = `${randomUUID()}${ext}`;
                    const filePath = path.join(UPLOADS_DIR, newFilename);
                    
                    fs.writeFileSync(filePath, Buffer.from(body, 'binary'));
                    files[fieldName] = {
                        filename: newFilename,
                        originalname: filename,
                        path: filePath
                    };
                } else {
                    parts[fieldName] = body.trim();
                }
            }

            resolve({ fields: parts, files });
        });
        req.on('error', reject);
    });
}

function serveStatic(res, filePath) {
    const extMap = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon'
    };

    const ext = path.extname(filePath).toLowerCase();
    const contentType = extMap[ext] || 'application/octet-stream';

    if (!fs.existsSync(filePath)) {
        sendJSON(res, 404, { error: 'Not found' });
        return;
    }

    const file = fs.readFileSync(filePath);
    res.writeHead(200, {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*'
    });
    res.end(file);
}

// ============ ROUTE HANDLER ============

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const pathname = url.pathname;
    const method = req.method;

    // CORS preflight
    if (method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end();
        return;
    }

    // Serve uploaded files
    if (pathname.startsWith('/uploads/')) {
        const filePath = path.join(UPLOADS_DIR, pathname.replace('/uploads/', ''));
        serveStatic(res, filePath);
        return;
    }

    // Serve admin panel
    if (pathname === '/admin' || pathname === '/admin/') {
        serveStatic(res, path.join(__dirname, 'admin.html'));
        return;
    }

    try {
        // ====== API ROUTES ======

        // GET /api/pegawai - Get all data (bidang + pegawai)
        if (method === 'GET' && pathname === '/api/pegawai') {
            const data = readData();
            sendJSON(res, 200, data);
            return;
        }

        // GET /api/bidang - Get all bidang
        if (method === 'GET' && pathname === '/api/bidang') {
            const data = readData();
            sendJSON(res, 200, data.bidang);
            return;
        }

        // POST /api/bidang - Create new bidang
        if (method === 'POST' && pathname === '/api/bidang') {
            const body = await getBody(req);
            const data = readData();
            const newBidang = {
                id: body.id || randomUUID(),
                nama: body.nama,
                deskripsi: body.deskripsi || '',
                urutan: data.bidang.length + 1
            };
            data.bidang.push(newBidang);
            writeData(data);
            sendJSON(res, 201, newBidang);
            return;
        }

        // PUT /api/bidang/:id - Update bidang
        if (method === 'PUT' && pathname.match(/^\/api\/bidang\/[\w-]+$/)) {
            const bidangId = pathname.split('/').pop();
            const body = await getBody(req);
            const data = readData();
            const index = data.bidang.findIndex(b => b.id === bidangId);
            if (index === -1) { sendJSON(res, 404, { error: 'Bidang tidak ditemukan' }); return; }
            data.bidang[index] = { ...data.bidang[index], ...body };
            writeData(data);
            sendJSON(res, 200, data.bidang[index]);
            return;
        }

        // DELETE /api/bidang/:id - Delete bidang
        if (method === 'DELETE' && pathname.match(/^\/api\/bidang\/[\w-]+$/)) {
            const bidangId = pathname.split('/').pop();
            const data = readData();
            data.bidang = data.bidang.filter(b => b.id !== bidangId);
            data.pegawai = data.pegawai.filter(p => p.bidangId !== bidangId);
            writeData(data);
            sendJSON(res, 200, { message: 'Bidang dihapus' });
            return;
        }

        // POST /api/pegawai - Create new pegawai (multipart for photo upload)
        if (method === 'POST' && pathname === '/api/pegawai') {
            const contentType = req.headers['content-type'] || '';
            let pegawaiData;
            let fotoFilename = '';

            if (contentType.includes('multipart/form-data')) {
                const { fields, files } = await parseMultipart(req);
                pegawaiData = fields;
                if (files.foto) {
                    fotoFilename = `/uploads/${files.foto.filename}`;
                }
            } else {
                pegawaiData = await getBody(req);
            }

            const data = readData();
            const newPegawai = {
                id: randomUUID(),
                nama: pegawaiData.nama || '',
                jabatan: pegawaiData.jabatan || '',
                nip: pegawaiData.nip || '',
                tipeJabatan: pegawaiData.tipeJabatan || 'pelaksana',
                bidangId: pegawaiData.bidangId || '',
                foto: fotoFilename || pegawaiData.foto || '',
                urutan: data.pegawai.filter(p => p.bidangId === pegawaiData.bidangId).length + 1
            };

            data.pegawai.push(newPegawai);
            writeData(data);
            sendJSON(res, 201, newPegawai);
            return;
        }

        // PUT /api/pegawai/:id - Update pegawai
        if (method === 'PUT' && pathname.match(/^\/api\/pegawai\/[\w-]+$/)) {
            const pegawaiId = pathname.split('/').pop();
            const contentType = req.headers['content-type'] || '';
            let pegawaiData;
            let fotoFilename = '';

            if (contentType.includes('multipart/form-data')) {
                const { fields, files } = await parseMultipart(req);
                pegawaiData = fields;
                if (files.foto) {
                    fotoFilename = `/uploads/${files.foto.filename}`;
                }
            } else {
                pegawaiData = await getBody(req);
            }

            const data = readData();
            const index = data.pegawai.findIndex(p => p.id === pegawaiId);
            if (index === -1) { sendJSON(res, 404, { error: 'Pegawai tidak ditemukan' }); return; }

            // Delete old photo if new one uploaded
            if (fotoFilename && data.pegawai[index].foto) {
                const oldFile = path.join(__dirname, data.pegawai[index].foto);
                if (fs.existsSync(oldFile)) fs.unlinkSync(oldFile);
            }

            data.pegawai[index] = {
                ...data.pegawai[index],
                ...pegawaiData,
                foto: fotoFilename || pegawaiData.foto || data.pegawai[index].foto
            };

            writeData(data);
            sendJSON(res, 200, data.pegawai[index]);
            return;
        }

        // DELETE /api/pegawai/:id - Delete pegawai
        if (method === 'DELETE' && pathname.match(/^\/api\/pegawai\/[\w-]+$/)) {
            const pegawaiId = pathname.split('/').pop();
            const data = readData();
            const pegawai = data.pegawai.find(p => p.id === pegawaiId);
            if (pegawai && pegawai.foto) {
                const filePath = path.join(__dirname, pegawai.foto);
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }
            data.pegawai = data.pegawai.filter(p => p.id !== pegawaiId);
            writeData(data);
            sendJSON(res, 200, { message: 'Pegawai dihapus' });
            return;
        }

        // POST /api/pegawai/:id/foto - Upload foto only
        if (method === 'POST' && pathname.match(/^\/api\/pegawai\/[\w-]+\/foto$/)) {
            const pegawaiId = pathname.split('/')[3];
            const { files } = await parseMultipart(req);
            
            if (!files.foto) { sendJSON(res, 400, { error: 'Tidak ada file foto' }); return; }

            const data = readData();
            const index = data.pegawai.findIndex(p => p.id === pegawaiId);
            if (index === -1) { sendJSON(res, 404, { error: 'Pegawai tidak ditemukan' }); return; }

            // Delete old photo
            if (data.pegawai[index].foto) {
                const oldFile = path.join(__dirname, data.pegawai[index].foto);
                if (fs.existsSync(oldFile)) fs.unlinkSync(oldFile);
            }

            data.pegawai[index].foto = `/uploads/${files.foto.filename}`;
            writeData(data);
            sendJSON(res, 200, data.pegawai[index]);
            return;
        }

        // GET /api/export - Export data for frontend (formatted)
        if (method === 'GET' && pathname === '/api/export') {
            const data = readData();
            const formatted = data.bidang
                .sort((a, b) => a.urutan - b.urutan)
                .map(bidang => ({
                    ...bidang,
                    anggota: data.pegawai
                        .filter(p => p.bidangId === bidang.id)
                        .sort((a, b) => a.urutan - b.urutan)
                }));
            sendJSON(res, 200, formatted);
            return;
        }

        // 404
        sendJSON(res, 404, { error: 'Endpoint tidak ditemukan' });

    } catch (error) {
        console.error('Server error:', error);
        sendJSON(res, 500, { error: 'Internal server error' });
    }
});

server.listen(PORT, () => {
    console.log(`\n🚀 Backend Diskominfo Bengkayang`);
    console.log(`   Server berjalan di: http://localhost:${PORT}`);
    console.log(`   Admin Panel: http://localhost:${PORT}/admin`);
    console.log(`   API: http://localhost:${PORT}/api/pegawai`);
    console.log(`\n   Tekan Ctrl+C untuk berhenti.\n`);
});
