import React, { useState, useEffect, useRef } from "react";
import "./tambahKontrak.css";
import { IoReload } from "react-icons/io5";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { CookiesProvider, useCookies } from "react-cookie";
import { IoClose } from "react-icons/io5";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RxCross1 } from "react-icons/rx";
import { createPortal } from "react-dom";
import Swal from "sweetalert2";

import { Check, ChevronsUpDown, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Initial form state to use for resetting
const initialFormState = {
  jenisKontrak: "",
  instansi: "",
  mahasiswa: "",
  periodeAwal: "",
  periodeAkhir: "",
  spt: "",
  bupot: "",
  faktur: "",
  kodePembelian: "",
  is_buy_task: 0,
  opsiTambahan: [],
  status: "",
};

const TambahKontrak = ({
  isOpen,
  onClose,
  onSave,
  UniData,
  taskData,
  setOpen,
  refetch,
}) => {
  // Form state
  const [formData, setFormData] = useState({ ...initialFormState });
  const [cookies, setCookie] = useCookies(["user"]);
  const [errors, setErrors] = useState({});
  const [lastNumbers, setLastNumbers] = useState({
    Lisensi: 0,
    Unit: 0,
    BNSP: 0,
  });

  const validate = () => {
    let newErrors = {};

    if (!formData.jenisKontrak) {
      newErrors.jenisKontrak = "Jenis kontrak harus diisi";
    }

    if (!formData.instansi) {
      newErrors.instansi = "Instansi harus diisi";
    }

    if (!formData.mahasiswa) {
      newErrors.mahasiswa = "Jumlah mahasiswa harus diisi";
    }

    if (!formData.periodeAwal) {
      newErrors.periodeAwal = "Periode awal harus diisi";
    }

    if (!formData.periodeAwal) {
      newErrors.periodeAkhir = "Periode akhir harus diisi";
    }

    if (!formData.spt) {
      newErrors.spt = "SPT harus diisi";
    }

    if (!formData.bupot) {
      newErrors.bupot = "BUPOT harus diisi";
    }

    if (!formData.faktur) {
      newErrors.faktur = "Faktur harus diisi";
    }

    // if (!formData.kodePembelian) {
    //   newErrors.kodePembelian = "Kode Pembelian harus diisi";
    // }

    // if (!formData.is_buy_task) {
    //   newErrors.is_buy_task = "Pembelian Soal harus diisi";
    // }

    if (!formData.status) {
      newErrors.status = "Status harus diisi";
    }

    if (formData.is_buy_task === 1) {
      if (!formData.opsiTambahan || formData.opsiTambahan.length === 0) {
        newErrors.opsiTambahan = "Opsi Tambahan harus diisi";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    // return true;
  };

  // Custom dropdown state
  const [openInstansi, setOpenInstansi] = useState(false);
  const [searchInstansi, setSearchInstansi] = useState("");
  const dropdownRef = useRef(null);

  // Reset form when popup is opened
  useEffect(() => {
    if (isOpen) {
      setFormData({ ...initialFormState });
      setOpenInstansi(false);
      setSearchInstansi("");
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenInstansi(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if(errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSave = () => {
    console.log(formData);
    if (validate()) {
      // onSave(formData);
      // setFormData({ formData });
      mutation.mutate();
    }
  };

  const mutation = useMutation({
    mutationFn: async () => {
      console.log("button clicked");
      const response = await axios.get(`${RoutesApi.url}api/csrf-token`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });
      console.log(response.data.token);
      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
      console.log(cookies.token);
      const data = await axios.post(
        RoutesApi.contractAdmin,
        {
          university_id: parseInt(formData.instansi),
          contract_type: formData.jenisKontrak,
          qty_student: parseInt(formData.mahasiswa),
          start_period: formData.periodeAwal,
          end_period: formData.periodeAkhir,
          spt: parseInt(formData.spt),
          bupot: parseInt(formData.bupot),
          faktur: parseInt(formData.faktur),
          contract_code: formData.kodePembelian,
          is_buy_task: Number(formData.is_buy_task),
          status: formData.status,
          tasks: formData.opsiTambahan,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": response.data.token,
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      // console.log(data);
      setFormData({ ...initialFormState });
      Swal.fire("Lanjutkan", "Kontrak berhasil dibuat", "success");
      onClose();
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleTambahOpsi = () => {
    setFormData({ ...formData, opsiTambahan: [...formData.opsiTambahan, ""] });
  };

  const handleChangeOpsi = (index, value) => {
    const newOpsi = [...formData.opsiTambahan];
    newOpsi[index] = value;
    setFormData({ ...formData, opsiTambahan: newOpsi });
  };

  const handleHapusOpsi = (index) => {
    const newOpsi = formData.opsiTambahan.filter((_, i) => i !== index);
    setFormData({ ...formData, opsiTambahan: newOpsi });
  };

  const generateKodePembelian = () => {
    const jenis = formData.jenisKontrak;
    if (!jenis) {
      alert("Silakan pilih Jenis Kontrak terlebih dahulu.");
      return;
    }

    let prefix = "";
    switch (jenis) {
      case "Lisensi":
        prefix = "L";
        break;
      case "Unit":
        prefix = "U";
        break;
      case "BNSP":
        prefix = "BNSP";
        break;
      default:
        return;
    }

    const nextNumber = lastNumbers[jenis] + 1;
    const formattedNumber = String(nextNumber).padStart(4, "0");
    setLastNumbers({ ...lastNumbers, [jenis]: nextNumber });
    setFormData({ ...formData, kodePembelian: `${prefix}-${formattedNumber}` });
  };

  const [open, setOpenSelect] = useState(false);
  const [value, setValue] = useState("");
  // Filter universities based on search
  const filteredUniversities = searchInstansi
    ? UniData.filter((uni) =>
        uni.name.toLowerCase().includes(searchInstansi.toLowerCase())
      )
    : UniData;

  if (!isOpen) return null;

  return (
    <div className="kontrak-popup-overlay">
      <div className="kontrak-popup-container">
        <div className="w-full flex justify-end">
          <RxCross1
            className="text-2xl hover:cursor-pointer"
            onClick={onClose}
          />
        </div>
        <h2>Tambah Data Kontrak</h2>
        <form>
          <div className="kontrak-form-group">
            <label>Jenis Kontrak *</label>
            <select
              name="jenisKontrak"
              value={formData.jenisKontrak}
              onChange={handleChange}
              // required
            >
              <option value="">Pilih Jenis Kontrak</option>
              <option value="LICENSE">Lisensi</option>
              <option value="UNIT">Unit</option>
              <option value="BNSP">BNSP</option>
            </select>
            {errors.jenisKontrak && (
              <p className="text-red-500 text-sm">{errors.jenisKontrak}</p>
            )}
          </div>

          {/* Custom Instansi dropdown */}

          <div className="kontrak-form-group">
            <Popover open={open} onOpenChange={setOpenSelect}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {formData.instansi
                    ? UniData.find(
                        (uni) => uni.id.toString() === formData.instansi
                      )?.name || "Pilih Instansi..."
                    : "Pilih Instansi..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              {/* {createPortal( */}
              <PopoverContent className="w-[450px] p-0 z-[9999]" sideOffset={5}>
                <Command>
                  <CommandInput placeholder="Pilih Instansi..." />
                  <CommandList>
                    <CommandEmpty>Instansi tidak ditemukan.</CommandEmpty>
                    <CommandGroup>
                      {UniData.map((uni) => (
                        <CommandItem
                          key={uni.id}
                          value={uni.name}
                          onChange={handleChange}
                          onSelect={(currentValue) => {
                            // alert(currentValue);
                            setFormData({
                              ...formData,
                              instansi: uni.id.toString(),
                            });
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpenSelect(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              formData.instansi === uni.id.toString()
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {uni.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
              {/* , */}
              {/* document.body
               )} */}
            </Popover>
            {errors.instansi && (
              <p className="text-red-500 text-sm">{errors.instansi}</p>
            )}
          </div>

          <div className="kontrak-form-group">
            <label>Soal *</label>
            <RadioGroup
              name="is_buy_task"
              value={formData.is_buy_task?.toString()}
              onValueChange={(value) =>
                setFormData({ ...formData, is_buy_task: Number(value) })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="option-one" />
                <Label htmlFor="option-one">Ya</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="option-two" />
                <Label htmlFor="option-two">Tidak</Label>
              </div>
            </RadioGroup>
            {formData.is_buy_task === 1 && (
              <div className="kontrak-form-group mt-4">
                <label>Pilih Opsi</label>
                {formData.opsiTambahan.map((opsi, index) => (
                  <div key={index} className="flex items-center space-x-2 mt-2">
                    <select
                      className="border p-2 rounded"
                      value={opsi}
                      onChange={(e) => handleChangeOpsi(index, e.target.value)}
                    >
                      <option value="">Pilih Opsi</option>
                      {taskData.data.map((item, index) => (
                        <option value={item.id} key={index}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                      onClick={() => handleHapusOpsi(index)}
                    >
                      <IoClose />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="bg-purple-900 text-white p-2 mt-2 rounded hover:bg-purple-950"
                  onClick={handleTambahOpsi}
                >
                  + Tambah Soal
                </button>
              </div>
            )}
          </div>

          <div className="kontrak-form-group">
            <label>Jumlah Mahasiswa *</label>
            <input
              type="number"
              name="mahasiswa"
              value={formData.mahasiswa}
              onChange={handleChange}
              onWheel={(e) => e.target.blur()}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                  e.preventDefault();
                }
              }}
              // required
            />
            {errors.mahasiswa && (
              <p className="text-red-500 text-sm">{errors.mahasiswa}</p>
            )}
          </div>
          <div className="kontrak-form-group">
            <label>Periode Awal *</label>
            <input
              type="date"
              name="periodeAwal"
              value={formData.periodeAwal}
              onChange={handleChange}
              max={formData.periodeAkhir}
              // required
            />
            {errors.periodeAwal && (
              <p className="text-red-500 text-sm">{errors.periodeAwal}</p>
            )}
          </div>
          <div className="kontrak-form-group">
            <label>Periode Akhir *</label>
            <input
              type="date"
              name="periodeAkhir"
              value={formData.periodeAkhir}
              onChange={handleChange}
              min={
                formData.periodeAwal || new Date().toISOString().split("T")[0]
              }
              // required
            />
            {errors.periodeAkhir && (
              <p className="text-red-500 text-sm">{errors.periodeAkhir}</p>
            )}
          </div>
          <div className="kontrak-form-group">
            <label>SPT *</label>
            <input
              type="number"
              name="spt"
              value={formData.spt}
              onChange={handleChange}
              onWheel={(e) => e.target.blur()}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                  e.preventDefault();
                }
              }}
              // required
            />
            {errors.spt && (
              <p className="text-red-500 text-sm">{errors.spt}</p>
            )}
          </div>
          <div className="kontrak-form-group">
            <label>Bupot *</label>
            <input
              type="number"
              name="bupot"
              value={formData.bupot}
              onChange={handleChange}
              onWheel={(e) => e.target.blur()}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                  e.preventDefault();
                }
              }}
              // required
              />
              {errors.bupot && (
                <p className="text-red-500 text-sm">{errors.bupot}</p>
              )}
          </div>
          <div className="kontrak-form-group">
            <label>Faktur *</label>
            <input
              type="number"
              name="faktur"
              value={formData.faktur}
              onChange={handleChange}
              onWheel={(e) => e.target.blur()}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                  e.preventDefault();
                }
              }}
              // required
            />
            {errors.faktur && (
              <p className="text-red-500 text-sm">{errors.faktur}</p>
            )}
          </div>

          <div className="kontrak-form-group">
            <label>Status *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              // required
            >
              <option value="">Pilih Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Expired</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status}</p>
            )}
          </div>
        </form>

        <div className="kontrak-popup-actions">
          <button className="kontrak-save-button" onClick={handleSave}>
            {mutation.status == "pending" ? <p>Loading...</p> : <>Simpan</>}
          </button>
          <button className="kontrak-cancel-button" onClick={onClose}>
            Batal
          </button>
        </div>
        <div className="text-xs mt-2 text-red-700">
          {mutation.isError && mutation.error.response.data.message}
        </div>
      </div>
    </div>
  );
};

export default TambahKontrak;
