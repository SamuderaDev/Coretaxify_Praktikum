import React, { useState, useEffect } from "react";
import SidebarProfilSayaBadan from "./SidebarProfilSaya";
import { BsFiletypeXls } from "react-icons/bs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { useUserType } from "@/components/context/userTypeContext";
import { useParams } from "react-router";

const InformasiSayaBadan = ({ data, sidebar }) => {
  const [activeTab, setActiveTab] = useState("general");
  const { userType } = useUserType();
  const [userTypeFromStorage, setUserTypeFromStorage] = useState("");
  const { id, akun } = useParams();

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType) {
      setUserTypeFromStorage(storedUserType);
    }
  }, []);

  const getUserTypePath = () => {
    const type = userType || userTypeFromStorage;
    return type === "Orang Pribadi" ? 1 : 2;
  };

  console.log("halo");
  console.log(data, sidebar);
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarProfilSayaBadan
        nama_akun={sidebar.nama_akun}
        npwp_akun={sidebar.npwp_akun}
        akun={{ id, akun }}
      />
      <main className="flex-auto p-3 bg-white rounded-md h-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Informasi Umum Wajib Pajak</h2>
          <a href={`/praktikum/${id}/sistem/${akun}/edit-informasi-umum`}>
            <button
              className="px-4 py-2 bg-yellow-300 hover:bg-yellow-400 text-blue-900 rounded-md"
              // onClick={() =>
              //   (window.location.href = `/admin/praktikum/${getUserTypePath()}/profil-saya/informasi-umum/edit-data-profil`)
              // }
            >
              Edit
            </button>
          </a>
        </div>

        <div className="w-full p-2 ml-0 border-t">
          <Tabs
            defaultValue="general"
            onValueChange={(val) => setActiveTab(val)}
          >
            <TabsList className="flex justify-start gap-2 text-blue-700">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="taxplayer">Taxplayer Tags</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <div className="p-6 grid grid-cols-2 gap-4 w-full border-r-0 border-gray-500">
                <div className="space-y-2">
                  {[
                    ["Nomor Pokok Wajib Pajak", data.npwp_akun],
                    ["Nomor Identitas Kependudukan", data.npwp_akun],
                    ["Bentuk Badan Hukum", data.tipe_akun],
                    ["Nomor Keputusan Pengesahan", "Orang Pribadi"],
                    ["Nama", data.nama_akun],
                    ["Tanggal Keputusan Pengesahan", "BANYUWANGI"],
                    ["Nomor Akta Pendirian", "19 Juli 1999"],
                    ["Tempat Pendirian", "Wanita"],
                    ["Tempat Perubahan", "Tidak Kawin"],
                    ["Tanggal Pendirian", "Islam"],
                    ["Akta Perubahan", "Warga Negara Indonesia"],
                    ["NIK Notaris", "Indonesia"],
                    ["Tanggal Perubahan", "-"],
                    [
                      "Nama Notaris/Pejabat Penandatangan Nama Notaris/Pejabat Penandatangan",
                      "-",
                    ],
                    ["Jenis Perusahaan/Modal", "-"],
                    ["Modal Dasar", "Pelajar/Mahasiswa"],
                    ["Modal Ditempatkan", "-"],
                    ["Modal Disetor", "902991093901939"],
                    ["Participating Interest", "-"],
                    ["Status Operator", "-"],
                    ["Merek Dagang/usaha", "Pekerjaan"],
                    ["Memiliki Karyawan", "-"],
                    ["Jumlah Karyawan", "-"],
                    ["Metode Pembukuan/Pencatatatan", "Pencatatan"],
                    ["Mata Uang Pembukuan", "Rupiah Indonesia"],
                    ["Periode Pembukuan", "0-12"],
                    ["Tanggal Pendaftaran", "0-12"],
                    ["Omset Per tahun", "-"],
                    ["Jumlah Peredaran Bruto", "-"],
                    ["Tanggal Aktivasi", "Kurang dari Rp 4.500.000"],
                    ["Status Wajib Pajak", "Lebih dari Rp 4,8 M"],
                    [
                      "Tanggal Pengukuhan Pengusaha Kena Pajak",
                      "09 Maret 2022",
                    ],
                    [
                      "Penonaktifan Akses Pembuatan Faktur Pajak",
                      "09 Maret 2022",
                    ],
                  ].map(([label, value], index) => (
                    <div
                      key={index}
                      className="grid grid-cols-[250px_10px_auto]"
                    >
                      <p className="font-bold text-gray-800">{label}</p>
                      <p className="text-center">:</p>
                      <p>{value}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 h-full">
                  {[
                    ["Pemungut PPN eCommerce", "X"],
                    ["Penghasilan atau Pemotong atau Pemungut PPN", "X"],
                    ["PPN yang dianggap", "X"],
                    ["Pengembalian PPN", "X"],
                    ["Lembaga Keuangan Pelapor", "X"],
                    ["Pemungut Bea Materai", "X"],
                    ["Pembayaran Non Kas", "X"],
                    ["PMK-131/PMK.03/2017", "X"],
                    ["Perusahaan Tercatat", "X"],
                    ["Badan Usaha Milik Negara", "X"],
                    ["Bahasa yang Dipilih", "X"],
                    ["Kantor Wilayah", "X"],
                    ["Kantor Pelayanan Pajak", "X"],
                    ["Nomor Telepon Seluler Utama", "X"],
                    ["Alamat Surat Elektronik Utama", "English"],
                    ["Seksi Pengawasan", "Kantor Wilayah DJP Jawa Timur III"],
                  ].map(([label, value], index) => (
                    <div
                      key={index}
                      className="grid grid-cols-[250px_10px_auto]"
                    >
                      <p className="font-bold text-gray-800">{label}</p>
                      <p className="text-center">:</p>
                      <p>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="taxplayer" className="p-4 min-w-full ">
              <div className="flex justify-between mb-4 border-b pb-3">
                <button className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded">
                  <BsFiletypeXls className="text-2xl text-white" />
                </button>
              </div>

              <div className="w-[1050px]">
                <div className="w-[100%] overflow-x-auto">
                  <table className="table-auto border border-gray-300 w-full">
                    <thead className="bg-purple-700 text-white">
                      <tr>
                        {[
                          "Jenis Bendera",
                          "Jenis Surat Pemberitahuan Pajak",
                          "Masa Pajak",
                          "Tanggal Penunjukan",
                          "Nomor Penunjukkan",
                          "Nomor Kasus",
                          "Berlaku Sejak",
                          "Tanggal Berakhir",
                        ].map((header, index) => (
                          <th
                            key={index}
                            className="px-4 py-2 border text-left"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {Array(8)
                          .fill()
                          .map((_, index) => (
                            <td key={index} className="px-4 py-2 border">
                              <input
                                type="text"
                                className="px-2 w-full h-8 border rounded"
                              />
                            </td>
                          ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default InformasiSayaBadan;
