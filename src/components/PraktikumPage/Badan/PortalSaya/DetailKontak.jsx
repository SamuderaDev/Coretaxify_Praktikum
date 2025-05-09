import React, { useState } from "react";
import SidebarProfilSayaBadan from "./SidebarProfilSaya";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsFiletypeXls } from "react-icons/bs";
import { useParams } from "react-router";
import { Sidebar } from "lucide-react";

const DetailKontakBadan = ({ data, sidebar }) => {
  const [contacts, setContacts] = useState([]);
  const { id, akun } = useParams();
  const contactData = Array.isArray(data) ? data : [];

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarProfilSayaBadan
        akun={{ id, akun }}
        nama_akun={sidebar.nama_akun}
        npwp_akun={sidebar.npwp_akun}
      />

      <div className="flex-auto p-3 bg-white rounded-md h-full">
        <div className="flex justify-between items-center mb-4 pb-3 border-b">
          <div className="flex items-center">
            <IoDocumentTextOutline className="text-4xl text-blue-900" />
            <h1 className="text-lg font-bold text-blue-900 ml-2">
              Detail Kontak
            </h1>
          </div>
        </div>
        <div className="flex justify-between mb-4 border-b pb-3 ">
          <button className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded">
            <BsFiletypeXls className="text-2xl text-white" />
          </button>
        </div>
        <div className="w-[1050px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden mt-4">
          <table className="table-auto border border-gray-300 w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-2 border">Aksi</th>
                <th className="px-8 py-2 border">Jenis Kontak</th>
                <th className="px-4 py-2 border">Nomor Telepon</th>
                <th className="px-4 py-2 border">Nomor Handphone</th>
                <th className="px-4 py-2 border">Nomor Faksimile</th>
                <th className="px-4 py-2 border">Alamat Email</th>
                <th className="px-4 py-2 border">Alamat Situs Web</th>
                <th className="px-4 py-2 border">Keterangan</th>
                <th className="px-4 py-2 border">Tanggal Mulai</th>
                <th className="px-4 py-2 border">Tanggal Berakhir</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {contactData.length == 0 ? (
                <tr>
                  <td colSpan="10" className="text-center p-4 border">
                    Belum ada kontak
                  </td>
                </tr>
              ) : (
                contactData.map((contact, index) => (
                  <tr key={index} className="bg-gray-100">
                    <td className="px-4 py-4 border">
                      <button>Edit</button>
                    </td>
                    <td className="px-2 py-4 border">{contact.jenis_kontak}</td>
                    <td className="px-4 py-4 border">{contact.nomor_telpon}</td>
                    <td className="px-4 py-4 border">
                      {contact.nomor_handphone}
                    </td>
                    <td className="px-4 py-4 border">
                      {contact.nomor_faksimile}
                    </td>
                    <td className="px-4 py-4 border">{contact.alamat_email}</td>
                    <td className="px-4 py-4 border">
                      {contact.alamat_situs_wajib}
                    </td>
                    <td className="px-4 py-4 border">{contact.keterangan}</td>
                    <td className="px-4 py-4 border">
                      {contact.tanggal_mulai}
                    </td>
                    <td className="px-4 py-4 border">
                      {contact.tanggal_berakhir}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailKontakBadan;
