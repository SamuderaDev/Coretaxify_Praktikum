import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUserType } from '../../../context/UserTypeContext';

const SideBarSPT = () => {
    const { userType } = useUserType();
    const location = useLocation(); // ambil path sekarang
    const userTypeId = userType === "Orang Pribadi" ? 1 : 2;

    const efakturItems = [
        "SPT Menunggu Pembayaran",
        "SPT Dilaporkan",
        "SPT Ditolak",
        "SPT Dibatalkan ",
    ];

    const dokumenLainItems = [
        "Pajak Keluaran",
        "Pajak Masukan",
        "Retur Dokumen Lain Keluaran",
        "Retur Dokumen Lain Masukan",
    ];

    const dashboardPath = `/admin/praktikum/${userTypeId}/e-faktur`;
    const isDashboard = location.pathname === dashboardPath;

    return (
        <aside className="w-1/6 text-blue-900 px-5 py-5 h-screen bg-white">
            <div className="mb-5 bg-blue-900 text-white p-2 text-center">
                <h2 className="text-lg font-bold mb-5">3510145907990002</h2>
                <h3 className="text-md font-semibold mb-5">PUTRI NURIL WULANATINING ASIH</h3>
            </div>
            <nav>
                <ul className='space-y-1'>
                    {/* <li
                        className={`p-2 rounded-md cursor-pointer ${isDashboard ? "bg-blue-700 text-white" : "hover:bg-blue-700 hover:text-white"
                            }`}
                    >
                        <Link to={dashboardPath} className="block w-full p-2">
                            <strong>Dashboard</strong>
                        </Link>
                    </li> */}

                    <li className="font-bold text-lg mt-4 mb-2 text-start">Surat Pemberitahuan (SPT)</li>
                    {efakturItems.map((item, index) => {
                        const formattedItem = item.replace(/ /g, "-").toLowerCase();
                        const path = `/admin/praktikum/${userTypeId}/e-faktur/${formattedItem}`;
                        const isActive = location.pathname === path;

                        return (
                            <li
                                key={index}
                                className={`p-2 rounded-md cursor-pointer ${isActive ? "bg-blue-700 text-white" : "hover:bg-blue-700 hover:text-white"
                                    }`}
                            >
                                <Link to={path} className="block w-full p-2">
                                    {item}
                                </Link>
                            </li>
                        );
                    })}

                    {/* <li className="font-bold text-lg mt-4 mb-2">Dokumen Lain</li>
                    {dokumenLainItems.map((item, index) => {
                        const formattedItem = item.replace(/ /g, "-").toLowerCase();
                        const path = `/admin/praktikum/${userTypeId}/e-faktur/dokumen-lain/${formattedItem}`;
                        const isActive = location.pathname === path;

                        return (
                            <li
                                key={index}
                                className={`p-2 rounded-md cursor-pointer ${isActive ? "bg-blue-700 text-white" : "hover:bg-blue-700 hover:text-white"
                                    }`}
                            >
                                <Link to={path} className="block w-full p-2">
                                    {item}
                                </Link>
                            </li>
                        );
                    })} */}
                </ul>
            </nav>
        </aside>
    );
};

export default SideBarSPT;
