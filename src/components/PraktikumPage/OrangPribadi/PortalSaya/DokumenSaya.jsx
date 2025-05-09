import { useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsFiletypeXls } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { Radio } from "lucide-react";

const DokumenSaya = () => {
    const data = [
        { nomor: "-", tanggal: "18-02-2025", judul: "SPT Masa PPh Pasal 21/26", jenis: "SPT Masa PPh Pasal 21/26", kasus: "", pembuatan: "18-02-2025" },
        { nomor: "BPE-01438/CT/KPP.1214/2025", tanggal: "18-02-2025", judul: "Bukti Penerimaan Elektronik (BPE)", jenis: "Bukti Penerimaan Elektronik (BPE)", kasus: "", pembuatan: "18-02-2025", penggunaPembuatan: "", },
        { nomor: "-", tanggal: "17-02-2025", judul: "SPT Masa PPh Pasal 21/26", jenis: "SPT Masa PPh Pasal 21/26", kasus: "", pembuatan: "17-02-2025" },
        { nomor: "BPE-01234/CT/KPP.1214/2025", tanggal: "17-02-2025", judul: "Bukti Penerimaan Elektronik (BPE)", jenis: "Bukti Penerimaan Elektronik (BPE)", kasus: "", pembuatan: "17-02-2025", penggunaPembuatan: "", },
        { nomor: "BPE-00111/CT/KPP.1214/2025", tanggal: "30-01-2025", judul: "Bukti Penerimaan Elektronik (BPE)", jenis: "Bukti Penerimaan Elektronik (BPE)", kasus: "", pembuatan: "30-01-2025", penggunaPembuatan: "", },
        { nomor: "040476316341050", tanggal: "30-01-2025", judul: "BILLING_CODE", jenis: "Cetakan Kode Billing", kasus: "", pembuatan: "30-01-2025", penggunaPembuatan: "", },
        { nomor: "-", tanggal: "30-01-2025", judul: "Kartu NPWP Printer", jenis: "Kartu NPWP Printer", kasus: "", pembuatan: "30-01-2025", penggunaPembuatan: "", },
        { nomor: "S-01853/SKT-WP-CT/KPP.1214/2025", tanggal: "30-01-2025", judul: "Surat Keterangan Terdaftar", jenis: "Surat Keterangan Terdaftar", kasus: "", pembuatan: "30-01-2025", penggunaPembuatan: "", },
        { nomor: "-", tanggal: "30-01-2025", judul: "Kartu NPWP", jenis: "Kartu NPWP", kasus: "", pembuatan: "30-01-2025", penggunaPembuatan: "", },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4 pb-3 border-b">
                <div className="flex items-center">
                    <IoDocumentTextOutline className="text-4xl text-blue-900" />
                    <h1 className="text-lg font-bold text-blue-900 ml-2">Dokumen Saya</h1>
                </div>
                <button onClick={openModal} className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded">
                    Upload Dokumen
                </button>
            </div>
            <div className="flex justify-between mb-4 border-b pb-3 ">
                <button className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded">
                    <BsFiletypeXls className="text-2xl text-white" />
                </button>
            </div>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full border border-gray-300 ">
                    <thead className="!bg-yellow-500 text-white">
                        <tr>
                            <th className="px-4 py-2 border">Nomor Dokumen</th>
                            <th className="px-4 py-2 border">Tanggal Dokumen</th>
                            <th className="px-4 py-2 border">Judul Dokumen</th>
                            <th className="px-4 py-2 border">Jenis Dokumen</th>
                            <th className="px-4 py-2 border">Nomor Kasus</th>
                            <th className="px-4 py-2 border">Tanggal Pembuatan</th>
                            <th className="px-4 py-2 border">Pengguna Pembuatan</th>
                            <th className="px-4 py-2 border">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="px-4 py-2 border">{item.nomor}</td>
                                <td className="px-4 py-2 border">{item.tanggal}</td>
                                <td className="px-4 py-2 border">{item.judul}</td>
                                <td className="px-4 py-2 border">{item.jenis}</td>
                                <td className="px-4 py-2 border">{item.kasus}</td>
                                <td className="px-4 py-2 border">{item.pembuatan}</td>
                                <td className="px-4 py-2 border">{item.penggunaPembuatan}</td>
                                <td>
                                    <button className="bg-purple-900 hover:bg-purple-950 text-white font-bold py-2 px-4 rounded">
                                        Unduh
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                <button className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded mr-2">
                    Previous
                </button>
                <button className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded">
                    Next
                </button>

            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-[80%] rounded-lg shadow-lg ">

                        <div className="flex justify-between items-center border-b p-4">
                            <h2 className="text-lg font-bold">Unggah Dokumen</h2>
                            <button onClick={closeModal} className="text-gray-500 hover:text-red-500">
                                <FaTimes size={20} />
                            </button>
                        </div>

                        <div className="p-4 ">
                            <div className="grid gap-4 overflow-auto h-96">
                                <div>
                                    <label className="block text-sm font-medium">Tindakan *</label>
                                    <select className="w-full p-2 border rounded">
                                        <option value="new_document">Add new Document</option>
                                        <option value="upload_document">Upload Document</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Nama Jenis Dokumen *</label>
                                    <select className="w-full p-2 border rounded">
                                        <option value="">Pilih Tipe Dokumen</option>
                                        <option value="SPT">SPT Masa PPh</option>
                                        <option value="BPE">Bukti Penerimaan Elektronik</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Nomor Dokumen</label>
                                    <input type="text" className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Tanggal Dokumen</label>
                                    <input type="date" className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Tanggal Terima Dokumen</label>
                                    <input type="date" className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Dokumen Wajib Pajak</label>
                                    <input type="checkbox" />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <label className="block text-sm font-medium">NIK/NPWP</label>
                                    <input type="text" className="w-full p-2 border rounded bg-gray-200 cursor-not-allowed" value="0127905768623000" disabled />
                                    {/* wa iki jare sek onok perubahan nama e jupuk e tekan endi , PM HANCOK*/}
                                    <label className="block text-sm font-medium">Nama Wajib Pajak</label>
                                    <input type="text" className="w-full p-2 border rounded cursor-not-allowed bg-gray-200" value="PT. Coretaxify Indonesia" disabled />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Passport</label>
                                    <input type="text" className="w-full p-2 border rounded bg-gray-200 cursor-not-allowed" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Perihal Dokumen</label>
                                    <input type="text" className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Pengirim Dokumen</label>
                                    <input type="text" className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Keaslian Dokumen</label>
                                    <select className="w-full p-2 border rounded">
                                        <option value="asli">Original</option>
                                        <option value="copy">Copy</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Deskripsi Dokumen</label>
                                    <textarea className="w-full p-2 border rounded resize-y" rows="1"></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Penerima</label>
                                    <input type="text" className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Catatan & Komentar</label>
                                    <textarea className="w-full p-2 border rounded resize-y" rows="1"></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Tag Dokumen</label>
                                    <input type="text" className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Klasifikasi</label>
                                    <select className="w-full p-2 border rounded">
                                        <option value="biasa">Biasa</option>
                                        <option value="rahasia">Rahasia</option>
                                        <option value="sangatRahasia">Sangat Rahasia</option>
                                        <option value="sangatSegera">Sangat Segera</option>
                                        <option value="segera">Segera</option>
                                        <option value="sangatSegeradanRahasia">Sangat Segera dan Rahasia</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Bahasa</label>
                                    <select className="w-full p-2 border rounded">
                                        <option value="indonesia">Indonesia</option>
                                        <option value="inggris">Inggris</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Dokumen Fisik</label>
                                    <input type="checkbox" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Jenis Pajak</label>
                                    <select className="w-full p-2 border rounded">
                                        <option value="beamaterai">Bea Materai</option>
                                        <option value="PBB">PBB</option>
                                        <option value="PPN">PPN</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Tahun</label>
                                    <input type="number" className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Bulan</label>
                                    <input type="month" className="w-full p-2 border rounded" />
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm font-bold">Mengarsipkan</label>
                                    <input type="file" className="w-full p-2 border rounded" />
                                </div>
                            </div>

                        </div>
                        <div className="flex justify-end p-4 border-t">
                            <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2">
                                Batal
                            </button>
                            <button className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-950">
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}



        </div>
    );
};

export default DokumenSaya;
