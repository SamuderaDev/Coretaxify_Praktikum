import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Select from 'react-select';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";

const CreateEbupot = () => {
    const [showInformaiUmumBupot, setShowInformasiUmumBupot] = useState(false);
    const [showFasilitasPerpajakan, setShowFasilitasPerpajakan] = useState(false);
    const [selectedYear, setSelectedYear] = useState(new Date());
    const [pegawaiAsing, setPegawaiAsing] = useState('');
    const [selectedNegara, setSelectedNegara] = useState(null);
    const [selectedStatusPTKP, setSelectedStatusPTKP] = useState(null);
    const [namaObjekPajak, setNamaObjekPajak] = useState('');
    const [kodeObjekPajak, setKodeObjekPajak] = useState('');
    const [penghasilanBruto, setPenghasilanBruto] = useState('');
    const [penghasilanBrutoRaw, setPenghasilanBrutoRaw] = useState(0);
    const [fasilitasPajak, setFasilitasPajak] = useState('');


    const formatRupiah = (value) => {
        const numberString = value.replace(/[^\d]/g, '');
        return new Intl.NumberFormat('id-ID').format(numberString);
    };

    const handlePenghasilanChange = (e) => {
        const rawInput = e.target.value.replace(/[^\d]/g, '');
        const formatted = new Intl.NumberFormat('id-ID').format(rawInput);

        setPenghasilanBruto(formatted);        // tampil di input (pakai titik)
        setPenghasilanBrutoRaw(Number(rawInput)); // nilai bersih (tanpa titik)
    };
    



    return (
        
        <div className="flex h-screen bg-gray-100">
            <div className="flex-auto p-3 bg-white rounded-md h-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-light text-yellow-500 mt-4">EBUPOT MP</h2>
                </div>
                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full" onClick={() => setShowInformasiUmumBupot(!showInformaiUmumBupot)}>
                    <h3 className='text-lg font-semibold'>Informasi Umum</h3>
                    {showInformaiUmumBupot ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {showInformaiUmumBupot && (
                    <div className="border rounded-md p-4 mb-2 bg-white">
                        <div className="space-y-4">
                            {/* Masa Pajak */}
                            <div className="flex gap-2">
                                <div className='w-1/2'>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Bulan<span className="text-red-500">*</span>
                                    </label>
                                    <Select
                                        className="w-full"
                                        placeholder="Pilih Bulan"
                                        options={[
                                            { value: "01", label: "Januari" },
                                            { value: "02", label: "Februari" },
                                            { value: "03", label: "Maret" },
                                            { value: "04", label: "April" },
                                            { value: "05", label: "Mei" },
                                            { value: "06", label: "Juni" },
                                            { value: "07", label: "Juli" },
                                            { value: "08", label: "Agustus" },
                                            { value: "09", label: "September" },
                                            { value: "10", label: "Oktober" },
                                            { value: "11", label: "November" },
                                            { value: "12", label: "Desember" }
                                        ]}
                                        onChange={(selectedOption) => {
                                            // Handle the selected month here
                                            // You might need to update state or formData
                                        }}
                                    />
                                </div>
                                <div className='w-1/2'>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Tahun<span className="text-red-500">*</span>
                                    </label>
                                    <Popover className="w-full p-2">
                                        <PopoverTrigger asChild >
                                            <Button variant="outline" className="w-full justify-start ">
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
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Status<span className="text-red-500">*</span>
                                </label>
                                <select className='w-full border p-2 rounded'>
                                    <option value="">Please Select</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Pembetulan">Pembetulan</option>
                                </select>
                            </div>

                            {/* Pegawai Asing */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Pegawai Asing<span className="text-red-500">*</span>
                                </label>
                                <select
                                    className="w-full border p-2 rounded"
                                    value={pegawaiAsing}
                                    onChange={(e) => setPegawaiAsing(e.target.value)}
                                >
                                    <option value="">Please select</option>
                                    <option value="Ya">Ya</option>
                                    <option value="Tidak">Tidak</option>
                                </select>
                            </div>

                            {/* NPWP */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    NPWP<span className="text-red-500">*</span>
                                </label>
                                <select className='w-full border p-2 rounded'>
                                    <option value="">Link dari data master</option>
                                </select>
                            </div>

                            {/* Nama */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Nama<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="w-full border p-2 rounded bg-gray-100"
                                    disabled
                                />
                            </div>

                            {/* Alamat */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Alamat<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="w-full border p-2 rounded bg-gray-100"
                                    disabled
                                />
                            </div>

                            {/* Nomor Paspor */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Nomor Paspor
                                </label>
                                <input
                                    type="text"
                                    className={`w-full border p-2 rounded ${pegawaiAsing === 'Ya' ? 'bg-white' : 'bg-gray-100'}`}
                                    disabled={pegawaiAsing !== 'Ya'}
                                />
                            </div>

                            {/* Negara */}
                            <label className="block text-sm font-medium text-gray-700">
                                Negara
                            </label>
                            <Select
                                isDisabled={pegawaiAsing !== 'Ya'}
                                placeholder="Pilih Negara"
                                className="w-full "
                                value={selectedNegara}
                                onChange={(selected) => setSelectedNegara(selected)}
                                options={[
                                    { value: 'ID', label: 'Indonesia' },
                                    { value: 'MY', label: 'Malaysia' },
                                    { value: 'SG', label: 'Singapura' },
                                    { value: 'JP', label: 'Jepang' },
                                    { value: 'US', label: 'Amerika Serikat' },
                                    { value: 'UK', label: 'Inggris' },
                                ]}
                            />

                            {/* Status PTKP */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Status PTKP<span className="text-red-500">*</span>
                                </label>
                                <Select
                                    placeholder="Pilih Status PTKP"
                                    className="w-full "
                                    value={selectedStatusPTKP}
                                    onChange={(selected) => setSelectedStatusPTKP(selected)}
                                    options={[
                                        { value: 'K/0', label: 'K/0' },
                                        { value: 'K/1', label: 'K/1' },
                                        { value: 'K/2', label: 'K/2' },
                                        { value: 'K/3', label: 'K/3' },
                                        { value: 'TK/0', label: 'TK/0' },
                                        { value: 'TK/1', label: 'TK/1' },
                                        { value: 'TK/2', label: 'TK/2' },
                                        { value: 'TK/3', label: 'TK/3' },
                                    ]}
                                />
                            </div>

                            {/* Posisi */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Posisi<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="w-full border p-2 rounded "
                                />
                            </div>
                        </div>
                    </div>
                )}
                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full" onClick={() => setShowFasilitasPerpajakan(!showFasilitasPerpajakan)}>
                    <h3 className='text-lg font-semibold'>Fasilitas Perpajakan</h3>
                    {showFasilitasPerpajakan ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {showFasilitasPerpajakan && (
                    <div className="border rounded-md p-4 mb-2 bg-white">
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Fasilitas Pajak yang dimiliki penyetor<span className="text-red-500">*</span>
                            </label>
                            <select
                                className='w-full border p-2 rounded'
                                value={fasilitasPajak}
                                onChange={(e) => setFasilitasPajak(e.target.value)}
                            >
                                <option value="">Please Select</option>
                                <option value="Fasilitas Lainnya">Fasilitas Lainnya</option>
                                <option value="Ditanggung Pemerintah">PPh Ditanggung Pemerintah (DTP)</option>
                                <option value="Tanpa Fasilitas">Tanpa Fasilitas</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Nama Objek Pajak<span className="text-red-500">*</span>
                            </label>
                            <select
                                className="w-full border p-2 rounded"
                                value={namaObjekPajak}
                                onChange={(e) => {
                                    const selectedValue = e.target.value;
                                    setNamaObjekPajak(selectedValue);
                                    switch (selectedValue) {
                                        case "Penghasilan yang diterima atau diperoleh pegawai tetap":
                                            setKodeObjekPajak("21-100-01");
                                            break;
                                        case "Penghasilan yang diterima atau diperoleh secara teratur":
                                            setKodeObjekPajak("21-100-02");
                                            break;
                                        case "Penghasilan yang diterima atau diperoleh Pegawai tetap yang menerima fasilitas di daerah tertentu":
                                            setKodeObjekPajak("21-100-03");
                                            break;
                                        default:
                                            setKodeObjekPajak("");
                                    }
                                }}
                            >
                                <option value="">Please Select</option>
                                <option value="Penghasilan yang diterima atau diperoleh pegawai tetap">
                                    Penghasilan yang diterima atau diperoleh pegawai tetap
                                </option>
                                <option value="Penghasilan yang diterima atau diperoleh secara teratur">
                                    Penghasilan yang diterima atau diperoleh secara teratur
                                </option>
                                <option value="Penghasilan yang diterima atau diperoleh Pegawai tetap yang menerima fasilitas di daerah tertentu">
                                    Penghasilan yang diterima atau diperoleh Pegawai tetap yang menerima fasilitas di daerah tertentu
                                </option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Jenis Pajak
                            </label>
                            <input type="text" className="w-full border p-2 rounded bg-gray-100" value="Pasal 21" disabled />
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Kode Objek Pajak
                            </label>
                            <select
                                className="w-full border p-2 rounded bg-gray-100"
                                value={kodeObjekPajak}
                                onChange={(e) => setKodeObjekPajak(e.target.value)}
                                disabled
                            >
                                <option value="">Please Select</option>
                                <option value="21-100-01">21-100-01</option>
                                <option value="21-100-02">21-100-02</option>
                                <option value="21-100-03">21-100-03</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Penghasilan Bruto (RP)<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded"
                                placeholder="Masukkan Penghasilan Bruto"
                                value={penghasilanBruto}
                                onChange={handlePenghasilanChange}
                                onWheel={(e) => e.target.blur()}
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Tarif (%) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                className={`w-full border p-2 rounded ${["Ditanggung Pemerintah", "Tanpa Fasilitas"].includes(fasilitasPajak) ? "bg-gray-100" : "bg-white"}`}
                                placeholder="Masukkan Tarif"
                                onWheel={(e) => e.target.blur()}
                                disabled={["Ditanggung Pemerintah", "Tanpa Fasilitas"].includes(fasilitasPajak)}
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Penghasilan yang dipotong <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                className={`w-full border p-2 rounded ${["Ditanggung Pemerintah", "Tanpa Fasilitas"].includes(fasilitasPajak) ? "bg-gray-100" : "bg-white"}`}
                                placeholder="Masukkan Penghasilan yang dipotong"
                                onWheel={(e) => e.target.blur()}
                                disabled={["Ditanggung Pemerintah", "Tanpa Fasilitas"].includes(fasilitasPajak)}
                            />
                        </div>
                        <div className="mt-4">
                            <label className='block text-sm font-medium text-gray-700'>
                                KAP
                            </label>
                            <input 
                                type="text" 
                                className='w-full border p-2 rounded bg-gray-100' 
                                disabled
                                value="411121-100"
                            />
                        </div>
                        <div className="mt-4">
                            <label className='block text-sm font-medium text-gray-700'>
                                NITKU/Nomor Identitas Sub Unit Organisasi <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type="text"
                                className='w-full border p-2 rounded bg-gray-100'
                                disabled
                                value="Badan"
                            />
                        </div>
                    </div>
                )}
                <div className="flex justify-end mt-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Simpan</button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Simpan Draft</button>
                    <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Batalkan</button>
                </div>
            </div>
        </div>
    )
}

export default CreateEbupot;
