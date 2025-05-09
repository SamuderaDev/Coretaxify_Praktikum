import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SidebarProfilSaya from "./SidebarProfilSaya";
import { useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCookieToken } from "@/service";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { RoutesApi } from "@/Routes";
import { Sidebar } from "react-pro-sidebar";

const ProfilSaya = ({ data, sidebar }) => {
  const [activeTab, setActiveTab] = useState("profil");
  const { id, akun } = useParams();
  const token = getCookieToken();
  // const { isLoading, isError, data, error, refetch } = useQuery({
  //   queryKey: ["getportal", id],
  //   queryFn: async () => {
  //     const response = await axios.get(
  //       `${RoutesApi.apiUrl}student/assignments/${id}/sistem/${akun}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         params: {
  //           intent: "api.get.sistem.ikhtisar.profil",
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
  if (!data || !sidebar) {
    return <p>Error</p>;
  }
  console.log("Data fetched:", data, sidebar);

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarProfilSaya
        nama_akun={sidebar.nama_akun}
        npwp_akun={sidebar.npwp_akun}
        akun={{ id, akun }}
      />
      <main className="flex-auto p-3 bg-white rounded-md h-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            Ikhtisar Profil Wajib Pajak
          </h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
            📥 Unduh Ikhtisar Profil
          </button>
        </div>

        <div className="w-full p-2 ml-0 border-t">
          <Tabs
            defaultValue="profil"
            onValueChange={(val) => setActiveTab(val)}
          >
            <TabsList className="flex justify-start gap-2 text-blue-700">
              <TabsTrigger value="profil">Profil</TabsTrigger>
              <TabsTrigger value="billing">
                Daftar Kode Billing belum dibayar
              </TabsTrigger>
              <TabsTrigger value="saldo">Saldo Saat ini</TabsTrigger>
              <TabsTrigger value="spt">SPT Belum Disampaikan</TabsTrigger>
              <TabsTrigger value="pajak">Jenis Pajak Terdaftar</TabsTrigger>
              <TabsTrigger value="kasus">Kasus aktif</TabsTrigger>
              <TabsTrigger value="fasilitas">Fasilitas Aktif</TabsTrigger>
            </TabsList>

            <TabsContent value="profil">
              <div className="p-6 grid grid-cols-2 gap-4 w-full border-r-0 border-gray-500">
                <div className="space-y-2 h-full">
                  {[
                    ["Nama", data.nama_akun],
                    ["Nomor Pokok Wajib Pajak", data.npwp_akun],
                    ["Kegiatan Utama", "Kegiatan Penunjang Pendidikan"],
                    ["Jenis Wajib Pajak", "Orang Pribadi"],
                    ["Kategori Wajib Pajak", data.tipe_akun],
                    ["Status NPWP", "Aktif"],
                    ["Tanggal Terdaftar", "16 Maret 2024"],
                    ["Tanggal Aktivasi", "16 Maret 2024"],
                    ["Status Pengusaha Kena Pajak", ""],
                    ["Total Pengukuhan Pengusaha Kena Pajak", ""],
                    [
                      "Kantor Wilayah Direktorat Jenderal Pajak",
                      "Kantor Wilayah DJP Jawa Timur III",
                    ],
                    [
                      "Kantor Pelayanan Pajak",
                      "Kantor Pelayanan Pajak Pratama Banyuwangi",
                    ],
                    ["Seksi Pengawasan Pajak", "Seksi Pengawasan II"],
                    ["Tanggal Pembaruan Profil", "20 Februari 2025"],
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
                    ["Alamat Utama", data.alamat_utama_akun],
                    [
                      "Kontak Utama",
                      "Nomor Handphone : 081234567890",
                      "Email Utama : email@example.com",
                    ],
                    [
                      "Klasifikasi Lapangan Usaha Utama",
                      "Kode Klafikasi Lapangan Usaha : Z5000",
                      "Deskripsi Klafikasi Lapangan Usaha : Pegawai Swasta",
                    ],
                  ].map(([label, value, text], index) => (
                    <div
                      key={index}
                      className="cols grid-cols-[250px_10px_auto]"
                    >
                      <p className="font-bold text-gray-800 ">{label} :</p>
                      {/* <p className="text-center">:</p> */}
                      <p className="mt-4 grid ">{value}</p>
                      <p className="mt-2">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="billing">
              {" "}
              {/* Link dari SPT */}
              <div className="p-4">
                <p className="text-gray-600">
                  Daftar kode billing yang belum dibayar akan ditampilkan di
                  sini.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="saldo">
              <div className="p-4">
                <p className="text-gray-600">
                  Informasi saldo saat ini akan ditampilkan di sini.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="spt">
              <div className="p-4">
                <p className="text-gray-600">
                  Daftar SPT yang belum disampaikan akan muncul di sini.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="pajak">
              <div className="p-4">
                <p className="text-gray-600">
                  Jenis pajak yang terdaftar akan muncul di sini.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="kasus">
              <div className="p-4">
                <p className="text-gray-600">
                  Kasus aktif yang terkait akan ditampilkan di sini.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="fasilitas">
              <div className="p-4">
                <p className="text-gray-600">
                  Fasilitas aktif akan muncul di sini.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default ProfilSaya;
