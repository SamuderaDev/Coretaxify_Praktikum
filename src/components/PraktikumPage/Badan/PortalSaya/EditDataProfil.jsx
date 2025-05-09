import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaFilter,
  FaSearch,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import SidebarProfilSayaBadan from "./SidebarProfilSaya";
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
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCsrf } from "@/service/getCsrf";
import { getCookieToken } from "@/service";
import { RoutesApi } from "@/Routes";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";

const EditDataProfilBadan = ({ data, sidebar }) => {
  const [cookies] = useCookies(["token"]);
  const token = getCookieToken();
  // const { toast } = useToast();
  console.log(data);

  const { id, akun } = useParams();
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
  const [contacts, setContacts] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isKaryawan, setIsKaryawan] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedRelatedPersonType, setSelectedRelatedPersonType] =
    useState("");

  const [informasiUmumData, setInformasiUmumData] = useState({
    npwp: data.field_edit_informasi.informasi_umum.npwp,
    jenis_wajib_pajak:
      data.field_edit_informasi.informasi_umum.jenis_wajib_pajak,
    nama: data.field_edit_informasi.informasi_umum.nama,
    kategori_wajib_pajak:
      data?.field_edit_informasi?.informasi_umum?.kategori_wajib_pajak ||
      "Perseroan Terbatas (PT)",
    negara_asal:
      data?.field_edit_informasi?.informasi_umum?.negara_asal || "Indonesia",
    nomor_keputusan_pengesahan:
      data?.field_edit_informasi?.informasi_umum?.nomor_keputusan_pengesahan ||
      "",
    tanggal_keputusan_pengesahan:
      data?.field_edit_informasi?.informasi_umum
        ?.tanggal_keputusan_pengesahan || "",
    nomor_keputusan_pengesahan_perubahan:
      data?.field_edit_informasi?.informasi_umum
        ?.nomor_keputusan_pengesahan_perubahan || "",
    tanggal_surat_keputusasan_pengesahan_perubahan:
      data?.field_edit_informasi?.informasi_umum
        ?.tanggal_surat_keputusasan_pengesahan_perubahan || "",
    nomor_akta_pendirian:
      data?.field_edit_informasi?.informasi_umum?.nomor_akta_pendirian || "",
    tempat_pendirian:
      data?.field_edit_informasi?.informasi_umum?.tempat_pendirian || "",
    tanggal_pendirian:
      data?.field_edit_informasi?.informasi_umum?.tanggal_pendirian || "",
    nik_notaris: data?.field_edit_informasi?.informasi_umum?.nik_notaris || "",
    nama_notaris:
      data?.field_edit_informasi?.informasi_umum?.nama_notaris || "",
    fasilitas_pmdn:
      data?.field_edit_informasi?.informasi_umum?.fasilitas_pmdn ||
      "Swasta Nasional",
    modal_dasar: data?.field_edit_informasi?.informasi_umum?.modal_dasar || "",
    modal_ditempatkan:
      data?.field_edit_informasi?.informasi_umum?.modal_ditempatkan || "",
    modal_disetor:
      data?.field_edit_informasi?.informasi_umum?.modal_disetor || "",
    kewarganegaraan:
      data?.field_edit_informasi?.informasi_umum?.kewarganegaraan || "WNI",
    bahasa:
      data?.field_edit_informasi?.informasi_umum?.bahasa || "Bahasa Indonesia",
  });

  const [dataEkonomiFormData, setDataEkonomiFormData] = useState({
    merek_dagang: data?.field_edit_informasi?.data_ekonomi?.merek_dagang || "",
    jumlah_karyawan:
      data?.field_edit_informasi?.data_ekonomi?.jumlah_karyawan || "",
    metode_pembukuan:
      data?.field_edit_informasi?.data_ekonomi?.metode_pembukuan || "",
    mata_uang_pembukuan:
      data?.field_edit_informasi?.data_ekonomi?.mata_uang_pembukuan || "",
    periode_pembukuan:
      data?.field_edit_informasi?.data_ekonomi?.periode_pembukuan || "",
    omset_per_tahun:
      data?.field_edit_informasi?.data_ekonomi?.omset_per_tahun || "",
    jumlah_peredaran_bruto:
      data?.field_edit_informasi?.data_ekonomi?.jumlah_peredaran_bruto || "",
  });
  const handleDataEkonomiChange = (e) => {
    const { name, value } = e.target;
    setDataEkonomiFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const updateDataEkonomi = useMutation({
    mutationFn: async () => {
      const csrf = await getCsrf();
      return axios.put(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${akun}/data-ekonomi/${akun}`,
        dataEkonomiFormData,
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
      Swal.fire("Berhasil!", "Data ekonomi berhasil disimpan!", "success").then(
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

  const handleInformasiUmumChange = (e) => {
    const { name, value } = e.target;
    setInformasiUmumData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const updateInformasiUmum = useMutation({
    mutationFn: async (data) => {
      const csrf = await getCsrf();
      return axios.put(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${akun}/informasi-umum/${akun}`,
        informasiUmumData,
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

  useEffect(() => {
    if (isModalOpen) {
      console.log("Updated formOrangTerkait:", formOrangTerkait);
    }
  }, [formOrangTerkait, isModalOpen]);

  if (isLoading) {
    return (
      <div className="loading">
        <ClipLoader color="#7502B5" size={50} />
      </div>
      // <div className="h-full w-full text-2xl italic font-bold text-center flex items-center justify-center">Loading...</div>
    );
  }
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarProfilSayaBadan
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
              className="h-5 w-5"
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
                  type="text"
                  name="npwp"
                  value={informasiUmumData.npwp}
                  className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                  readOnly
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Jenis Wajib Pajak
                </label>
                <input
                  name="jenis_wajib_pajak"
                  value={informasiUmumData.jenis_wajib_pajak}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                  readOnly
                />
                {/* <select
                  name="jenis_wajib_pajak"
                  value={informasiUmumData.jenis_wajib_pajak}
                  onChange={handleInformasiUmumChange}
                  
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                >
                  <option>Orang Pribadi</option>
                  <option>Badan</option>
                </select> */}
              </div>
              <div>
                <label className="block font-medium text-gray-700">Nama</label>
                <input
                  type="text"
                  name="nama"
                  value={informasiUmumData.nama}
                  className="w-full p-2 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                  readOnly
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Kategori Wajib Pajak
                </label>
                {/* <input
                  name="kategori_wajib_pajak"
                  value={informasiUmumData.kategori_wajib_pajak}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                  readOnly
                /> */}
                <input
                  name="kategori_wajib_pajak"
                  value={
                    informasiUmumData.kategori_wajib_pajak === "Badan"
                      ? "Perseorangan Terbatas (PT)"
                      : "Orang Pribadi"
                  }
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                  readOnly
                />
                {/* <select
                  name="kategori_wajib_pajak"
                  value={informasiUmumData.kategori_wajib_pajak}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                >
                  <option>Perseroan Terbatas (PT)</option>
                  <option>Perorangan</option>
                </select> */}
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Negara Asal
                </label>
                <select
                  name="negara_asal"
                  value={informasiUmumData.negara_asal}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                >
                  <option>Indonesia</option>
                  <option>Malaysia</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Nomor Keputusan Pengesahan
                </label>
                <input
                  type="text"
                  name="nomor_keputusan_pengesahan"
                  value={informasiUmumData.nomor_keputusan_pengesahan}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Tanggal Keputusan Pengesahan
                </label>
                <input
                  type="date"
                  name="tanggal_keputusan_pengesahan"
                  value={informasiUmumData.tanggal_keputusan_pengesahan}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Nomor Keputusan Pengesahan Perubahan
                </label>
                <input
                  type="text"
                  name="nomor_keputusan_pengesahan_perubahan"
                  value={informasiUmumData.nomor_keputusan_pengesahan_perubahan}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Tanggal Surat Keputusan Perubahan Pengesahan
                </label>
                <input
                  type="date"
                  name="tanggal_surat_keputusasan_pengesahan_perubahan"
                  value={
                    informasiUmumData.tanggal_surat_keputusasan_pengesahan_perubahan
                  }
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Nomor Akta Pendirian
                </label>
                <input
                  type="text"
                  name="nomor_akta_pendirian"
                  value={informasiUmumData.nomor_akta_pendirian}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Tempat Pendirian
                </label>
                <input
                  type="text"
                  name="tempat_pendirian"
                  value={informasiUmumData.tempat_pendirian}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Tanggal Pendirian
                </label>
                <input
                  type="date"
                  name="tanggal_pendirian"
                  value={informasiUmumData.tanggal_pendirian}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  NIK Notaris
                </label>
                <input
                  type="text"
                  name="nik_notaris"
                  value={informasiUmumData.nik_notaris}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Nama Notaris
                </label>
                <input
                  type="text"
                  name="nama_notaris"
                  value={informasiUmumData.nama_notaris}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Fasilitas PMDN
                </label>
                <select
                  name="fasilitas_pmdn"
                  value={informasiUmumData.fasilitas_pmdn}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                >
                  <option>Swasta Nasional</option>
                  <option>Fasilitas PMDN</option>
                  <option>BUMN</option>
                  <option>BUMD</option>
                  <option>Penanaman Modal Asing (PMA)</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Modal Dasar
                </label>
                <input
                  type="number"
                  name="modal_dasar"
                  value={informasiUmumData.modal_dasar}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Modal Ditempatkan
                </label>
                <input
                  type="number"
                  name="modal_ditempatkan"
                  value={informasiUmumData.modal_ditempatkan}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Modal Disetor
                </label>
                <input
                  type="number"
                  name="modal_disetor"
                  value={informasiUmumData.modal_disetor}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Kewarganegaraan
                </label>
                <select
                  name="kewarganegaraan"
                  value={informasiUmumData.kewarganegaraan}
                  onChange={handleInformasiUmumChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
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
                  value={informasiUmumData.bahasa_yang_dipilih}
                  className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed text-gray-600"
                  readOnly
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => updateInformasiUmum.mutate()}
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
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div>
                <label className="block font-medium text-gray-700">
                  Merk Dagang/Bisnis
                </label>
                <input
                  type="text"
                  name="merek_dagang"
                  value={dataEkonomiFormData.merek_dagang}
                  onChange={handleDataEkonomiChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Memiliki Karyawan?
                </label>
                <input
                  type="checkbox"
                  className="h-5 w-5"
                  checked={isKaryawan}
                  onChange={() => setIsKaryawan(!isKaryawan)}
                />
                {isKaryawan && (
                  <select
                    name="jumlah_karyawan"
                    value={dataEkonomiFormData.jumlah_karyawan}
                    onChange={handleDataEkonomiChange}
                    className="w-full p-2 border rounded-md bg-white text-gray-600 mt-2"
                  >
                    <option value="">Jumlah Karyawan</option>
                    <option value="dibawah 10">dibawah 10</option>
                    <option value="10 sd 100">10 sd 100</option>
                    <option value="101 sd 1000">101 sd 1000</option>
                    <option value="diatas 1000">diatas 1000</option>
                  </select>
                )}
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Metode Pembukuan/Pencatatan
                </label>
                <input
                  type="text"
                  name="metode_pembukuan"
                  value={dataEkonomiFormData.metode_pembukuan}
                  onChange={handleDataEkonomiChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Mata Uang Pembukuan
                </label>
                <input
                  type="text"
                  name="mata_uang_pembukuan"
                  value={dataEkonomiFormData.mata_uang_pembukuan}
                  onChange={handleDataEkonomiChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Periode Pembukuan
                </label>
                <input
                  type="text"
                  name="periode_pembukuan"
                  value={dataEkonomiFormData.periode_pembukuan}
                  onChange={handleDataEkonomiChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Omset Per Tahun
                </label>
                <input
                  type="text"
                  name="omset_per_tahun"
                  value={dataEkonomiFormData.omset_per_tahun}
                  onChange={handleDataEkonomiChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Jumlah Peredaran Bruto
                </label>
                <input
                  type="text"
                  name="jumlah_peredaran_bruto"
                  value={dataEkonomiFormData.jumlah_peredaran_bruto}
                  onChange={handleDataEkonomiChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-600"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => updateDataEkonomi.mutate()}
              >
                Simpan
              </button>
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
                                  title: "Hapus Kelas?",
                                  text: "Kelas akan dihapus secara permanen!",
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
                  {data.field_edit_informasi.pihak_terkait.length === 0 ? (
                    <tr className="bg-gray-100">
                      <td colSpan="10" className="text-center p-4 border">
                        Belum ada data
                      </td>
                    </tr>
                  ) : (
                    data.field_edit_informasi.pihak_terkait.map((pihak) => (
                      <tr className="bg-gray-100">
                        <td className="flex gap-2">
                          <button
                            className="action-button delete"
                            onClick={() => {
                              Swal.fire({
                                title: "Hapus Pihak Terkait?",
                                text: "Pihak terkait akan dihapus secara permanen!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonText: "Ya, hapus!",
                                cancelButtonText: "Batal",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  deleteOrangTerkait.mutate(pihak.id);
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
                        {/* <td>m</td> */}
                        <td className="text-center p-4 border">
                          {pihak.jenis_orang_terkait}
                        </td>
                        <td className="text-center p-4 border">{pihak.npwp}</td>
                        <td className="text-center p-4 border">{pihak.npwp}</td>
                        <td className="text-center p-4 border">{pihak.npwp}</td>
                        <td className="text-center p-4 border">
                          {pihak.nama_pengurus}
                        </td>
                        <td className="text-center p-4 border">
                          {pihak.nama_pengurus}
                        </td>
                        <td className="text-center p-4 border">
                          {pihak.keterangan}
                        </td>
                        <td className="text-center p-4 border">
                          {pihak.tanggal_mulai}
                        </td>
                        <td className="text-center p-4 border">
                          {pihak.tanggal_berakhir}
                        </td>
                      </tr>
                    ))
                  )}
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
                            <div className="grid grid-cols-4 gap-4">
                              <div>
                                <label className="block text-sm font-medium">
                                  Apakah PIC?
                                </label>
                                <input
                                  type="checkbox"
                                  name="is_pic"
                                  className="justify-start p-3 border rounded"
                                  // checked={isPIC}
                                  // onChange={handleCheckboxChange}
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium">
                                  Jenis Orang Terkait
                                </label>
                                <select
                                  name="jenis_orang_terkait"
                                  className="w-full p-2 border rounded"
                                  value={selectedRelatedPersonType}
                                  onChange={(e) =>
                                    setSelectedRelatedPersonType(e.target.value)
                                  }
                                >
                                  <option value="">
                                    --Pilih jenis orang terkait--
                                  </option>
                                  <option value="direktur">Direktur</option>
                                  <option value="komisaris">Komisaris</option>
                                  <option value="lainnya">Lainnya</option>
                                  <option value="wakil">Wakil</option>
                                </select>
                              </div>

                              {selectedRelatedPersonType === "direktur" && (
                                <div>
                                  <label className="block text-sm font-medium">
                                    Sub Jenis Orang Terkait
                                  </label>
                                  <select
                                    className="w-full p-2 border rounded"
                                    // value={handlePersonTypeChange}
                                    name="sub_orang_terkait"
                                    onChange={handlePersonTypeChange}
                                  >
                                    <option value="">
                                      -- Pilih Sub Jenis --
                                    </option>
                                    <option value="dewan-pengawas-syariah">
                                      Dewan Pengawas Syariah
                                    </option>
                                    <option value="direktur">Direktur</option>
                                    <option value="direktur-independen">
                                      Direktur Independen
                                    </option>
                                    <option value="direktur-utama">
                                      Direktur Utama
                                    </option>
                                    <option value="presiden-direktur">
                                      Presiden Direktur
                                    </option>
                                    <option value="wakil-direktur">
                                      Wakil Direktur
                                    </option>
                                    <option value="wakil-direktur-utama">
                                      Wakil Direktur Utama
                                    </option>
                                    <option value="wakil-presiden-direktur">
                                      Wakil Presiden Direktur
                                    </option>
                                  </select>
                                </div>
                              )}

                              {selectedRelatedPersonType === "komisaris" && (
                                <div>
                                  <label className="block text-sm font-medium">
                                    Sub Jenis Orang Terkait
                                  </label>
                                  <select
                                    className="w-full p-2 border rounded"
                                    name="sub_orang_terkait"
                                    onChange={handlePersonTypeChange}
                                  >
                                    <option value="">
                                      -- Pilih Sub Jenis --
                                    </option>
                                    <option value="komisaris">Komisaris</option>
                                    <option value="komisaris-independen">
                                      Komisaris Independen
                                    </option>
                                    <option value="komisaris-utama">
                                      Komisaris Utama
                                    </option>
                                    <option value="presiden-komisaris">
                                      Presiden Komisaris
                                    </option>
                                    <option value="presiden-komisaris-independen">
                                      Presiden Komisaris Independen
                                    </option>
                                    <option value="wakil-komisaris-utama">
                                      Wakil Komisaris Utama
                                    </option>
                                    <option value="wakil-presiden-komisaris">
                                      Wakil Presiden Komisaris
                                    </option>
                                  </select>
                                </div>
                              )}

                              {selectedRelatedPersonType === "wakil" && (
                                <div>
                                  <label className="block text-sm font-medium">
                                    Sub Jenis Orang Terkait
                                  </label>
                                  <select
                                    // name="sub_jenis_orang_terkait"
                                    value={formOrangTerkait.sub_orang_terkait}
                                    className="w-full p-2 border rounded"
                                    name="sub_orang_terkait"
                                    onChange={handlePersonTypeChange}
                                  >
                                    <option value="">
                                      -- Pilih Sub Jenis --
                                    </option>
                                    <option value="curator">Curator</option>
                                    <option value="karyawan">Karyawan</option>
                                    <option value="liquidator">
                                      Liquidator
                                    </option>
                                    <option value="pemilik-manfaat-lainnya">
                                      Pemilik Manfaat Lainnya
                                    </option>
                                  </select>
                                </div>
                              )}

                              {selectedRelatedPersonType === "lainnya" && (
                                <div>
                                  <label className="block text-sm font-medium">
                                    Keterangan
                                  </label>
                                  <input
                                    type="text"
                                    name="keterangan"
                                    className="w-full p-2 border rounded"
                                    value={formOrangTerkait.keterangan}
                                    // onChange={handleInputChange}
                                    onChange={handlePersonTypeChange}
                                  />
                                </div>
                              )}

                              <div className="mt-2"></div>

                              <div className="mt-2">
                                <label className="block text-sm font-medium">
                                  NIK
                                </label>
                                <select
                                  value={formOrangTerkait.akun_op}
                                  name="akun_op"
                                  className="w-full p-2 border rounded"
                                  // value={formData.nik_id}
                                  onChange={(e) => {
                                    const selectedId = e.target.value;
                                    const selectedOrang =
                                      orangTerkait.data.find(
                                        (orang) => orang.id == selectedId
                                      );

                                    // Update the entire form state with the selected person's data
                                    setFormOrangTerkait({
                                      ...formOrangTerkait,
                                      akun_op: selectedId,
                                      // Store the name in the form state instead of manipulating DOM directly
                                      nama_akun: selectedOrang
                                        ? selectedOrang.nama_akun
                                        : "",
                                      kewarganegaraan: selectedOrang
                                        ? selectedOrang.kewarganegaraan ||
                                          "Indonesia"
                                        : "Indonesia",
                                      negara_asal: selectedOrang
                                        ? selectedOrang.negara_asal ||
                                          "Indonesia"
                                        : "Indonesia",
                                    });
                                  }}
                                >
                                  <option value="">-- Pilih NIK --</option>
                                  {orangTerkait?.data?.map((orang) => (
                                    <option key={orang.id} value={orang.id}>
                                      {orang.npwp_akun}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="mt-2">
                                <label className="block text-sm font-medium">
                                  Nama
                                </label>
                                <input
                                  id="nama-orang-terkait"
                                  type="text"
                                  name="nama"
                                  value={formOrangTerkait.nama_akun}
                                  // value={formData.nama}
                                  className="w-full p-2 border rounded cursor-not-allowed bg-gray-200"
                                  disabled
                                />
                              </div>

                              <div className="mt-2">
                                <label className="block text-sm font-medium">
                                  Kewarganegaraan
                                </label>
                                <input
                                  type="text"
                                  name="kewarganegaraan"
                                  className="w-full p-2 border rounded cursor-not-allowed bg-gray-200"
                                  // value={formData.kewarganegaraan}
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
                                  name="negara_asal"
                                  className="w-full p-2 border rounded cursor-not-allowed bg-gray-200"
                                  // value={formData.negara_asal}
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
                                  id="alamat-email-terkait"
                                  name="email"
                                  // value={formData.email}
                                  // onChange={handleInputChange}
                                  className="w-full p-2 border rounded"
                                />
                              </div>

                              <div className="mt-2">
                                <label className="block text-sm font-medium">
                                  Nomor Telepon
                                </label>
                                <input
                                  type="text"
                                  name="nomor_telepon"
                                  // value={formData.nomor_telepon}
                                  // onChange={handleInputChange}
                                  className="w-full p-2 border rounded"
                                />
                              </div>

                              <div className="mt-2">
                                <label className="block text-sm font-medium">
                                  Tanggal Mulai
                                </label>
                                <input
                                  type="date"
                                  name="tanggal_mulai"
                                  value={formOrangTerkait.tanggal_mulai}
                                  onChange={handlePersonTypeChange}
                                  className="w-full p-2 border rounded"
                                />
                              </div>

                              <div className="mt-2">
                                <label className="block text-sm font-medium">
                                  Tanggal Berakhir
                                </label>
                                <input
                                  type="date"
                                  name="tanggal_berakhir"
                                  value={formOrangTerkait.tanggal_berakhir}
                                  onChange={handlePersonTypeChange}
                                  className="w-full p-2 border rounded"
                                />
                              </div>

                              <div className="col-span-4 flex justify-end mt-4">
                                <button
                                  type="button"
                                  // onClick={() => createRelatedPerson.mutate()}
                                  onClick={() => console.log(formOrangTerkait)}
                                  className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-950"
                                  // disabled={createRelatedPerson.isPending}
                                >
                                  {/* {createRelatedPerson.isPending
                                    ? "Menyimpan..."
                                    : "Simpan"} */}
                                </button>
                              </div>
                            </div>

                            <div className="flex justify-end p-4 border-t">
                              <button
                                onClick={closeModal}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                              >
                                Batal
                              </button>
                              <button
                                // onClick={() => console.log(formOrangTerkait)}
                                onClick={() => createPihakTerkait.mutate()}
                                className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-950"
                              >
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
                                  <option value="mandiri">
                                    PT BANK MANDIRI (PERSERO) Tbk
                                  </option>
                                  <option value="bca">
                                    PT BANK CENTRAL ASIA Tbk
                                  </option>
                                  <option value="bri">
                                    PT BANK RAKYAT INDONESIA (PERSERO) Tbk
                                  </option>
                                  <option value="bni">
                                    PT BANK NEGARA INDONESIA (PERSERO) Tbk
                                  </option>
                                  <option value="bukopin">
                                    PT BANK BUKOPIN Tbk
                                  </option>
                                  <option value="btpn">PT BANK BTPN Tbk</option>
                                  <option value="cimb">
                                    PT BANK CIMB NIAGA Tbk
                                  </option>
                                  <option value="danamon">
                                    PT BANK DANAMON Tbk
                                  </option>
                                  <option value="maybank">
                                    PT BANK MAYBANK Tbk
                                  </option>
                                  <option value="mega">PT BANK MEGA Tbk</option>
                                  <option value="permata">
                                    PT BANK PERMATA Tbk
                                  </option>
                                  <option value="panin">
                                    PT BANK PANIN Tbk
                                  </option>
                                  <option value="panin_syariah">
                                    PT BANK PANIN SYARIAH Tbk
                                  </option>
                                  <option value="maybank_syariah">
                                    PT BANK MAYBANK SYARIAH Tbk
                                  </option>
                                  <option value="bsi">
                                    PT BANK SYARIAH INDONESIA Tbk
                                  </option>
                                  <option value="bsi_syariah">
                                    PT BANK SYARIAH INDONESIA SYARIAH Tbk
                                  </option>
                                  <option value="bca_syariah">
                                    PT BANK CENTRAL ASIA SYARIAH Tbk
                                  </option>
                                  <option value="bri_syariah">
                                    PT BANK RAKYAT INDONESIA SYARIAH Tbk
                                  </option>
                                  <option value="bni_syariah">
                                    PT BANK NEGARA INDONESIA SYARIAH Tbk
                                  </option>
                                  <option value="bukopin_syariah">
                                    PT BANK BUKOPIN SYARIAH Tbk
                                  </option>
                                  <option value="btpn_syariah">
                                    PT BANK BTPN SYARIAH Tbk
                                  </option>
                                  <option value="cimb_syariah">
                                    PT BANK CIMB NIAGA SYARIAH Tbk
                                  </option>
                                  <option value="danamon_syariah">
                                    PT BANK DANAMON SYARIAH Tbk
                                  </option>
                                  <option value="maybank_syariah">
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
      </div>
    </div>
  );
};

export default EditDataProfilBadan;
