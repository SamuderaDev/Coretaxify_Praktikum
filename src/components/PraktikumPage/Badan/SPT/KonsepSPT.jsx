import React, { useState, useRef, useEffect } from "react";
import SideBarSPT from './SideBarSPT';
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";

const KonsepSPT = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className='flex h-screen bg-gray-100'>
            <SideBarSPT />
            <div className="flex-auto p-3 bg-white rounded-md h-full">
                <div className="flex justify-between items-center mb-4 pb-3 border-b">
                    <div className="flex items-center">
                        <IoDocumentTextOutline className="text-4xl text-blue-900" />
                        <h1 className="text-lg font-bold text-blue-900 ml-2">Konsep SPT</h1>
                    </div>
                </div>

                <div className="flex justify-between items-start mb-4 pb-3 border-b">
                    <div className="flex items-center gap-3">
                        <button
                            className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded"
                            onClick={() => window.location.href = "/admin/praktikum/2/surat-pemberitahuan-(spt)/buat-konsep-spt"}
                        >
                            Buat Konsep SPT
                        </button>
                        <div className="flex text-left text-sm" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-base"
                            >
                                Import <FaChevronDown className="ml-2" />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute z-10 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    <div className="py-1">
                                        <a
                                            href="/template-import-pajak-keluaran.xlsx"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Download Template
                                        </a>
                                        <a
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                        >
                                            Import Dokumen
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="w-[1200px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden mt-4">
                    <table className="table-auto w-full border border-gray-300 overflow-x-auto">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-6 py-2 border">No</th>
                                <th className="px-4 py-2 border">Aksi</th>
                                <th className="px-8 py-2 border">Jenis Pajak</th>
                                <th className="px-4 py-2 border">Jenis Surat Pemberitahuan Pajak</th>
                                <th className="px-4 py-2 border">Masa Pajak</th>
                                <th className="px-4 py-2 border">NOP</th>
                                <th className="px-4 py-2 border">Nama Objek Pajak</th>
                                <th className="px-4 py-2 border">Model SPT</th>
                                <th className="px-4 py-2 border">Tanggal Jatuh Tempo</th>
                                <th className="px-4 py-2 border">Tanggal Dibuat</th>
                                <th className="px-4 py-2 border">Status SPT</th>
                                <th className="px-4 py-2 border">Kanal</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600">
                            <tr>
                                <td colSpan="12" className="text-center p-4 border">Belum ada data</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default KonsepSPT;
