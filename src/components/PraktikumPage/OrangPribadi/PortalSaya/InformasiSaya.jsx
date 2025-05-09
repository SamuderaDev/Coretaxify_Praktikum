import React, { useState, useEffect } from "react";
import SidebarProfilSaya from "./SidebarProfilSaya";
import { BsFiletypeXls } from "react-icons/bs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { useUserType } from "@/components/context/userTypeContext";

import { useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCookieToken } from "@/service";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { RoutesApi } from "@/Routes";

const InformasiSaya = ({ data, sidebar }) => {
  const [activeTab, setActiveTab] = useState("general");
  const { userType } = useUserType();
  const [userTypeFromStorage, setUserTypeFromStorage] = useState("");

  const { id, akun } = useParams();
  const token = getCookieToken();
  // const { isLoading, isError, data, error, refetch } = useQuery({
  //   queryKey: ["informasiumum", id],
  //   queryFn: async () => {
  //     const response = await axios.get(
  //       `${RoutesApi.apiUrl}student/assignments/${id}/sistem/${akun}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         params: {
  //           intent: "api.get.sistem.informasi.umum",
  //         },
  //       }
  //     );

  //     // Check if response data exists
  //     if (!response.data) {
  //       throw new Error("No data returned from API");
  //     }

  //     return response.data.data;
  //   },
  //   enabled: !!id && !!token,
  // });

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
  // if (isLoading) {
  //   return (
  //     <div className="loading">
  //       <ClipLoader color="#7502B5" size={50} />
  //     </div>
  //   );
  // }
  // if (isError) {
  //   return (
  //     <div className="error-container">
  //       <p>Error loading data: {error.message}</p>
  //       <button
  //         onClick={() => refetch()}
  //         className="px-4 py-2 bg-fuchsia-500 text-white rounded-md mt-2"
  //       >
  //         Try Again
  //       </button>
  //     </div>
  //   );
  // }
  console.log("pls gel");
  console.log(data, "sidebar", sidebar);
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarProfilSaya
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
                    ["Jenis Wajib Pajak", data.tipe_akun],
                    ["Kategori Individu", data.n],
                    ["Nama", data.nama_akun],
                    ["Tempat Lahir", "BANYUWANGI"],
                    ["Tanggal Lahir", "19 Juli 1999"],
                    ["Jenis Kelamin", "Wanita"],
                    ["Status Perkawinan", "Tidak Kawin"],
                    ["Agama", "Islam"],
                    ["Kewarganegaraan", "Warga Negara Indonesia"],
                    ["Negara Asal", "Indonesia"],
                    ["Nomor Pokok Wajib Pajak dari Negara Asal", "-"],
                    ["Nomor KITAS/KITAP", "-"],
                    ["Tanggal KITAS/KITAP", "-"],
                    ["Jenis Pekerjaan", "Pelajar/Mahasiswa"],
                    ["Nama Ibu Kandung", "-"],
                    ["Nomer Kartu Keluarga", "902991093901939"],
                    ["NPWP Kepala FTU", "-"],
                    ["Nama Kepala FTU", "-"],
                    ["Sumber Penghasilan", "Pekerjaan"],
                    ["Izin Usaha", "-"],
                    ["Tanggal Izin Usaha", "-"],
                    ["Memiliki Karyawan", "Tidak"],
                    ["Jumlah Karyawan", "-"],
                    ["Metode Pembukuan/Pencatatatan", "Pencatatan"],
                    ["Mata Uang Pembukuan", "Rupiah Indonesia"],
                    ["Periode Pembukuan", "0-12"],
                    ["Tempat Kerja", "-"],
                    ["Pendapatan per Bulan", "Kurang dari Rp 4.500.000"],
                    ["Omset per Tahun", "Lebih dari Rp 4,8 M"],
                    ["Tanggal Pendaftaran", "09 Maret 2022"],
                    ["Tanggal Aktivasi", "09 Maret 2022"],
                    ["Status Wajib Pajak", "Aktif"],
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
                    ["Penunjukan Perwakilan", "X"],
                    ["Penonaktifan Akses Pembuatan Faktur Pajak", "X"],
                    ["Participating Interest", "X"],
                    ["Status Operator", "X"],
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
                    ["Bahasa yang Dipilih", "English"],
                    ["Kantor Wilayah", "Kantor Wilayah DJP Jawa Timur III"],
                    [
                      "Kantor Pelayanan Pajak",
                      "Kantor Pelayanan Pajak Pratama Banyuwangi",
                    ],
                    ["Nomor Telepon Seluler Utama", "081330799798"],
                    [
                      "Alamat Surat Elektronik Utama",
                      "putrinurilwulan4@gmail.com",
                    ],
                    ["Seksi Pengawasan", "-"],
                    ["Status Pengusaha Kena Pajak", "X"],
                    ["Tanggal Pengukuhan Pengusaha Kena Pajak"],
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

export default InformasiSaya;
