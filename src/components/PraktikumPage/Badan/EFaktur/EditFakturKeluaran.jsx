import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaCalendarAlt,
  FaFilter,
  FaSearch,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import SideBarEFaktur from "./SideBarEFaktur";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
// import { RoutesApi as RoutesApiReal } from "@/Routes";
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
// import { useMutation } from "@tanstack/react-query";
import { getCsrf } from "@/service/getCsrf";
import { useCookies } from "react-cookie";
import { RoutesApi as RoutesApiReal } from "@/Routes";
import { useParams } from "react-router";
import { ClipLoader } from "react-spinners";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const EditFakturKeluaran = ({ sidebar }) => {
  const [editMode, setEditMode] = useState(false);
  const [editingTransaksiId, setEditingTransaksiId] = useState(null);

  const [showDokumenTransaksi, setShowDokumenTransaksi] = useState(false);
  const [showInformasiPembeli, setShowInformasiPembeli] = useState(false);
  const [showDetailTransaksi, setShowDetailTransaksi] = useState(false);
  const [kode_transaksi, setKodeTransaksi] = useState("");
  const [harga_satuan, setHarga] = useState("");
  const [kuantitas, setKuantitas] = useState(0);
  const [total_harga, setTotalHarga] = useState("");
  const [pemotongan_harga, setPotonganHarga] = useState("");
  const [dpp, setDPP] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date());
  const [tahunString, setTahunString] = useState(
    new Date().getFullYear().toString()
  );
  const [informasi_tambahan, setInformasiTambahan] = useState("");
  const [tipe, setTipe] = useState("");
  const [selectedKode, setSelectedKode] = useState("");
  const [selectedSatuan, setSelectedSatuan] = useState("");
  const [listSatuan, setListSatuan] = useState([]);
  const [listKode, setListKode] = useState([]);
  const [cap_fasilitas, setCapFasilitas] = useState("");
  const [nomorPendukung, setNomorPendukung] = useState("");
  const [savedTransaksi, setSavedTransaksi] = useState("");

  const [isChecked, setIsChecked] = useState(false);
  const [jumlah, setJumlah] = useState(formatRupiah(dpp.toString()));
  const [ppn, setTarifPPN] = useState("Rp 0");
  const [tarif_ppnbm, setTarifPPnBM] = useState("");
  const [ppnbm, setPPnBM] = useState("Rp 0");
  const [isCustomPPnBM, setIsCustomPPnBM] = useState(false);

  const { id, akun, faktur } = useParams();
  const [cookies] = useCookies(["token"]);

  // alert(faktur);

  const RoutesApi = {
    kodeTransaksi: "http://127.0.0.1:8000/api/kode-transaksi",
    satuan: "http://127.0.0.1:8000/api/satuan",
  };

  const fetchKodeByJenis = async (jenis) => {
    try {
      // Fetch kode transaksi
      const kodeRes = await axios.get(RoutesApi.kodeTransaksi, {
        params: { jenis },
      });
      setListKode(kodeRes.data.data);

      // Fetch satuan
      const satuanRes = await axios.get(RoutesApi.satuan, {
        params: { jenis },
      });
      setListSatuan(satuanRes.data.data);
    } catch (err) {
      console.error("Gagal fetch data:", err);
    }
  };

  const {
    data: fakturData,
    isLoading: fakturLoading,
    isError: fakturError,
    error: fakturErrorDetails,
  } = useQuery({
    queryKey: ["faktur_detail", akun],
    queryFn: async () => {
      const { data } = await axios.get(
        `${RoutesApiReal.apiUrl}student/assignments/${id}/sistem/${akun}/faktur/${faktur}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            Accept: "application/json",
          },
          params: {
            // intent: "api.get.sistem.ikhtisar.profil",
          },
        }
      );
      return data.data;
    },
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["npwp_faktur"],
    queryFn: async () => {
      const data = await axios.get(
        // RoutesApiReal.apiUrl + `student/assignments/${id}/sistem/${akun}`,
        RoutesApiReal.apiUrl +
          `student/assignments/${id}/sistem/${akun}/getAkun`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          // params: {
          //   intent: "api.sistem.get.akun.orang.pibadi",
          // },
        }
      );
      console.log(data.data);
      return data.data;
    },
  });

  const handleTipeChange = (e) => {
    const value = e.target.value;
    setTipe(value);
    fetchKodeByJenis(value);
  };

  function formatRupiah(value) {
    const numberString = value.replace(/[^0-9]/g, ""); // Hanya angka
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(numberString || 0);
  }

  function formatPersen(value) {
    const numberString = value.replace(/[^0-9]/g, ""); // Hanya angka
    return numberString ? `${numberString}%` : "";
  }

  const handleHargaChange = (e) => {
    const rawValue = e.target.value;
    const numericHarga = parseInt(rawValue.replace(/\D/g, ""), 10) || 0;
    setHarga(rawValue);

    const newTotalHarga = numericHarga * kuantitas;
    setTotalHarga(newTotalHarga);
    const newDPP =
      newTotalHarga - (parseInt(pemotongan_harga.replace(/\D/g, ""), 10) || 0);
    setDPP(newDPP);
    if (!isChecked) {
      setJumlah(newDPP);
    }
  };

  const handleInformasiTambahanChange = (e) => {
    const selectedInfo = e.target.value;
    setInformasiTambahan(selectedInfo);
    setFormData((prev) => ({
      ...prev,
      informasi_tambahan: selectedInfo,
      cap_fasilitas:
        selectedInfo === "A"
          ? "X"
          : selectedInfo === "B"
          ? "Y"
          : selectedInfo === "C"
          ? "Z"
          : "",
      nomorPendukung: "", // reset ketika berubah
    }));
    // Atur nilai Cap Fasilitas secara otomatis
    if (selectedInfo === "A") {
      setCapFasilitas("X");
      setNomorPendukung(""); // Kosongkan nomor pendukung saat muncul
    } else if (selectedInfo === "B") {
      setCapFasilitas("Y");
      setNomorPendukung(""); // Kosongkan nomor pendukung saat muncul
    } else if (selectedInfo === "C") {
      setCapFasilitas("Z");
      setNomorPendukung(""); // Sembunyikan input jika bukan A atau B
    } else {
      setCapFasilitas("");
      setNomorPendukung(""); // Reset nomor pendukung
    }
  };

  const handleKuantitasChange = (e) => {
    // alert("Kinti")
    console.log("quantity!");
    const qty = parseInt(e.target.value, 10) || 0;
    setKuantitas(qty);

    // const numericHarga = parseInt(harga_satuan.replace(/\D/g, ""), 10) || 0;
    const numericHarga = harga_satuan;
    const newTotalHarga = numericHarga * qty;
    setTotalHarga(newTotalHarga);
    const newDPP =
      //   newTotalHarga - (parseInt(pemotongan_harga.replace(/\D/g, ""), 10) || 0);
      newTotalHarga - pemotongan_harga;
    setDPP(newDPP);
    if (!isChecked) {
      setJumlah(newDPP);
    }
  };

  const handlePotonganHargaChange = (e) => {
    const rawValue = e.target.value;
    // const numericPotongan = parseInt(rawValue.replace(/\D/g, ""), 10) || 0;
    const numericPotongan = rawValue;
    setPotonganHarga(rawValue);

    // const numericTotalHarga = parseInt(total_harga.replace(/\D/g, ""), 10) || 0;
    const numericTotalHarga = total_harga;
    const newDPP = numericTotalHarga - numericPotongan;
    setDPP(newDPP);
    if (!isChecked) {
      setJumlah(newDPP);
    }
  };
  const handleKodeTransaksiChange = (event) => {
    const value = event.target.value;
    setKodeTransaksi(value);

    setFormData((prev) => ({
      ...prev,
      kode_transaksi: value,
    }));
  };
  useEffect(() => {
    if (kode_transaksi === "01") {
      setIsChecked(false);
    }
  }, [kode_transaksi]);

  function updateTarifPPN(newJumlah) {
    // const numericJumlah = parseInt(newJumlah.replace(/\D/g, ""), 10) || 0;
    const numericJumlah = newJumlah;
    setTarifPPN(numericJumlah * 0.12); // PPN 12%

    // Hitung PPnBM jika PPnBM belum diedit manual
    if (!isCustomPPnBM) {
      const numericPPnBM = parseInt(tarif_ppnbm.replace(/\D/g, ""), 10) || 0;
      //   const numericPPnBM = tarif_ppnbm;
      setPPnBM((numericJumlah * numericPPnBM) / 100);
    }
  }
  const handleCheckboxChange = () => {
    if (kode_transaksi !== "01") {
      setIsChecked(!isChecked);
    }
  };

  const handleJumlahChange = (e) => {
    if (isChecked) {
      const numericJumlah =
        // parseInt(e.target.value.replace(/\D/g, ""), 10) || 0;
        e.target.value;
      const formattedJumlah = numericJumlah;
      setJumlah(formattedJumlah);
      updateTarifPPN(numericJumlah.toString());
    }
  };

  const handleTarifPPnBMChange = (e) => {
    const formattedTarif = formatPersen(e.target.value);
    setTarifPPnBM(formattedTarif);

    // Hitung ulang PPnBM jika PPnBM tidak diedit manual
    if (!isCustomPPnBM) {
      const numericJumlah = parseInt(jumlah.replace(/\D/g, ""), 10) || 0;
      const numericPPnBM = parseInt(formattedTarif.replace(/\D/g, ""), 10) || 0;
      setPPnBM((numericJumlah * numericPPnBM) / 100);
    }
  };

  const handlePPnBMChange = (e) => {
    setIsCustomPPnBM(true); // Tandai bahwa user mengedit manual
    setPPnBM(e.target.value);

    // Jika nilai PPnBM dikosongkan, hitung ulang berdasarkan tarif PPnBM
    if (e.target.value === 0 || e.target.value === 0) {
      setIsCustomPPnBM(false); // Reset custom edit jika dikosongkan
      const numericJumlah = jumlah;
      const numericPPnBM = tarif_ppnbm;
      setPPnBM((numericJumlah * numericPPnBM) / 100);
    }
  };

  const handleDppChange = (e) => {
    console.log(":3");
    const value = e.target.value;
    console.log(value);
    setDPP(value);
    if (!isChecked) {
      setJumlah(value); // Jika checkbox tidak dicentang, jumlah selalu mengikuti DPP
    }
  };

  useEffect(() => {
    const formattedDPP = dpp;
    setJumlah(formattedDPP);
    updateTarifPPN(dpp);
  }, [dpp]);

  const resetForm = () => {
    setHarga("Rp 0");
    setKuantitas(0);
    setTotalHarga("Rp 0");
    setPotonganHarga("Rp 0");
    setDPP("Rp 0");
    setJumlah("Rp 0");
    setTarifPPN("Rp 0");
    setTarifPPnBM("");
    setPPnBM("Rp 0");
    setIsChecked(false);
  };

  const [formData, setFormData] = useState({
    uangMuka: false,
    pelunasan: false,
    nomorFaktur: "",
    kode_transaksi: "",
    tanggal_faktur_pajak: "",
    jenisFaktur: "Normal",
    esign_status: "Belum Ditandatangani",
    masa_pajak: "",
    tahun: new Date().getFullYear().toString(),
    informasi_tambahan: "",
    cap_fasilitas: "",
    nomorPendukung: "",
    referensi: "",
    alamat: "",
    idtku: "000000",
    akun_penerima_id: "",
    identification: "",
    negara: "",
    nomorDokumen: "",
    nama: "",
    email: "",
    detail_transaksi: [],
  });

  useEffect(() => {
    if (fakturData && !fakturLoading) {
      // Populate formData with the fetched faktur data
      setFormData({
        uangMuka: fakturData.uangMuka || false,
        pelunasan: fakturData.pelunasan || false,
        nomorFaktur: fakturData.nomorFaktur || "",
        kode_transaksi: fakturData.kode_transaksi || "",
        tanggal_faktur_pajak: fakturData.tanggal_faktur_pajak || "",
        jenisFaktur: fakturData.jenisFaktur || "Normal",
        esign_status: fakturData.esign_status || "Belum Ditandatangani",
        masa_pajak: fakturData.masa_pajak || "",
        tahun: fakturData.tahun || new Date().getFullYear().toString(),
        informasi_tambahan: fakturData.informasi_tambahan || "",
        cap_fasilitas: fakturData.cap_fasilitas || "",
        nomorPendukung: fakturData.nomorPendukung || "",
        referensi: fakturData.referensi || "",
        alamat: fakturData.alamat || "",
        idtku: fakturData.idtku || "000000",
        akun_penerima_id: fakturData.akun_penerima_id || "",
        identification: fakturData.identification || "",
        negara: fakturData.negara || "",
        nomorDokumen: fakturData.nomorDokumen || "",
        nama: fakturData.nama || "",
        email: fakturData.email || "",
        detail_transaksi: fakturData.detail_transaksi || [],
      });

      // Also update other state variables that are used in the form
      if (
        fakturData.detail_transaksi &&
        fakturData.detail_transaksi.length > 0
      ) {
        setSavedTransaksi(fakturData.detail_transaksi);
      }

      // Set other form-related states
      setInformasiTambahan(fakturData.informasi_tambahan || "");
      setCapFasilitas(fakturData.cap_fasilitas || "");
      setNomorPendukung(fakturData.nomorPendukung || "");
      setKodeTransaksi(fakturData.kode_transaksi || "");

      // Set the year if available
      if (fakturData.tahun) {
        const year = parseInt(fakturData.tahun);
        if (!isNaN(year)) {
          setSelectedYear(new Date(year, 0));
          setTahunString(fakturData.tahun);
        }
      }
    }
  }, [fakturData, fakturLoading]);

  const [namaBarang, setNamaBarang] = useState("");

  // const handleSimpanTransaksi = () => {
  //   // Validate required fields
  //   if (
  //     !tipe ||
  //     !selectedKode ||
  //     !selectedSatuan ||
  //     !namaBarang ||
  //     !harga_satuan ||
  //     kuantitas <= 0
  //   ) {
  //     alert("Mohon lengkapi semua data transaksi");
  //     return;
  //   }

  //   const newTransaksi = {
  //     id: Date.now(),
  //     tipe,
  //     nama: namaBarang,
  //     kode: selectedKode,
  //     satuan: selectedSatuan,
  //     harga_satuan,
  //     kuantitas: kuantitas.toString(),
  //     total_harga,
  //     pemotongan_harga,
  //     dpp,
  //     jumlah,
  //     ppn: parseInt("12%".replace(/\D/g, ""), 10) || 0,
  //     ppnNominal: ppn,
  //     tarif_ppnbm: parseInt(tarif_ppnbm.replace(/\D/g, ""), 10) || 0,
  //     ppnbm,
  //   };

  //   const updatedTransaksi = savedTransaksi
  //     ? [...savedTransaksi, newTransaksi]
  //     : [newTransaksi];
  //   setSavedTransaksi(updatedTransaksi);

  //   setFormData((prev) => ({
  //     ...prev,
  //     detail_transaksi: updatedTransaksi,
  //   }));

  //   setTipe("");
  //   setNamaBarang("");
  //   setSelectedKode("");
  //   setSelectedSatuan("");
  //   setHarga("Rp 0");
  //   setKuantitas(0);
  //   setTotalHarga("Rp 0");
  //   setPotonganHarga("Rp 0");
  //   setDPP("Rp 0");
  //   setJumlah("Rp 0");
  //   setTarifPPN("Rp 0");
  //   setTarifPPnBM("");
  //   setPPnBM("Rp 0");
  //   setIsChecked(false);
  //   setIsCustomPPnBM(false);
  // };
  const handleSimpanTransaksi = () => {
    // Validate required fields
    if (
      !tipe ||
      !selectedKode ||
      !selectedSatuan ||
      !namaBarang ||
      !harga_satuan ||
      kuantitas <= 0
    ) {
      alert("Mohon lengkapi semua data transaksi");
      return;
    }

    const transactionData = {
      id: editMode ? editingTransaksiId : Date.now(),
      tipe,
      nama: namaBarang,
      kode: selectedKode,
      satuan: selectedSatuan,
      harga_satuan,
      kuantitas: kuantitas.toString(),
      total_harga,
      pemotongan_harga,
      dpp,
      jumlah,
      ppn: parseInt("12%".replace(/\D/g, ""), 10) || 0,
      ppnNominal: ppn,
      tarif_ppnbm: parseInt(tarif_ppnbm.replace(/\D/g, ""), 10) || 0,
      ppnbm,
    };

    let updatedTransaksi;

    if (editMode) {
      // Update existing transaction
      updatedTransaksi = savedTransaksi.map((item) =>
        item.id === editingTransaksiId ? transactionData : item
      );

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data transaksi berhasil diperbarui",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      // Add new transaction
      updatedTransaksi = savedTransaksi
        ? [...savedTransaksi, transactionData]
        : [transactionData];
    }

    setSavedTransaksi(updatedTransaksi);

    setFormData((prev) => ({
      ...prev,
      detail_transaksi: updatedTransaksi,
    }));

    // Reset form and edit mode
    setTipe("");
    setNamaBarang("");
    setSelectedKode("");
    setSelectedSatuan("");
    setHarga("Rp 0");
    setKuantitas(0);
    setTotalHarga("Rp 0");
    setPotonganHarga("Rp 0");
    setDPP("Rp 0");
    setJumlah("Rp 0");
    setTarifPPN("Rp 0");
    setTarifPPnBM("");
    setPPnBM("Rp 0");
    setIsChecked(false);
    setIsCustomPPnBM(false);
    setEditMode(false);
    setEditingTransaksiId(null);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditingTransaksiId(null);

    // Reset form fields
    setTipe("");
    setNamaBarang("");
    setSelectedKode("");
    setSelectedSatuan("");
    setHarga("Rp 0");
    setKuantitas(0);
    setTotalHarga("Rp 0");
    setPotonganHarga("Rp 0");
    setDPP("Rp 0");
    setJumlah("Rp 0");
    setTarifPPN("Rp 0");
    setTarifPPnBM("");
    setPPnBM("Rp 0");
    setIsChecked(false);
    setIsCustomPPnBM(false);
  };

  const handleHapusTransaksi = (id) => {
    const updatedTransaksi = savedTransaksi.filter((item) => item.id !== id);

    setSavedTransaksi(updatedTransaksi);
    setFormData((prev) => ({
      ...prev,
      detail_transaksi: updatedTransaksi,
    }));
  };

  const handleEditTransaksi = (id) => {
    const transaksiToEdit = savedTransaksi.find((item) => item.id === id);

    if (transaksiToEdit) {
      // Set editing mode
      setEditMode(true);
      setEditingTransaksiId(id);

      // Populate form fields with existing data
      setTipe(transaksiToEdit.tipe);
      setNamaBarang(transaksiToEdit.nama);
      setSelectedKode(transaksiToEdit.kode);
      setSelectedSatuan(transaksiToEdit.satuan);
      setHarga(transaksiToEdit.harga_satuan);
      setKuantitas(parseInt(transaksiToEdit.kuantitas));
      setTotalHarga(transaksiToEdit.total_harga);
      setPotonganHarga(transaksiToEdit.pemotongan_harga);
      setDPP(transaksiToEdit.dpp);
      setJumlah(transaksiToEdit.jumlah);
      setTarifPPnBM(
        transaksiToEdit.tarif_ppnbm ? `${transaksiToEdit.tarif_ppnbm}%` : ""
      );
      setPPnBM(transaksiToEdit.ppnbm);

      // Show modal or alert dialog
      document.querySelector(".AlertDialogTrigger").click();
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const createDraftFaktur = useMutation({
    mutationFn: async (data) => {
      const csrf = await getCsrf();
      return axios.put(
        `${RoutesApiReal.url}api/student/assignments/${id}/sistem/${akun}/faktur/${faktur}`,
        // `${RoutesApiReal.url}api/student/assignments/${id}/sistem/${akun}/faktur`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${cookies.token}`,
          },
          // params: {
          //   intent: "api.create.faktur.draft",
          // },
        }
      );
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire("Berhasil!", "Draft Faktur berhasil dibuat", "success").then(
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
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi apakah ada detail transaksi
    if (!formData.detail_transaksi || formData.detail_transaksi.length === 0) {
      alert("Mohon tambahkan minimal satu detail transaksi");
      return;
    }

    // Hitung total DPP, PPN, dan PPnBM dari semua transaksi
    const totalDPP = formData.detail_transaksi.reduce((sum, item) => {
      //   return sum + (parseInt(item.dpp.replace(/\D/g, ""), 10) || 0);
      return sum + item.dpp;
    }, 0);

    const totalPPN = formData.detail_transaksi.reduce((sum, item) => {
      //   return sum + (parseInt(item.ppnNominal.replace(/\D/g, ""), 10) || 0);
      return sum + item.ppnNominal;
    }, 0);

    const totalPPnBM = formData.detail_transaksi.reduce((sum, item) => {
      //   return sum + (parseInt(item.ppnbm.replace(/\D/g, ""), 10) || 0);
      return sum + item.ppnbm;
    }, 0);

    // Tambahkan total ke formData
    const finalFormData = {
      ...formData,
      akun_penerima_id: formData.akun_penerima_id.id,
      dpp: parseInt(totalDPP),
      ppn: parseInt(totalPPN),
      ppnbm: parseInt(totalPPnBM),
      informasi_tambahan: informasi_tambahan,
      cap_fasilitas: cap_fasilitas,

      //   totalTagihan: formatRupiah((totalDPP + totalPPN + totalPPnBM).toString()),
    };
    // alert(finalFormData)

    console.log(finalFormData);
    createDraftFaktur.mutate(finalFormData);
  };

  const handleSimpan = () => {
    const data = {
      dokumenTransaksi: {
        uangMuka,
      },
    };
  };

  // Helper function to get the full cap_fasilitas text based on kode_transaksi and cap_fasilitas value
  const getCapFasilitasText = (kode, cap) => {
    if (kode === "7") {
      switch (cap) {
        case "1":
          return "1 - Pajak Pertambahan Nilai Tidak Dipungut berdasarkan PP Nomor 10 Tahun 2012";
        case "2":
          return "2 - Pajak Pertambahan Nilai atau Pajak Pertambahan Nilai dan Pajak Penjualan atas Barang Mewah tidak dipungut";
        case "3":
          return "3 - Pajak Pertambahan Nilai dan Pajak Penjualan atas Barang Mewah Tidak Dipungut";
        case "4":
          return "4 - Pajak Pertambahan Nilai Tidak Dipungut Sesuai PP Nomor 71 Tahun 2012";
        case "5":
          return "5 - (Tidak ada Cap)";
        case "6":
          return "6 - PPN dan/atau PPnBM tidak dipungut berdasarkan PMK No. 194/PMK.03/2012";
        case "7":
          return "7 - PPN Tidak Dipungut Berdasarkan PP Nomor 15 Tahun 2015";
        case "8":
          return "8 - PPN Tidak Dipungut Berdasarkan PP Nomor 69 Tahun 2015";
        case "9":
          return "9 - PPN Tidak Dipungut Berdasarkan PP Nomor 96 Tahun 2015";
        case "10":
          return "10 - PPN Tidak Dipungut Berdasarkan PP Nomor 106 Tahun 2015";
        case "11":
          return "11 - PPN Tidak Dipungut Sesuai PP Nomor 50 Tahun 2019";
        case "12":
          return "12 - PPN atau PPN dan PPnBM Tidak Dipungut Sesuai Dengan PP Nomor 27 Tahun 2017";
        case "13":
          return "13 - PPN ditanggung PEMERINTAH EX PMK 21/PMK.010/21";
        case "14":
          return "14 - PPN DITANGGUNG PEMERINTAH EKS PMK 102/PMK.010/2021";
        case "15":
          return "15 - PPN DITANGGUNG PEMERINTAH EKS PMK 239/PMK.03/2020";
        case "16":
          return "16 - Insentif PPN DITANGGUNG PEMERINTAH EKSEKUSI PMK NOMOR 103/PMK.010/2021";
        case "17":
          return "17 - PAJAK PERTAMBAHAN NILAI TIDAK DIPUNGUT BERDASARKAN PP NOMOR 40 TAHUN 2021";
        case "18":
          return "18 - PAJAK PERTAMBAHAN NILAI TIDAK DIPUNGUT BERDASARKAN PP NOMOR 41 TAHUN 2021";
        case "19":
          return "19 - PPN DITANGGUNG PEMERINTAH EKS PMK 6/PMK.010/2022";
        case "20":
          return "20 - PPN DITANGGUNG PEMERINTAH EKSEKUSI PMK NOMOR 226/PMK.03/2021";
        case "21":
          return "21 - PPN ATAU PPN DAN PPnBM TIDAK DIPUNGUT SESUAI DENGAN PP NOMOR 53 TAHUN 2017";
        case "22":
          return "22 - PPN tidak dipungut berdasarkan PP Nomor 70 Tahun 2021";
        case "23":
          return "23 - PPN ditanggung Pemerintah Ex PMK-125/PMK.01/2020";
        case "24":
          return "24 - (Tidak ada Cap)";
        case "25":
          return "25 - PPN tidak dipungut berdasarkan PP Nomor 49 Taakun_penerima_id.nama_akunhun 2022";
        case "26":
          return "26 - PPN tidak dipungut berdasarkan PP Nomor 12 Tahun 2023";
        case "27":
          return "27 - PPN ditanggung Pemerintah berdasarkan PMK Nomor 38 Tahun 2023";
        default:
          return "";
      }
    } else if (kode === "8") {
      switch (cap) {
        case "1":
          return "1 - PPN Dibebaskan Sesuai PP Nomor 146 Tahun 2000 Sebagaimana Telah Diubah Dengan PP Nomor 38 Tahun 2003";
        case "2":
          return "2 - PPN Dibebaskan Sesuai PP Nomor 12 Tahun 2001 Sebagaimana Telah Beberapa Kali Diubah Terakhir Dengan PP Nomor 31 Tahun 2007";
        case "3":
          return "3 - PPN dibebaskan berdasarkan Peraturan Pemerintah Nomor 28 Tahun 2009";
        case "4":
          return "4 - (Tidak ada cap)";
        case "5":
          return "5 - PPN Dibebaskan Sesuai Dengan PP Nomor 81 Tahun 2015";
        case "6":
          return "6 - PPN Dibebaskan Berdasarkan PP Nomor 74 Tahun 2015";
        case "7":
          return "7 - (tanpa cap)";
        case "8":
          return "8 - PPN DIBEBASKAN SESUAI PP NOMOR 81 TAHUN 2015 SEBAGAIMANA TELAH DIUBAH DENGAN PP 48 TAHUN 2020";
        case "9":
          return "9 - PPN DIBEBASKAN BERDASARKAN PP NOMOR 47 TAHUN 2020";
        case "10":
          return "10 - PPN Dibebaskan berdasarkan PP Nomor 49 Tahun 2022";
        default:
          return "";
      }
    }
    return "";
  };

  if (isLoading) {
    return (
      <div className="loading">
        <ClipLoader color="#7502B5" size={50} />
      </div>
      // <div className="h-full w-full text-2xl italic font-bold text-center flex items-center justify-center">Loading...</div>
    );
  }

  console.log(fakturData);

  return (
    console.log(""),
    console.log("Rendering TambahFakturKeluaran"),
    (
      <div className="flex h-screen bg-gray-100">
        <SideBarEFaktur
          nama_akun={sidebar.nama_akun}
          npwp_akun={sidebar.npwp_akun}
          akun={{ id, akun }}
        />
        <div className="flex-grow p-6 bg-white h-full overflow-y-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Tambah Data
          </h2>
          <div
            className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 "
            onClick={() => setShowDokumenTransaksi(!showDokumenTransaksi)}
          >
            <h3 className="text-lg font-semibold">Dokumen Transaksi</h3>
            {showDokumenTransaksi ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {showDokumenTransaksi && (
            <div className="border rounded-md p-4 mb-2 grid grid-cols-3 gap-4 w-full">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Uang Muka</label>
                <input
                  type="checkbox"
                  name="uangMuka"
                  checked={formData.uangMuka}
                  onChange={handleChange}
                  className="justify-start p-3 border rounded"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Pelunasan</label>
                <input
                  type="checkbox"
                  name="pelunasan"
                  checked={formData.pelunasan}
                  onChange={handleChange}
                  className="justify-start p-3 border rounded"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Nomor Faktur
                </label>
                <input
                  type="text"
                  className="p-2 border rounded w-full bg-gray-100"
                  disabled
                  placeholder="Ngelink"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Kode Transaksi
                </label>
                <select
                  className="p-2 border rounded w-full"
                  name="kode_transaksi"
                  value={formData.kode_transaksi}
                  onChange={handleKodeTransaksiChange}
                >
                  <option value="">Pilih Kode Transaksi</option>
                  <option value="1">01 - kepada selain pemungut PPN</option>
                  <option value="2">
                    02 - kepada Pemungut PPN Instansi Pemerintah
                  </option>
                  <option value="3">
                    03 - kepada Pemungut PPN selain instansi Pemerintah
                  </option>
                  <option value="4">04 - DPP Nilai Lain</option>
                  <option value="5">05 - Besaran tertentu</option>
                  <option value="6">
                    06 - kepada orang pribadi pemegang paspor luar negeri (16E
                    UU PPN)
                  </option>
                  <option value="7">
                    07 - penyerahan dengan fasilitas PPN atau PPN{" "}
                  </option>
                  <option value="8">
                    08 - penyerahan aktiva dengan fasilitas dibebaskan PPN atau
                    PPN dan PPnBM
                  </option>
                  <option value="9">
                    09 - penyerahan aktiva yang menurut tujuan semua tidak
                    diperjualbelikan (16D UU PPN)
                  </option>
                  <option value="10">10 - Penyerahan lainnya</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Tanggal Faktur
                </label>
                <input
                  type="date"
                  value={formData.tanggal_faktur_pajak}
                  onChange={handleChange}
                  name="tanggal_faktur_pajak"
                  className="p-2 border rounded w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Jenis Faktur
                </label>
                <input
                  type="text"
                  value="Normal"
                  name="jenisFaktur"
                  className="p-2 border rounded w-full bg-gray-100"
                  disabled
                />
              </div>
              <div className="col-span-3 grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Masa Pajak
                  </label>
                  {/* <input type="month" className='p-2 border rounded w-full' /> */}
                  <select
                    className="p-2 border rounded w-full"
                    name="masa_pajak"
                    value={formData.masa_pajak}
                    onChange={handleChange}
                  >
                    <option value="">Pilih Masa Pajak</option>
                    <option value="Januari">Januari</option>
                    <option value="Februari">Februari</option>
                    <option value="Maret">Maret</option>
                    <option value="April">April</option>
                    <option value="Mei">Mei</option>
                    <option value="Juni">Juni</option>
                    <option value="Juli">Juli</option>
                    <option value="Agustus">Agustus</option>
                    <option value="September">September</option>
                    <option value="Oktober">Oktober</option>
                    <option value="November">November</option>
                    <option value="Desember">Desember</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Tahun</label>
                  <Popover className="w-full p-2">
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start "
                      >
                        {selectedYear.getFullYear()}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-auto p-0">
                      {/* <DatePicker
                        selected={selectedYear}
                        onChange={(date) => setSelectedYear(date.toString())}
                        showYearPicker
                        dateFormat="yyyy"
                        className="border p-2 rounded-md w-full text-center"
                      /> */}
                      <DatePicker
                        selected={selectedYear}
                        onChange={(date) => {
                          setSelectedYear(date);
                          const yearStr = date.getFullYear().toString();
                          setTahunString(yearStr);
                          setFormData((prev) => ({
                            ...prev,
                            tahun: yearStr,
                          }));
                        }}
                        showYearPicker
                        dateFormat="yyyy"
                        className="border p-2 rounded-md w-full text-center"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                {/* <div className="space-y-2">
                                <label className='block text-sm font-medium'></label>
                            </div> */}
                {(kode_transaksi === "7" || kode_transaksi === "8") && (
                  <>
                    {/* Informasi Tambahan */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">
                        Informasi Tambahan
                      </label>
                      <select
                        className="p-2 border rounded w-full"
                        value={informasi_tambahan}
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          setInformasiTambahan(selectedValue);

                          // Set the corresponding cap_fasilitas based on the selected informasi_tambahan
                          let capValue = "";
                          if (kode_transaksi === "7") {
                            switch (selectedValue) {
                              case "1 - untuk Kawasan Bebas":
                                capValue =
                                  "1 - Pajak Pertambahan Nilai Tidak Dipungut berdasarkan PP Nomor 10 Tahun 2012";
                                break;
                              case "2 - untuk Tempat Penimbunan Berikat":
                                capValue =
                                  "2 - Pajak Pertambahan Nilai atau Pajak Pertambahan Nilai dan Pajak Penjualan atas Barang Mewah tidak dipungut";
                                break;
                              case "3 - untuk Hibah dan Bantuan Luar Negeri":
                                capValue =
                                  "3 - Pajak Pertambahan Nilai dan Pajak Penjualan atas Barang Mewah Tidak Dipungut";
                                break;
                              case "4 - untuk Avtur":
                                capValue =
                                  "4 - Pajak Pertambahan Nilai Tidak Dipungut Sesuai PP Nomor 71 Tahun 2012";
                                break;
                              case "5 - untuk Lainnya":
                                capValue = "5 - (Tidak ada Cap)";
                                break;
                              case "6 - untuk Kontraktor Perjanjian Karya Pengusahaan Pertambangan Batubara Generasi I":
                                capValue =
                                  "6 - PPN dan/atau PPnBM tidak dipungut berdasarkan PMK No. 194/PMK.03/2012";
                                break;
                              case "7 - untuk Penyerahan bahan bakar minyak untuk Kapal Angkutan Laut Luar Negeri":
                                capValue =
                                  "7 - PPN Tidak Dipungut Berdasarkan PP Nomor 15 Tahun 2015";
                                break;
                              case "8 - untuk Penyerahan jasa kena pajak terkait alat angkutan tertentu":
                                capValue =
                                  "8 - PPN Tidak Dipungut Berdasarkan PP Nomor 69 Tahun 2015";
                                break;
                              case "9 - untuk Penyerahan BKP Tertentu di KEK":
                                capValue =
                                  "9 - PPN Tidak Dipungut Berdasarkan PP Nomor 96 Tahun 2015";
                                break;
                              case "10 - untuk BKP tertentu yang bersifat strategis berupa anode slime":
                                capValue =
                                  "10 - PPN Tidak Dipungut Berdasarkan PP Nomor 106 Tahun 2015";
                                break;
                              case "11 - untuk Penyerahan alat angkutan tertentu dan/atau Jasa Kena Pajak terkait alat angkutan tertentu":
                                capValue =
                                  "11 - PPN Tidak Dipungut Sesuai PP Nomor 50 Tahun 2019";
                                break;
                              case "12 - untuk Penyerahan kepada Kontraktor Kerja Sama Migas yang mengikuti ketentuan Peraturan Pemerintah Nomor 27 Tahun 2017":
                                capValue =
                                  "12 - PPN atau PPN dan PPnBM Tidak Dipungut Sesuai Dengan PP Nomor 27 Tahun 2017";
                                break;
                              case "13 - Penyerahan Rumah Tapak dan Satuan Rumah Susun Rumah Susun Ditanggung Pemerintah Tahun Anggaran 2021":
                                capValue =
                                  "13 - PPN ditanggung PEMERINTAH EX PMK 21/PMK.010/21";
                                break;
                              case "14 - Penyerahan Jasa Sewa Ruangan atau Bangunan Kepada Pedagang Eceran yang Ditanggung Pemerintah Tahun Anggaran 2021":
                                capValue =
                                  "14 - PPN DITANGGUNG PEMERINTAH EKS PMK 102/PMK.010/2021";
                                break;
                              case "15 - Penyerahan Barang dan Jasa Dalam Rangka Penanganan Pandemi COVID-19 (PMK 239/PMK. 03/2020)":
                                capValue =
                                  "15 - PPN DITANGGUNG PEMERINTAH EKS PMK 239/PMK.03/2020";
                                break;
                              case "16 - Insentif PMK-103/PMK.010/2021 berupa PPN atas Penyerahan Rumah Tapak dan Unit Hunian Rumah Susun yang Ditanggung Pemerintah Tahun Anggaran 2021":
                                capValue =
                                  "16 - Insentif PPN DITANGGUNG PEMERINTAH EKSEKUSI PMK NOMOR 103/PMK.010/2021";
                                break;
                              case "17 - Kawasan Ekonomi Khusus PP nomor 40 Tahun 2021":
                                capValue =
                                  "17 - PAJAK PERTAMBAHAN NILAI TIDAK DIPUNGUT BERDASARKAN PP NOMOR 40 TAHUN 2021";
                                break;
                              case "18 - Kawasan Bebas PP nomor 41 Tahun 2021":
                                capValue =
                                  "18 - PAJAK PERTAMBAHAN NILAI TIDAK DIPUNGUT BERDASARKAN PP NOMOR 41 TAHUN 2021";
                                break;
                              case "19 - Penyerahan Rumah Tapak dan Unit Hunian Rumah Susun yang Ditanggung Pemerintah Tahun Anggaran 2022":
                                capValue =
                                  "19 - PPN DITANGGUNG PEMERINTAH EKS PMK 6/PMK.010/2022";
                                break;
                              case "20 - PPN Ditanggung Pemerintah dalam rangka Penanganan Pandemi Corona Virus":
                                capValue =
                                  "20 - PPN DITANGGUNG PEMERINTAH EKSEKUSI PMK NOMOR 226/PMK.03/2021";
                                break;
                              case "21 - Penyerahan kepada Kontraktor Kerja Sama Migas yang mengikuti ketentuan Peraturan Pemerintah Nomor 53 Tahun 2017":
                                capValue =
                                  "21 - PPN ATAU PPN DAN PPnBM TIDAK DIPUNGUT SESUAI DENGAN PP NOMOR 53 TAHUN 2017";
                                break;
                              case "22 - BKP strategis tertentu dalam bentuk anode slime dan emas butiran":
                                capValue =
                                  "22 - PPN tidak dipungut berdasarkan PP Nomor 70 Tahun 2021";
                                break;
                              case "23 - untuk penyerahan kertas koran dan/atau majalah":
                                capValue =
                                  "23 - PPN ditanggung Pemerintah Ex PMK-125/PMK.01/2020";
                                break;
                              case "24 - PPN tidak dipungut oleh Pemerintah lainnya":
                                capValue = "24 - (Tidak ada Cap)";
                                break;
                              case "25 - BKP dan JKP tertentu":
                                capValue =
                                  "25 - PPN tidak dipungut berdasarkan PP Nomor 49 Tahun 2022";
                                break;
                              case "26 - Penyerahan BKP dan JKP di Ibu Kota Negara baru":
                                capValue =
                                  "26 - PPN tidak dipungut berdasarkan PP Nomor 12 Tahun 2023";
                                break;
                              case "27 - Penyerahan kendaraan listrik berbasis baterai":
                                capValue =
                                  "27 - PPN ditanggung Pemerintah berdasarkan PMK Nomor 38 Tahun 2023";
                                break;
                              default:
                                capValue = "";
                            }
                          } else if (kode_transaksi === "8") {
                            switch (selectedValue) {
                              case "1 - untuk BKP dan JKP Tertentu":
                                capValue =
                                  "1 - PPN Dibebaskan Sesuai PP Nomor 146 Tahun 2000 Sebagaimana Telah Diubah Dengan PP Nomor 38 Tahun 2003";
                                break;
                              case "2 - untuk BKP Tertentu yang Bersifat Strategis":
                                capValue =
                                  "2 - PPN Dibebaskan Sesuai PP Nomor 12 Tahun 2001 Sebagaimana Telah Beberapa Kali Diubah Terakhir Dengan PP Nomor 31 Tahun 2007";
                                break;
                              case "3 - untuk Jasa Kebandarudaraan":
                                capValue =
                                  "3 - PPN dibebaskan berdasarkan Peraturan Pemerintah Nomor 28 Tahun 2009";
                                break;
                              case "4 - untuk Lainnya":
                                capValue = "4 - (Tidak ada cap)";
                                break;
                              case "5 - untuk BKP Tertentu yang Bersifat Strategis sesuai PP Nomor 81 Tahun 2015":
                                capValue =
                                  "5 - PPN Dibebaskan Sesuai Dengan PP Nomor 81 Tahun 2015";
                                break;
                              case "6 - untuk Penyerahan Jasa Kepelabuhan Tertentu untuk kegiatan angkutan laut Luar Negeri":
                                capValue =
                                  "6 - PPN Dibebaskan Berdasarkan PP Nomor 74 Tahun 2015";
                                break;
                              case "7 - untuk Penyerahan Air Bersih":
                                capValue = "7 - (tanpa cap)";
                                break;
                              case "8 - Penyerahan BKP tertentu yang bersifat strategis berdasarkan PP 48 Tahun 2020":
                                capValue =
                                  "8 - PPN DIBEBASKAN SESUAI PP NOMOR 81 TAHUN 2015 SEBAGAIMANA TELAH DIUBAH DENGAN PP 48 TAHUN 2020";
                                break;
                              case "9 - Penyerahan kepada Perwakilan Negara Asing dan Badan Internasional serta Pejabatnya":
                                capValue =
                                  "9 - PPN DIBEBASKAN BERDASARKAN PP NOMOR 47 TAHUN 2020";
                                break;
                              case "10 - BKP dan JKP tertentu":
                                capValue =
                                  "10 - PPN Dibebaskan berdasarkan PP Nomor 49 Tahun 2022";
                                break;
                              default:
                                capValue = "";
                            }
                          }

                          setCapFasilitas(capValue);

                          // Update formData with full text values
                          setFormData((prev) => ({
                            ...prev,
                            informasi_tambahan: selectedValue,
                            cap_fasilitas: capValue,
                            // Reset nomorPendukung if needed
                            nomorPendukung: "",
                          }));

                          // Reset nomorPendukung state
                          setNomorPendukung("");
                        }}
                      >
                        <option value="">Pilih Informasi Tambahan</option>
                        {kode_transaksi === "7" ? (
                          // Options for kode_transaksi 7
                          <>
                            <option value="1 - untuk Kawasan Bebas">
                              1 - untuk Kawasan Bebas
                            </option>
                            <option value="2 - untuk Tempat Penimbunan Berikat">
                              2 - untuk Tempat Penimbunan Berikat
                            </option>
                            <option value="3 - untuk Hibah dan Bantuan Luar Negeri">
                              3 - untuk Hibah dan Bantuan Luar Negeri
                            </option>
                            <option value="4 - untuk Avtur">
                              4 - untuk Avtur
                            </option>
                            <option value="5 - untuk Lainnya">
                              5 - untuk Lainnya
                            </option>
                            <option value="6 - untuk Kontraktor Perjanjian Karya Pengusahaan Pertambangan Batubara Generasi I">
                              6 - untuk Kontraktor Perjanjian Karya Pengusahaan
                              Pertambangan Batubara Generasi I
                            </option>
                            <option value="7 - untuk Penyerahan bahan bakar minyak untuk Kapal Angkutan Laut Luar Negeri">
                              7 - untuk Penyerahan bahan bakar minyak untuk
                              Kapal Angkutan Laut Luar Negeri
                            </option>
                            <option value="8 - untuk Penyerahan jasa kena pajak terkait alat angkutan tertentu">
                              8 - untuk Penyerahan jasa kena pajak terkait alat
                              angkutan tertentu
                            </option>
                            <option value="9 - untuk Penyerahan BKP Tertentu di KEK">
                              9 - untuk Penyerahan BKP Tertentu di KEK
                            </option>
                            <option value="10 - untuk BKP tertentu yang bersifat strategis berupa anode slime">
                              10 - untuk BKP tertentu yang bersifat strategis
                              berupa anode slime
                            </option>
                            <option value="11 - untuk Penyerahan alat angkutan tertentu dan/atau Jasa Kena Pajak terkait alat angkutan tertentu">
                              11 - untuk Penyerahan alat angkutan tertentu
                              dan/atau Jasa Kena Pajak terkait alat angkutan
                              tertentu
                            </option>
                            <option value="12 - untuk Penyerahan kepada Kontraktor Kerja Sama Migas yang mengikuti ketentuan Peraturan Pemerintah Nomor 27 Tahun 2017">
                              12 - untuk Penyerahan kepada Kontraktor Kerja Sama
                              Migas yang mengikuti ketentuan Peraturan
                              Pemerintah Nomor 27 Tahun 2017
                            </option>
                            <option value="13 - Penyerahan Rumah Tapak dan Satuan Rumah Susun Rumah Susun Ditanggung Pemerintah Tahun Anggaran 2021">
                              13 - Penyerahan Rumah Tapak dan Satuan Rumah Susun
                              Rumah Susun Ditanggung Pemerintah Tahun Anggaran
                              2021
                            </option>
                            <option value="14 - Penyerahan Jasa Sewa Ruangan atau Bangunan Kepada Pedagang Eceran yang Ditanggung Pemerintah Tahun Anggaran 2021">
                              14 - Penyerahan Jasa Sewa Ruangan atau Bangunan
                              Kepada Pedagang Eceran yang Ditanggung Pemerintah
                              Tahun Anggaran 2021
                            </option>
                            <option value="15 - Penyerahan Barang dan Jasa Dalam Rangka Penanganan Pandemi COVID-19 (PMK 239/PMK. 03/2020)">
                              15 - Penyerahan Barang dan Jasa Dalam Rangka
                              Penanganan Pandemi COVID-19 (PMK 239/PMK. 03/2020)
                            </option>
                            <option value="16 - Insentif PMK-103/PMK.010/2021 berupa PPN atas Penyerahan Rumah Tapak dan Unit Hunian Rumah Susun yang Ditanggung Pemerintah Tahun Anggaran 2021">
                              16 - Insentif PMK-103/PMK.010/2021 berupa PPN atas
                              Penyerahan Rumah Tapak dan Unit Hunian Rumah Susun
                              yang Ditanggung Pemerintah Tahun Anggaran 2021
                            </option>
                            <option value="17 - Kawasan Ekonomi Khusus PP nomor 40 Tahun 2021">
                              17 - Kawasan Ekonomi Khusus PP nomor 40 Tahun 2021
                            </option>
                            <option value="18 - Kawasan Bebas PP nomor 41 Tahun 2021">
                              18 - Kawasan Bebas PP nomor 41 Tahun 2021
                            </option>
                            <option value="19 - Penyerahan Rumah Tapak dan Unit Hunian Rumah Susun yang Ditanggung Pemerintah Tahun Anggaran 2022">
                              19 - Penyerahan Rumah Tapak dan Unit Hunian Rumah
                              Susun yang Ditanggung Pemerintah Tahun Anggaran
                              2022
                            </option>
                            <option value="20 - PPN Ditanggung Pemerintah dalam rangka Penanganan Pandemi Corona Virus">
                              20 - PPN Ditanggung Pemerintah dalam rangka
                              Penanganan Pandemi Corona Virus
                            </option>
                            <option value="21 - Penyerahan kepada Kontraktor Kerja Sama Migas yang mengikuti ketentuan Peraturan Pemerintah Nomor 53 Tahun 2017">
                              21 - Penyerahan kepada Kontraktor Kerja Sama Migas
                              yang mengikuti ketentuan Peraturan Pemerintah
                              Nomor 53 Tahun 2017
                            </option>
                            <option value="22 - BKP strategis tertentu dalam bentuk anode slime dan emas butiran">
                              22 - BKP strategis tertentu dalam bentuk anode
                              slime dan emas butiran
                            </option>
                            <option value="23 - untuk penyerahan kertas koran dan/atau majalah">
                              23 - untuk penyerahan kertas koran dan/atau
                              majalah
                            </option>
                            <option value="24 - PPN tidak dipungut oleh Pemerintah lainnya">
                              24 - PPN tidak dipungut oleh Pemerintah lainnya
                            </option>
                            <option value="25 - BKP dan JKP tertentu">
                              25 - BKP dan JKP tertentu
                            </option>
                            <option value="26 - Penyerahan BKP dan JKP di Ibu Kota Negara baru">
                              26 - Penyerahan BKP dan JKP di Ibu Kota Negara
                              baru
                            </option>
                            <option value="27 - Penyerahan kendaraan listrik berbasis baterai">
                              27 - Penyerahan kendaraan listrik berbasis baterai
                            </option>
                          </>
                        ) : (
                          // Options for kode_transaksi 8
                          <>
                            <option value="1 - untuk BKP dan JKP Tertentu">
                              1 - untuk BKP dan JKP Tertentu
                            </option>
                            <option value="2 - untuk BKP Tertentu yang Bersifat Strategis">
                              2 - untuk BKP Tertentu yang Bersifat Strategis
                            </option>
                            <option value="3 - untuk Jasa Kebandarudaraan">
                              3 - untuk Jasa Kebandarudaraan
                            </option>
                            <option value="4 - untuk Lainnya">
                              4 - untuk Lainnya
                            </option>
                            <option value="5 - untuk BKP Tertentu yang Bersifat Strategis sesuai PP Nomor 81 Tahun 2015">
                              5 - untuk BKP Tertentu yang Bersifat Strategis
                              sesuai PP Nomor 81 Tahun 2015
                            </option>
                            <option value="6 - untuk Penyerahan Jasa Kepelabuhan Tertentu untuk kegiatan angkutan laut Luar Negeri">
                              6 - untuk Penyerahan Jasa Kepelabuhan Tertentu
                              untuk kegiatan angkutan laut Luar Negeri
                            </option>
                            <option value="7 - untuk Penyerahan Air Bersih">
                              7 - untuk Penyerahan Air Bersih
                            </option>
                            <option value="8 - Penyerahan BKP tertentu yang bersifat strategis berdasarkan PP 48 Tahun 2020">
                              8 - Penyerahan BKP tertentu yang bersifat
                              strategis berdasarkan PP 48 Tahun 2020
                            </option>
                            <option value="9 - Penyerahan kepada Perwakilan Negara Asing dan Badan Internasional serta Pejabatnya">
                              9 - Penyerahan kepada Perwakilan Negara Asing dan
                              Badan Internasional serta Pejabatnya
                            </option>
                            <option value="10 - BKP dan JKP tertentu">
                              10 - BKP dan JKP tertentu
                            </option>
                          </>
                        )}
                      </select>
                    </div>

                    {/* Cap Fasilitas (Disabled) */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">
                        Cap Fasilitas
                      </label>
                      <input
                        type="text"
                        className="p-2 border rounded w-full bg-gray-100"
                        value={cap_fasilitas}
                        disabled
                      />
                    </div>

                    {/* Nomor Pendukung (Muncul hanya untuk informasi tambahan tertentu) */}
                    {((kode_transaksi === "7" &&
                      [
                        "1 - untuk Kawasan Bebas",
                        "2 - untuk Tempat Penimbunan Berikat",
                        "8 - untuk Penyerahan jasa kena pajak terkait alat angkutan tertentu",
                        "9 - untuk Penyerahan BKP Tertentu di KEK",
                        "11 - untuk Penyerahan alat angkutan tertentu dan/atau Jasa Kena Pajak terkait alat angkutan tertentu",
                        "12 - untuk Penyerahan kepada Kontraktor Kerja Sama Migas yang mengikuti ketentuan Peraturan Pemerintah Nomor 27 Tahun 2017",
                        "17 - Kawasan Ekonomi Khusus PP nomor 40 Tahun 2021",
                        "18 - Kawasan Bebas PP nomor 41 Tahun 2021",
                        "21 - Penyerahan kepada Kontraktor Kerja Sama Migas yang mengikuti ketentuan Peraturan Pemerintah Nomor 53 Tahun 2017",
                        "25 - BKP dan JKP tertentu",
                        "26 - Penyerahan BKP dan JKP di Ibu Kota Negara baru",
                      ].includes(informasi_tambahan)) ||
                      (kode_transaksi === "8" &&
                        [
                          "5 - untuk BKP Tertentu yang Bersifat Strategis sesuai PP Nomor 81 Tahun 2015",
                          "8 - Penyerahan BKP tertentu yang bersifat strategis berdasarkan PP 48 Tahun 2020",
                          "9 - Penyerahan kepada Perwakilan Negara Asing dan Badan Internasional serta Pejabatnya",
                          "10 - BKP dan JKP tertentu",
                        ].includes(informasi_tambahan))) && (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">
                          Nomor Pendukung
                        </label>
                        <input
                          type="text"
                          name="nomorPendukung"
                          className="p-2 border rounded w-full"
                          placeholder="Masukkan Nomor Pendukung"
                          value={formData.nomorPendukung}
                          onChange={(e) => {
                            const value = e.target.value;
                            setNomorPendukung(value);
                            setFormData((prev) => ({
                              ...prev,
                              nomorPendukung: value,
                            }));
                          }}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Referensi</label>
                <input
                  type="text"
                  value={formData.referensi}
                  name="referensi"
                  onChange={handleChange}
                  className="p-2 border rounded w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Pilih Alamat
                </label>
                <input
                  type="text"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  className="p-2 border rounded w-full"
                  placeholder="Link Bang, tanya pm jan tanya saia"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">IDTKU</label>
                <input
                  type="text"
                  className="p-2 border rounded w-full bg-gray-100"
                  value="000000"
                  disabled
                />
              </div>
            </div>
          )}
          <div
            className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100"
            onClick={() => setShowInformasiPembeli(!showInformasiPembeli)}
          >
            <h3 className="text-lg font-semibold">Informasi Pembeli</h3>
            {showInformasiPembeli ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {showInformasiPembeli && (
            <div className="border rounded-md p-4 mb-2 grid grid-cols-3 gap-4 w-full">
              <div className="space-y-2">
                <label className="block text-sm font-medium">NPWP </label>
                <select
                  name="akun_penerima_id"
                  value={formData.akun_penerima_id.id}
                  onChange={handleChange}
                  className="p-2 border rounded w-full"
                >
                  <option value="">Pilih NPWP</option>
                  {!isLoading &&
                    data &&
                    data.map((item, index) => (
                      <option key={index} value={item.id || ""}>
                        {item.npwp_akun || "NPWP tidak tersedia"} -{" "}
                        {item.nama_akun}
                      </option>
                    ))}
                </select>
                {isLoading && (
                  <div className="text-sm text-gray-500">
                    Loading NPWP data...
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">ID</label>
                <div className="grid grid-cols-2 gap-3 ">
                  {["NPWP", "Paspor", "NIK", "Identitas Lain"].map((value) => (
                    <div key={value} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="identification"
                        value={value}
                        checked={formData.identification === value}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                      />
                      <label className="text-sm">{value}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Negara</label>
                <input
                  type="text"
                  name="negara"
                  value={formData.negara}
                  onChange={handleChange}
                  className="p-2 border rounded w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Nomor Dokumen
                </label>
                <input
                  type="text"
                  name="nomorDokumen"
                  value={formData.nomorDokumen}
                  onChange={handleChange}
                  className="p-2 border rounded w-full bg-gray-100"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Nama</label>
                <input
                  type="text"
                  name="nama"
                  value={formData.akun_penerima_id.nama_akun}
                  onChange={handleChange}
                  className="p-2 border rounded w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Alamat</label>
                <input
                  type="text"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  className="p-2 border rounded w-full"
                  disabled
                  placeholder="Ngelink kang"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">IDTKU</label>
                <input
                  type="text"
                  name="idtku"
                  value={formData.idtku}
                  onChange={handleChange}
                  className="p-2 border rounded w-full bg-gray-100"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="p-2 border rounded w-full"
                />
              </div>
            </div>
          )}
          <div
            className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100"
            onClick={() => setShowDetailTransaksi(!showDetailTransaksi)}
          >
            <h3 className="text-lg font-semibold">Detail Transaksi</h3>
            {showDetailTransaksi ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {showDetailTransaksi && (
            <div className="border rounded-md p-4 mb-2 w-full">
              <div className="flex justify-between mb-4 border-b pb-3">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded">
                      {editMode ? "Edit Transaksi" : "Tambah Transaksi"}
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white rounded-md shadow-md p-4 !min-w-[1000px]">
                    <AlertDialogHeader className="text-lg font-semibold ">
                      <AlertDialogTitle className="text-lg font-semibold border-b pb-2 w-full">
                        {editMode ? "Edit Transaksi" : "Tambah Transaksi"}
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className="grid grid-cols-2 gap-6 w-full overflow-auto h-96">
                      {/* Kolom Kiri */}
                      <div className="space-y-4 h-full">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium">
                            Tipe
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center gap-2">
                              <label className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name="tipe"
                                  value="Barang"
                                  checked={tipe === "Barang"}
                                  onChange={handleTipeChange}
                                />
                                Barang
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <label className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name="tipe"
                                  value="Jasa"
                                  checked={tipe === "Jasa"}
                                  onChange={handleTipeChange}
                                />
                                Jasa
                              </label>
                            </div>
                          </div>
                        </div>
                        {tipe && (
                          <div>
                            <label className="block text-sm font-medium">
                              Kode Transaksi
                            </label>
                            <select
                              className="p-2 border rounded w-[250px] max-w-full"
                              value={selectedKode}
                              onChange={(e) => setSelectedKode(e.target.value)}
                            >
                              <option value="">Pilih Kode Transaksi</option>
                              {listKode.map((item) => (
                                <option key={item.id} value={item.kode}>
                                  {item.kode} - {item.nama_transaksi}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                        <div className="space-y-2">
                          <label className="block text-sm font-medium">
                            Nama{" "}
                          </label>
                          <input
                            type="text"
                            className="p-2 border rounded w-full"
                            value={namaBarang}
                            onChange={(e) => setNamaBarang(e.target.value)}
                            placeholder="Masukkan nama barang/jasa"
                          />
                        </div>
                        {tipe && (
                          <div className="space-y-2">
                            <label className="block text-sm font-medium">
                              Satuan
                            </label>
                            <select
                              className="p-2 border rounded w-[250px] max-w-full"
                              value={selectedSatuan}
                              onChange={(e) =>
                                setSelectedSatuan(e.target.value)
                              }
                            >
                              <option value="">Pilih Satuan</option>
                              {listSatuan.map((item) => (
                                <option key={item.id} value={item.satuan}>
                                  {item.satuan}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                        <div className="space-y-2">
                          <label className="block text-sm font-medium">
                            Harga Satuan
                          </label>
                          <input
                            type="text"
                            className="p-2 border rounded w-full"
                            value={harga_satuan}
                            onChange={handleHargaChange}
                            placeholder="Rp 0"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium">
                            Kuantitas
                          </label>
                          <input
                            type="number"
                            className="p-2 border rounded w-full"
                            min="0"
                            step="1"
                            value={kuantitas === 0 ? "" : kuantitas}
                            onChange={handleKuantitasChange}
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium">
                            Total Harga
                          </label>
                          <input
                            type="text"
                            className="p-2 border rounded w-full bg-gray-100"
                            value={total_harga}
                            readOnly
                            placeholder="Rp 0"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium">
                            Potongan Harga
                          </label>
                          <input
                            type="text"
                            className="p-2 border rounded w-full"
                            value={pemotongan_harga}
                            onChange={handlePotonganHargaChange}
                            placeholder="Rp 0"
                          />
                        </div>
                      </div>

                      {/* Kolom Kanan */}
                      <div className="space-y-4 h-full ">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium">
                            DPP
                          </label>
                          <input
                            type="text"
                            className="p-2 border rounded w-full bg-gray-100"
                            value={dpp}
                            onChange={handleDppChange}
                            readOnly
                            placeholder="Rp 0"
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 ">
                            <input
                              type="checkbox"
                              className="justify-start p-3 border rounded"
                              checked={isChecked}
                              onChange={handleCheckboxChange}
                              disabled={kode_transaksi === "01"}
                            />
                            <label className="block text-sm font-medium">
                              DPP Nilai Lain / DPP
                            </label>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium"></label>
                            <input
                              type="text"
                              className={`
                                                            p-2 border rounded w-full
                                                            ${
                                                              isChecked
                                                                ? ""
                                                                : "bg-gray-100"
                                                            }
                                                        `}
                              value={jumlah}
                              onChange={handleJumlahChange}
                              disabled={!isChecked}
                              placeholder="Rp 0"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm font-medium">
                              PPN
                            </label>
                            <input
                              type="text"
                              className="p-2 border rounded w-full bg-gray-100"
                              value="12%"
                              readOnly
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm font-medium">
                              Tarif PPN
                            </label>
                            <input
                              type="text"
                              className="p-2 border rounded w-full bg-gray-100"
                              value={ppn}
                              readOnly
                              placeholder="Rp 0"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm font-medium">
                              Tarif PPnBM (%)
                            </label>
                            <input
                              type="text"
                              className="p-2 border rounded w-full"
                              value={tarif_ppnbm}
                              onChange={handleTarifPPnBMChange}
                              placeholder="Masukkan persen"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm font-medium">
                              PPnBM
                            </label>
                            <input
                              type="text"
                              className="p-2 border rounded w-full"
                              value={ppnbm}
                              onChange={handlePPnBMChange}
                              placeholder="Rp 0"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <AlertDialogFooter className="flex justify-end mt-6 space-x-2">
                      <AlertDialogCancel
                        onClick={handleCancelEdit}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                      >
                        Batal
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
                        onClick={handleSimpanTransaksi}
                      >
                        {editMode ? "Perbarui" : "Simpan"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <div className=" w-auto overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
                <table className="table-auto border border-gray-300 overflow-hidden">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 px-1 py-2">No</th>
                      <th className="border border-gray-300 px-4 py-2">
                        Checklist
                      </th>
                      <th className="border border-gray-300 px-4 py-2">Aksi</th>
                      <th className="border border-gray-300 px-4 py-2">Tipe</th>
                      <th className="border border-gray-300 px-4 py-2">Nama</th>
                      <th className="border border-gray-300 px-4 py-2">Kode</th>
                      <th className="border border-gray-300 px-4 py-2">
                        Kuantitas
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Satuan
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Harga Satuan
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Total Harga
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Pemotongan Harga
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Tarif PPn
                      </th>
                      <th className="border border-gray-300 px-4 py-2">PPn</th>
                      <th className="border border-gray-300 px-4 py-2">DPP</th>
                      <th className="border border-gray-300 px-4 py-2">
                        DPP Nilai Lain / DPP
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        PPnMB
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Tarif PPnBM
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    {savedTransaksi && savedTransaksi.length > 0 ? (
                      savedTransaksi.map((item, index) => (
                        <tr
                          key={item.id}
                          className={index % 2 === 0 ? "bg-gray-100" : ""}
                        >
                          <td className="px-1 py-2 border">{index + 1}</td>
                          <td className="px-1 py-2 border">
                            <input type="checkbox" className="w-4 h-4" />
                          </td>
                          <td className="px-1 py-2 border">
                            <button
                              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded text-xs"
                              onClick={() => handleEditTransaksi(item.id)}
                            >
                              Edit
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-xs ml-1"
                              onClick={() => handleHapusTransaksi(item.id)}
                            >
                              Hapus
                            </button>
                          </td>

                          <td className="px-2 py-2 border">{item.tipe}</td>
                          <td className="px-2 py-2 border">{item.nama}</td>
                          <td className="px-2 py-2 border">{item.kode}</td>
                          <td className="px-2 py-2 border">{item.kuantitas}</td>
                          <td className="px-2 py-2 border">{item.satuan}</td>
                          <td className="px-2 py-2 border">
                            {item.harga_satuan}
                          </td>
                          <td className="px-2 py-2 border">
                            {item.total_harga}
                          </td>
                          <td className="px-2 py-2 border">
                            {item.pemotongan_harga}
                          </td>
                          <td className="px-2 py-2 border">{item.ppn}</td>
                          <td className="px-2 py-2 border">
                            {item.ppnNominal}
                          </td>
                          <td className="px-2 py-2 border">{item.dpp}</td>
                          <td className="px-2 py-2 border">{item.jumlah}</td>
                          <td className="px-2 py-2 border">{item.ppnbm}</td>
                          <td className="px-2 py-2 border">
                            {item.tarif_ppnbm}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="17" className="text-center p-4 border">
                          Belum ada data
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="flex justify-end mt-4 gap-3">
            <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
              Batal
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default EditFakturKeluaran;
