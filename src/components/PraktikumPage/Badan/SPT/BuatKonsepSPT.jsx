import React, { useState } from 'react';
import SideBarSPT from './SideBarSPT';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { IoDocumentTextOutline } from "react-icons/io5";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BuatKonsepSPT = () => {
    const [selectedType, setSelectedType] = useState("");
    const [step, setStep] = useState(1);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedModelSPT, setSelectedModelSPT] = useState("");
    const [modelTouched, setModelTouched] = useState(false);

    const taxTypes = [
        { label: "PPn", value: "ppn" },
        { label: "PPh Pasal 21/26", value: "pasal" },
        { label: "PPh Unifikasi", value: "unifikasi" },
        { label: "PPh Badan", value: "Badan" },
    ];

    const handleNext = () => {
        if (step === 1 && selectedType) {
            setStep(2);
        } else if (step === 2) {
            if (
                (selectedType === "ppn" && selectedMonth && selectedYear) ||
                (selectedType !== "ppn" && getSelectedPeriod())
            ) {
                setStep(3);
            }
        }
    };

    const modelSPTOptions = [
        { label: "Normal", value: "normal" },
        { label: "Pembetulan", value: "pembetulan" }
    ];

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const getSelectedPeriod = () => {
        if (selectedType === "ppn" && selectedMonth && selectedYear) {
            return `${selectedMonth}-${selectedYear}`;
        }
        return null;
    };

    const renderStep2Form = () => {
        switch (selectedType) {
            case "ppn":
                return (
                    <>
                        <label className="block text-normal font-medium text-gray-700">
                            Periode dan Tahun Pajak <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                            <div className='w-40'>
                                <label className="block text-normal font-medium text-gray-700">
                                    Bulan <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    className="w-40 border rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500 border-gray-300 "
                                >
                                    <option value="">Pilih Bulan</option>
                                    <option value="01">Januari</option>
                                    <option value="02">Februari</option>
                                    <option value="03">Maret</option>
                                    <option value="04">April</option>
                                    <option value="05">Mei</option>
                                    <option value="06">Juni</option>
                                    <option value="07">Juli</option>
                                    <option value="08">Agustus</option>
                                    <option value="09">September</option>
                                    <option value="10">Oktober</option>
                                    <option value="11">November</option>
                                    <option value="12">Desember</option>
                                </select>
                            </div>
                            <div className='w-40'>
                                <label className="block text-normal font-medium text-gray-700">
                                    Tahun <span className="text-red-500">*</span>
                                </label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button className="w-40 bg-white hover:bg-white text-black border rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500 border-gray-300">
                                            {selectedYear || "Pilih Tahun"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-48">
                                        <DatePicker
                                            selected={selectedYear ? new Date(parseInt(selectedYear), 0) : null}
                                            onChange={(date) => setSelectedYear(date.getFullYear().toString())}
                                            showYearPicker
                                            dateFormat="yyyy"
                                            className="w-full"
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </>
                );
            case "pasal":
                return (
                    <>
                        <label className="block text-sm font-medium text-gray-700">
                            Masa Pajak PPh Pasal 21/26
                        </label>
                        <select
                            value={getSelectedPeriod()}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="w-full border rounded px-4 py-2 border-gray-300"
                        >
                            <option value="">Pilih Masa Pajak</option>
                            <option value="jan-2025">Januari 2025</option>
                        </select>
                    </>
                );
            case "unifikasi":
                return (
                    <>
                        <label className="block text-sm font-medium text-gray-700">
                            Periode Unifikasi Pajak
                        </label>
                        <select
                            value={getSelectedPeriod()}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="w-full border rounded px-4 py-2 border-gray-300"
                        >
                            <option value="">Pilih Periode</option>
                            <option value="2025-Q1">Q1 2025</option>
                        </select>
                    </>
                );
            case "Badan":
                return (
                    <>
                        <label className="block text-sm font-medium text-gray-700">
                            Tahun Pajak untuk PPh Badan
                        </label>
                        <select
                            value={getSelectedPeriod()}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="w-full border rounded px-4 py-2 border-gray-300"
                        >
                            <option value="">Pilih Tahun</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                        </select>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex bg-white h-screen">
            <SideBarSPT />
            <div className="flex-1 p-3 bg-white rounded-md h-full">
                <Card className="w-full bg-gray-100 shadow-sm rounded-none mb-6">
                    <CardContent className="flex items-center gap-2 py-4 px-6">
                        <IoDocumentTextOutline className="text-2xl text-blue-900" />
                        <h1 className="text-base md:text-lg font-semibold text-blue-900">
                            Buat Konsep SPT
                        </h1>
                    </CardContent>
                </Card>

                <div className="flex-1 bg-white px-10 pt-6 overflow-y-auto h-full">
                    <div className="relative flex justify-between items-center mb-10 px-2">
                        {[1, 2, 3].map((num, index) => (
                            <React.Fragment key={num}>
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300",
                                        step >= num ? "bg-yellow-400 text-white" : "bg-gray-300 text-white"
                                    )}>
                                        {num}
                                    </div>
                                    <span className={cn(
                                        "text-sm mt-1 text-center transition-colors duration-300",
                                        step === num ? "text-gray-800" : "text-gray-500"
                                    )}>
                                        {
                                            num === 1 ? "Pilih Jenis Pajak"
                                                : num === 2 ? "Pilih periode pelaporan SPT"
                                                    : "Pilih Jenis SPT"
                                        }
                                    </span>
                                </div>
                                {index < 2 && (
                                    <div className="absolute top-4 left-0 right-0 flex justify-between z-0 w-full px-5">
                                        <div className="flex-grow h-1 bg-gray-300 relative overflow-hidden mx-2 rounded">
                                            <div
                                                className="h-full bg-yellow-400 absolute left-0 top-0 transition-all duration-500 ease-in-out"
                                                style={{ width: `${step > index + 1 ? 100 : step === index + 1 ? 50 : 0}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>


                    {/* Langkah 1 */}
                    {step === 1 && (
                        <div>
                            <p className="text-normal text-gray-800 font-medium mb-4">
                                <strong>Langkah 1.</strong> Pilih jenis SPT yang akan dilaporkan
                            </p>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {taxTypes.map((type) => (
                                    <Card
                                        key={type.value}
                                        className={cn(
                                            " cursor-pointer hover:border-yellow-400",
                                            selectedType === type.value ? "border-yellow-400" : ""
                                        )}
                                        onClick={() => {
                                            setSelectedType(type.value);
                                            setSelectedMonth("");
                                            setSelectedYear("");
                                        }}
                                    >
                                        <CardContent className="p-4 text-center text-normal font-medium text-gray-700">
                                            {type.label}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                            <div className="mt-6">
                                <Button
                                    disabled={!selectedType}
                                    onClick={handleNext}
                                    className={cn(
                                        "w-full md:w-auto text-normal",
                                        selectedType ? "bg-yellow-400 hover:bg-yellow-500" : "bg-gray-400 cursor-not-allowed"
                                    )}
                                >
                                    Lanjut
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Langkah 2 */}
                    {step === 2 && (
                        <div>
                            <p className="text-normal text-gray-800 font-medium mb-4">
                                <strong>Langkah 2.</strong> Pilih periode pelaporan untuk jenis pajak <span className="font-bold text-yellow-500 uppercase">{selectedType}</span>
                            </p>
                            <div className="space-y-4">
                                {renderStep2Form()}
                            </div>
                            <div className="mt-6 flex justify-between text-normal">
                                <Button variant="outline" onClick={handleBack} className="w-full md:w-auto text-normal">Kembali</Button>
                                <Button
                                    onClick={handleNext}
                                    disabled={selectedType === "ppn" ? !(selectedMonth && selectedYear) : !getSelectedPeriod()}
                                    className={cn(
                                        "bg-yellow-400 hover:bg-yellow-500 text-normal w-full md:w-auto",
                                        (selectedType === "ppn" && !(selectedMonth && selectedYear)) && "bg-gray-300 cursor-not-allowed hover:bg-gray-300"
                                    )}
                                >
                                    Lanjut
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Langkah 3 */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <p className="text-normal font-medium text-gray-800">
                                <strong>Langkah 3.</strong> Pilih Jenis SPT
                            </p>

                            <div className="mb-4 text-normal space-y-2">
                                <div>
                                    Jenis Surat Pemberitahuan Pajak : <strong>{selectedType === "ppn" ? "SPT Masa PPN" : "Jenis Pajak Lainnya"}</strong>
                                </div>
                                <div>
                                    Periode dan Tahun Pajak : <strong>{selectedType === "ppn" && selectedMonth && selectedYear ? `${new Date(`${selectedYear}-${selectedMonth}-01`).toLocaleString('id-ID', { month: 'long' })} ${selectedYear}` : "Belum dipilih"}</strong>
                                </div>
                            </div>

                            <div>
                                <label className="block text-normal font-medium text-gray-700 mb-1">
                                    Model SPT <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={selectedModelSPT}
                                    onChange={(e) => {
                                        setSelectedModelSPT(e.target.value);
                                        setModelTouched(true);
                                    }}
                                    className={cn("w-52 border rounded px-4 py-2", !selectedModelSPT && modelTouched ? "border-red-500 bg-red-50" : "border-gray-300")}
                                >
                                    <option value="">Pilih Jenis SPT</option>
                                    {modelSPTOptions.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                                {!selectedModelSPT && modelTouched && (
                                    <p className="text-sm text-red-600 mt-1">Kolom ini wajib diisi!</p>
                                )}
                            </div>

                            <div className="mt-6 flex justify-between text-normal">
                                <Button variant="outline" onClick={handleBack} className="w-full md:w-auto text-normal">Kembali</Button>
                                <Button
                                    disabled={!selectedModelSPT}
                                    className={cn("w-full md:w-auto", selectedModelSPT ? "bg-yellow-400 hover:bg-yellow-500" : "bg-gray-300 text-white cursor-not-allowed text-normal")}
                                    onClick={() => window.location.href = '/admin/praktikum/2/surat-pemberitahuan-(spt)/tambah-konsep-spt'}
                                >
                                    Buat Konsep SPT
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BuatKonsepSPT;
