import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaFilter,
  FaSearch,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import SidebarProfilSaya from "./SidebarProfilSaya";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import { useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCookieToken } from "@/service";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { RoutesApi } from "@/Routes";
import { getCsrf } from "@/service/getCsrf";
import Swal from "sweetalert2";
import { deleteContract } from "@/hooks/dashboard";
import { useCookies } from "react-cookie";
const EditDataProfil = ({ data, sidebar }) => {
  const [cookies] = useCookies(["token"]);
  const [isPerwakilan, setIsPerwakilan] = useState(false);
  const [showInformasiUmum, setShowInformasiUmum] = useState(false);
  const [showDataEkonomi, setShowDataEkonomi] = useState(false);
  const [showDetailKontak, setShowDetailKontak] = useState(false);
  const [showPihakTerkait, setShowPihakTerkait] = useState(false);
  const [showAlamatWajibPajak, setShowAlamatWajibPajak] = useState(false);
  const [showTempatKegiatanUsaha, setShowTempatKegiatanUsaha] = useState(false);
  const [showDetailBank, setShowDetailBank] = useState(false);
  const [showNomorIdentifikasiEksternal, setShowNomorIdentifikasiEksternal] =
    useState(false);
  const [showUnitPajakKeluarga, setShowUnitPajakKeluarga] = useState(false);
  const [contacts, setContacts] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isKaryawan, setIsKaryawan] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedSumberPenghasilan, setSelectedSumberPenghasilan] =
    useState("");
  const [selectedRelatedPersonType, setSelectedRelatedPersonType] =
    useState("");

  const { id, akun } = useParams();
  const token = getCookieToken();
  // const { isLoading, isError, data, error, refetch } = useQuery({
  //   queryKey: ["informasiupdate", id],
  //   queryFn: async () => {
  //     const response = await axios.get(
  //       `${RoutesApi.apiUrl}student/assignments/${id}/sistem/${akun}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         params: {
  //           intent: "api.get.sistem.edit.informasi.umum",
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

  // const [formData, setFormData] = useState({
  //   npwp: "",
  //   jenis_wajib_pajak: "",
  //   nama: "",
  //   kategori_wajib_pajak: "",
  //   negara_asal: "Indonesia",
  //   nomor_paspor: "",
  //   tempat_lahir: "",
  //   tanggal_lahir: "",
  //   jenis_kelamin: "pria",
  //   status_perkawinan: "tidak kawin",
  //   status_hubungan: "",
  //   agama: "islam",
  //   jenis_pekerjaan: "swasta",
  //   nama_ibu_kandung: "",
  //   nomor_kartu_keluarga: "",
  //   kewarganegaraan: "WNI",
  //   bahasa_yang_dipilih: "Bahasa Indonesia",
  // });
  console.log("Data fetched:", data);
  const [formData, setFormData] = useState({
    npwp: data.field_edit_informasi.informasi_umum.npwp,
    jenis_wajib_pajak:
      data.field_edit_informasi.informasi_umum.jenis_wajib_pajak,
    nama: data.field_edit_informasi.informasi_umum.nama,
    kategori_wajib_pajak:
      data.field_edit_informasi.informasi_umum.kategori_wajib_pajak,
    negara_asal: "Indonesia",
    // New fields
    nomor_paspor: data.field_edit_informasi.informasi_umum.nomor_paspor || "",
    tempat_lahir: data.field_edit_informasi.informasi_umum.tempat_lahir || "",
    tanggal_lahir: data.field_edit_informasi.informasi_umum.tanggal_lahir || "",
    jenis_kelamin: data.field_edit_informasi.informasi_umum.jenis_kelamin || "",
    status_perkawinan:
      data.field_edit_informasi.informasi_umum.status_perkawinan || "",
    status_hubungan_keluarga:
      data.field_edit_informasi.informasi_umum.status_hubungan_keluarga || "",
    agama: data.field_edit_informasi.informasi_umum.agama || "",
    jenis_pekerjaan:
      data.field_edit_informasi.informasi_umum.jenis_pekerjaan || "",
    nama_ibu_kandung:
      data.field_edit_informasi.informasi_umum.nama_ibu_kandung || "",
    nomor_kartu_keluarga:
      data.field_edit_informasi.informasi_umum.nomor_kartu_keluarga || "",
    kewarganegaraan:
      data.field_edit_informasi.informasi_umum.kewarganegaraan || "WNI",
    bahasa:
      data.field_edit_informasi.informasi_umum.bahasa || "Bahasa Indonesia",
  });

  const {
    data: orangTerkait,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["orang_terkait"],
    queryFn: async () => {
      const data = await axios.get(
        RoutesApi.apiUrl + `student/assignments/${id}/sistem/${akun}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          params: {
            intent: "api.sistem.get.akun.orang.pibadi",
          },
        }
      );
      // console.log(data.data);
      return data.data;
    },
  });
  const [formOrangTerkait, setFormOrangTerkait] = useState({
    // jenis_orang_terkait: "",
    sub_orang_terkait: "",
    kewarganegaraan: "Indonesia",
    negara_asal: "Indonesia",
    keterangan: "keterangan",
    akun_op: "",
    tanggal_mulai: "",
    tanggal_berakhir: "",
    nama_akun: "",
  });
  const handlePersonTypeChange = (e) => {
    console.log("AA");
    const { name, value } = e.target;
    console.log(name, value);
    setFormOrangTerkait((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const createPihakTerkait = useMutation({
    mutationFn: async (data) => {
      const csrf = await getCsrf();
      return axios.post(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${akun}/pihak-terkait`,
        formOrangTerkait,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire(
        "Berhasil!",
        "Data informasi umum berhasil disimpan!",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    },
    onError: (error) => {
      console.error("Error saving data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error");
    },
  });

  const deleteOrangTerkait = useMutation({
    mutationFn: async (user_id) => {
      const csrf = await getCsrf();
      return axios.delete(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${akun}/pihak-terkait/${user_id}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire("Berhasil!", "Pihak terkait berhasil dihapus!", "success").then(
        (result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        }
      );
    },
    onError: (error) => {
      console.error("Error saving data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error");
    },
  });

  const [tkuFormData, setTkuFormData] = useState({
    nitku: "",
    jenis_tku: "",
    nama_tku: "",
    jenis_usaha: "",
  });

  const handleTkuChange = (e) => {
    const { name, value } = e.target;
    setTkuFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createTku = useMutation({
    mutationFn: async () => {
      const csrf = await getCsrf();
      return axios.post(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${akun}/tempat-kegiatan-usaha`,
        tkuFormData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire(
        "Berhasil!",
        "Data tempat kegiatan usaha berhasil disimpan!",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    },
    onError: (error) => {
      console.error("Error saving data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error");
    },
  });
  const updateTku = useMutation({
    mutationFn: async (idTku) => {
      const csrf = await getCsrf();
      return axios.put(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${akun}/tempat-kegiatan-usaha/${idTku}`,
        tkuFormData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire(
        "Berhasil!",
        "Data tempat kegiatan usaha berhasil disimpan!",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    },
    onError: (error) => {
      console.error("Error saving data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error");
    },
  });
  const deleteTku = useMutation({
    mutationFn: async (idTku) => {
      const csrf = await getCsrf();
      return axios.delete(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${akun}/tempat-kegiatan-usaha/${idTku}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire("Berhasil!", "Data TKU berhasil dihapus!", "success").then(
        (result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        }
      );
    },
    onError: (error) => {
      console.error("Error saving data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data.", "error");
    },
  });

  const [bankFormData, setBankFormData] = useState({
    nama_bank: "",
    nomor_rekening_bank: "",
    jenis_rekening_bank: "akun-bisnis",
    nama_pemilik_bank: "",
    tanggal_mulai: "",
    tanggal_berakhir: "",
  });

  const handleBankChange = (e) => {
    const { name, value } = e.target;
    setBankFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add this mutation with your other mutations
  const createBankDetail = useMutation({
    mutationFn: async () => {
      const csrf = await getCsrf();
      return axios.post(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${akun}/detail-bank`,
        bankFormData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire(
        "Berhasil!",
        "Data detail bank berhasil disimpan!",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    },
    onError: (error) => {
      console.error("Error saving data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error");
    },
  });
  const updateDetailBank = useMutation({
    mutationFn: async (bank_id) => {
      const csrf = await getCsrf();
      return axios.put(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${akun}/detail-bank/${bank_id}`,
        bankFormData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire(
        "Berhasil!",
        "Data detail bank berhasil disimpan!",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    },
    onError: (error) => {
      console.error("Error saving data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error");
    },
  });
  const deleteDetailBank = useMutation({
    mutationFn: async (bank_id) => {
      const csrf = await getCsrf();
      return axios.delete(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${akun}/detail-bank/${bank_id}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire("Berhasil!", "Bank berhasil dihapus!", "success").then(
        (result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        }
      );
    },
    onError: (error) => {
      console.error("Error saving data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const updateInformasiUmum = useMutation({
    mutationFn: async () => {
      const csrf = await getCsrf();
      return axios.put(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${akun}/informasi-umum/${akun}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire(
        "Berhasil!",
        "Data informasi umum berhasil disimpan!",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    },
    onError: (error) => {
      console.error("Error saving data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error");
    },
  });
  const [contactFormData, setContactFormData] = useState({
    jenis_kontak: "",
    nomor_telpon: "",
    nomor_handphone: "",
    nomor_faksimile: "",
    alamat_email: "",
    alamat_situs_wajib: "",
    keterangan: "",
    tanggal_mulai: "",
    tanggal_berakhir: "",
  });
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // http://127.0.0.1:8000/api/student/assignments/1/sistem/1/detail-kontak
  const createContact = useMutation({
    mutationFn: async () => {
      const csrf = await getCsrf();
      return axios.post(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${akun}/detail-kontak`,
        contactFormData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire(
        "Berhasil!",
        "Data detail kontak berhasil disimpan!",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    },
    onError: (error) => {
      console.error("Error saving data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error");
    },
  });
  const updateContact = useMutation({
    mutationFn: async (contact_id) => {
      const csrf = await getCsrf();

      return axios.put(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${akun}/detail-kontak/${contact_id}`,
        contactFormData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire(
        "Berhasil!",
        "Data detail kontak berhasil diubah!",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    },
    onError: (error) => {
      console.error("Error saving data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error");
    },
  });
  const deleteContact = useMutation({
    mutationFn: async (contact_id) => {
      const csrf = await getCsrf();
      return axios.delete(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${akun}/detail-kontak/${contact_id}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire(
        "Berhasil!",
        "Data detail kontak berhasil dihapus!",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    },
    onError: (error) => {
      console.error("Error saving data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error");
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    //   const response = await axios.put(
    //     `${RoutesApi.apiUrl}student/assignments/${id}/sistem/${akun}`,
    //     formData,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //       params: {
    //         intent: "api.update.sistem.informasi.umum",
    //       },
    //     }
    //   );
    //     }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarProfilSaya
        nama_akun={sidebar.nama_akun}
        npwp_akun={sidebar.npwp_akun}
        akun={{ id, akun }}
      />
      <div className="flex-grow p-6 bg-white  h-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Pembaruan Data Wajib Pajak
        </h2>
        <div className="border rounded-md p-4 mb-4">
          <h3 className="text-lg font-semibold mb-3">Manajemen Kasus</h3>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div>
              <label className="block font-medium text-gray-700">Kanal</label>
              <select className="w-full p-2 border rounded-md bg-gray-100 text-gray-600">
                <option>Daring (Portal Wajib Pajak)</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Tanggal Permohonan
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value="27-02-2025"
                  readOnly
                  className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                />
                <button className="p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                  <FaCalendarAlt />
                </button>
                <button className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                  <FaFilter />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="border rounded-md p-4 mb-4">
          <h3 className="text-lg font-semibold mb-3">Kuasa Wajib Pajak</h3>
          <div className="flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              className="h-5 w-5 cursor-not-allowed bg-gray-400"
              disabled
              onChange={() => setIsPerwakilan(!isPerwakilan)}
            />
            <label className="text-gray-700">
              Diisi oleh perwakilan Wajib Pajak?
            </label>
          </div>
          <div
            className={`grid grid-cols-1 md:grid-cols-1 gap-4  ${
              !isPerwakilan && "opacity-50 pointer-events-none"
            }`}
          >
            <div>
              <label className="block font-medium text-gray-700">
                ID Penunjukan Perwakilan
              </label>
              <div className="flex items-center gap-2">
                <select className="w-full p-2 border rounded-md bg-gray-100 text-gray-600">
                  <option>Silakan pilih</option>
                </select>
                <button className="p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                  <FaSearch />
                </button>
                <button className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="col-span-2">
              <label className="block font-medium text-gray-700">
                NIK/NPWP Perwakilan
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                readOnly
              />
            </div>
            <div className="col-span-2">
              <label className="block font-medium text-gray-700">
                Nama Wakil/Kuasa
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                readOnly
              />
            </div>
          </div>
        </div>
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100"
          onClick={() => setShowInformasiUmum(!showInformasiUmum)}
        >
          <h3 className="text-lg font-semibold">Informasi Umum</h3>
          {showInformasiUmum ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showInformasiUmum && (
          <div className="border rounded-md p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div>
                <label className="block font-medium text-gray-700">NPWP</label>
                <input
                  value={formData.npwp}
                  type="text"
                  name="npwp"
                  className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                  readOnly
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Jenis Wajib Pajak
                </label>
                <input
                  type="text"
                  name="jenis_wajib_pajak"
                  className="w-full p-2 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                  readOnly
                  value={formData.jenis_wajib_pajak}
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">Nama</label>
                <input
                  type="text"
                  name="nama"
                  className="w-full p-2 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                  readOnly
                  value={formData.nama}
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Kategori Wajib Pajak
                </label>
                <input
                  name="kategori_wajib_pajak"
                  value={
                    formData.kategori_wajib_pajak === "Badan"
                      ? "Perseorangan Terbatas (PT)"
                      : "Orang Pribadi"
                  }
                  className="w-full p-2 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                  readOnly
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Negara Asal
                </label>
                <select
                  name="negara_asal"
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                  onChange={handleChange}
                  value={formData.negara_asal}
                >
                  <option>Indonesia</option>
                  <option>Malaysia</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Nomor Paspor
                </label>
                <input
                  type="text"
                  name="nomor_paspor"
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                  onChange={handleChange}
                  value={formData.nomor_paspor}
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Tempat Lahir
                </label>
                <input
                  type="date"
                  name="tempat_lahir"
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                  onChange={handleChange}
                  value={formData.tempat_lahir}
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  name="tanggal_lahir"
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                  onChange={handleChange}
                  value={formData.tanggal_lahir}
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Jenis Kelamin
                </label>
                <select
                  name="jenis_kelamin"
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                  onChange={handleChange}
                  value={formData.jenis_kelamin}
                >
                  <option value="wanita">Wanita</option>
                  <option value="pria">Pria</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Status Perkawinan
                </label>
                <select
                  name="status_perkawinan"
                  className="w-full p-2 border rounded-md bg-white text-gray-700"
                  onChange={handleChange}
                  value={formData.status_perkawinan}
                >
                  <option value="kawin">Kawin</option>
                  <option value="tidak kawin">Tidak Kawin</option>
                  <option value="cerai hidup">Cerai Hidup</option>
                  <option value="cerai mati">Cerai Mati</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Status Hubungan
                </label>
                <select
                  name="status_hubungan"
                  className="w-full p-2 border rounded-md bg-white text-gray-700"
                  onChange={handleChange}
                  value={formData.status_hubungan}
                >
                  <option value="anak">Anak</option>
                  <option value="istri">Istri</option>
                  <option value="suami">Suami</option>
                  <option value="ayah">Ayah</option>
                  <option value="ibu">Ibu</option>
                  <option value="kakak">Kakak</option>
                  <option value="adik">Adik</option>
                  <option value="ayah kandung">Ayah Kandung</option>
                  <option value="ibu kandung">Ibu Kandung</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-gray-700">Agama</label>
                <select
                  name="agama"
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                  onChange={handleChange}
                  value={formData.agama}
                >
                  <option value="islam">Islam</option>
                  <option value="kristen">Kristen</option>
                  <option value="katolik">Katolik</option>
                  <option value="budha">Budha</option>
                  <option value="hindu">Hindu</option>
                  <option value="konghucu">Konghucu</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Jenis Pekerjaan
                </label>
                <select
                  name="jenis_pekerjaan"
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                  onChange={handleChange}
                  value={formData.jenis_pekerjaan}
                >
                  <option value="pns">PNS</option>
                  <option value="tni">TNI</option>
                  <option value="polisi">Polisi</option>
                  <option value="swasta">Swasta</option>
                  <option value="wirausaha">Wirausaha</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Nama Ibu Kandung
                </label>
                <input
                  type="text"
                  name="nama_ibu_kandung"
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                  onChange={handleChange}
                  placeholder={formData.nama_ibu_kandung}
                  value={formData.nama_ibu_kandung}
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Nomor Kartu Keluarga
                </label>
                <input
                  type="text"
                  name="nomor_kartu_keluarga"
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                  onChange={handleChange}
                  value={formData.nomor_kartu_keluarga}
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Kewarganegaraan
                </label>
                <select
                  name="kewarganegaraan"
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                  onChange={handleChange}
                  value={formData.kewarganegaraan}
                >
                  <option>WNI</option>
                  <option>WNA</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Bahasa Yang Dipilih
                </label>
                <input
                  type="text"
                  name="bahasa_yang_dipilih"
                  className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed text-gray-600"
                  value={formData.bahasa_yang_dipilih}
                  readOnly
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={() => updateInformasiUmum.mutate()}
                // onClick={() => console.log(formData)}
              >
                Simpan
              </button>
            </div>
          </div>
        )}
        <div
          className="border rounded-md p-4 bg-gray-100 mb-2 cursor-pointer flex justify-between items-center"
          onClick={() => setShowDataEkonomi(!showDataEkonomi)}
        >
          <h3 className="text-lg font-semibold">Data Ekonomi</h3>
          {showDataEkonomi ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showDataEkonomi && (
          <div className="border rounded-md p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <AlertDialog>
                <AlertDialogTrigger className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                  Tambah
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white !min-w-[1000px] rounded-lg shadow-lg ">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold">
                      KLU Utama
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <div className="grid gap-1 overflow-auto h-96">
                    <div className="h-full">
                      <div className="mb-0">
                        <label className="block text-sm font-medium text-gray-700">
                          Perbarui Kode Ekonomi Utama
                        </label>
                        <input
                          type="checkbox"
                          className="mt-2"
                          defaultChecked
                          disabled
                        />
                      </div>
                      <div className="mb-0">
                        <label className="block text-sm font-medium text-gray-700">
                          Sumber Penghasilan
                        </label>
                        <select
                          className="w-full p-2 border rounded-md bg-white text-gray-700 "
                          value={selectedSumberPenghasilan}
                          onChange={(e) =>
                            setSelectedSumberPenghasilan(e.target.value)
                          }
                        >
                          <option value="">--Pilih Sumber Penghasilan--</option>
                          <option value="pekerjaan">Pekerjaan</option>
                          <option value="pekerjaan-bebas">
                            Pekerjaan Bebas
                          </option>
                          <option value="Kegiatan-usaha">Kegiatan Usaha</option>
                        </select>
                      </div>
                    </div>
                    {selectedSumberPenghasilan === "pekerjaan" && (
                      <div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Metode Pembukuan/Pencatatan
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md bg-white text-gray-600"
                          />
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Mata Uang Pembukuan
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md bg-white text-gray-600"
                          />
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Periode Pembukuan
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md bg-white text-gray-600"
                          />
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Tempat Kerja
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md bg-white text-gray-600"
                          />
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Penghasilan Per Bulan
                          </label>
                          <select className="w-full p-2 border rounded-md bg-white text-gray-600">
                            <option value="kurang dari rp. 4.500.000">
                              Kurang Dari Rp. 4.500.000
                            </option>
                            <option value="rp. 4.500.000 - rp. 9.999.999">
                              Rp. 4.500.000 - Rp. 9.999.999
                            </option>
                            <option value="rp. 10.000.000 - rp. 14.999.999">
                              Rp. 10.000.000 - Rp. 14.999.999
                            </option>
                            <option value="rp. 15.000.000 - rp. 19.999.999">
                              Rp. 4.500.000 - Rp. 9.999.999
                            </option>
                            <option value="lebih dari rp. 20.000.000">
                              Lebih Dari Rp. 20.000.000
                            </option>
                          </select>
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Deskripsi Kegiatan
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md bg-white text-gray-600"
                          />
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 ">
                            Tanggal Mulai
                          </label>
                          <input
                            type="date"
                            className="w-full p-2 border rounded-md bg-white text-gray-600"
                          />
                        </div>
                      </div>
                    )}
                    {selectedSumberPenghasilan === "pekerjaan-bebas" && (
                      <div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Izin Usaha
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md bg-white text-gray-600"
                          />
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Tanggal Izin Usaha
                          </label>
                          <input
                            type="date"
                            className="w-full p-2 border rounded-md bg-white text-gray-600"
                          />
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Merek Dagang Usaha
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md bg-white text-gray-600"
                          />
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Metode Pembukan/Pencatatan
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md bg-white text-gray-600"
                          />
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Mata Uang Pembukuan
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md bg-white text-gray-600"
                          />
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Periode Pembukuan
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md bg-white text-gray-600"
                          />
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Tempat Kerja
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md bg-white text-gray-600"
                          />
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Penghasilan Per Bulan
                          </label>
                          <select className="w-full p-2 border rounded-md bg-white text-gray-600">
                            <option value="kurang dari rp. 4.500.000">
                              Kurang Dari Rp. 4.500.000
                            </option>
                            <option value="rp. 4.500.000 - rp. 9.999.999">
                              Rp. 4.500.000 - Rp. 9.999.999
                            </option>
                            <option value="rp. 10.000.000 - rp. 14.999.999">
                              Rp. 10.000.000 - Rp. 14.999.999
                            </option>
                            <option value="rp. 15.000.000 - rp. 19.999.999">
                              Rp. 4.500.000 - Rp. 9.999.999
                            </option>
                            <option value="lebih dari rp. 20.000.000">
                              Lebih Dari Rp. 20.000.000
                            </option>
                          </select>
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Peredaran Bruto/Penerimaan Bruto
                          </label>
                          <select className="w-full p-2 border rounded-md bg-white text-gray-600">
                            <option value="Rp.0 s/d Rp.4,8 M">
                              Rp.0 s/d Rp.4.8 M
                            </option>
                            <option value="lebih dari Rp.4,8 M">
                              Lebih Dari Rp.4.8 M
                            </option>
                          </select>
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Deskripsi Kegiatan
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md bg-white text-gray-600"
                          />
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Tanggal Mulai
                          </label>
                          <input
                            type="date"
                            className="w-full p-2 border rounded-md bg-white text-gray-600"
                          />
                        </div>
                      </div>
                    )}
                    {selectedSumberPenghasilan === "Kegiatan-usaha" && (
                      <div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Izin Usaha
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md bg-white text-gray-600"
                          />
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Tanggal Izin Usaha
                          </label>
                          <input
                            type="date"
                            className="w-full p-2 border rounded-md bg-white text-gray-600"
                          />
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Merek Dagang Usaha
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md bg-white text-gray-600"
                          />
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Metode Pembukan/Pencatatan
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md bg-white text-gray-600"
                          />
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Mata Uang Pembukuan
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md bg-white text-gray-600"
                          />
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Periode Pembukuan
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md bg-white text-gray-600"
                          />
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Tempat Kerja
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md bg-white text-gray-600"
                          />
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Peredaran Bruto/Penerimaan Bruto
                          </label>
                          <select className="w-full p-2 border rounded-md bg-white text-gray-600">
                            <option value="Rp.0 s/d Rp.4,8 M">
                              Rp.0 s/d Rp.4.8 M
                            </option>
                            <option value="lebih dari Rp.4,8 M">
                              Lebih Dari Rp.4.8 M
                            </option>
                          </select>
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Deskripsi Kegiatan
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md bg-white text-gray-600"
                          />
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Tanggal Mulai
                          </label>
                          <input
                            type="date"
                            className="w-full p-2 border rounded-md bg-white text-gray-600"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <AlertDialogFooter className="flex justify-end mt-6 space-x-2">
                    <AlertDialogCancel className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                      Batal
                    </AlertDialogCancel>
                    <AlertDialogAction className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950">
                      Simpan
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <div className=" w-[1050px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
              <table className="table-auto border border-gray-300 overflow-hidden">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-1 py-2">Aksi</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Sumber Penghasilan
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Penghasilan Perbulan
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Jumlah Karyawan
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Omset Per Tahun
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Tanggal Mulai
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="bg-gray-100">
                    <td className="px-1 py-4 border">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded">
                        Edit
                      </button>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded ml-2">
                        Lihat
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-2 rounded ml-2">
                        Hapus
                      </button>
                    </td>
                    <td className="px-4 py-4 border">
                      Kontak utama Wajib Pajak
                    </td>
                    <td className="px-4 py-4 border">Rp. 300.000.000</td>
                    <td className="px-4 py-4 border"></td>
                    <td className="px-4 py-4 border">Lebih dari 4,8M </td>
                    <td className="px-4 py-4 border">2023-01-01</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div
          className="border bg-gray-100 rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center"
          onClick={() => setShowDetailKontak(!showDetailKontak)}
        >
          <h3 className="text-lg font-semibold">Detail Kontak</h3>
          {showDetailKontak ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {showDetailKontak && (
          <div className="border rounded-md p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <AlertDialog>
                <AlertDialogTrigger className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                  + Tambah Kontak
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white !min-w-[1000px] rounded-lg shadow-lg ">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold">
                      Tambahkan Kontak Wajib Pajak
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <div className="grid gap-4 overflow-auto h-96">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Jenis Kontak
                      </label>
                      <select
                        className="w-full p-2 border rounded-md bg-white mt-1"
                        name="jenis_kontak"
                        onChange={handleContactChange}
                      >
                        <option value="kontak-alternatif-wajib-pajak">
                          Kontak Alternatif Wajib Pajak
                        </option>
                        <option value="kontak-utama-wajib-pajak">
                          Kontak Utama Wajib Pajak
                        </option>
                        <option value="kontak-orang-alternatif">
                          Kontak Orang Alternatif
                        </option>
                        <option value="kontak-orang-utama">
                          Kontak Orang Utama
                        </option>
                        <option value="kontak-teknis-wajib-pajak">
                          Kontak Teknis Wajib Pajak
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nomor Telepon
                      </label>
                      <input
                        type="text"
                        name="nomor_telpon"
                        className="w-full p-2 border rounded-md bg-white mt-1"
                        placeholder="Masukkan nomor telepon"
                        onChange={handleContactChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        Nomor Handphone Baru
                      </label>
                      <input
                        type="text"
                        name="nomor_handphone"
                        className="w-full p-2 border rounded"
                        onChange={handleContactChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        Nomor Faksimile
                      </label>
                      <input
                        type="text"
                        name="nomor_faksimile"
                        className="w-full p-2 border rounded"
                        onChange={handleContactChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        Alamat Email
                      </label>
                      <input
                        type="text"
                        name="alamat_email"
                        className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                        onChange={handleContactChange}
                        // disabled
                      />
                      {/* Ngelink dari upload awal akun */}
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        Website
                      </label>
                      <input
                        type="text"
                        name="alamat_situs_wajib"
                        className="w-full p-2 border rounded"
                        onChange={handleContactChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        Keterangan
                      </label>
                      <textarea
                        name="keterangan"
                        className="w-full p-2 border rounded"
                        onChange={handleContactChange}
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        Tanggal Mulai
                      </label>
                      <input
                        type="date"
                        name="tanggal_mulai"
                        className="w-full p-2 border rounded"
                        onChange={handleContactChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        Tanggal Berakhir
                      </label>
                      <input
                        type="date"
                        name="tanggal_berakhir"
                        className="w-full p-2 border rounded"
                        onChange={handleContactChange}
                      />
                    </div>
                  </div>

                  <AlertDialogFooter className="flex justify-end mt-6 space-x-2">
                    <AlertDialogCancel className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                      Batal
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => createContact.mutate()}
                      // onClick={()=>console.log(contactFormData)}
                      className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
                    >
                      Simpan
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div className="w-[1050px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden">
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
                  {data.field_edit_informasi.detail_kontak.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="text-center p-4 border">
                        Belum ada kontak
                      </td>
                    </tr>
                  ) : (
                    data.field_edit_informasi.detail_kontak.map(
                      (contact, index) => (
                        <tr key={index} className="bg-gray-100">
                          <td className="px-4 py-4 border flex gap-2">
                            {/* <button>Edit</button> */}
                            <AlertDialog>
                              <AlertDialogTrigger
                                onClick={() => setContactFormData(contact)}
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                              >
                                Ubah Kontak
                              </AlertDialogTrigger>
                              <AlertDialogContent className="bg-white !min-w-[1000px] rounded-lg shadow-lg ">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-xl font-bold">
                                    Ubah Kontak Wajib Pajak
                                  </AlertDialogTitle>
                                </AlertDialogHeader>
                                <div className="grid gap-4 overflow-auto h-96">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                      Jenis Kontak
                                    </label>
                                    <select
                                      className="w-full p-2 border rounded-md bg-white mt-1"
                                      name="jenis_kontak"
                                      value={contactFormData.jenis_kontak || ""}
                                      onChange={handleContactChange}
                                    >
                                      <option value="kontak-alternatif-wajib-pajak">
                                        Kontak Alternatif Wajib Pajak
                                      </option>
                                      <option value="kontak-utama-wajib-pajak">
                                        Kontak Utama Wajib Pajak
                                      </option>
                                      <option value="kontak-orang-alternatif">
                                        Kontak Orang Alternatif
                                      </option>
                                      <option value="kontak-orang-utama">
                                        Kontak Orang Utama
                                      </option>
                                      <option value="kontak-teknis-wajib-pajak">
                                        Kontak Teknis Wajib Pajak
                                      </option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                      Nomor Telepon
                                    </label>
                                    <input
                                      type="text"
                                      name="nomor_telpon"
                                      className="w-full p-2 border rounded-md bg-white mt-1"
                                      placeholder="Masukkan nomor telepon"
                                      value={contactFormData.nomor_telpon || ""}
                                      onChange={handleContactChange}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium">
                                      Nomor Handphone Baru
                                    </label>
                                    <input
                                      type="text"
                                      name="nomor_handphone"
                                      className="w-full p-2 border rounded"
                                      value={
                                        contactFormData.nomor_handphone || ""
                                      }
                                      onChange={handleContactChange}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium">
                                      Nomor Faksimile
                                    </label>
                                    <input
                                      type="text"
                                      name="nomor_faksimile"
                                      className="w-full p-2 border rounded"
                                      value={
                                        contactFormData.nomor_faksimile || ""
                                      }
                                      onChange={handleContactChange}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium">
                                      Alamat Email
                                    </label>
                                    <input
                                      type="text"
                                      name="alamat_email"
                                      className="w-full p-2 border rounded bg-gray-100"
                                      value={contactFormData.alamat_email || ""}
                                      onChange={handleContactChange}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium">
                                      Website
                                    </label>
                                    <input
                                      type="text"
                                      name="alamat_situs_wajib"
                                      className="w-full p-2 border rounded"
                                      value={
                                        contactFormData.alamat_situs_wajib || ""
                                      }
                                      onChange={handleContactChange}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium">
                                      Keterangan
                                    </label>
                                    <textarea
                                      name="keterangan"
                                      className="w-full p-2 border rounded"
                                      value={contactFormData.keterangan || ""}
                                      onChange={handleContactChange}
                                    ></textarea>
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium">
                                      Tanggal Mulai
                                    </label>
                                    <input
                                      type="date"
                                      name="tanggal_mulai"
                                      className="w-full p-2 border rounded"
                                      value={
                                        contactFormData.tanggal_mulai || ""
                                      }
                                      onChange={handleContactChange}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium">
                                      Tanggal Berakhir
                                    </label>
                                    <input
                                      type="date"
                                      name="tanggal_berakhir"
                                      className="w-full p-2 border rounded"
                                      value={
                                        contactFormData.tanggal_berakhir || ""
                                      }
                                      onChange={handleContactChange}
                                    />
                                  </div>
                                </div>

                                <AlertDialogFooter className="flex justify-end mt-6 space-x-2">
                                  <AlertDialogCancel className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                                    Batal
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      updateContact.mutate(contact.id)
                                    }
                                    // onClick={()=>console.log(contactFormData)}
                                    className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
                                  >
                                    Simpan
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                            <button
                              className="action-button delete"
                              onClick={() => {
                                Swal.fire({
                                  title: "Hapus Kontak?",
                                  text: "Kontak akan dihapus secara permanen!",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonText: "Ya, hapus!",
                                  cancelButtonText: "Batal",
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    deleteContact.mutate(contact.id);
                                  }
                                });
                              }}
                            >
                              {deleteContact.status == "pending" ? (
                                <p>Loading...</p>
                              ) : (
                                <>Delete</>
                              )}
                            </button>
                          </td>
                          <td className="px-2 py-4 border">
                            {contact.jenis_kontak}
                          </td>
                          <td className="px-4 py-4 border">
                            {contact.nomor_telpon}
                          </td>
                          <td className="px-4 py-4 border">
                            {contact.nomor_handphone}
                          </td>
                          <td className="px-4 py-4 border">
                            {contact.nomor_faksimile}
                          </td>
                          <td className="px-4 py-4 border">
                            {contact.alamat_email}
                          </td>
                          <td className="px-4 py-4 border">
                            {contact.alamat_situs_wajib}
                          </td>
                          <td className="px-4 py-4 border">
                            {contact.keterangan}
                          </td>
                          <td className="px-4 py-4 border">
                            {contact.tanggal_mulai}
                          </td>
                          <td className="px-4 py-4 border">
                            {contact.tanggal_berakhir}
                          </td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div
          className="border rounded-md p-4 bg-gray-100 mb-2 cursor-pointer flex justify-between items-center"
          onClick={() => setShowPihakTerkait(!showPihakTerkait)}
        >
          <h3 className="text-lg font-semibold">Pihak Terkait</h3>
          {showPihakTerkait ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showPihakTerkait && (
          <div className="border rounded-md p-4 mb-4 ">
            <div className="flex justify-between items-center mb-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded"
                onClick={openModal}
              >
                + Tambah
              </button>
            </div>
            <div className=" w-[1050px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
              <table className="table-auto border border-gray-300 overflow-hidden">
                <thead className="bg-gray-200 w-[100px]">
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
                  <tr className="bg-gray-100">
                    <td colSpan="10" className="text-center p-4 border">
                      Belum ada data
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white w-[80%] rounded-lg shadow-lg">
                  <div className="flex justify-between items-center border-b p-4">
                    <h2 className="text-lg font-bold">
                      Pilih jenis Pihak Terkait yang akan ditambahkan.
                    </h2>
                    <button
                      onClick={closeModal}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <FaTimes size={20} />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="grid gap-4 overflow-auto h-96">
                      <div className="h-full ">
                        <label className="block text-sm font-medium">
                          Jenis Pihak Terkait
                        </label>
                        <select
                          className="w-full p-2 border rounded-md bg-white"
                          value={selectedType}
                          onChange={(e) => setSelectedType(e.target.value)}
                        >
                          <option value="">-- Pilih Jenis Pihak --</option>
                          <option value="related-person">Related Person</option>
                          <option value="related-taxpayer">
                            Related Taxpayer
                          </option>
                        </select>
                      </div>
                      <div className="h-full mt-0">
                        {selectedType === "related-person" && (
                          <>
                            <div className="grid grid-cols-4 gap-4 ">
                              <div className="">
                                <label className="block text-sm font-medium ">
                                  Apakah PIC?
                                </label>
                                <input
                                  type="checkbox"
                                  className="justify-start p-3 border rounded"
                                  checked
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium">
                                  Jenis Orang Terkait
                                </label>
                                <select
                                  className="w-full p-2 border rounded"
                                  value={selectedRelatedPersonType}
                                  onChange={(e) =>
                                    setSelectedRelatedPersonType(e.target.value)
                                  }
                                >
                                  <option value="">
                                    --Pilih jenis orang terkait--
                                  </option>
                                  <option value="wakilwbt">Wakil WBT</option>
                                  <option value="lainnya">Lainnya</option>
                                </select>
                              </div>
                              {selectedRelatedPersonType === "lainnya" && (
                                <div>
                                  <label className="block text-sm font-medium">
                                    Keterangan
                                  </label>
                                  <input
                                    type="text"
                                    className="w-full p-2 border rounded"
                                  />
                                </div>
                              )}
                              {selectedRelatedPersonType === "wakilwbt" && (
                                <div>
                                  <label className="block text-sm font-medium">
                                    Keterangan
                                  </label>
                                  <input
                                    type="text"
                                    className="w-full p-2 border rounded"
                                  />
                                </div>
                              )}
                              <div className="mt-2"></div>
                              <div className="mt-2">
                                <label className="block text-sm font-medium">
                                  NIK
                                </label>
                                <select className="w-full p-2 border rounded">
                                  <option value="nik-1">1234567890</option>
                                  <option value="nik-2">0987654321</option>
                                  <option value="nik-3">1234567890</option>
                                </select>
                                {/* Ngelink dari akun */}
                              </div>
                              <div className="mt-2">
                                <label className="block text-sm font-medium">
                                  Nama
                                </label>
                                <input
                                  type="text"
                                  className="w-full p-2 border rounded cursor-not-allowed bg-gray-200"
                                  disabled
                                />
                                {/* Ngelink dari NIK */}
                              </div>
                              <div className="mt-2">
                                <label className="block text-sm font-medium">
                                  Kewarganegaraan
                                </label>
                                <input
                                  type="text"
                                  className="w-full p-2 border rounded cursor-not-allowed bg-gray-200"
                                  value="Indonesia"
                                  readOnly
                                  disabled
                                />
                              </div>
                              <div className="mt-2">
                                <label className="block text-sm font-medium">
                                  Negara Asal
                                </label>
                                <input
                                  type="text"
                                  className="w-full p-2 border rounded cursor-not-allowed bg-gray-200"
                                  value="Indonesia"
                                  readOnly
                                  disabled
                                />
                              </div>
                              <div className="mt-2">
                                <label className="block text-sm font-medium">
                                  Email
                                </label>
                                <input
                                  type="email"
                                  className="w-full p-2 border rounded"
                                />
                              </div>
                              <div className="mt-2">
                                <label className="block text-sm font-medium">
                                  Nomor Telepon
                                </label>
                                <input
                                  type="text"
                                  className="w-full p-2 border rounded"
                                />
                              </div>
                              <div className="mt-2">
                                <label className="block text-sm font-medium">
                                  Tanggal Mulai
                                </label>
                                <input
                                  type="date"
                                  className="w-full p-2 border rounded"
                                />
                              </div>
                              <div className="mt-2">
                                <label className="block text-sm font-medium">
                                  Tanggal Berakhir
                                </label>
                                <input
                                  type="date"
                                  className="w-full p-2 border rounded"
                                />
                              </div>
                            </div>
                            <div className="flex justify-end p-4 border-t">
                              <button
                                onClick={closeModal}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                              >
                                Batal
                              </button>
                              <button className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-950">
                                Simpan
                              </button>
                            </div>
                          </>
                        )}

                        {selectedType === "related-taxpayer" && (
                          <>
                            <div className="grid grid-cols-3 gap-4 ">
                              <div>
                                <label className="block text-sm font-medium">
                                  NIK/NPWP
                                </label>
                                <input
                                  type="text"
                                  className="w-full p-2 border rounded cursor-not-allowed bg-gray-100"
                                  disabled
                                  placeholder="hanya view gan"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium">
                                  Nama
                                </label>
                                <input
                                  type="text"
                                  className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                                  disabled
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium">
                                  Pilih Jenis Wajib Pajak
                                </label>
                                <select
                                  className="w-full p-2 border rounded"
                                  onlyRead
                                >
                                  <option value="grup-perusahaan">
                                    Grup Perusahaan
                                  </option>
                                  <option value="lainnnya">Lainnya</option>
                                  <option value="pemilik-manfaat">
                                    Pemilik Manfaat
                                  </option>
                                  <option value="penanggung-pajak">
                                    Penanggung Pajak
                                  </option>
                                </select>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex justify-end p-4 border-t">
                                                                                                    <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2">
                                                                                                              Batal
                                                                                                    </button>
                                                                                                    <button className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-950">
                                                                                                              Simpan
                                                                                                    </button>
                                                                                          </div> */}
                </div>
              </div>
            )}
          </div>
        )}
        <div
          className="border rounded-md p-4 mb-2 bg-gray-100 cursor-pointer flex justify-between items-center"
          onClick={() => setShowAlamatWajibPajak(!showAlamatWajibPajak)}
        >
          <h3 className="text-lg font-semibold">Alamat Wajib Pajak</h3>
          {showAlamatWajibPajak ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showAlamatWajibPajak && (
          <div className="border rounded-md p-4 mb-4">
            <div className="spcae-y-2 h-full">
              <h1 className="text-lg font-semibold">Alamat Utama</h1>
              <p className="mt-2">
                Detail Alamat Utama : {data.alamat_utama_akun}
              </p>
            </div>
          </div>
        )}
        <div
          className="border rounded-md p-4 mb-2 bg-gray-100 cursor-pointer flex justify-between items-center"
          onClick={() => setShowTempatKegiatanUsaha(!showTempatKegiatanUsaha)}
        >
          <h3 className="text-lg font-semibold">
            Tempat Kegiatan Usaha/Sub Unit
          </h3>
          {showTempatKegiatanUsaha ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showTempatKegiatanUsaha && (
          <div className="border rounded-md p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <AlertDialog>
                <AlertDialogTrigger className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                  + Tambah
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white !min-w-[1000px] rounded-lg shadow-lg ">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold">
                      Tambahkan Tempat Kegiatan Baru
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <div className="grid gap-4 overflow-auto h-96">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        NITKU
                      </label>
                      <input
                        type="text"
                        name="nitku"
                        value={tkuFormData.nitku}
                        onChange={handleTkuChange}
                        className="w-full p-2 border rounded-md bg-white mt-1"
                        placeholder="Masukkan NITKU"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Jenis TKU *
                      </label>
                      <input
                        type="text"
                        name="jenis_tku"
                        value={tkuFormData.jenis_tku}
                        onChange={handleTkuChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nama TKU
                      </label>
                      <input
                        type="text"
                        name="nama_tku"
                        value={tkuFormData.nama_tku}
                        onChange={handleTkuChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Jenis Usaha
                      </label>
                      <input
                        type="text"
                        name="jenis_usaha"
                        value={tkuFormData.jenis_usaha}
                        onChange={handleTkuChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>

                  <AlertDialogFooter className="flex justify-end mt-6 space-x-2">
                    <AlertDialogCancel className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                      Batal
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => createTku.mutate()}
                      className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
                    >
                      Simpan
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <div className=" w-[1050px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
              <table className="table-auto border border-gray-300 overflow-hidden">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-1 py-2">Aksi</th>
                    <th className="border border-gray-300 px-4 py-2">NITKU</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Jenis TKU
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Nama TKU
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      KLU TKU
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  {data.field_edit_informasi.tempat_kegiatan_usaha.map(
                    (tku) => (
                      <tr className="bg-gray-100">
                        <td className="px-1 py-4 border">
                          <AlertDialog>
                            <AlertDialogTrigger
                              onClick={() => setTkuFormData(tku)}
                              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                            >
                              Edit
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-white !min-w-[1000px] rounded-lg shadow-lg ">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-xl font-bold">
                                  Tambahkan Tempat Kegiatan Baru
                                </AlertDialogTitle>
                              </AlertDialogHeader>
                              <div className="grid gap-4 overflow-auto h-96">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">
                                    NITKU
                                  </label>
                                  <input
                                    type="text"
                                    name="nitku"
                                    value={tkuFormData.nitku}
                                    onChange={handleTkuChange}
                                    className="w-full p-2 border rounded-md bg-white mt-1"
                                    placeholder="Masukkan NITKU"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">
                                    Jenis TKU *
                                  </label>
                                  <input
                                    type="text"
                                    name="jenis_tku"
                                    value={tkuFormData.jenis_tku}
                                    onChange={handleTkuChange}
                                    className="w-full p-2 border rounded"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">
                                    Nama TKU
                                  </label>
                                  <input
                                    type="text"
                                    name="nama_tku"
                                    value={tkuFormData.nama_tku}
                                    onChange={handleTkuChange}
                                    className="w-full p-2 border rounded"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">
                                    Jenis Usaha
                                  </label>
                                  <input
                                    type="text"
                                    name="jenis_usaha"
                                    value={tkuFormData.jenis_usaha}
                                    onChange={handleTkuChange}
                                    className="w-full p-2 border rounded"
                                  />
                                </div>
                              </div>

                              <AlertDialogFooter className="flex justify-end mt-6 space-x-2">
                                <AlertDialogCancel className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                                  Batal
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => updateTku.mutate(tku.id)}
                                  className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
                                >
                                  Simpan
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded ml-2">
                            Lihat
                          </button>
                          <button
                            onClick={() => deleteTku.mutate(tku.id)}
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-2 rounded ml-2"
                          >
                            Hapus
                          </button>
                        </td>
                        <td className="px-4 py-4 border">{tku.nitku}</td>
                        <td className="px-4 py-4 border">{tku.jenis_tku}</td>
                        <td className="px-4 py-4 border">{tku.nama_tku} </td>
                        <td className="px-4 py-4 border">{tku.nama_tku} </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div
          className="border rounded-md p-4 mb-2 cursor-pointer bg-gray-100 flex justify-between items-center"
          onClick={() => setShowDetailBank(!showDetailBank)}
        >
          <h3 className="text-lg font-semibold">Detail Bank</h3>
          {showDetailBank ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showDetailBank && (
          <div className="border rounded-md p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <AlertDialog>
                <AlertDialogTrigger className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                  + Tambah
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white !min-w-[1000px] rounded-lg shadow-lg ">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold">
                      Tambahkan Tempat Kegiatan Baru
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <div className="grid gap-4 overflow-auto h-96">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Bank *
                      </label>
                      <select
                        className="w-full p-2 border rounded"
                        name="nama_bank"
                        value={bankFormData.nama_bank}
                        onChange={handleBankChange}
                      >
                        <option value="">Pilih Bank</option>
                        <option value="PT BANK MANDIRI (PERSERO) Tbk">
                          PT BANK MANDIRI (PERSERO) Tbk
                        </option>
                        <option value="PT BANK CENTRAL ASIA Tbk">
                          PT BANK CENTRAL ASIA Tbk
                        </option>
                        <option value="PT BANK RAKYAT INDONESIA (PERSERO) Tbk">
                          PT BANK RAKYAT INDONESIA (PERSERO) Tbk
                        </option>
                        <option value="PT BANK NEGARA INDONESIA (PERSERO) Tbk">
                          PT BANK NEGARA INDONESIA (PERSERO) Tbk
                        </option>
                        <option value="PT BANK BUKOPIN Tbk">
                          PT BANK BUKOPIN Tbk
                        </option>
                        <option value="PT BANK BTPN Tbk">
                          PT BANK BTPN Tbk
                        </option>
                        <option value="PT BANK CIMB NIAGA Tbk">
                          PT BANK CIMB NIAGA Tbk
                        </option>
                        <option value="PT BANK DANAMON Tbk">
                          PT BANK DANAMON Tbk
                        </option>
                        <option value="PT BANK MAYBANK Tbk">
                          PT BANK MAYBANK Tbk
                        </option>
                        <option value="PT BANK MEGA Tbk">
                          PT BANK MEGA Tbk
                        </option>
                        <option value="PT BANK PERMATA Tbk">
                          PT BANK PERMATA Tbk
                        </option>
                        <option value="PT BANK PANIN Tbk">
                          PT BANK PANIN Tbk
                        </option>
                        <option value="PT BANK PANIN SYARIAH Tbk">
                          PT BANK PANIN SYARIAH Tbk
                        </option>
                        <option value="PT BANK MAYBANK SYARIAH Tbk">
                          PT BANK MAYBANK SYARIAH Tbk
                        </option>
                        <option value="PT BANK SYARIAH INDONESIA Tbk">
                          PT BANK SYARIAH INDONESIA Tbk
                        </option>
                        <option value="PT BANK SYARIAH INDONESIA SYARIAH Tbk">
                          PT BANK SYARIAH INDONESIA SYARIAH Tbk
                        </option>
                        <option value="PT BANK CENTRAL ASIA SYARIAH Tbk">
                          PT BANK CENTRAL ASIA SYARIAH Tbk
                        </option>
                        <option value="PT BANK RAKYAT INDONESIA SYARIAH Tbk">
                          PT BANK RAKYAT INDONESIA SYARIAH Tbk
                        </option>
                        <option value="PT BANK NEGARA INDONESIA SYARIAH Tbk">
                          PT BANK NEGARA INDONESIA SYARIAH Tbk
                        </option>
                        <option value="PT BANK BUKOPIN SYARIAH Tbk">
                          PT BANK BUKOPIN SYARIAH Tbk
                        </option>
                        <option value="PT BANK BTPN SYARIAH Tbk">
                          PT BANK BTPN SYARIAH Tbk
                        </option>
                        <option value="PT BANK CIMB NIAGA SYARIAH Tbk">
                          PT BANK CIMB NIAGA SYARIAH Tbk
                        </option>
                        <option value="PT BANK DANAMON SYARIAH Tbk">
                          PT BANK DANAMON SYARIAH Tbk
                        </option>
                        <option value="PT BANK MAYBANK SYARIAH Tbk">
                          PT BANK MAYBANK SYARIAH Tbk
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nomor Rekening
                      </label>
                      <input
                        type="text"
                        name="nomor_rekening_bank"
                        value={bankFormData.nomor_rekening_bank}
                        onChange={handleBankChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Jenis Rekening Bank
                      </label>
                      <select
                        name="jenis_rekening_bank"
                        value={bankFormData.jenis_rekening_bank}
                        onChange={handleBankChange}
                        className="w-full p-2 border rounded"
                      >
                        <option value="akun-bisnis">Akun Bisnis</option>
                        <option value="akun-pribadi">Akun Pribadi</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nama Pemilik Bank
                      </label>
                      <textarea
                        name="nama_pemilik_bank"
                        value={bankFormData.nama_pemilik_bank}
                        onChange={handleBankChange}
                        className="w-full p-2 border rounded"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tanggal Mulai
                      </label>
                      <input
                        type="date"
                        name="tanggal_mulai"
                        value={bankFormData.tanggal_mulai}
                        onChange={handleBankChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tanggal Berakhir
                      </label>
                      <input
                        type="date"
                        name="tanggal_berakhir"
                        value={bankFormData.tanggal_berakhir}
                        onChange={handleBankChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                  <AlertDialogFooter className="flex justify-end mt-6 space-x-2">
                    <AlertDialogCancel className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                      Batal
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => createBankDetail.mutate()}
                      className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
                    >
                      Simpan
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <div className=" w-[1050px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
              <table className="table-auto border border-gray-300 overflow-hidden">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-1 py-2">Aksi</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Nama Bank
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Nomor Rekening
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Jenis Rekening Bank
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Tanggal Mulai
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Tanggal Berakhir
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  {data.field_edit_informasi.detail_bank.map((bank) => (
                    <tr className="bg-gray-100">
                      <td className="px-1 py-4 border">
                        <AlertDialog>
                          <AlertDialogTrigger
                            onClick={() => setBankFormData(bank)}
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                          >
                            Edit
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-white !min-w-[1000px] rounded-lg shadow-lg ">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-xl font-bold">
                                Tambahkan Tempat Kegiatan Baru
                              </AlertDialogTitle>
                            </AlertDialogHeader>
                            <div className="grid gap-4 overflow-auto h-96">
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Bank *
                                </label>
                                <select
                                  className="w-full p-2 border rounded"
                                  name="nama_bank"
                                  value={bankFormData.nama_bank}
                                  onChange={handleBankChange}
                                >
                                  <option value="">Pilih Bank</option>
                                  <option value="PT BANK MANDIRI (PERSERO) Tbk">
                                    PT BANK MANDIRI (PERSERO) Tbk
                                  </option>
                                  <option value="PT BANK CENTRAL ASIA Tbk">
                                    PT BANK CENTRAL ASIA Tbk
                                  </option>
                                  <option value="PT BANK RAKYAT INDONESIA (PERSERO) Tbk">
                                    PT BANK RAKYAT INDONESIA (PERSERO) Tbk
                                  </option>
                                  <option value="PT BANK NEGARA INDONESIA (PERSERO) Tbk">
                                    PT BANK NEGARA INDONESIA (PERSERO) Tbk
                                  </option>
                                  <option value="PT BANK BUKOPIN Tbk">
                                    PT BANK BUKOPIN Tbk
                                  </option>
                                  <option value="PT BANK BTPN Tbk">
                                    PT BANK BTPN Tbk
                                  </option>
                                  <option value="PT BANK CIMB NIAGA Tbk">
                                    PT BANK CIMB NIAGA Tbk
                                  </option>
                                  <option value="PT BANK DANAMON Tbk">
                                    PT BANK DANAMON Tbk
                                  </option>
                                  <option value="PT BANK MAYBANK Tbk">
                                    PT BANK MAYBANK Tbk
                                  </option>
                                  <option value="PT BANK MEGA Tbk">
                                    PT BANK MEGA Tbk
                                  </option>
                                  <option value="PT BANK PERMATA Tbk">
                                    PT BANK PERMATA Tbk
                                  </option>
                                  <option value="PT BANK PANIN Tbk">
                                    PT BANK PANIN Tbk
                                  </option>
                                  <option value="PT BANK PANIN SYARIAH Tbk">
                                    PT BANK PANIN SYARIAH Tbk
                                  </option>
                                  <option value="PT BANK MAYBANK SYARIAH Tbk">
                                    PT BANK MAYBANK SYARIAH Tbk
                                  </option>
                                  <option value="PT BANK SYARIAH INDONESIA Tbk">
                                    PT BANK SYARIAH INDONESIA Tbk
                                  </option>
                                  <option value="PT BANK SYARIAH INDONESIA SYARIAH Tbk">
                                    PT BANK SYARIAH INDONESIA SYARIAH Tbk
                                  </option>
                                  <option value="PT BANK CENTRAL ASIA SYARIAH Tbk">
                                    PT BANK CENTRAL ASIA SYARIAH Tbk
                                  </option>
                                  <option value="PT BANK RAKYAT INDONESIA SYARIAH Tbk">
                                    PT BANK RAKYAT INDONESIA SYARIAH Tbk
                                  </option>
                                  <option value="PT BANK NEGARA INDONESIA SYARIAH Tbk">
                                    PT BANK NEGARA INDONESIA SYARIAH Tbk
                                  </option>
                                  <option value="PT BANK BUKOPIN SYARIAH Tbk">
                                    PT BANK BUKOPIN SYARIAH Tbk
                                  </option>
                                  <option value="PT BANK BTPN SYARIAH Tbk">
                                    PT BANK BTPN SYARIAH Tbk
                                  </option>
                                  <option value="PT BANK CIMB NIAGA SYARIAH Tbk">
                                    PT BANK CIMB NIAGA SYARIAH Tbk
                                  </option>
                                  <option value="PT BANK DANAMON SYARIAH Tbk">
                                    PT BANK DANAMON SYARIAH Tbk
                                  </option>
                                  <option value="PT BANK MAYBANK SYARIAH Tbk">
                                    PT BANK MAYBANK SYARIAH Tbk
                                  </option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Nomor Rekening
                                </label>
                                <input
                                  type="text"
                                  name="nomor_rekening_bank"
                                  value={bankFormData.nomor_rekening_bank}
                                  onChange={handleBankChange}
                                  className="w-full p-2 border rounded"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Jenis Rekening Bank
                                </label>
                                <select
                                  name="jenis_rekening_bank"
                                  value={bankFormData.jenis_rekening_bank}
                                  onChange={handleBankChange}
                                  className="w-full p-2 border rounded"
                                >
                                  <option value="akun-bisnis">
                                    Akun Bisnis
                                  </option>
                                  <option value="akun-pribadi">
                                    Akun Pribadi
                                  </option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Nama Pemilik Bank
                                </label>
                                <textarea
                                  name="nama_pemilik_bank"
                                  value={bankFormData.nama_pemilik_bank}
                                  onChange={handleBankChange}
                                  className="w-full p-2 border rounded"
                                ></textarea>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Tanggal Mulai
                                </label>
                                <input
                                  type="date"
                                  name="tanggal_mulai"
                                  value={bankFormData.tanggal_mulai}
                                  onChange={handleBankChange}
                                  className="w-full p-2 border rounded"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Tanggal Berakhir
                                </label>
                                <input
                                  type="date"
                                  name="tanggal_berakhir"
                                  value={bankFormData.tanggal_berakhir}
                                  onChange={handleBankChange}
                                  className="w-full p-2 border rounded"
                                />
                              </div>
                            </div>
                            <AlertDialogFooter className="flex justify-end mt-6 space-x-2">
                              <AlertDialogCancel className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                                Batal
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => updateDetailBank.mutate(bank.id)}
                                className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
                              >
                                Simpan
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <button
                          onClick={() => deleteDetailBank.mutate(bank.id)}
                          className="bg-red-500 hover:bg-red-600 text-white py-2 px-2 rounded ml-2"
                        >
                          Hapus
                        </button>
                      </td>
                      <td className="px-4 py-4 border">{bank.nama_bank}</td>
                      <td className="px-4 py-4 border">
                        {bank.nomor_rekening_bank}
                      </td>
                      <td className="px-4 py-4 border">
                        {bank.jenis_rekening_bank}
                      </td>
                      <td className="px-4 py-4 border">{bank.tanggal_mulai}</td>
                      <td className="px-4 py-4 border">
                        {bank.tanggal_berakhir}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div
          className="border rounded-md p-4 mb-2 bg-gray-100 cursor-pointer flex justify-between items-center"
          onClick={() =>
            setShowNomorIdentifikasiEksternal(!showNomorIdentifikasiEksternal)
          }
        >
          <h3 className="text-lg font-semibold">
            Nomor Identifikasi Eksternal
          </h3>
          {showNomorIdentifikasiEksternal ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showNomorIdentifikasiEksternal && (
          <div className="border rounded-md p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <AlertDialog>
                <AlertDialogTrigger className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                  + Tambah
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white !min-w-[1000px] rounded-lg shadow-lg ">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold">
                      Tambah nomor identifikasi eksternal
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <div className="grid gap-4 overflow-auto h-96">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Jenis Nomor Identifikasi
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md bg-gray-100 mt-1 cursor-not-allowed"
                        disabled
                        placeholder="Auto NPWP"
                      />
                      {/*  */}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nomor Identifikasi *
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded bg-gray-100 mt-1 cursor-not-allowed"
                        disabled
                        placeholder="Auto NPWP"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tanggal Mulai
                      </label>
                      <input
                        type="date"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tanggal Berakhir
                      </label>
                      <input
                        type="date"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                  <AlertDialogFooter className="flex justify-end mt-6 space-x-2">
                    <AlertDialogCancel className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                      Batal
                    </AlertDialogCancel>
                    <AlertDialogAction className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950">
                      Simpan
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <div className=" w-[1050px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
              <table className="table-auto border border-gray-300 overflow-hidden">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-1 py-2">Aksi</th>
                    <th className="border border-gray-300 px-4 py-2">Tipe</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Nomor Identfikasi
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Tanggal Mulai
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Tanggal Berakhir
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="bg-gray-100">
                    <td className="px-1 py-4 border">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded">
                        Edit
                      </button>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded ml-2">
                        Lihat
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-2 rounded ml-2">
                        Hapus
                      </button>
                    </td>
                    <td className="px-4 py-4 border">NPWP 15 Digit</td>
                    <td className="px-4 py-4 border">98018308108202131</td>
                    <td className="px-4 py-4 border">09-03-2024</td>
                    <td className="px-4 py-4 border"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div
          className="border rounded-md p-4 mb-2 bg-gray-100 cursor-pointer flex justify-between items-center"
          onClick={() => setShowUnitPajakKeluarga(!showUnitPajakKeluarga)}
        >
          <h3 className="text-lg font-semibold">Unit Pajak Keluarga</h3>
          {showUnitPajakKeluarga ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showUnitPajakKeluarga && (
          <div className="border rounded-md p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <AlertDialog>
                <AlertDialogTrigger className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                  + Tambah
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white !min-w-[1000px] rounded-lg shadow-lg ">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold">
                      Tambah Data Unit Keluarga Baru
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <div className="grid gap-4 overflow-auto h-96">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        NIK Anggota Keluarga
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md mt-1"
                      />
                      {/*  */}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Jenis Kelamin
                      </label>
                      <select className="w-full p-2 border rounded">
                        <option value="Pria">Pria</option>
                        <option value="Wanita">Wanita</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tempat Lahir
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nomor Kartu Keluarga
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nama Anggota Keluarga
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tanggal Lahir
                      </label>
                      <input
                        type="date"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Status Hubungan
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Pekerjaan
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Status Unit Perpajakan
                      </label>
                      <select className="w-full p-2 border rounded">
                        <option value="tanggungan">Tanggungan</option>
                        <option value="kepala unit kepala keluarga lain HB">
                          Kepala Unit Keluarga Lain (HB)
                        </option>
                        <option value="kepala unit kepala keluarga lain OP">
                          Kepala Unit Keluarga Lain (OP)
                        </option>
                        <option value="kepala unit keluarga">
                          Kepala Unit Keluarga
                        </option>
                        <option value="kepala unit keluarga lain MT">
                          Kepala Unit Kepala Lain (MT)
                        </option>
                        <option value="bukan tanggungan">
                          Bukan Tanggungan
                        </option>
                        <option value="kepala unit keluarga lain PH">
                          Kepala Unit Keluarga Lain (PH)
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Status PTKP
                      </label>
                      <select className="w-full p-2 border rounded">
                        <option value="K/0">K/0</option>
                        <option value="K/1">K/1</option>
                        <option value="K/2">K/2</option>
                        <option value="K/3">K/3</option>
                        <option value="TK/0">TK/0</option>
                        <option value="TK/1">TK/1</option>
                        <option value="TK/2">TK/2</option>
                        <option value="TK/3">TK/3</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tanggal Mulai
                      </label>
                      <input
                        type="date"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tanggal Selesai
                      </label>
                      <input
                        type="date"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                  <AlertDialogFooter className="flex justify-end mt-6 space-x-2">
                    <AlertDialogCancel className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                      Batal
                    </AlertDialogCancel>
                    <AlertDialogAction className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950">
                      Simpan
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <div className=" w-[1050px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
              <table className="table-auto border border-gray-300 overflow-hidden">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-1 py-2">Aksi</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Anggota Keluarga sesuai NIK
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Nomor Kartu Keluarga
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Nama Anggota Keluarga
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Tanggal Lahir
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Status Hubungan Keluarga
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Pekerjaan
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Status Unit Perpajakan
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Status PTKP
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Tanggal Mulai
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Tanggal Selesai
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="bg-gray-100">
                    <td className="px-1 py-4 border"></td>
                    {/* <td className="px-1 py-4 border">
                                            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded">Edit</button>
                                            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded ml-2">Lihat</button>
                                            <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-2 rounded ml-2">Hapus</button>
                                        </td>
                                        <td className="px-4 py-4 border">NPWP 15 Digit</td>
                                        <td className="px-4 py-4 border">98018308108202131</td>
                                        <td className="px-4 py-4 border">09-03-2024</td>
                                        <td className="px-4 py-4 border"></td> */}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditDataProfil;
