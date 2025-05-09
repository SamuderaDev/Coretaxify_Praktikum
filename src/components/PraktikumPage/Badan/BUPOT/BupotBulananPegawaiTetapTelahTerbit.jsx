import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUserType } from '../../../context/UserTypeContext';


const BupotBulananPegawaiTetapTelahTerbit = () => {
    const { userType } = useUserType();
    const userTypeId = userType === "Orang Pribadi" ? 1 : 2;
    const location = useLocation();

    const menuItems = [
        { label: "Belum Terbit", path: `/admin/praktikum/${userTypeId}/bukti-pemotongan-bulanan-pegawai-tetap` },
        { label: "Telah Terbit", path: `/admin/praktikum/${userTypeId}/bukti-pemotongan-bulanan-pegawai-tetap/telah-terbit` },
        { label: "Tidak Valid", path: `/admin/praktikum/${userTypeId}/bukti-pemotongan-bulanan-pegawai-tetap/tidak-valid` },
    ];
    return (
        <div className="flex">
            <div className="w-64 bg-white shadow-md p-4 min-h-screen">
                <div className="bg-blue-900 h-10 w-full mb-4 rounded-md"></div>
                <h2 className="text-lg font-semibold mb-4">Bukti Pemotongan Bulanan Pegawai Tetap</h2>
                <ul className="space-y-1">
                    {menuItems.map((item, index) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <li
                                key={index}
                                className={`p-2 rounded-md cursor-pointer ${isActive
                                    ? 'bg-blue-700 text-white'
                                    : 'hover:bg-blue-700 hover:text-white'
                                    }`}
                            >
                                <Link to={item.path} className="block w-full p-2">
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="w-full p-6 bg-gray-50 min-h-screen">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold">EBUPOT MP NOT ISSUED</h1>
                    <div className="flex space-x-2">

                        <button className="bg-white border px-4 py-2 rounded">XML Monitoring</button>
                        <div className="relative">
                            <button className="bg-white border px-4 py-2 rounded">Impor Data ▾</button>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 border rounded w-[1220px] overflow-x-auto">
                    <table className=" table-auto border-collapse">
                        <thead>
                            <tr className="bg-blue-800 text-gray-700 text-left">
                                <th className="px-4 py-2 border">No</th>
                                <th className="px-4 py-2 border">Masa Pajak</th>
                                <th className="px-4 py-2 border">Nomor Pemotongan</th>
                                <th className="px-4 py-2 border">Status</th>
                                <th className="px-4 py-2 border">NITKU/Nomor Identitas Sub Unit Organisasi</th>
                                <th className="px-4 py-2 border">Jenis Pajak</th>
                                <th className="px-4 py-2 border">Kode Pajak</th>
                                <th className="px-4 py-2 border">NPWP</th>
                                <th className="px-4 py-2 border">Nama</th>
                                <th className="px-4 py-2 border">Dasar Pengenaan Pajak (RP)</th>
                                <th className="px-4 py-2 border">Pajak Penghasilan</th>
                                <th className="px-4 py-2 border">Fasilitas Pajak</th>
                                <th className="px-4 py-2 border">Dilaporkan Dalam SPT</th>
                                <th className="px-4 py-2 border">SPT telah/sedang diperiksa</th>
                                <th className="px-4 py-2 border">SPT Dalam penegakan hukum</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-center text-gray-500">
                                <td colSpan="15" className="px-4 py-6 border">
                                    Tidak ada data yang ditemukan.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default BupotBulananPegawaiTetapTelahTerbit
