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
import { useParams } from "react-router";

const TambahFakturKeluaran = ({ sidebar }) => {
  const [showDokumenTransaksi, setShowDokumenTransaksi] = useState(false);
  const [showInformasiPembeli, setShowInformasiPembeli] = useState(false);
  const [showDetailTransaksi, setShowDetailTransaksi] = useState(false);
  const [kodeTransaksi, setKodeTransaksi] = useState("");
  const [harga, setHarga] = useState("");
  const [kuantitas, setKuantitas] = useState(0);
  const [totalHarga, setTotalHarga] = useState("");
  const [potonganHarga, setPotonganHarga] = useState("");
  const [dpp, setDPP] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date());
  const [informasiTambahan, setInformasiTambahan] = useState("");
  const [tipe, setTipe] = useState("");
  const [selectedKode, setSelectedKode] = useState("");
  const [selectedSatuan, setSelectedSatuan] = useState("");
  const [listSatuan, setListSatuan] = useState([]);
  const [listKode, setListKode] = useState([]);
  const [capFasilitas, setCapFasilitas] = useState("");
  const [nomorPendukung, setNomorPendukung] = useState("");

  const [isChecked, setIsChecked] = useState(false);
  const [jumlah, setJumlah] = useState(formatRupiah(dpp.toString()));
  const [tarifPPN, setTarifPPN] = useState("Rp 0");
  const [tarifPPnBM, setTarifPPnBM] = useState("");
  const [ppnBM, setPPnBM] = useState("Rp 0");
  const [isCustomPPnBM, setIsCustomPPnBM] = useState(false);

  const { id, akun } = useParams();

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
    setHarga(formatRupiah(rawValue));

    const newTotalHarga = numericHarga * kuantitas;
    setTotalHarga(formatRupiah(newTotalHarga.toString()));
    const newDPP =
      newTotalHarga - (parseInt(potonganHarga.replace(/\D/g, ""), 10) || 0);
    setDPP(formatRupiah(newDPP.toString()));
    if (!isChecked) {
      setJumlah(formatRupiah(newDPP.toString()));
    }
  };

  const handleInformasiTambahanChange = (e) => {
    const selectedInfo = e.target.value;
    setInformasiTambahan(selectedInfo);

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
    const qty = parseInt(e.target.value, 10) || 0;
    setKuantitas(qty);

    const numericHarga = parseInt(harga.replace(/\D/g, ""), 10) || 0;
    const newTotalHarga = numericHarga * qty;
    setTotalHarga(formatRupiah(newTotalHarga.toString()));
    const newDPP =
      newTotalHarga - (parseInt(potonganHarga.replace(/\D/g, ""), 10) || 0);
    setDPP(formatRupiah(newDPP.toString()));
    if (!isChecked) {
      setJumlah(formatRupiah(newDPP.toString()));
    }
  };

  const handlePotonganHargaChange = (e) => {
    const rawValue = e.target.value;
    const numericPotongan = parseInt(rawValue.replace(/\D/g, ""), 10) || 0;
    setPotonganHarga(formatRupiah(rawValue));

    const numericTotalHarga = parseInt(totalHarga.replace(/\D/g, ""), 10) || 0;
    const newDPP = numericTotalHarga - numericPotongan;
    setDPP(formatRupiah(newDPP.toString()));
    if (!isChecked) {
      setJumlah(formatRupiah(newDPP.toString()));
    }
  };
  const handleKodeTransaksiChange = (event) => {
    setKodeTransaksi(event.target.value);
  };

  useEffect(() => {
    if (kodeTransaksi === "01") {
      setIsChecked(false);
    }
  }, [kodeTransaksi]);

  function updateTarifPPN(newJumlah) {
    const numericJumlah = parseInt(newJumlah.replace(/\D/g, ""), 10) || 0;
    setTarifPPN(formatRupiah((numericJumlah * 0.12).toString())); // PPN 12%

    // Hitung PPnBM jika PPnBM belum diedit manual
    if (!isCustomPPnBM) {
      const numericPPnBM = parseInt(tarifPPnBM.replace(/\D/g, ""), 10) || 0;
      setPPnBM(formatRupiah(((numericJumlah * numericPPnBM) / 100).toString()));
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
        parseInt(e.target.value.replace(/\D/g, ""), 10) || 0;
      const formattedJumlah = formatRupiah(numericJumlah.toString());
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
      setPPnBM(formatRupiah(((numericJumlah * numericPPnBM) / 100).toString()));
    }
  };

  const handlePPnBMChange = (e) => {
    setIsCustomPPnBM(true); // Tandai bahwa user mengedit manual
    setPPnBM(formatRupiah(e.target.value));

    // Jika nilai PPnBM dikosongkan, hitung ulang berdasarkan tarif PPnBM
    if (e.target.value === "" || e.target.value === "Rp 0") {
      setIsCustomPPnBM(false); // Reset custom edit jika dikosongkan
      const numericJumlah = parseInt(jumlah.replace(/\D/g, ""), 10) || 0;
      const numericPPnBM = parseInt(tarifPPnBM.replace(/\D/g, ""), 10) || 0;
      setPPnBM(formatRupiah(((numericJumlah * numericPPnBM) / 100).toString()));
    }
  };

  const handleDppChange = (e) => {
    const value = e.target.value;
    setDpp(value);
    if (!isChecked) {
      setJumlah(value); // Jika checkbox tidak dicentang, jumlah selalu mengikuti DPP
    }
  };

  useEffect(() => {
    const formattedDPP = formatRupiah(dpp.toString());
    setJumlah(formattedDPP);
    updateTarifPPN(dpp.toString());
  }, [dpp]);

  const resetForm = () => {
    setHarga("Rp 0");
    setKuantitas(0);
    setTotalHarga("Rp 0");
    setPotonganHarga("Rp 0");
    setDpp("Rp 0");
    setJumlah("Rp 0");
    setTarifPPN("Rp 0");
    setTarifPPnBM("");
    setPPnBM("Rp 0");
    setIsChecked(false);
  };

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
                  className="justify-start p-3 border rounded"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Pelunasan</label>
                <input
                  type="checkbox"
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
                  value={kodeTransaksi}
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
                <input type="date" className="p-2 border rounded w-full" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Jenis Faktur
                </label>
                <input
                  type="text"
                  value="Normal"
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
                  <select className="p-2 border rounded w-full">
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
                        value={informasiTambahan}
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
                        value={capFasilitas}
                        disabled
                      >
                        <option value="">Pilih Cap Fasilitas</option>
                        <option value="X">Fasilitas X</option>
                        <option value="Y">Fasilitas Y</option>
                        <option value="Z">Fasilitas Z</option>
                      </select>
                    </div>

                    {/* Nomor Pendukung (Muncul hanya untuk Informasi A atau B) */}
                    {(informasiTambahan === "A" ||
                      informasiTambahan === "B") && (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">
                          Nomor Pendukung
                        </label>
                        <input
                          type="text"
                          className="p-2 border rounded w-full"
                          placeholder="Masukkan Nomor Pendukung"
                          value={nomorPendukung}
                          onChange={(e) => setNomorPendukung(e.target.value)}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Referensi</label>
                <input type="text" className="p-2 border rounded w-full" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Pilih Alamat
                </label>
                <input
                  type="text"
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
                <input type="text" className="p-2 border rounded w-full" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">ID</label>
                <div className="grid grid-cols-2 gap-3 ">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="identification"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      value="NPWP"
                    />
                    <label className="text-sm">NPWP</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="identification"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      value="Paspor"
                    />
                    <label className="text-sm">Paspor</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="identification"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      value="NIK"
                    />
                    <label className="text-sm">NIK</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="identification"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      value="Identitas Lain"
                    />
                    <label className="text-sm">Identitas Lain</label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Negara</label>
                <input type="text" className="p-2 border rounded w-full" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Nomor Dokumen
                </label>
                <input
                  type="text"
                  className="p-2 border rounded w-full bg-gray-100"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Nama</label>
                <input type="text" className="p-2 border rounded w-full" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Alamat</label>
                <input
                  type="text"
                  className="p-2 border rounded w-full"
                  disabled
                  placeholder="Ngelink kang"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">IDTKU</label>
                <input
                  type="text"
                  className="p-2 border rounded w-full bg-gray-100"
                  value="000000"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Email</label>
                <input type="text" className="p-2 border rounded w-full" />
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
                            value={harga}
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
                            value={totalHarga}
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
                            value={potonganHarga}
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
                              value={tarifPPN}
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
                              value={tarifPPnBM}
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
                              value={ppnBM}
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
                      <AlertDialogAction className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950">
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
                    <tr>
                      <tr>
                        <td colSpan="10" className="text-center p-4 border">
                          Belum ada data
                        </td>
                      </tr>
                    </tr>
                    {/* <tr className="bg-gray-100">
                                        <td className="px-1 py-4 border">
                                            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded">Edit</button>
                                            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded ml-2">Lihat</button>
                                        </td>
                                        <td className="px-4 py-4 border">1234567890</td>
                                        <td className="px-4 py-4 border">Jenis Tempat Kegiatan Usaha</td>
                                        <td className="px-4 py-4 border">Nama Tempat Kegiatan Usaha</td>
                                        <td className="px-4 py-4 border">Kode KLU Tempat Kegiatan Usaha</td>
                                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="flex justify-end mt-4 gap-3">
            <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
              Batal
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Simpan
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default TambahFakturKeluaran;
