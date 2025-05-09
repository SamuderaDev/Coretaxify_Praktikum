import React, { useState, useRef } from "react";
import SideBarEFaktur from "./SideBarEFaktur";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaChevronDown, FaEdit, FaFilePdf } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";

const PajakKeluaran = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);

        if (newSelectAll) {
            setSelectedItems([1]);
        } else {
            setSelectedItems([]);
        }
    };

    const handleSelectItem = (itemId) => {
        const selectedItemsCopy = [...selectedItems];

        if (selectedItemsCopy.includes(itemId)) {
            const index = selectedItemsCopy.indexOf(itemId);
            selectedItemsCopy.splice(index, 1);
        } else {
            selectedItemsCopy.push(itemId);
        }

        setSelectedItems(selectedItemsCopy);
        setSelectAll(selectedItemsCopy.length === 1);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <SideBarEFaktur />

            <div className="flex-auto p-3 bg-white rounded-md h-full">
                <div className="flex justify-between items-center mb-4 pb-3 border-b">
                    <div className="flex items-center">
                        <IoDocumentTextOutline className="text-4xl text-blue-900" />
                        <h1 className="text-lg font-bold text-blue-900 ml-2">Pajak Keluaran</h1>
                    </div>
                </div>
                <div className="flex justify-between mb-4 border-b pb-3">
                    <div className="flex items-center gap-3">
                        <div className="flex  text-left text-sm" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-2 rounded"
                            >
                                Import <FaChevronDown className="ml-2" />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    <div className="py-1">
                                        <a
                                            href="/template-import-pajak-keluaran.xlsx"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Download Template
                                        </a>
                                        <button
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                        >
                                            Import Dokumen
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded text-sm"
                            onClick={() => window.location.href = "/admin/praktikum/2/e-faktur/pajak-keluaran/tambah-faktur-keluaran"}
                        >
                            Tambah
                        </button>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className='flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded text-sm'>
                            Upload Faktur
                        </button>
                        <button className='flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-2 rounded text-sm'>
                            Hapus Dokumen
                        </button>
                    </div>
                </div>

                <div className="w-[1230px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden mt-4">
                    <table className="table-auto border border-gray-300 w-full">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-6 py-2 border">No</th>
                                <th className="px-8 py-2 border">
                                    <div className="flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 border-gray-300 rounded"
                                            checked={selectAll}
                                            onChange={handleSelectAll}
                                        />
                                        <span className="ml-2">Pilih Semua</span>
                                    </div>
                                </th>
                                <th className="px-4 py-2 border">Aksi</th>
                                <th className="px-4 py-2 border">NPWP Pembeli</th>
                                <th className="px-4 py-2 border">Nama Pembeli</th>
                                <th className="px-4 py-2 border">Kode Transaksi</th>
                                <th className="px-4 py-2 border">Nomor Faktur Pajak</th>
                                <th className="px-4 py-2 border">Tanggal Faktur Pajak</th>
                                <th className="px-4 py-2 border">Masa Pajak</th>
                                <th className="px-4 py-2 border">Tahun</th>
                                <th className="px-4 py-2 border">Status Faktur</th>
                                <th className="px-4 py-2 border">ESignStatus</th>
                                <th className="px-4 py-2 border">Harga Jual / Penggantian / DPP</th>
                                <th className="px-4 py-2 border">DPP Nilai Lain / DPP</th>
                                <th className="px-4 py-2 border">PPN</th>
                                <th className="px-4 py-2 border">PPnMB</th>
                                <th className="px-4 py-2 border">Penandatanganan</th>
                                <th className="px-4 py-2 border">Referensi</th>
                                <th className="px-4 py-2 border">Dilaporkan Oleh Pengguna</th>
                                <th className="px-4 py-2 border">Dilaporkan Oleh Pemungut PPN</th>

                            </tr>
                        </thead>
                        <tbody className="text-gray-600">
                            <tr>
                                <td className="border">1</td>
                                <td className="border text-center">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 border-gray-300 rounded"
                                        checked={selectedItems.includes(1)}
                                        onChange={() => handleSelectItem(1)}
                                    />
                                </td>
                                <td className="border flex justify-center space-x-2">
                                    <button className="p-1 hover:bg-blue-100 rounded">
                                        <FaEdit className="text-blue-900 text-2xl" />
                                    </button>
                                    <button className="p-1 hover:bg-red-100 rounded">
                                        <TiDeleteOutline className="text-red-600 text-2xl" />
                                    </button>
                                    <button className="p-1 hover:bg-green-100 rounded">
                                        <FaFilePdf className="text-green-600 text-2xl" />
                                    </button>
                                </td>
                                <td className="border">3510145907990002</td>
                                <td className="border">PUTRI NURIL WULANATINING ASIH</td>
                                <td className="border">1234567890</td>
                                <td className="border">1234567890</td>
                                <td className="border">2024-03-16</td>
                                <td className="border">Agustus</td>
                                <td className="border">2023</td>
                                <td className="border">LUNAS</td>
                                <td className="border">Tidak</td>
                                <td className="border">0</td>
                                <td className="border">0</td>
                                <td className="border">0</td>
                                <td className="border">0</td>
                                <td className="border">0</td>
                                <td className="border">0</td>
                                <td className="border">0</td>
                                <td className="border">0</td>
                            </tr>
                            <tr>
                                <td className="border">2</td>
                                <td className="border text-center">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 border-gray-300 rounded"
                                        checked={selectedItems.includes(1)}
                                        onChange={() => handleSelectItem(1)}
                                    />
                                </td>
                                <td className="border flex justify-center space-x-2">
                                    <button className="p-1 hover:bg-blue-100 rounded">
                                        <FaEdit className="text-blue-900 text-2xl" />
                                    </button>
                                    <button className="p-1 hover:bg-red-100 rounded">
                                        <TiDeleteOutline className="text-red-600 text-2xl" />
                                    </button>
                                    <button className="p-1 hover:bg-green-100 rounded">
                                        <FaFilePdf className="text-green-600 text-2xl" />
                                    </button>
                                </td>
                                <td className="border">3510145907990002</td>
                                <td className="border">PUTRI NURIL WULANATINING ASIH</td>
                                <td className="border">1234567890</td>
                                <td className="border">1234567890</td>
                                <td className="border">2024-03-16</td>
                                <td className="border">Agustus</td>
                                <td className="border">2023</td>
                                <td className="border">LUNAS</td>
                                <td className="border">Tidak</td>
                                <td className="border">0</td>
                                <td className="border">0</td>
                                <td className="border">0</td>
                                <td className="border">0</td>
                                <td className="border">0</td>
                                <td className="border">0</td>
                                <td className="border">0</td>
                                <td className="border">0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default PajakKeluaran;
