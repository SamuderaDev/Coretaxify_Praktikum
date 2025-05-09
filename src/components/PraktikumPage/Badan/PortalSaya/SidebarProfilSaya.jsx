import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUserType } from '../../../context/userTypeContext';

const SidebarProfilSayaBadan = () => {
    const { userType } = useUserType();
    const userTypeId = userType === "Orang Pribadi" ? 1 : 2;
    const location = useLocation();

    const menuItems = [
        "Ikhtisar Profil Wajib Pajak",
        "Informasi Umum",
        "Alamat",
        "Detail Kontak",
        "Pihak Terkait",
        "Objek Pajak Bumi dan Bangunan (PBB)",
        "Klasifikasi Lapangan Usaha (KLU)",
        "Detail Bank",
        "Data Unit Keluarga",
        "Tempat Kegiatan Usaha/Sub Unit",
        "Nomor Identifikasi Eksternal",
        "Jenis Pajak",
        "Wakil Kuasa Saya",
        "Wajib Pajak yang Diwakili",
        "Verifikasi Dua Langkah",
        "Permohonan Tertunda",
        "Semua Permohonan"
    ];

    return (
        <aside className="w-1/6 text-blue-900 px-5 py-5 h-screen bg-white">
            <div className="mb-5 bg-blue-900 text-white p-2 text-center">
                <h2 className="text-lg font-bold mb-5">3510145907990002</h2>
                <h3 className="text-md font-semibold mb-5">PUTRI NURIL WULANATINING ASIH</h3>
            </div>

            <nav>
                <ul className="space-y-1">
                    {menuItems.map((item, index) => {
                        const formattedItem = item.replace(/ /g, "-").toLowerCase();
                        const linkPath = index === 0
                            ? `/admin/praktikum/${userTypeId}/profil-saya`
                            : `/admin/praktikum/${userTypeId}/profil-saya/${formattedItem}`;

                        const isActive = location.pathname === linkPath;

                        return (
                            <li
                                key={index}
                                className={`p-2 rounded-md cursor-pointer ${isActive ? "bg-blue-700 text-white" : "hover:bg-blue-700 hover:text-white"
                                    }`}
                            >
                                <Link to={linkPath} className="block w-full p-2">
                                    {item}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};

export default SidebarProfilSayaBadan;
