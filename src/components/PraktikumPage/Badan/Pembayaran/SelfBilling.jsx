import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RoutesApi } from "@/Routes";
import { useCookies } from "react-cookie";
import { ClipLoader } from "react-spinners";
import { getCsrf } from "@/service/getCsrf";

// Fungsi konversi angka ke terbilang (versi sederhana, bisa dikembangkan)
function numberToTerbilang(n) {
  const satuan = [
    "",
    "satu",
    "dua",
    "tiga",
    "empat",
    "lima",
    "enam",
    "tujuh",
    "delapan",
    "sembilan",
    "sepuluh",
    "sebelas",
  ];
  n = parseInt(n, 10);
  if (isNaN(n) || n < 0) return "";
  if (n < 12) return satuan[n];
  if (n < 20) return numberToTerbilang(n - 10) + " belas";
  if (n < 100)
    return (
      numberToTerbilang(Math.floor(n / 10)) +
      " puluh" +
      (n % 10 !== 0 ? " " + numberToTerbilang(n % 10) : "")
    );
  if (n < 200)
    return "seratus" + (n - 100 !== 0 ? " " + numberToTerbilang(n - 100) : "");
  if (n < 1000)
    return (
      numberToTerbilang(Math.floor(n / 100)) +
      " ratus" +
      (n % 100 !== 0 ? " " + numberToTerbilang(n % 100) : "")
    );
  if (n < 2000)
    return "seribu" + (n - 1000 !== 0 ? " " + numberToTerbilang(n - 1000) : "");
  if (n < 1000000)
    return (
      numberToTerbilang(Math.floor(n / 1000)) +
      " ribu" +
      (n % 1000 !== 0 ? " " + numberToTerbilang(n % 1000) : "")
    );
  if (n < 1000000000)
    return (
      numberToTerbilang(Math.floor(n / 1000000)) +
      " juta" +
      (n % 1000000 !== 0 ? " " + numberToTerbilang(n % 1000000) : "")
    );
  if (n < 1000000000000)
    return (
      numberToTerbilang(Math.floor(n / 1000000000)) +
      " miliar" +
      (n % 1000000000 !== 0 ? " " + numberToTerbilang(n % 1000000000) : "")
    );
  if (n < 1000000000000000)
    return (
      numberToTerbilang(Math.floor(n / 1000000000000)) +
      " triliun" +
      (n % 1000000000000 !== 0
        ? " " + numberToTerbilang(n % 1000000000000)
        : "")
    );
  return "terlalu besar";
}

// Fungsi format angka ke ribuan bertitik
function formatRupiah(angka) {
  if (!angka) return "";
  return angka.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const SelfBilling = ({ data: propData }) => {
  const [step, setStep] = useState(1);
  const [npwp, setNpwp] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [kapKjs, setKapKjs] = useState("");
  const [kapKjsId, setKapKjsId] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(null); // New state for month
  const [selectedYear, setSelectedYear] = useState(null); // New state for year
  const [nilaiTampil, setNilaiTampil] = useState("");
  const [nilaiAsli, setNilaiAsli] = useState("");
  const [terbilang, setTerbilang] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const navigate = useNavigate();

  console.log(propData);

  const { id, akun } = useParams();
  const [cookies] = useCookies(["token"]);
  const { data, isLoading, isError, error, isFetched } = useQuery({
    queryKey: ["account_data"],
    queryFn: async () => {
      const data = await axios.get(
        RoutesApi.apiUrl +
          `student/assignments/${id}/sistem/${id}/informasi-umum/${akun}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          params: {
            intent: "api.get.sistem.informasi.umum.badan",
          },
        }
      );

      return data.data;
    },
    // onSuccess: (fetchedData) => {
    //   // Update state when query succeeds
    //   console.log(fetchedData.data.data);
    //   );
    // },
  });

  useEffect(() => {
    if (isFetched && data) {
      console.log("Loading data:", data);
      setNpwp(data.data.npwp || "");
      setName(data.data.name || data.data.nama || "");
      setAddress(data.data.address || data.data.alamat || "");
      //   hasLoadedData.current = true;
    }
  }, [isFetched, data]);
  const steps = [
    {
      id: 1,
      title: "Verifikasi Identitas Wajib Pajak",
      description: (
        <p>
          Pastikan identitas wajib pajak Anda sudah benar dan lengkap sebelum
          melanjutkan ke tahap berikutnya.
        </p>
      ),
    },
    {
      id: 2,
      title: "Pilih KAP - KJS",
      description: (
        <>
          <p>
            <strong>KAP</strong> adalah kode yang mengidentifikasi jenis pajak
            yang harus dibayar oleh wajib pajak. Setiap jenis pajak, seperti
            Pajak Penghasilan (PPh), Pajak Pertambahan Nilai (PPN), dan pajak
            lainnya, memiliki KAP yang berbeda.
          </p>
          <p className="mt-2">
            <strong>KJS</strong> adalah kode yang menunjukkan jenis setoran
            pajak yang dilakukan oleh wajib pajak. Kode ini mencerminkan cara
            dan tujuan setoran, seperti pembayaran pajak terutang, setoran
            denda, atau setoran untuk angsuran.
          </p>
        </>
      ),
      fields: [
        {
          label: "KAP - KJS",
          type: "select",
          required: true,
          value: kapKjs,
          onChange: setKapKjs,
          options: [
            "411612-100 PPn Benda Meterai - Penjualan Meterai",
            "411121-100 PPh Pasal 21 - Potongan Gaji",
            "411122-200 PPh Final - Sewa Bangunan",
          ],
        },
        {
          label: "Bulan Pajak",
          type: "month",
          required: true,
          value: selectedMonth,
          onChange: setSelectedMonth,
        },
        {
          label: "Tahun Pajak",
          type: "year",
          required: true,
          value: selectedYear,
          onChange: setSelectedYear,
        },
      ],
    },
    {
      id: 3,
      title: "Selesai, Unduh Kode Pembayaran",
      description: (
        <p>
          Anda telah berhasil membuat kode billing. Silakan unduh kode
          pembayaran untuk proses selanjutnya.
        </p>
      ),
    },
  ];

  // Handle Next Step
  const handleNext = () => {
    if (step === 1 && (!npwp || !name || !address)) {
      Swal.fire({
        icon: "warning",
        title: "Data Belum Lengkap",
        text: "Mohon isi semua data terlebih dahulu.",
        confirmButtonColor: "#facc15",
      });
      return;
    }
    if (step === 2 && (!kapKjs || !selectedMonth || !selectedYear)) {
      Swal.fire({
        icon: "warning",
        title: "Data Belum Lengkap",
        text: "Mohon pilih KAP/KJS, bulan pajak, dan tahun pajak.",
        confirmButtonColor: "#facc15",
      });
      return;
    }
    setStep((prev) => Math.min(prev + 1, steps.length));
  };

  // Handle Back Step
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  // Handler untuk input nilai
  const handleNilaiChange = (val) => {
    // Hanya angka yang diizinkan
    const sanitized = val.replace(/[^0-9]/g, "");
    setNilaiAsli(sanitized);
    setNilaiTampil(sanitized ? formatRupiah(sanitized) : "");
    setTerbilang(sanitized ? numberToTerbilang(sanitized) + " rupiah" : "");
  };

  // Contoh fungsi submit ke backend
  const handleSubmit = () => {
    // Kirim nilaiAsli ke backend
    const data = {
      // ...data lain,
      nilai: nilaiAsli, // ini sudah format desimal
    };
    // lakukan request ke backend di sini
    console.log("Kirim ke backend:", data);
  };
  const createMandiri = useMutation({
    mutationFn: async () => {
      const csrf = await getCsrf();
      //   console.log(queryData);
      return axios.post(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${akun}/pembayaran`,
        {
          kap_kjs_id: kapKjs,
        },
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
    onSuccess: (data, variables) => {
      // console.log(data);
      // const successMessage = variables.isDraft
      //   ? "Draft Faktur berhasil dibuat"
      //   : "Faktur berhasil diupload";

      Swal.fire("Berhasil!", "Data Berhasil disimpan.", "success").then(
        (result) => {
          if (result.isConfirmed) {
            // window.location.href = `/praktikum/${id}/sistem/${akun}/daftar-kode-billing-belum-dibayar`;
            navigate(
              `/praktikum/${id}/sistem/${akun}/daftar-kode-billing-belum-dibayar`
            );
          }
        }
      );
    },
    onError: (error) => {
      console.error("Error saving data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error");
    },
  });

  // Helper Component for Month/Year Picker
  const MonthYearPicker = ({
    label,
    selected,
    onChange,
    showYearOnly = false,
  }) => {
    return (
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          {label} <span className="text-red-500">*</span>
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              {selected
                ? showYearOnly
                  ? selected.getFullYear()
                  : selected.toLocaleString("default", { month: "long" }) // Only show month name
                : `Pilih ${label}`}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <DatePicker
              selected={selected}
              onChange={onChange}
              showMonthYearPicker={!showYearOnly}
              showYearPicker={showYearOnly}
              dateFormat={showYearOnly ? "yyyy" : "MM/yyyy"}
              className="w-full p-2"
              inline
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  };
  if (isLoading) {
    return (
      <div className="loading flex items-center justify-center h-screen">
        <ClipLoader color="#7502B5" size={50} />
        <p className="ml-3">Data Loading ...</p>
      </div>
    );
  }

  console.log(data);

  return (
    <div className="bg-white p-6 rounded-md shadow-sm max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold mb-8 text-left">
        Layanan Mandiri Pembuatan Kode Billing
      </h2>

      {/* Progress Bar */}
      <div className="relative flex justify-between items-center mb-10">
        {steps.map((item, index) => (
          <div
            key={item.id}
            className="flex-1 flex flex-col items-center relative z-10"
          >
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "absolute top-4 left-1/2 right-[-50%] h-1 transition-all duration-300 z-0",
                  step > item.id ? "bg-yellow-400" : "bg-gray-300"
                )}
              />
            )}
            <div
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center font-bold text-white z-10 transition-colors duration-300",
                step >= item.id ? "bg-yellow-400" : "bg-gray-300"
              )}
            >
              {item.id}
            </div>
            <span
              className={cn(
                "text-sm mt-2 text-center font-medium transition-colors duration-300",
                step === item.id ? "text-gray-900" : "text-gray-500"
              )}
            >
              {item.title}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <div>
          <p className="font-semibold text-gray-800">
            Langkah {step}. {steps[step - 1].title}
          </p>
          {step === 1 && (
            <p className="text-gray-600 mt-2">
              Pastikan identitas wajib pajak Anda sudah benar dan lengkap
              sebelum melanjutkan ke tahap berikutnya.
            </p>
          )}
          {step === 2 && (
            <div className="text-gray-600 text-sm mt-2">
              {steps[1].description}
            </div>
          )}
        </div>

        {/* Input Field Step 1 */}
        {step === 1 && (
          <div className="text-sm space-y-4">
            <Input label="NPWP" value={npwp} onChange={setNpwp} required />
            <Input
              label="Nama Wajib Pajak"
              value={name}
              onChange={setName}
              required
            />
            <TextArea
              label="Alamat Wajib Pajak"
              value={address}
              onChange={setAddress}
              required
            />
          </div>
        )}

        {/* Input Field Step 2 */}
        {step === 2 && (
          <div className="text-sm space-y-4">
            {steps[1].fields.map((field, index) => (
              <React.Fragment key={index}>
                {field.type === "select" ? (
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      {field.label}{" "}
                      {field.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    <select
                      value={field.value}
                      //   onChange={(e) => field.onChange(e.target.value)}
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        const selectedOption = propData.find(
                          (option) => option.id == selectedId
                        );
                        // alert(selectedOption);

                        if (selectedOption) {
                          setKapKjsId(
                            `${selectedOption.kode} - ${selectedOption.ket_1}`
                          );
                          field.onChange(selectedId);
                        }
                      }}
                      className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 border-gray-300"
                    >
                      <option value="">-- Pilih {field.label} --</option>
                      {propData.map((option, idx) => (
                        <option key={idx} value={option.id}>
                          {option.kode} - {option.ket_1}
                        </option>
                      ))}
                      {/* {field.options.map((option, idx) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      ))} */}
                    </select>
                  </div>
                ) : field.type === "month" ? (
                  <MonthYearPicker
                    label="Bulan Pajak"
                    selected={selectedMonth}
                    onChange={setSelectedMonth}
                  />
                ) : field.type === "year" ? (
                  <MonthYearPicker
                    label="Tahun Pajak"
                    selected={selectedYear}
                    onChange={setSelectedYear}
                    showYearOnly
                  />
                ) : null}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="text-sm space-y-4">
            <p className="text-gray-700">
              Harap pastikan dengan cermat bahwa semua informasi terkait
              identitas wajib pajak Anda telah diperiksa dan dikonfirmasi. Ini
              mencakup nama lengkap Anda, alamat tempat tinggal atau domisili,
              serta Nomor Pokok Wajib Pajak (NPWP) Anda. Selain itu, pastikan
              bahwa Kode Akun Pajak (KAP) dan Kode Jenis Setoran (KJS) yang Anda
              gunakan sudah benar dan sesuai. Ketelitian dalam memverifikasi
              kesesuaian informasi ini sangat penting, terutama dalam konteks
              proses pembentukan kode penagihan, untuk menghindari kesalahan
              yang dapat menghambat proses administrasi pajak dan potensi
              masalah di masa depan
            </p>
            <div className="bg-gray-50 p-4 border rounded">
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div className="font-semibold text-gray-700">NPWP</div>
                <div>: {npwp}</div>

                <div className="font-semibold text-gray-700">
                  Nama Wajib Pajak
                </div>
                <div>: {name}</div>

                <div className="font-semibold text-gray-700">
                  Alamat Wajib Pajak
                </div>
                <div>: {address}</div>

                <div className="font-semibold text-gray-700">KAP - KJS</div>
                <div>: {kapKjsId}</div>

                <div className="font-semibold text-gray-700">
                  Periode dan Tahun Pajak
                </div>
                <div>
                  :{" "}
                  {selectedMonth?.toLocaleString("default", { month: "long" })}{" "}
                  {selectedYear?.getFullYear()}
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label
                  className="block text-gray-700 font-medium mb-1"
                  htmlFor="currency"
                >
                  Mata Uang
                </label>
                <select
                  id="currency"
                  className="w-full border rounded px-4 py-2 bg-gray-100 cursor-not-allowed"
                  value="IDR"
                  onChange={() => {}}
                  disabled
                >
                  <option value="IDR">Rupiah Indonesia</option>
                </select>
              </div>
              <Input
                label="Nilai"
                value={nilaiTampil}
                onChange={handleNilaiChange}
                required
              />
              <Input
                label="Terbilang"
                value={terbilang}
                onChange={() => {}}
                required
                readOnly
              />
              <TextArea
                label="Keterangan"
                value={keterangan}
                onChange={setKeterangan}
              />
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack}>
              Kembali
            </Button>
          ) : null}
          <Button
            onClick={() => {
              if (step === steps.length) {
                createMandiri.mutate();
                // navigate(
                //   "/admin/praktikum/2/daftar-kode-billing-belum-dibayar"
                // );
              } else {
                handleNext();
              }
            }}
            className={cn(
              "bg-blue-600 hover:bg-blue-700 text-white",
              step === steps.length && "bg-green-600 hover:bg-green-700"
            )}
          >
            {step === steps.length ? "Selesai" : "Lanjut"}
          </Button>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const Input = ({ label, value, onChange, required }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
    />
  </div>
);

const TextArea = ({ label, value, onChange, required }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={3}
      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
    />
  </div>
);

export default SelfBilling;
