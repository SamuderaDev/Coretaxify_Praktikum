import React, { useState } from "react";
import Swal from "sweetalert2";
import { IoReload } from "react-icons/io5";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CookiesProvider, useCookies } from "react-cookie";
import { FaFile } from "react-icons/fa";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { RoutesApi } from "@/Routes";

export default function DosenKelas() {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState(RoutesApi.classAdmin);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [cookies, setCookie] = useCookies(["user"]);
  const [filePreview, setFilePreview] = useState(null);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["kelas_dosen", url],
    queryFn: async () => {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          Accept: "application/json",
        },
      });
      console.log(data);
      return data;
    },
  });

  //   const [data, setData] = useState([
  //     {
  //       id: "1",
  //       namaPraktikum: "Praktikum 1",
  //       kodePraktikum: "xAE12",
  //       supportingFile: "file.pdf",
  //       deadline: "2021-12-12",
  //     },
  //     {
  //       id: "2",
  //       namaPraktikum: "Praktikum 2",
  //       kodePraktikum: "xAE12",
  //       supportingFile: "file.pdf",
  //       deadline: "2021-12-12",
  //     },
  //     {
  //       id: "3",
  //       namaPraktikum: "Praktikum 2",
  //       kodePraktikum: "xAE12",
  //       supportingFile: "file.pdf",
  //       deadline: "2021-12-12",
  //     },
  //     {
  //       id: "4",
  //       namaPraktikum: "Praktikum 3",
  //       kodePraktikum: "xAE12",
  //       supportingFile: "file.pdf",
  //       deadline: "2021-12-12",
  //     },
  //   ]);

  const [formData, setFormData] = useState({
    namaKelas: "",
    kodeKelas: "",
    status: "",
    file_name: "",
    start_period: "",
    end_period: "",
  });

  const generateRandomCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview({ name: file.name, url: reader.result });
      };
      reader.readAsDataURL(file);
    }
    setFormData({ ...formData, file_name: file });
  };

  const handleSave = () => {
    if (!namaKelas || !kodeKelas || !status) {
      Swal.fire("Error", "Harap isi semua field yang diperlukan!", "error");
      return;
    }

    const newTugas = {
      id: String(data.length + 1),
      namaPraktikum: formData.namaPraktikum,
      kodePraktikum: formData.kodePraktikum,
      supportingFile: formData.supportingFile
        ? formData.supportingFile.name
        : "No file",
      deadline: formData.deadline,
    };

    setData([...data, newTugas]);
    setIsAddOpen(false);
    setFormData({
      namaPraktikum: "",
      kodePraktikum: "",
      supportingFile: null,
      deadline: "",
    });
    setFilePreview(null);

    Swal.fire("Berhasil!", "Praktikum berhasil ditambahkan!", "success");
  };

  const handleReloadCode = () => {
    setFormData({ ...formData, kodePraktikum: generateRandomCode() });
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setData(sortedData);
  };

  const handleEditClick = (index) => {
    setSelectedData(data[index]);
    setIsOpen(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [search, setSearch] = useState("");

  //   const processedData = data.map((item) => ({
  //     ...item,
  //     highlight:
  //       search &&
  //       Object.values(item).some((value) =>
  //         String(value).toLowerCase().includes(search.toLowerCase())
  //       ),
  //   }));
  const mutationClass = useMutation({
    mutationFn: async (id) => {
      console.log("button clicked");
      // const { response } = await axios.post(RoutesApi.login, {
      const response = await axios.get(`${RoutesApi.url}api/csrf-token`, {
        // withCredentials: true,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });
      console.log(response.data.token);
      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
      console.log(cookies.token);
      const data = await axios.post(
        RoutesApi.classAdmin,
        {
          // id: 1,
          name: formData.namaKelas,
          // user_id: 2,
          // qty_student: 1,
          start_period: formData.start_period,
          end_period: formData.end_period,
          class_code: formData.kodeKelas,
          status: formData.status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": response.data.token,
            Authorization: `Bearer ${cookies.token}`,
          },
          params: {
            intent: "api.user.create.group",
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      window.location.reload();
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const mutation = useMutation({
    mutationFn: async (id) => {
      console.log("button clicked");
      // const { response } = await axios.post(RoutesApi.login, {
      const response = await axios.get(`${RoutesApi.url}api/csrf-token`, {
        // withCredentials: true,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });
      console.log(response.data.token);
      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
      console.log(cookies.token);
      const data = await axios.put(
        RoutesApi.classAdmin + `/${id}`,
        {
          id: 1,
          name: formData.namaKelas,
          // user_id: 2,
          // qty_student: 1,
          start_period: formData.start_period,
          end_period: formData.end_period,
          class_code: formData.kodeKelas,
          status: formData.status,
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
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      window.location.reload();
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const mutationDelete = useMutation({
    mutationFn: async (id) => {
      console.log("button clicked");
      // const { response } = await axios.post(RoutesApi.login, {
      const response = await axios.get(`${RoutesApi.url}api/csrf-token`, {
        // withCredentials: true,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });
      console.log(response.data.token);
      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
      console.log(cookies.token);
      const data = await axios.delete(RoutesApi.classAdmin + `/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-CSRF-TOKEN": response.data.token,
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire("Berhasil!", "Kelas berhasil dihapus!", "success");
      window.location.reload();

      // window.location.href = "/" + role;
      // alert("Login successful!");
      // queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (isLoading) {
    return (
      <div className="loading">
        <ClipLoader color="#7502B5" size={50} />
      </div>
      // <div className="h-full w-full text-2xl italic font-bold text-center flex items-center justify-center">Loading...</div>
    );
  }

  return (
    <div className="kontrak-container">
      <div className="header">
        <h2>Kelas</h2>
      </div>
      <div className="search-add-container">
        <div className="search-input-container">
          <input
            type="text"
            id="search"
            className="search-input"
            placeholder="Cari Kelas                     🔎"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-800 p-2 rounded-md text-white hover:bg-blue-900"
          onClick={() => {
            setIsAddOpen(true);
            setFormData({ ...formData, kodeKelas: generateRandomCode() });
          }}
        >
          Tambah Kelas
        </button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th onClick={() => handleSort("namaPraktikum ")}>
                Nama Kelas{" "}
                {sortConfig.key === "namaPraktikum"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : sortConfig.direction === "descending"
                  ? "↓"
                  : "↑"}
              </th>
              <th>Kode Kelas</th>
              <th>Status</th>
              <th>Nama File</th>
              <th>Tanggal Mulai</th>
              <th>Tanggal Selesai</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data == undefined ? (
              <div className="loading">
                <h1>Data Empty !</h1>
                {/* <ClipLoader color="#7502B5" size={50} /> */}
              </div>
            ) : (
              data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.class_code}</td>
                  <td>{item.status}</td>
                  <td>{item.filename}</td>
                  <td>{item.start_period}</td>
                  <td>{item.end_period}</td>
                  <td>
                    <AlertDialog>
                      <AlertDialogTrigger className="action-button edit">
                        Edit
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Edit Kelas</AlertDialogTitle>
                          <AlertDialogDescription className="w-full">
                            <div className="">
                              <form>
                                <div className="edit-form-group-mahasiswa ">
                                  <label>Nama Kelas:</label>
                                  <input
                                    type="text"
                                    name="namaKelas"
                                    value={formData.namaKelas}
                                    onChange={handleChange}
                                    required
                                  />
                                </div>
                                <div className="edit-form-group-mahasiswa">
                                  <label>Kode Kelas:</label>
                                  <input
                                    className="text-black"
                                    name="kodeKelas"
                                    value={formData.kodeKelas}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="edit-form-group-mahasiswa">
                                  <label>File Support:</label>
                                  <input
                                    className="text-black"
                                    type="file"
                                    name="file_name"
                                    onChange={handleFileChange}
                                  />
                                </div>
                                <div className="edit-form-group-mahasiswa">
                                  <label>Tanggal Mulai:</label>
                                  <input
                                    className="text-black"
                                    type="date"
                                    name="start_period"
                                    value={formData.start_period}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="edit-form-group-mahasiswa">
                                  <label>Deadline:</label>
                                  <input
                                    className="text-black"
                                    type="date"
                                    name="end_period"
                                    value={formData.end_period}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="edit-form-group-mahasiswa">
                                  <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    required
                                  >
                                    <option value="">Pilih Status</option>
                                    <option value="ACTIVE">Active</option>
                                    <option value="INACTIVE">Expired</option>
                                  </select>
                                </div>
                              </form>
                            </div>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-red-600 text-white">
                            Kembali
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => mutation.mutate(item.id)}
                            className="bg-green-600 "
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
                          dangerMode: true,
                        }).then((result) => {
                          if (result.isConfirmed) {
                            // const newData = data.filter(
                            //   (itemData) => itemData.id !== item.id
                            // );
                            // setData(newData);
                            mutationDelete.mutate(item.id);
                          }
                        });
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="pagination-container sticky">
          <div className="pagination-info">
            {`Showing ${indexOfFirstItem + 1} to ${Math.min(
              indexOfLastItem,
              data.length
            )} of ${data.length} entries`}
          </div>

          <div className="pagination ">
            <button
              className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {Array.from(
              { length: Math.ceil(data.length / itemsPerPage) },
              (_, index) => (
                <button
                  key={index + 1}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              )
            )}
            <button
              className={`page-item ${
                currentPage === Math.ceil(data.length / itemsPerPage)
                  ? "disabled"
                  : ""
              }`}
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <EditPopupMahasiswa
          onClose={() => setIsOpen(false)}
          data={selectedData}
        />
      )}
      <AlertDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        className="max-h-[50vh] overflow-y-auto"
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tambah Praktikum</AlertDialogTitle>
            <AlertDialogDescription className="w-full">
              <div className="max-h-[70vh] overflow-y-auto">
                <form>
                  <div className="edit-form-group-mahasiswa ">
                    <label>Nama Kelas:</label>
                    <input
                      type="text"
                      name="namaKelas"
                      value={formData.namaKelas}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="edit-form-group-mahasiswa">
                    <label>Kode Kelas:</label>
                    <div className="flex items-center gap-2">
                      <input
                        className="text-black"
                        name="kodeKelas"
                        value={formData.kodeKelas}
                        onChange={handleChange}
                        readOnly
                      />
                      <button
                        type="button"
                        className="p-3 bg-purple-800 rounded-md hover:bg-purple-900"
                        onClick={handleReloadCode}
                      >
                        <IoReload className="text-lg text-white " />
                      </button>
                    </div>
                  </div>
                  <div className="edit-form-group-mahasiswa">
                    <label>File Support:</label>
                    <div className="flex items-center justify-center w-full ">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          {filePreview ? (
                            <>
                              <div className="grid justify-center items-center p-20">
                                <FaFile className="w-8 h-8 text-gray-500 dark:text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {filePreview.name}
                                </p>
                              </div>
                            </>
                          ) : (
                            <>
                              <svg
                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                ZIP, RAR atau PDF (MAX. 10mb)
                              </p>
                            </>
                          )}
                        </div>

                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          accept=".zip, .rar, .pdf"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="edit-form-group-mahasiswa">
                    <label>Tanggal Mulai:</label>
                    <input
                      className="text-black"
                      type="date"
                      name="start_period"
                      value={formData.start_period}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="edit-form-group-mahasiswa">
                    <label>Deadline:</label>
                    <input
                      className="text-black"
                      type="date"
                      name="end_period"
                      value={formData.end_period}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="edit-form-group-mahasiswa">
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Pilih Status</option>
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">Expired</option>
                    </select>
                  </div>
                </form>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-red-600 text-white hover:bg-red-800 hover:text-white">
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-green-600"
              onClick={() => mutationClass.mutate()}
            >
              Simpan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
