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
} from "@/Components/ui/alert-dialog";
import { CookiesProvider, useCookies } from "react-cookie";

export default function UjianDosen() {
          const [isOpen, setIsOpen] = useState(false);
          const [isAddOpen, setIsAddOpen] = useState(false);
          const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
          const [selectedData, setSelectedData] = useState(null);
          const [currentPage, setCurrentPage] = useState(1);
          const itemsPerPage = 10;
          const [cookies, setCookie] = useCookies(["user"]);

          const [data, setData] = useState([
                    {
                              id: "1",
                              namaUjian: "Ujian 1",
                              kodeUjian: "xAE12",
                              tipeUjian: "BNSP",
                              supportingFile: "file.pdf",
                              deadline: "2021-12-12",
                    },
                    {
                              id: "2",
                              namaUjian: "Ujian 2",
                              kodeUjian: "xAE12",
                              tipeUjian: "Reguler",
                              supportingFile: "file.pdf",
                              deadline: "2021-12-12",
                    },
                    {
                              id: "3",
                              namaUjian: "Ujian 2",
                              kodeUjian: "xAE12",
                              tipeUjian: "Reguler",
                              supportingFile: "file.pdf",
                              deadline: "2021-12-12",
                    },
                    {
                              id: "4",
                              namaUjian: "Ujian 3",
                              kodeUjian: "xAE12",
                              tipeUjian: "Reguler",
                              supportingFile: "file.pdf",
                              deadline: "2021-12-12",
                    },
          ]);

          const [formData, setFormData] = useState({
                    namaUjian: "",
                    kodeUjian: "",
                    tipeUjian: "",
                    supportingFile: null,
                    deadline: "",
          });

          const generateRandomCode = () => {
                    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    let result = "";
                    for (let i = 0; i < 5; i++) {
                              result += characters.charAt(Math.floor(Math.random() * characters.length));
                    }
                    return result;
          };

          const handleChange = (e) => {
                    const { name, value } = e.target;
                    setFormData({ ...formData, [name]: value });
          };

          const handleFileChange = (e) => {
                    const file = e.target.files[0];
                    setFormData({ ...formData, supportingFile: file });
          };

          const handleSave = () => {
                    if (!formData.namaUjian || !formData.kodeUjian || !formData.deadline) {
                              Swal.fire("Error", "Harap isi semua field yang diperlukan!", "error");
                              return;
                    }

                    const newTugas = {
                              id: String(data.length + 1),
                              namaUjian: formData.namaUjian,
                              kodeUjian: formData.kodeUjian,
                              tipeUjian: formData.tipeUjian,
                              supportingFile: formData.supportingFile ? formData.supportingFile.name : "No file",
                              deadline: formData.deadline,
                    };

                    setData([...data, newTugas]);
                    setIsAddOpen(false);
                    setFormData({ namaUjian: "", kodeUjian: "", tipeUjian: "", supportingFile: null, deadline: "" });

                    Swal.fire("Berhasil!", "Ujian berhasil ditambahkan!", "success");
          };

          const handleReloadCode = () => {
                    setFormData({ ...formData, kodeUjian: generateRandomCode() });
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
          const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

          const paginate = (pageNumber) => setCurrentPage(pageNumber);

          const [search, setSearch] = useState("");

          const processedData = data.map((item) => ({
                    ...item,
                    highlight:
                              search &&
                              Object.values(item).some((value) =>
                                        String(value).toLowerCase().includes(search.toLowerCase())
                              ),
          }));

          return (
                    <div className="kontrak-container">
                              <div className="header">
                                        <h2>Ujian</h2>
                              </div>
                              <div className="search-add-container">
                                        <div className="search-input-container">
                                                  <input
                                                            type="text"
                                                            id="search"
                                                            className="search-input"
                                                            placeholder="Cari Ujian                       🔎"
                                                            onChange={(e) => setSearch(e.target.value)}
                                                  />
                                        </div>
                                        <button
                                                  className="bg-blue-800 p-2 rounded-md text-white hover:bg-blue-900"
                                                  onClick={() => {
                                                            setIsAddOpen(true);
                                                            setFormData({ ...formData, kodeUjian: generateRandomCode() });
                                                  }}
                                        >
                                                  Tambah Ujian
                                        </button>
                              </div>
                              <div className="table-container">
                                        <table>
                                                  <thead>
                                                            <tr>
                                                                      <th>No</th>
                                                                      <th onClick={() => handleSort("namaUjian ")}>
                                                                                Nama Ujian{" "}
                                                                                {sortConfig.key === "namaUjian"
                                                                                          ? sortConfig.direction === "ascending"
                                                                                                    ? "↑"
                                                                                                    : "↓"
                                                                                          : sortConfig.direction === "descending"
                                                                                                    ? "↓"
                                                                                                    : "↑"}
                                                                      </th>
                                                                      <th>Kode Ujian</th>
                                                                      <th>Tipe Ujian</th>
                                                                      <th>File Support</th>
                                                                      <th>Deadline</th>
                                                                      <th>Action</th>
                                                            </tr>
                                                  </thead>
                                                  <tbody>
                                                            {currentItems.map((item, index) => (
                                                                      <tr key={item.id}>
                                                                                <td>{indexOfFirstItem + index + 1}</td>
                                                                                <td>{item.namaUjian}</td>
                                                                                <td>{item.kodeUjian}</td>
                                                                                <td>{item.tipeUjian}</td>
                                                                                <td>{item.supportingFile}</td>
                                                                                <td>{item.deadline}</td>
                                                                                <td>
                                                                                          <AlertDialog>
                                                                                                    <AlertDialogTrigger className="action-button edit">
                                                                                                              Edit
                                                                                                    </AlertDialogTrigger>
                                                                                                    <AlertDialogContent>
                                                                                                              <AlertDialogHeader>
                                                                                                                        <AlertDialogTitle>Edit Kelas</AlertDialogTitle>
                                                                                                                        <AlertDialogDescription className="w-full">
                                                                                                                                  <div className="overflow-y-auto max-h-100">
                                                                                                                                            <form>
                                                                                                                                                      <div className="edit-form-group-mahasiswa ">
                                                                                                                                                                <label>Nama Ujian:</label>
                                                                                                                                                                <input
                                                                                                                                                                          type="text"
                                                                                                                                                                          name="namaUjian"
                                                                                                                                                                          value={formData.namaUjian}
                                                                                                                                                                          onChange={handleChange}
                                                                                                                                                                          required
                                                                                                                                                                />
                                                                                                                                                      </div>
                                                                                                                                                      <div className="edit-form-group-mahasiswa">
                                                                                                                                                                <label>Kode Ujian:</label>
                                                                                                                                                                <input
                                                                                                                                                                          className="text-black"
                                                                                                                                                                          name="kodeUjian"
                                                                                                                                                                          value={formData.kodeUjian}
                                                                                                                                                                          onChange={handleChange}
                                                                                                                                                                />
                                                                                                                                                      </div>
                                                                                                                                                      <div className="edit-form-group-mahasiswa">
                                                                                                                                                                <label>Tipe Ujian:</label>
                                                                                                                                                                <select
                                                                                                                                                                          className="text-black"
                                                                                                                                                                          name="tipeUjian"
                                                                                                                                                                          value={formData.tipeUjian}
                                                                                                                                                                          onChange={handleChange}
                                                                                                                                                                >
                                                                                                                                                                          <option value="BNSP">BNSP</option>
                                                                                                                                                                          <option value="Reguler">Reguler</option>
                                                                                                                                                                </select>
                                                                                                                                                      </div>
                                                                                                                                                      <div className="edit-form-group-mahasiswa">
                                                                                                                                                                <label>File Support:</label>
                                                                                                                                                                <input
                                                                                                                                                                          className="text-black"
                                                                                                                                                                          type="file"
                                                                                                                                                                          name="supportingFile"
                                                                                                                                                                          onChange={handleFileChange}
                                                                                                                                                                />
                                                                                                                                                      </div>
                                                                                                                                                      <div className="edit-form-group-mahasiswa">
                                                                                                                                                                <label>Deadline:</label>
                                                                                                                                                                <input
                                                                                                                                                                          className="text-black"
                                                                                                                                                                          type="date"
                                                                                                                                                                          name="deadline"
                                                                                                                                                                          value={formData.deadline}
                                                                                                                                                                          onChange={handleChange}
                                                                                                                                                                />
                                                                                                                                                      </div>
                                                                                                                                            </form>
                                                                                                                                  </div>
                                                                                                                        </AlertDialogDescription>
                                                                                                              </AlertDialogHeader>
                                                                                                              <AlertDialogFooter>
                                                                                                                        <AlertDialogCancel className="bg-red-600 text-white">
                                                                                                                                  Kembali
                                                                                                                        </AlertDialogCancel>
                                                                                                                        <AlertDialogAction className="bg-green-600 ">
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
                                                                                                                                  const newData = data.filter(
                                                                                                                                            (itemData) => itemData.id !== item.id
                                                                                                                                  );
                                                                                                                                  setData(newData);
                                                                                                                                  Swal.fire(
                                                                                                                                            "Berhasil!",
                                                                                                                                            "Kelas berhasil dihapus!",
                                                                                                                                            "success"
                                                                                                                                  );
                                                                                                                        }
                                                                                                              });
                                                                                                    }}
                                                                                          >
                                                                                                    Delete
                                                                                          </button>
                                                                                </td>
                                                                      </tr>
                                                            ))}
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
                                                                                          className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                                                                                          onClick={() => paginate(index + 1)}
                                                                                >
                                                                                          {index + 1}
                                                                                </button>
                                                                      )
                                                            )}
                                                            <button
                                                                      className={`page-item ${currentPage === Math.ceil(data.length / itemsPerPage) ? "disabled" : ""}`}
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
                              <AlertDialog open={isAddOpen} onOpenChange={setIsAddOpen} className="max-h-[50vh] overflow-y-auto">
                                        <AlertDialogContent>
                                                  <AlertDialogHeader>
                                                            <AlertDialogTitle>Tambah Ujian</AlertDialogTitle>
                                                            <AlertDialogDescription className="w-full">
                                                                      <div className="max-h-[70vh] overflow-y-auto">
                                                                                <form>
                                                                                          <div className="edit-form-group-mahasiswa ">
                                                                                                    <label>Nama Ujian:</label>
                                                                                                    <input
                                                                                                              type="text"
                                                                                                              name="namaUjian"
                                                                                                              value={formData.namaUjian}
                                                                                                              onChange={handleChange}
                                                                                                              required
                                                                                                    />
                                                                                          </div>
                                                                                          <div className="edit-form-group-mahasiswa">
                                                                                                    <label>Kode Ujian:</label>
                                                                                                    <div className="flex items-center gap-2">
                                                                                                              <input
                                                                                                                        className="text-black"
                                                                                                                        name="kodeUjian"
                                                                                                                        value={formData.kodeUjian}
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
                                                                                                    <label>Tipe Ujian:</label>
                                                                                                    <select
                                                                                                              className="text-black"
                                                                                                              name="tipeUjian"
                                                                                                              value={formData.tipeUjian}
                                                                                                              onChange={handleChange}
                                                                                                              required
                                                                                                    >
                                                                                                              <option value="BNSP">BNSP</option>
                                                                                                              <option value="UTS">Reguler</option>
                                                                                                    </select>
                                                                                          </div>
                                                                                          <div className="edit-form-group-mahasiswa">
                                                                                                    <label>File Support:</label>
                                                                                                    <div className="flex items-center justify-center w-full ">
                                                                                                              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                                                                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                                                                                  <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                                                                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                                                                                                  </svg>
                                                                                                                                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                                                                                                  <p className="text-xs text-gray-500 dark:text-gray-400">ZIP, RAR atau PDF (MAX. 10mb)</p>
                                                                                                                        </div>
                                                                                                                        <input id="dropzone-file" type="file" className="hidden" accept=".zip, .rar, .pdf" onChange={handleFileChange} />
                                                                                                              </label>
                                                                                                    </div>
                                                                                          </div>
                                                                                          <div className="edit-form-group-mahasiswa ">
                                                                                                    <label>Deadline:</label>
                                                                                                    <input
                                                                                                              type="date"
                                                                                                              name="deadline"
                                                                                                              value={formData.deadline}
                                                                                                              onChange={handleChange}
                                                                                                              required
                                                                                                    />
                                                                                          </div>
                                                                                </form>
                                                                      </div>
                                                            </AlertDialogDescription>
                                                  </AlertDialogHeader>
                                                  <AlertDialogFooter>
                                                            <AlertDialogCancel className="bg-red-600 text-white hover:bg-red-800 hover:text-white">
                                                                      Batal
                                                            </AlertDialogCancel>
                                                            <AlertDialogAction className="bg-green-600" onClick={handleSave}>
                                                                      Simpan
                                                            </AlertDialogAction>
                                                  </AlertDialogFooter>
                                        </AlertDialogContent>
                              </AlertDialog>
                    </div>
          );
}