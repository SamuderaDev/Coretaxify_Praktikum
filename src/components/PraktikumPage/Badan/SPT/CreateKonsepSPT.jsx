import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaCalendarAlt, FaFilter, FaSearch, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";


const CreateKonsepSPT = () => {
    const [activeTab, setActiveTab] = useState("induk");
    const [showHeader, setShowHeader] = useState(false);
    const [showPenyerahanBarangJasa, setShowPenyerahanBarangJasa] = useState(false);
    const [showPerolehanBarangJasa, setShowPerolehanBarangJasa] = useState(false);
    const rows = [
        "Ekspor BKP/BKP Tidak Berwujud/JKP",
        "Penyerahan yang PPN atau PPN dan PPnBM-nya harus dipungut sendiri dengan DPP Nilai Lain atau Besaran Tertentu (dengan Faktur Pajak Kode 04 dan 05)",
        "Penyerahan yang PPN atau PPN dan PPnBM-nya harus dipungut sendiri kepada turis sesuai dengan Pasal 16E UU PPN (dengan Faktur Pajak Kode 06)",
        "Penyerahan yang PPN atau PPN dan PPnBM-nya harus dipungut sendiri lainnya (dengan Faktur Pajak Kode 01, 09 dan 10)",
        "Penyerahan yang PPN atau PPN dan PPnBM-nya harus dipungut sendiri dengan Faktur Pajak yang dilaporkan secara digunggung",
        "Penyerahan yang PPN atau PPN dan PPnBM-nya harus dipungut oleh Pemungut PPN (dengan Faktur Pajak Kode 02 dan 03)",
        "Penyerahan yang mendapat fasilitas PPN atau PPnBM Tidak Dipungut (dengan Faktur Pajak Kode 07)",
        "Penyerahan yang mendapat fasilitas PPN atau PPnBM Dibebaskan (dengan Faktur Pajak Kode 08)",
        "Penyerahan yang mendapat fasilitas PPN atau PPnBM dengan Faktur Pajak yang dilaporkan secara digunggung"
    ];
    const getPrefilled = (i) => ({
        harga: (i === 1 && "105.500.000") || (i === 5 && "651.119.260") || (i === 8 && "756.619.260") || "0",
        dpp: (i === 1 && "96.708.334") || (i === 5 && "596.859.332") || "0",
        ppn: (i === 1 && "11.605.000") || (i === 5 && "71.623.128") || (i === 8 && "83.228.128") || "0",
        ppnbm: "0",
    });

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
                            <TabsTrigger value="c">C</TabsTrigger>
                        </TabsList>

                        <TabsContent value="induk">
                            <div className="mt-4">
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full" onClick={() => setShowHeader(!showHeader)}>
                                    <h3 className='text-lg font-semibold'>Header</h3>
                                    {showHeader ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showHeader && (
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
                                    <div className="border rounded-md p-4 overflow-x-auto" >
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
                                                {rows.map((desc, i) => {
                                                    const prefilled = getPrefilled(i);
                                                    const isHargaDisabled = prefilled.harga !== "0";
                                                    const isDppDisabled = prefilled.dpp !== "0";
                                                    const isPpnDisabled = prefilled.ppn !== "0";

                                                    return (
                                                        <tr key={i} className="border-b">
                                                            <td className="p-2 whitespace-normal break-words text-sm">
                                                                {`${i + 1}. ${desc}`}
                                                            </td>

                                                            <td className="p-2">
                                                                <input
                                                                    type="text"
                                                                    className="w-full p-1 border rounded-md text-right text-sm"
                                                                    defaultValue={prefilled.harga}
                                                                    disabled={isHargaDisabled}
                                                                />
                                                            </td>

                                                            <td className="p-2">
                                                                <input
                                                                    type="text"
                                                                    className="w-full p-1 border rounded-md text-right text-sm"
                                                                    defaultValue={prefilled.dpp}
                                                                    disabled={isDppDisabled}
                                                                />
                                                            </td>

                                                            <td className="p-2">
                                                                <input
                                                                    type="text"
                                                                    className="w-full p-1 border rounded-md text-right text-sm"
                                                                    defaultValue={prefilled.ppn}
                                                                    disabled={isPpnDisabled}
                                                                />
                                                            </td>

                                                            <td className="p-2 flex items-center gap-2">
                                                                <input
                                                                    type="text"
                                                                    className="w-full p-1 border rounded-md text-right text-sm"
                                                                    defaultValue={prefilled.ppnbm}
                                                                />
                                                                {(i === 4 || i === 8) && (
                                                                    <button className="bg-blue-700 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                                                                        Unggah XML
                                                                    </button>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>

                                    </div>
                                )}
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100" onClick={() => setShowPerolehanBarangJasa(!showPerolehanBarangJasa)}>
                                    <h3 className="text-lg font-semibold">II. Perolehan Barang dan Jasa</h3>
                                    {showPerolehanBarangJasa ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showPerolehanBarangJasa && (
                                    <div className="border rounded-md p-4 overflow-x-auto" >
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
                                                {rows.map((desc, i) => {
                                                    const prefilled = getPrefilled(i);
                                                    const isHargaDisabled = prefilled.harga !== "0";
                                                    const isDppDisabled = prefilled.dpp !== "0";
                                                    const isPpnDisabled = prefilled.ppn !== "0";

                                                    return (
                                                        <tr key={i} className="border-b">
                                                            <td className="p-2 whitespace-normal break-words text-sm">
                                                                {`${i + 1}. ${desc}`}
                                                            </td>

                                                            <td className="p-2">
                                                                <input
                                                                    type="text"
                                                                    className="w-full p-1 border rounded-md text-right text-sm"
                                                                    defaultValue={prefilled.harga}
                                                                    disabled={isHargaDisabled}
                                                                />
                                                            </td>

                                                            <td className="p-2">
                                                                <input
                                                                    type="text"
                                                                    className="w-full p-1 border rounded-md text-right text-sm"
                                                                    defaultValue={prefilled.dpp}
                                                                    disabled={isDppDisabled}
                                                                />
                                                            </td>

                                                            <td className="p-2">
                                                                <input
                                                                    type="text"
                                                                    className="w-full p-1 border rounded-md text-right text-sm"
                                                                    defaultValue={prefilled.ppn}
                                                                    disabled={isPpnDisabled}
                                                                />
                                                            </td>

                                                            <td className="p-2 flex items-center gap-2">
                                                                <input
                                                                    type="text"
                                                                    className="w-full p-1 border rounded-md text-right text-sm"
                                                                    defaultValue={prefilled.ppnbm}
                                                                />
                                                                {(i === 4 || i === 8) && (
                                                                    <button className="bg-blue-700 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                                                                        Unggah XML
                                                                    </button>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>

                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default CreateKonsepSPT;
