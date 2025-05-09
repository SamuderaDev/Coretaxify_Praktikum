import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaCalendarAlt, FaFilter, FaSearch, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";


const CreateKonsepSPT = () => {
    const [activeTab, setActiveTab] = useState("induk");
    const [showHeaderInduk, setShowHeaderInduk] = useState(false);
    const [showPenyerahanBarangJasa, setShowPenyerahanBarangJasa] = useState(false);
    const [showPerolehanBarangJasa, setShowPerolehanBarangJasa] = useState(false);
    const [showPenghitunganPPNKurangBayarLebihBayar, setShowPenghitunganBayarLebihBayar] = useState(false)
    const [showPPNTerutangAtasKegiatanMembangunSendiri, setShowPPNTerutangAtasKegiatanMembangunSendiri] = useState(false)
    const [showPembayaranKembaliPajakMasukanTidakDapatDikreditkan, setShowPembayaranKembaliPajakMasukanYangTidakDapatDikreditkan] = useState(false);
    const [showPajakPenjualanAtasBarangMewah, setShowPajakPenjualanAtasBarangMewah] = useState(false);
    const [showPemungutanPPNatauPPNdanPPNMBolehPemungutPPN, setShowPemungutanPPNatauPPNdanPPNMBolehPemungutPPN] = useState(false);
    const [showPemungutanPPNatauPPNdanPPNMBolehPihakLain, setShowPemungutanPPNatauPPNdanPPNMBolehPihakLain] = useState(false);
    const [showKelengkapan, setShowKelengkapan] = useState(false);
    const [showPernyataan, setShowPernyataan] = useState(false);

    const [showHeadera1, setShowHeadera1] = useState(false);
    const [showHeadera2, setShowHeadera2] = useState(false);
    const [showHeaderb1, setShowHeaderb1] = useState(false);
    const [showHeaderb2, setShowHeaderb2] = useState(false);
    const [showHeaderb3, setShowHeaderb3] = useState(false);
    const [showHeaderc, setShowHeaderc] = useState(false);

    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 200);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // const getPrefilled = (i) => ({
    //     harga: (i === 1 && "105.500.000") || (i === 5 && "651.119.260") || (i === 8 && "756.619.260") || "0",
    //     dpp: (i === 1 && "96.708.334") || (i === 5 && "596.859.332") || "0",
    //     ppn: (i === 1 && "11.605.000") || (i === 5 && "71.623.128") || (i === 8 && "83.228.128") || "0",
    //     ppnbm: "0",
    // });

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex-auto p-3 bg-white rounded-md h-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-light text-yellow-500 mt-4">SURAT PEMBERITAHUAN MASA PAJAK PERTAMBAHAN NILAI (SPT MASA PPN)</h2>
                </div>
                <div className="w-full p-2 ml-0 border-t text-lg">
                    <Tabs defaultValue='induk' onValueChange={(val) => setActiveTab(val)}>
                        <TabsList className="flex justify-start gap-2 text-blue-700 text-lg">
                            <TabsTrigger value="induk">Induk</TabsTrigger>
                            <TabsTrigger value="a-1">A-1</TabsTrigger>
                            <TabsTrigger value="a-2">A-2</TabsTrigger>
                            <TabsTrigger value="b-1">B-1</TabsTrigger>
                            <TabsTrigger value="b-2">B-2</TabsTrigger>
                            <TabsTrigger value="b-3">B-3</TabsTrigger>
                            <TabsTrigger value="c">C</TabsTrigger>
                        </TabsList>

                        <TabsContent value="induk">
                            <div className="mt-4">
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full" onClick={() => setShowHeaderInduk(!showHeaderInduk)}>
                                    <h3 className='text-lg font-semibold'>Header</h3>
                                    {showHeaderInduk ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showHeaderInduk && (
                                    <div className="border rounded-md p-4 mb-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Kiri */}
                                            <div>
                                                <label className="block font-medium text-gray-700">Nama Pengusaha Kena Pajak *</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="KANTOR AKUNTAN PUBLIK MOH WILDAN DAN ADI DARMAWAN"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium text-gray-700">NPWP*</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="0934274002429000"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>

                                            <div className="md:col-span-1">
                                                <label className="block font-medium text-gray-700">Alamat *</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="JL SOEKARNO HATTA NO.606, RT 001, RW 001, SEKejati, Buahbatu, Kota Bandung"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium text-gray-700">Klasifikasi Lapangan Usaha *</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="AKTIVITAS AKUNTANSI, PEMBUKUAN DAN PEMERIKSA"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-medium text-gray-700">Nomor Telepon</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="0227569464"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium text-gray-700">Periode</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="032025"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-medium text-gray-700">Telepon Seluler *</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="0227569464"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="flex-1">
                                                    <label className="block font-medium text-gray-700">Periode Pembukuan</label>
                                                    <input
                                                        type="text"
                                                        readOnly
                                                        value="01-12"
                                                        className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <label className="block font-medium text-gray-700">Normal/Pembetulan</label>
                                                    <select disabled className="w-full p-2 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed">
                                                        <option>Normal</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center gap-4">
                                            <button className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-yellow-600 transition">
                                                Posting SPT
                                            </button>
                                            <p className="text-sm text-gray-500">
                                                Last prefiling Returnsheet is on <strong>12 April 2025 23:24:46</strong>
                                            </p>
                                        </div>
                                    </div>
                                )}
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100" onClick={() => setShowPenyerahanBarangJasa(!showPenyerahanBarangJasa)}>
                                    <h3 className="text-lg font-semibold">I. Penyerahan Barang dan Jasa</h3>
                                    {showPenyerahanBarangJasa ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showPenyerahanBarangJasa && (
                                    <div className="border rounded-md p-4 overflow-x-auto">
                                        <table className="min-w-full text-sm text-left border overflow-x-auto">
                                            <thead className="bg-purple-700 text-white text-center">
                                                <tr>
                                                    <th className="p-2 min-w-[300px]">Penyerahan BKP/JKP yang terutang PPN</th>
                                                    <th className="p-2 min-w-[150px]">Harga Jual/Penggantian/ <br />Nilai Ekspor/DPP</th>
                                                    <th className="p-2 min-w-[150px]">DPP Nilai Lain/ DPP</th>
                                                    <th className="p-2 min-w-[150px]">PPN</th>
                                                    <th className="p-2 min-w-[150px]">PPnBM</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* Row 1 */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        1. Ekspor BKP/BKP Tidak Berwujud/JKP
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>

                                                {/* Row 2 */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        2. Penyerahan yang PPN atau PPN dan PPnBM-nya harus dipungut sendiri dengan DPP Nilai Lain atau Besaran Tertentu (dengan Faktur Pajak Kode 04 dan 05)
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="105.500.000"
                                                            disabled
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="96.708.334"
                                                            disabled
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="11.605.000"
                                                            disabled
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>

                                                {/* Row 3 */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        3. Penyerahan yang PPN atau PPN dan PPnBM-nya harus dipungut sendiri kepada turis sesuai dengan Pasal 16E UU PPN (dengan Faktur Pajak Kode 06)
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>

                                                {/* Row 4 */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        4. Penyerahan yang PPN atau PPN dan PPnBM-nya harus dipungut sendiri lainnya (dengan Faktur Pajak Kode 01, 09 dan 10)
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>

                                                {/* Row 5 */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        5. Penyerahan yang PPN atau PPN dan PPnBM-nya harus dipungut sendiri dengan Faktur Pajak yang dilaporkan secara digunggung
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2 flex items-center gap-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                        <button className="bg-blue-700 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                                                            Unggah XML
                                                        </button>
                                                    </td>
                                                </tr>

                                                {/* Row 6 */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        6. Penyerahan yang PPN atau PPN dan PPnBM-nya harus dipungut oleh Pemungut PPN (dengan Faktur Pajak Kode 02 dan 03)
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="651.119.260"
                                                            disabled
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="596.859.332"
                                                            disabled
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="71.623.128"
                                                            disabled
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>

                                                {/* Row 7 */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        7. Penyerahan yang mendapat fasilitas PPN atau PPnBM Tidak Dipungut (dengan Faktur Pajak Kode 07)
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>

                                                {/* Row 8 */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        8. Penyerahan yang mendapat fasilitas PPN atau PPnBM Dibebaskan (dengan Faktur Pajak Kode 08)
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>

                                                {/* Row 9 */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        9. Penyerahan yang mendapat fasilitas PPN atau PPnBM dengan Faktur Pajak yang dilaporkan secara digunggung
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="756.619.260"
                                                            disabled
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="83.228.128"
                                                            disabled
                                                        />
                                                    </td>
                                                    <td className="p-2 flex items-center gap-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                        <button className="bg-blue-700 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                                                            Unggah XML
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                )}
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100" onClick={() => setShowPerolehanBarangJasa(!showPerolehanBarangJasa)}>
                                    <h3 className="text-lg font-semibold">II. Perolehan Barang dan Jasa</h3>
                                    {showPerolehanBarangJasa ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showPerolehanBarangJasa && (
                                    <div className="border rounded-md p-4 overflow-x-auto">
                                        <table className="min-w-full text-sm text-left border overflow-x-auto">
                                            <thead className="bg-purple-700 text-white text-center">
                                                <tr>
                                                    <th className="p-2 min-w-[300px]"></th>
                                                    <th className="p-2 min-w-[150px]">Harga Jual/Penggantian/ <br />Nilai Ekspor/DPP</th>
                                                    <th className="p-2 min-w-[150px]">DPP Nilai Lain/ DPP</th>
                                                    <th className="p-2 min-w-[150px]">PPN</th>
                                                    <th className="p-2 min-w-[150px]">PPnBM</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* Row A */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        A. Impor BKP, Pemanfaatan BKP Tidak Berwujud dan/atau JKP dari luar Daerah Pabean di dalam Daerah Pabean yang Pajak Masukannya dapat dikreditkan
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>

                                                {/* Row B */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        B. Perolehan BKP/JKP dari dalam negeri dengan DPP Nilai Lain atau Besaran Tertentu yang Pajak Masukannya dapat dikreditkan (dengan Faktur Pajak Kode 04 dan 05)
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>

                                                {/* Row C */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        C. Perolehan BKP dari dalam negeri selain dengan DPP Nilai Lain yang Pajak Masukannya dapat dikreditkan (dengan Faktur Pajak Kode 01, 09, dan 10)
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>

                                                {/* Row D */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        D. Perolehan BKP/JKP dari dalam negeri sebagai Pemungut PPN yang Pajak Masukannya dapat dikreditkan (dengan Faktur Pajak Kode 02 dan 03)
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>

                                                {/* Row E */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        E. Kompensasi kelebihan Pajak Masukan
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2 flex items-center gap-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                        <button className="bg-blue-700 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                                                            Unggah XML
                                                        </button>
                                                    </td>
                                                </tr>

                                                {/* Row F */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        F. Hasil penghitungan kembali Pajak Masukan yang telah dikreditkan
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>

                                                {/* Row G */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        G. Jumlah Pajak Masukan yang dapat diperhitungkan (II.A + II.B + II.C + II.D + II.E + II.F)
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>

                                                {/* Row H */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        H. Impor atau perolehan BKP/JKP yang Pajak Masukannya tidak dikreditkan dan/atau impor atau perolehan BKP/JKP yang mendapat fasilitas
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>

                                                {/* Row I */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        I. Impor atau perolehan BKP/JKP dengan Faktur Pajak yang dilaporkan secara digunggung dan barang/jasa yang tidak terutang PPN
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2 flex items-center gap-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                        <button className="bg-blue-700 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                                                            Unggah XML
                                                        </button>
                                                    </td>
                                                </tr>

                                                {/* Row J */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        J. Jumlah Perolehan (II.A + II.B + II.C + II.D + II.E + II.F + II.G + II.H + II.I)
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                )}
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100" onClick={() => setShowPenghitunganBayarLebihBayar(!showPenghitunganPPNKurangBayarLebihBayar)}>
                                    <h3 className="text-lg font-semibold">III. Penghitungan PPN Kurang Bayar / Lebih Bayar</h3>
                                    {showPenghitunganPPNKurangBayarLebihBayar ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showPenghitunganPPNKurangBayarLebihBayar && (
                                    <div className="border rounded-md p-4 overflow-x-auto">
                                        <table className="min-w-full text-sm text-left border overflow-x-auto">
                                            <thead className="bg-purple-700 text-white text-center">
                                                <tr>
                                                    <th className="p-2 min-w-[300px]"></th>
                                                    <th className="p-2 min-w-[150px]">Harga Jual/Penggantian/ <br />Nilai Ekspor/DPP</th>
                                                    <th className="p-2 min-w-[150px]">DPP Nilai Lain/ DPP</th>
                                                    <th className="p-2 min-w-[150px]">PPN</th>
                                                    <th className="p-2 min-w-[150px]">PPnBM</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* Row A */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        A. Pajak Keluaran yang harus dipungut sendiri (I.A.2 + I.A.3 + I.A.4 + I.A.5)
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>

                                                {/* Row B */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        B. PPN Disetor di muka dalam masa pajak yang sama
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>

                                                {/* Row C */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        C. Pajak Masukan yang dapat diperhitungkan (II.G)
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>

                                                {/* Row D */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        D. Kelebihan pemungutan PPN oleh Pemungutan PPN
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>

                                                {/* Row E */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        E. PPN kurang atau (lebih) bayar (III.A - III.B - III.C - III.D)
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2 flex items-center gap-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                        <button className="bg-blue-700 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                                                            Unggah XML
                                                        </button>
                                                    </td>
                                                </tr>

                                                {/* Row F */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        F. PPN Kurang atau (lebih) bayar pada SPT yang dibetulkan sebelumnya
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>

                                                {/* Row G */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        G. PPN kurang atau (lebih) bayar karena pembetulan SPT (III.E - III.F)
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                )}
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100" onClick={() => setShowPPNTerutangAtasKegiatanMembangunSendiri(!showPPNTerutangAtasKegiatanMembangunSendiri)}>
                                    <h3 className="text-lg font-semibold">IV. PPN Terutang Atas Kegiatan Membangun Sendiri</h3>
                                    {showPPNTerutangAtasKegiatanMembangunSendiri ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showPPNTerutangAtasKegiatanMembangunSendiri && (
                                    <div className="border rounded-md p-4 overflow-x-auto">
                                        <table className="min-w-full text-sm text-left border overflow-x-auto">
                                            <thead className="bg-purple-700 text-white text-center">
                                                <tr>
                                                    <th className="p-2 min-w-[300px]"></th>
                                                    <th className="p-2 min-w-[150px]">Harga Jual/Penggantian/ <br />Nilai Ekspor/DPP</th>
                                                    <th className="p-2 min-w-[150px]">DPP Nilai Lain/ DPP</th>
                                                    <th className="p-2 min-w-[150px]">PPN</th>
                                                    <th className="p-2 min-w-[150px]">PPnBM</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        PPN Terutang
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100" onClick={() => setShowPembayaranKembaliPajakMasukanYangTidakDapatDikreditkan(!showPembayaranKembaliPajakMasukanTidakDapatDikreditkan)}>
                                    <h3 className="text-lg font-semibold">V. Pembayaran Kembali Pajak Masukan Yang Tidak Dapat Di Kreditkan</h3>
                                    {showPembayaranKembaliPajakMasukanTidakDapatDikreditkan ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showPembayaranKembaliPajakMasukanTidakDapatDikreditkan && (
                                    <div className="border rounded-md p-4 overflow-x-auto">
                                        <table className="min-w-full text-sm text-left border overflow-x-auto">
                                            <thead className="bg-purple-700 text-white text-center">
                                                <tr>
                                                    <th className="p-2 min-w-[300px]"></th>
                                                    <th className="p-2 min-w-[150px]">Harga Jual/Penggantian/ <br />Nilai Ekspor/DPP</th>
                                                    <th className="p-2 min-w-[150px]">DPP Nilai Lain/ DPP</th>
                                                    <th className="p-2 min-w-[150px]">PPN</th>
                                                    <th className="p-2 min-w-[150px]">PPnBM</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        Pajak yang wajib dibayarkan kembali
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100" onClick={() => setShowPajakPenjualanAtasBarangMewah(!showPajakPenjualanAtasBarangMewah)}>
                                    <h3 className="text-lg font-semibold">VI. Pajak Penjualan Atas Barang Mewah</h3>
                                    {showPajakPenjualanAtasBarangMewah ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showPajakPenjualanAtasBarangMewah && (
                                    <div className="border rounded-md p-4 overflow-x-auto">
                                        <table className="min-w-full text-sm text-left border overflow-x-auto">
                                            <thead className="bg-purple-700 text-white text-center">
                                                <tr>
                                                    <th className="p-2 min-w-[300px]"></th>
                                                    <th className="p-2 min-w-[150px]">Harga Jual/Penggantian/ <br />Nilai Ekspor/DPP</th>
                                                    <th className="p-2 min-w-[150px]">DPP Nilai Lain/ DPP</th>
                                                    <th className="p-2 min-w-[150px]">PPN</th>
                                                    <th className="p-2 min-w-[150px]">PPnBM</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* row 1 */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        A. PPnMB yang harus dipungut sendiri (I.A.2 + I.A.3 + I.A.4 + I.A.5)
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>
                                                {/* row 2 */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        B. Kelebihan pemungutan PPnMB oleh Pemungut PPN
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>
                                                {/* row 3 */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        C. PPnMB kurang atau (lebih) bayar (VI.A - VI.B)
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>
                                                {/* row 4 */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        D. PPnMB kurang atau (lebih) pada SPT yang dibetulkan sebelumnya
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>
                                                {/* row 5 */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        E. PPnMB kurang atau (lebih) karena pembetulan SPT (VI.C - VI.D)
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>
                                                {/* row 6 */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">

                                                        D. <input type="checkbox" className="ml-2 top-2" /> PPnMB kurang atau (lebih) pada SPT yang dibetulkan sebelumnya
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100" onClick={() => setShowPemungutanPPNatauPPNdanPPNMBolehPemungutPPN(!showPemungutanPPNatauPPNdanPPNMBolehPemungutPPN)}>
                                    <h3 className="text-lg font-semibold">VII. Pemungutan PPN atau PPNmB oleh Pemungut PPN</h3>
                                    {setShowPemungutanPPNatauPPNdanPPNMBolehPemungutPPN ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showPemungutanPPNatauPPNdanPPNMBolehPemungutPPN && (
                                    <div className="border rounded-md p-4 overflow-x-auto">
                                        <table className="min-w-full text-sm text-left border overflow-x-auto">
                                            <thead className="bg-purple-700 text-white text-center">
                                                <tr>
                                                    <th className="p-2 min-w-[300px]"></th>
                                                    <th className="p-2 min-w-[150px]">Harga Jual/Penggantian/ <br />Nilai Ekspor/DPP</th>
                                                    <th className="p-2 min-w-[150px]">DPP Nilai Lain/ DPP</th>
                                                    <th className="p-2 min-w-[150px]">PPN</th>
                                                    <th className="p-2 min-w-[150px]">PPnBM</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* row 1 */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        A. Jumlah PPN dan PPNmB yang dipungut
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>
                                                {/* row 2 */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        B. PPN dan PPNmB kurang atau (lebih) bayar pada SPT yang dibetulkan sebelumnya
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>
                                                {/* row 3 */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        C. PPN dan PPNmB kurang atau (lebih) bayar karena pembetulan SPT (VII.A - VII.B)
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>
                                                {/* row 1 */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm font-bold">
                                                        Setiap kelebihan pemungutan dari bagian ini akan menjadi pengurang pada bagian III.D untuk PPN dan VI.B untuk PPNmB
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100" onClick={() => setShowPemungutanPPNatauPPNdanPPNMBolehPihakLain(!showPemungutanPPNatauPPNdanPPNMBolehPihakLain)}>
                                    <h3 className="text-lg font-semibold">VIII. Pemungutan PPN atau PPN dan PPNMB oleh Pihak Lain</h3>
                                    {setShowPemungutanPPNatauPPNdanPPNMBolehPihakLain ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showPemungutanPPNatauPPNdanPPNMBolehPihakLain && (
                                    <div className="border rounded-md p-4 overflow-x-auto">
                                        <table className="min-w-full text-sm text-left border overflow-x-auto">
                                            <thead className="bg-purple-700 text-white text-center">
                                                <tr>
                                                    <th className="p-2 min-w-[300px]"></th>
                                                    <th className="p-2 min-w-[150px]">Harga Jual/Penggantian/ <br />Nilai Ekspor/DPP</th>
                                                    <th className="p-2 min-w-[150px]">DPP Nilai Lain/ DPP</th>
                                                    <th className="p-2 min-w-[150px]">PPN</th>
                                                    <th className="p-2 min-w-[150px]">PPnBM</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* row 1 */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        A. Jumlah PPN dan PPNmB yang dipungut
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>
                                                {/* row 2 */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        B. PPN dan PPNmB kurang atau (lebih) bayar pada SPT yang dibetulkan sebelumnya
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>
                                                {/* row 3 */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        C. PPN dan PPNmB kurang atau (lebih) bayar karena pembetulan SPT (VIII.A - VIII.B)
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>
                                                {/* row 1 */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm ">
                                                        D. <input type="checkbox" className="" /> diminta pengembalian pajak yang tidak seharusnya terutang
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100" onClick={() => setShowKelengkapan(!showKelengkapan)}>
                                    <h3 className="text-lg font-semibold">IX. Kelengkapan</h3>
                                    {setShowKelengkapan ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showKelengkapan && (
                                    <div className="border rounded-md p-4 overflow-x-auto">
                                        <table className="min-w-full text-sm text-left border overflow-x-auto">
                                            <thead className="bg-purple-700 text-white text-center">
                                                <tr>
                                                    <th className="p-2 min-w-[300px]"></th>
                                                    <th className="p-2 min-w-[150px]">Harga Jual/Penggantian/ <br />Nilai Ekspor/DPP</th>
                                                    <th className="p-2 min-w-[150px]">DPP Nilai Lain/ DPP</th>
                                                    <th className="p-2 min-w-[150px]">PPN</th>
                                                    <th className="p-2 min-w-[150px]">PPnBM</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* row 1 */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        A. <input type="checkbox" className="" /> Daftar Rincian Kendaraan Bermotor
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>
                                                {/* row 2 */}
                                                <tr className="border-b">
                                                    <td className="p-2 whitespace-normal break-words text-sm">
                                                        B. <input type="checkbox" className="" /> Hasil penghitungan kembali Pajak Masukan yang telah dikreditkan sebagai penambah (pengurang) Pajak Masukan
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1 border rounded-md text-right text-sm"
                                                            defaultValue="0"
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100" onClick={() => setShowPernyataan(!showPernyataan)}>
                                    <h3 className="text-lg font-semibold">X. Pernyataan</h3>
                                    {setShowPernyataan ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showPernyataan && (
                                    <div className="border rounded-md p-4 mb-4">
                                        <div className="text-sm font-bold italic">
                                            <input type="checkbox" className="m-2" />
                                            PERNYATAAN : DENGAN MENYADARI SEPENUHNYA AKAN SEGALA AKIBATNYA, SAYA MENYATAKAN BAHWA APA YANG TELAH SAYA BERITAHUKAN DI ATAS BESERTA LAMPIRAN-LAMPIRANNYA ADALAH BENAR, LENGKAP, JELAS, DAN TIDAK BERSYARAT
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <label className="block text-sm font-medium text-gray-700 col-span-1">DITANDATANGANI OLEH</label>
                                                <div className="flex items-center space-x-2">
                                                    <input type="radio" id="test1" name="ditandatangani" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" disabled />
                                                    <label htmlFor="PKP" className="text-gray-700 text-sm">PKP</label>
                                                    <input type="radio" id="test2" name="ditandatangani" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" onClick={(e) => e.target.parentElement.previousElementSibling.click()} />
                                                    <label htmlFor="KuasaWajibPajak" className="text-gray-700 text-sm">Kuasa Wajib Pajak</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <label className="block text-sm font-medium text-gray-700 col-span-1">Kota Penandatanganan SPT</label>
                                                <div className="flex items-center space-x-2 w-full">
                                                    <input type="text" className="rounded w-full bg-gray-300 border-black text-sm p-2 flex-1" disabled />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <label className="block text-sm font-medium text-gray-700 col-span-1">Nama</label>
                                                <div className="flex items-center space-x-2 w-full">
                                                    <input type="text" className="rounded w-full bg-gray-300 border-black text-sm p-2 flex-1" disabled />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <label className="block text-sm font-medium text-gray-700 col-span-1">Posisi</label>
                                                <div className="flex items-center space-x-2 w-full">
                                                    <input type="text" className="rounded w-full bg-gray-300 border-black text-sm p-2 flex-1" disabled />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <label className="block text-sm font-medium text-gray-700 col-span-1">Batas waktu pengumpulan</label>
                                                <div className="flex items-center space-x-2 w-full">
                                                    <input type="date" className="rounded w-full bg-white border-grey-300 border text-sm p-2 flex-1" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="flex justify-start mt-4 gap-2">
                                    <button
                                        type="submit"
                                        className="bg-blue-700 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm"
                                    >
                                        Simpan Konsep
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-700 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm"
                                    >
                                        Bayar dan Lapor
                                    </button>
                                </div>
                                {showScrollTop && (
                                    <button
                                        onClick={scrollToTop}
                                        className="fixed bottom-6 right-6 bg-purple-700 text-white p-3 rounded-full shadow-lg hover:bg-purple-800 transition duration-300 w-12 h-12 flex items-center justify-center"
                                        aria-label="Scroll to top"
                                    >
                                        ↑
                                    </button>
                                )}
                            </div>
                        </TabsContent>
                        <TabsContent value="a-1">
                            <div className="mt-4">
                                <div className="text-lg font-semibold mb-4">
                                    <h1>DAFTAR EKSPOR BKP BERWUJUD, BKP TIDAK BERWUJUD, DAN/ATAU PKP</h1>
                                </div>
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full" onClick={() => setShowHeadera1(!showHeadera1)}>
                                    <h3 className='text-lg font-semibold'>Header</h3>
                                    {showHeadera1 ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showHeadera1 && (
                                    <div className="border rounded-md p-4 mb-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Kiri */}
                                            <div>
                                                <label className="block font-medium text-gray-700">NAMA PKP *</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="KANTOR AKUNTAN PUBLIK MOH WILDAN DAN ADI DARMAWAN"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-medium text-gray-700">MASA *</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="032025"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium text-gray-700">NPWP*</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="0934274002429000"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium text-gray-700">Normal/Pembetulan</label>
                                                <select disabled className="w-full p-2 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed">
                                                    <option>Normal</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="border">
                                    <table className="min-w-full text-sm text-left border overflow-x-auto">
                                        <thead className="bg-purple-700 text-white text-center">
                                            <tr>
                                                <th className="p-2 border-b ">No</th>
                                                <th className="p-2 border-b min-w-[200px]">Nama Pembeli BKP/Penerima Manfaat BKP Tidak Berwujud/Penerima JKP</th>
                                                <th className="p-2  border-b min-w-[150px]">Dokumen Tertentu Atau Nomor</th>
                                                <th className="p-2 border-b min-w-[150px]">Dokumen Tertentu Atau Tanggal</th>
                                                <th className="p-2 border-b min-w-[150px]">DPP (Rupiah)</th>
                                                <th className="p-2 border-b min-w-[150px]">Keterangan</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-600 text-center">
                                            <tr>
                                                <td className="p-2 border-b text-center">1</td>
                                                <td className="p-2 border-b">KANTOR AKUNTAN PUBLIK MOH WILDAN DAN ADI DARMAWAN</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                            </tr>
                                        </tbody>
                                        <tfoot className="text-gray-800 font-semibold bg-gray-100">
                                            <tr>
                                                <td className="p-2 text-center min-w-[150px]" colSpan={4}>Jumlah</td>
                                                <td className="p-2 text-center">0</td>
                                                <td className="p-2"></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="a-2">
                            <div className="mt-4">
                                <div className="text-lg font-semibold mb-4">
                                    <h1>DAFTAR PAJAK KELUARAN ATAS PENYERAHAN DALAM NEGERI DENGAN FAKTUR PAJAK</h1>
                                </div>
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full" onClick={() => setShowHeadera2(!showHeadera2)}>
                                    <h3 className='text-lg font-semibold'>Header</h3>
                                    {showHeadera2 ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showHeadera2 && (
                                    <div className="border rounded-md p-4 mb-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Kiri */}
                                            <div>
                                                <label className="block font-medium text-gray-700">NAMA PKP *</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="KANTOR AKUNTAN PUBLIK MOH WILDAN DAN ADI DARMAWAN"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-medium text-gray-700">MASA *</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="032025"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium text-gray-700">NPWP*</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="0934274002429000"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium text-gray-700">Normal/Pembetulan</label>
                                                <select disabled className="w-full p-2 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed">
                                                    <option>Normal</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className=" w-[1450px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
                                    <table className="table-auto text-sm text-left border overflow-hidden">
                                        <thead className="bg-purple-700 text-white text-center">
                                            <tr>
                                                <th className="p-2 border-b ">No</th>
                                                <th className="p-2 border-b min-w-[200px]">Nama Pembeli BKP/Penerima Manfaat BKP Tidak Berwujud/Penerima JKP</th>
                                                <th className="p-2  border-b min-w-[150px]">NPWP/NIK/Nomor Paspor</th>
                                                <th className="p-2 border-b min-w-[150px]">Faktur Pajak Dokumen Tertentu/Nota Retur/Nota Pembatalan - nomor</th>
                                                <th className="p-2 border-b min-w-[150px]">Harga Jual/Pengganti/DPP (Rupiah)</th>
                                                <th className="p-2 border-b min-w-[150px]">DPP Nilai Lain/DPP (Rupiah)</th>
                                                <th className="p-2 border-b min-w-[150px]">PPN (Rupiah)</th>
                                                <th className="p-2 border-b min-w-[150px]">PPnBM (Rupiah)</th>
                                                <th className="p-2 border-b min-w-[150px]">Kode dan Nomor Seri Faktur Pajak Diganti/Diretur</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-600 text-center">
                                            <tr>
                                                <td className="p-2 border-b text-center">1</td>
                                                <td className="p-2 border-b">KANTOR AKUNTAN PUBLIK MOH WILDAN DAN ADI DARMAWAN</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                            </tr>
                                        </tbody>
                                        <tfoot className="text-gray-800 font-semibold bg-gray-100">
                                            <tr>
                                                <td className="p-2 text-center min-w-[150px]" colSpan={4}>Jumlah</td>
                                                <td className="p-2 text-center">0</td>
                                                <td className="p-2"></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="b-1">
                            <div className="mt-4">
                                <div className="text-lg font-semibold mb-4">
                                    <h1>DAFTAR PAJAK MASUKAN YANG DAPAT DIKREDITKAN ATAS IMPOR BKP DAN PEMANFAATAN BKP TIDAK BERWUJUD/JKP DARI LUAR DAERAH PABEAN</h1>
                                </div>
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full" onClick={() => setShowHeaderb1(!showHeaderb1)}>
                                    <h3 className='text-lg font-semibold'>Header</h3>
                                    {showHeaderb1 ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showHeaderb1 && (
                                    <div className="border rounded-md p-4 mb-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Kiri */}
                                            <div>
                                                <label className="block font-medium text-gray-700">NAMA PKP *</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="KANTOR AKUNTAN PUBLIK MOH WILDAN DAN ADI DARMAWAN"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-medium text-gray-700">MASA *</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="032025"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium text-gray-700">NPWP*</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="0934274002429000"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium text-gray-700">Normal/Pembetulan</label>
                                                <select disabled className="w-full p-2 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed">
                                                    <option>Normal</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className=" w-[1450px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
                                    <table className="table-auto text-sm text-left border overflow-hidden">
                                        <thead className="bg-purple-700 text-white text-center">
                                            <tr>
                                                <th className="p-2 border-b ">No</th>
                                                <th className="p-2 border-b min-w-[200px]">Nama Pembeli BKP/Penerima Manfaat BKP Tidak Berwujud/Penerima JKP</th>
                                                <th className="p-2  border-b min-w-[150px]">NPWP/NIK/Nomor Paspor</th>
                                                <th className="p-2 border-b min-w-[150px]">Dokumen Tertentu - Nomor</th>
                                                <th className="p-2 border-b min-w-[150px]">Dokumen Tertentu - Tanggal</th>
                                                <th className="p-2 border-b min-w-[150px]">DPP (Rupiah)</th>
                                                <th className="p-2 border-b min-w-[150px]">PPN (Rupiah)</th>
                                                <th className="p-2 border-b min-w-[150px]">PPnBM (Rupiah)</th>
                                                <th className="p-2 border-b min-w-[150px]">Keterangan</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-600 text-center">
                                            <tr>
                                                <td className="p-2 border-b text-center">1</td>
                                                <td className="p-2 border-b">KANTOR AKUNTAN PUBLIK MOH WILDAN DAN ADI DARMAWAN</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                            </tr>
                                        </tbody>
                                        <tfoot className="text-gray-800 font-semibold bg-gray-100">
                                            <tr>
                                                <td className="p-2 text-center min-w-[150px]" colSpan={4}>Jumlah</td>
                                                <td className="p-2 text-center">0</td>
                                                <td className="p-2"></td>
                                                <td className="p-2"></td>
                                                <td className="p-2"></td>
                                                <td className="p-2"></td>
                                                <td className="p-2"></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="b-2">
                            <div className="mt-4">
                                <div className="text-lg font-semibold mb-4">
                                    <h1>DAFTAR PAJAK MASUKAN YANG DAPAT DIKREDITKAN BKP/JKP DALAM NEGERI</h1>
                                </div>
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full" onClick={() => setShowHeaderb2(!showHeaderb2)}>
                                    <h3 className='text-lg font-semibold'>Header</h3>
                                    {showHeaderb2 ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showHeaderb2 && (
                                    <div className="border rounded-md p-4 mb-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Kiri */}
                                            <div>
                                                <label className="block font-medium text-gray-700">NAMA PKP *</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="KANTOR AKUNTAN PUBLIK MOH WILDAN DAN ADI DARMAWAN"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-medium text-gray-700">MASA *</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="032025"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium text-gray-700">NPWP*</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="0934274002429000"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium text-gray-700">Normal/Pembetulan</label>
                                                <select disabled className="w-full p-2 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed">
                                                    <option>Normal</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className=" w-[1450px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
                                    <table className="table-auto text-sm text-left border overflow-hidden">
                                        <thead className="bg-purple-700 text-white text-center">
                                            <tr>
                                                <th className="p-2 border-b ">No</th>
                                                <th className="p-2 border-b min-w-[200px]">Nama Pembeli BKP/Penerima Manfaat BKP Tidak Berwujud/Penerima JKP</th>
                                                <th className="p-2  border-b min-w-[150px]">NPWP/NIK/Nomor Paspor</th>
                                                <th className="p-2 border-b min-w-[150px]">Faktur Pajak/Dokumen Tertentu/Nota Retur/ Nota Pembatalan - Nomor</th>
                                                <th className="p-2 border-b min-w-[150px]">Faktur Pajak/Dokumen Tertentu/Nota Retur/ Nota Pembatalan - Tanggal</th>
                                                <th className="p-2 border-b min-w-[150px]">Harga Jual/Pengganti/DPP(Rupiah)</th>
                                                <th className="p-2 border-b min-w-[150px]">DPP Nilai Lain/ DPP (Rupiah)</th>
                                                <th className="p-2 border-b min-w-[150px]">PPN (Rupiah)</th>
                                                <th className="p-2 border-b min-w-[150px]">PPnBM (Rupiah)</th>
                                                <th className="p-2 border-b min-w-[150px]">Kode dan Nomor Seri Faktur Pajak yang Diganti/Diretur</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-600 text-center">
                                            <tr>
                                                <td className="p-2 border-b text-center">1</td>
                                                <td className="p-2 border-b">KANTOR AKUNTAN PUBLIK MOH WILDAN DAN ADI DARMAWAN</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                            </tr>
                                        </tbody>
                                        <tfoot className="text-gray-800 font-semibold bg-gray-100">
                                            <tr>
                                                <td className="p-2 text-center min-w-[150px]" colSpan={4}>Jumlah</td>
                                                <td className="p-2 text-center">0</td>
                                                <td className="p-2"></td>
                                                <td className="p-2"></td>
                                                <td className="p-2"></td>
                                                <td className="p-2"></td>
                                                <td className="p-2"></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="b-3">
                            <div className="mt-4">
                                <div className="text-lg font-semibold mb-4">
                                    <h1>DAFTAR PAJAK MASUKAN YANG TIDAK DIKREDITKAN ATAU MENDAPAT FASILITAS</h1>
                                </div>
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full" onClick={() => setShowHeaderb3(!showHeaderb3)}>
                                    <h3 className='text-lg font-semibold'>Header</h3>
                                    {showHeaderb3 ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showHeaderb3 && (
                                    <div className="border rounded-md p-4 mb-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Kiri */}
                                            <div>
                                                <label className="block font-medium text-gray-700">NAMA PKP *</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="KANTOR AKUNTAN PUBLIK MOH WILDAN DAN ADI DARMAWAN"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-medium text-gray-700">MASA *</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="032025"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium text-gray-700">NPWP*</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="0934274002429000"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium text-gray-700">Normal/Pembetulan</label>
                                                <select disabled className="w-full p-2 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed">
                                                    <option>Normal</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className=" w-[1450px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
                                    <table className="table-auto text-sm text-left border overflow-hidden">
                                        <thead className="bg-purple-700 text-white text-center">
                                            <tr>
                                                <th className="p-2 border-b ">No</th>
                                                <th className="p-2 border-b min-w-[200px]">Nama Pembeli BKP/Penerima Manfaat BKP Tidak Berwujud/Penerima JKP</th>
                                                <th className="p-2  border-b min-w-[150px]">NPWP/NIK/Nomor Paspor</th>
                                                <th className="p-2 border-b min-w-[150px]">Faktur Pajak/Dokumen Tertentu/Nota Retur/ Nota Pembatalan - Nomor</th>
                                                <th className="p-2 border-b min-w-[150px]">Faktur Pajak/Dokumen Tertentu/Nota Retur/ Nota Pembatalan - Tanggal</th>
                                                <th className="p-2 border-b min-w-[150px]">Harga Jual/Pengganti/DPP(Rupiah)</th>
                                                <th className="p-2 border-b min-w-[150px]">DPP Nilai Lain/ DPP (Rupiah)</th>
                                                <th className="p-2 border-b min-w-[150px]">PPN (Rupiah)</th>
                                                <th className="p-2 border-b min-w-[150px]">PPnBM (Rupiah)</th>
                                                <th className="p-2 border-b min-w-[150px]">Kode dan Nomor Seri Faktur Pajak yang Diganti/Diretur</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-600 text-center">
                                            <tr>
                                                <td className="p-2 border-b text-center">1</td>
                                                <td className="p-2 border-b">KANTOR AKUNTAN PUBLIK MOH WILDAN DAN ADI DARMAWAN</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                            </tr>
                                        </tbody>
                                        <tfoot className="text-gray-800 font-semibold bg-gray-100">
                                            <tr>
                                                <td className="p-2 text-center min-w-[150px]" colSpan={4}>Jumlah</td>
                                                <td className="p-2 text-center">0</td>
                                                <td className="p-2"></td>
                                                <td className="p-2"></td>
                                                <td className="p-2"></td>
                                                <td className="p-2"></td>
                                                <td className="p-2"></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="c">
                            <div className="mt-4">
                                <div className="text-lg font-semibold mb-4">
                                    <h1>DAFTAR PPN DAN PPNBM YANG DIPUNGUT PIHAK LAIN</h1>
                                </div>
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full" onClick={() => setShowHeaderc(!showHeaderc)}>
                                    <h3 className='text-lg font-semibold'>Header</h3>
                                    {showHeaderc ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showHeaderc && (
                                    <div className="border rounded-md p-4 mb-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Kiri */}
                                            <div>
                                                <label className="block font-medium text-gray-700">NAMA PKP *</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="KANTOR AKUNTAN PUBLIK MOH WILDAN DAN ADI DARMAWAN"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-medium text-gray-700">MASA *</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="032025"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium text-gray-700">NPWP*</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="0934274002429000"
                                                    className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium text-gray-700">Normal/Pembetulan</label>
                                                <select disabled className="w-full p-2 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed">
                                                    <option>Normal</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className=" w-[1450px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
                                    <table className="table-auto text-sm text-left border overflow-hidden">
                                        <thead className="bg-purple-700 text-white text-center">
                                            <tr>
                                                <th className="p-2 border-b ">No</th>
                                                <th className="p-2 border-b ">Tindakan</th>
                                                <th className="p-2 border-b min-w-[200px]">NPWP/NIK/ID Lainnya Penjual Barang Kena Pajak/Barang Kena Pajak Tidak Berwujud/Penyedia Jasa Kena Pajak</th>
                                                <th className="p-2  border-b min-w-[150px]">Nama Penjual Barang Kena Pajak/Baran Kena Pajak Tidak Berwujud/Jasa Kena Pajak</th>
                                                <th className="p-2 border-b min-w-[150px]">Nomor Identitas Pembeli BKP/Penerima Manfaat BKP Tidak Berwujud/Penerima JKP</th>
                                                <th className="p-2 border-b min-w-[150px]">Nama Pembeli BKP/penerima Manfaat BKP TIdak Berwujud/Penerima JKP</th>
                                                <th className="p-2 border-b min-w-[150px]">Tipe Transaksi PPN yang Dipungut</th>
                                                <th className="p-2 border-b min-w-[150px]">Nomor Faktur Pajak/Dokumen Tertentu</th>
                                                <th className="p-2 border-b min-w-[150px]">Tanggal Faktur Pajak/Dokumen Tertentu</th>
                                                <th className="p-2 border-b min-w-[150px]">Kode dan Nomor Seri Faktur Pajak yang Diganti</th>
                                                <th className="p-2 border-b min-w-[150px]">Harga Jual/DPP (Rupiah)</th>
                                                <th className="p-2 border-b min-w-[150px]">DPP Nilai Lain/DPP (Rupiah)</th>
                                                <th className="p-2 border-b min-w-[150px]">PPN (Rupiah)</th>
                                                <th className="p-2 border-b min-w-[150px]">PPnBM (Rupiah)</th>
                                                <th className="p-2 border-b min-w-[150px]">Informasi</th>

                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-600 text-center">
                                            <tr>
                                                <td className="p-2 border-b text-center">1</td>
                                                <td className="p-2 border-b">KANTOR AKUNTAN PUBLIK MOH WILDAN DAN ADI DARMAWAN</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                                <td className="p-2 border-b">-</td>
                                            </tr>
                                        </tbody>
                                        <tfoot className="text-gray-800 font-semibold bg-gray-100">
                                            <tr>
                                                <td className="p-2 text-center min-w-[150px]" colSpan={4}>Jumlah</td>
                                                <td className="p-2 text-center">0</td>
                                                <td className="p-2"></td>
                                                <td className="p-2"></td>
                                                <td className="p-2"></td>
                                                <td className="p-2"></td>
                                                <td className="p-2"></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default CreateKonsepSPT;
