import React, { useState, useRef } from "react";
import SideBarEFaktur from "./SideBarEFaktur";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";

const PajakKeluaranOP = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };
    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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

                        {/* <button
                            className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded text-sm"
                            onClick={() => window.location.href = "/admin/praktikum/2/e-faktur/pajak-keluaran/tambah-faktur-keluaran"}
                        >
                            Tambah
                        </button> */}
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

                <div className="w-auto overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden mt-4">
                    <table className="table-auto border border-gray-300 w-full">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-6 py-2 border">No</th>
                                <th className="px-8 py-2 border">Checklist</th>
                                <th className="px-4 py-2 border">Aksi</th>
                                <th className="px-4 py-2 border">NPWP Pembeli</th>
                                <th className="px-4 py-2 border">Nama Pembeli</th>
                                <th className="px-4 py-2 border">Kode Transaksi</th>
                                <th className="px-4 py-2 border">Nomor Faktur Pajak</th>
                                <th className="px-4 py-2 border">Tanggal Faktur Pajak</th>
                                <th className="px-4 py-2 border">Masa Pajak</th>
                                <th className="px-4 py-2 border">Tahun</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600">
                            <tr>
                                <td className="">1</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default PajakKeluaranOP;
