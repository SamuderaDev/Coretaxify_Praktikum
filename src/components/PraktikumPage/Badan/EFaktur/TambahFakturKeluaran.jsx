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
import { RoutesApi } from "@/Routes";
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
import { useMutation } from "@tanstack/react-query";
import { getCsrf } from "@/service/getCsrf";
import { useCookies } from "react-cookie";
import { RoutesApi as RoutesApiReal } from "@/Routes";

const TambahFakturKeluaran = ({}) => {
  const [showDokumenTransaksi, setShowDokumenTransaksi] = useState(false);
  const [showInformasiPembeli, setShowInformasiPembeli] = useState(false);
  const [showDetailTransaksi, setShowDetailTransaksi] = useState(false);
  const [kodeTransaksi, setKodeTransaksi] = useState("");
  const [harga_satuan, setHarga] = useState("");
  const [kuantitas, setKuantitas] = useState(0);
  const [total_harga, setTotalHarga] = useState("");
  const [pemotongan_harga, setPotonganHarga] = useState("");
  const [dpp, setDPP] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date());
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

  const [cookies] = useCookies(["token"]);

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
      kodeTransaksi: value,
    }));
  };
  useEffect(() => {
    if (kodeTransaksi === "01") {
      setIsChecked(false);
    }
  }, [kodeTransaksi]);

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
    if (kodeTransaksi !== "01") {
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
    kodeTransaksi: "",
    tanggalFaktur: "",
    jenisFaktur: "Normal",
    masaPajak: "",
    tahun: new Date().getFullYear(),
    informasi_tambahan: "",
    cap_fasilitas: "",
    nomorPendukung: "",
    referensi: "",
    alamat: "",
    idtku: "000000",
    npwp: "",
    identification: "",
    negara: "",
    nomorDokumen: "",
    nama: "",
    email: "",
    detail_transaksi: [],
  });

  const [namaBarang, setNamaBarang] = useState("");

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

    const newTransaksi = {
      id: Date.now(),
      tipe,
      nama: namaBarang,
      kode: selectedKode,
      satuan: selectedSatuan,
      harga_satuan,
      kuantitas,
      total_harga,
      pemotongan_harga,
      dpp,
      jumlah,
      ppn: "12%",
      ppnNominal: ppn,
      tarif_ppnbm,
      ppnbm,
    };

    const updatedTransaksi = savedTransaksi
      ? [...savedTransaksi, newTransaksi]
      : [newTransaksi];
    setSavedTransaksi(updatedTransaksi);

    setFormData((prev) => ({
      ...prev,
      detail_transaksi: updatedTransaksi,
    }));

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
      setTipe(transaksiToEdit.tipe);
      setNamaBarang(transaksiToEdit.nama);
      setSelectedKode(transaksiToEdit.kode);
      setSelectedSatuan(transaksiToEdit.satuan);
      setHarga(transaksiToEdit.harga_satuan);
      setKuantitas(transaksiToEdit.kuantitas);
      setTotalHarga(transaksiToEdit.total_harga);
      setPotonganHarga(transaksiToEdit.pemotongan_harga);
      setDPP(transaksiToEdit.dpp);
      setJumlah(transaksiToEdit.jumlah);
      setTarifPPnBM(transaksiToEdit.tarif_ppnbm);
      setPPnBM(transaksiToEdit.ppnbm);

      handleHapusTransaksi(id);
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
      return axios.post(
        `${RoutesApiReal.url}api/student/assignments/1/sistem/2/faktur`,
        // `${RoutesApiReal.url}api/student/assignments/${id}/sistem/${akun}/faktur`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${cookies.token}`,
          },
          params: {
            intent: "api.create.faktur.draft",
          },
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
      dpp: totalDPP,
      ppn: totalPPN,
      ppnbm: totalPPnBM,
      //   totalTagihan: formatRupiah((totalDPP + totalPPN + totalPPnBM).toString()),
    };
    // alert(finalFormData)

    console.log(finalFormData);
    // createDraftFaktur.mutate(finalFormData);
  };

  const handleSimpan = () => {
    const data = {
      dokumenTransaksi: {
        uangMuka,
      },
    };
  };

  return (
    console.log(""),
    console.log("Rendering TambahFakturKeluaran"),
    (
      <div className="flex h-screen bg-gray-100">
        <SideBarEFaktur />
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
                  name="kodeTransaksi"
                  value={formData.kodeTransaksi}
                  onChange={handleKodeTransaksiChange}
                >
                  <option value="">Pilih Kode Transaksi</option>
                  <option value="01">01 - kepada selain pemungut PPN</option>
                  <option value="02">
                    02 - kepada Pemungut PPN Instansi Pemerintah
                  </option>
                  <option value="03">
                    03 - kepada Pemungut PPN selain instansi Pemerintah
                  </option>
                  <option value="04">04 - DPP Nilai Lain</option>
                  <option value="05">05 - Besaran tertentu</option>
                  <option value="06">
                    06 - kepada orang pribadi pemegang paspor luar negeri (16E
                    UU PPN)
                  </option>
                  <option value="07">
                    07 - penyerahan dengan fasilitas PPN atau PPN{" "}
                  </option>
                  <option value="08">
                    08 - penyerahan aktiva dengan fasilitas dibebaskan PPN atau
                    PPN dan PPnBM
                  </option>
                  <option value="09">
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
                  value={formData.tanggalFaktur}
                  onChange={handleChange}
                  name="tanggalFaktur"
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
                    name="masaPajak"
                    value={formData.masaPajak}
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
                      <DatePicker
                        selected={selectedYear}
                        onChange={(date) => setSelectedYear(date)}
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
                {(kodeTransaksi === "07" || kodeTransaksi === "08") && (
                  <>
                    {/* Informasi Tambahan */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">
                        Informasi Tambahan
                      </label>
                      <select
                        className="p-2 border rounded w-full"
                        value={informasi_tambahan}
                        onChange={handleInformasiTambahanChange}
                      >
                        <option value="">Pilih Informasi Tambahan</option>
                        <option value="A">Informasi A</option>
                        <option value="B">Informasi B</option>
                        <option value="C">Informasi C</option>
                      </select>
                    </div>

                    {/* Cap Fasilitas (Disabled) */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">
                        Cap Fasilitas
                      </label>
                      <select
                        className="p-2 border rounded w-full bg-gray-100"
                        value={cap_fasilitas}
                        disabled
                      >
                        <option value="">Pilih Cap Fasilitas</option>
                        <option value="X">Fasilitas X</option>
                        <option value="Y">Fasilitas Y</option>
                        <option value="Z">Fasilitas Z</option>
                      </select>
                    </div>

                    {/* Nomor Pendukung (Muncul hanya untuk Informasi A atau B) */}
                    {(informasi_tambahan === "A" ||
                      informasi_tambahan === "B") && (
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
                <input
                  type="text"
                  name="npwp"
                  value={formData.npwp}
                  onChange={handleChange}
                  className="p-2 border rounded w-full"
                />
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
                  value={formData.nama}
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
                      Tambah
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white rounded-md shadow-md p-4 !min-w-[1000px]">
                    <AlertDialogHeader className="text-lg font-semibold ">
                      <AlertDialogTitle className="text-lg font-semibold border-b pb-2 w-full">
                        Tambah Transaksi
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
                              disabled={kodeTransaksi === "01"}
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
                      <AlertDialogCancel className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                        Batal
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
                        onClick={handleSimpanTransaksi}
                      >
                        Simpan
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

export default TambahFakturKeluaran;
