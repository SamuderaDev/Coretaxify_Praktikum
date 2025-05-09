import React from 'react';
import SideBarEFaktur from './SideBarEFaktur';
import { IoDocumentTextOutline } from "react-icons/io5";

const PajakMasukanOP = () => {
    return (
        <div className='flex h-screen'>
            <SideBarEFaktur />
            <div className="flex-1 p-3 bg-white rounded-md h-full">
                <div className="flex justify-between items-center mb-4 pb-3 border-b">
                    <div className="flex items-center">
                        <IoDocumentTextOutline className="text-4xl text-blue-900" />
                        <h1 className="text-lg font-bold text-blue-900 ml-2">Pajak Masukan</h1>
                    </div>
                </div>
                <div className="flex justify-between mb-4 border-b pb-3">
                    <button className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-2 rounded text-sm">
                        Import Excel
                    </button>
                    <div className="flex items-center gap-3 ">
                        <button className='flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded text-sm'>
                            Kreditan Faktur
                        </button>
                        <button className='flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded text-sm'>
                            Tidak Kreditan Faktur
                        </button>
                        <button className='flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded text-sm'>
                            Kembali Ke Status Approved
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
                                <td colSpan="10" className="text-center p-4 border">Belum ada data</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PajakMasukanOP;
