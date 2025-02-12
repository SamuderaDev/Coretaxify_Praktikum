import React, { useState } from "react";
import { IoMdDownload } from "react-icons/io";

const TambahDosen = ({ isOpen, onClose, onSave }) => {
          const [formData, setFormData] = useState({
                    namaDosen: "",
                    instansi: "",
                    kuotaKelas: "",
                    kodeRegistrasi: "",
                    jumlahSiswa: "",
                    status: "",
          });

          const handleChange = (e) => {
                    const { name, value } = e.target;
                    setFormData({ ...formData, [name]: value });
          };

          const handleSave = () => {
                    onSave(formData);
                    setFormData({
                              namaDosen: "",
                              instansi: "",
                              kuotaKelas: "",
                              kodeRegistrasi: "",
                              jumlahSiswa: "",
                              status: "",
                    });
                    onClose();
          };

          if (!isOpen) return null;

          return (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
                              <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6">
                                        <div className="flex justify-between items-center border-b pb-3">
                                                  <h2 className="text-xl font-bold text-gray-800">Tambah Data Dosen</h2>
                                                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded flex items-center">
                                                            <IoMdDownload className="mr-2" />
                                                            Import
                                                  </button>
                                        </div>
                                        <div className="pt-4">
                                                  <select
                                                            name="instansi"
                                                            value={formData.instansi}
                                                            onChange={handleChange}
                                                            className="w-60 border px-2 py-1 rounded"
                                                            required
                                                  >
                                                            <option value="">Pilih Instansi</option>
                                                            <option value="Instansi 1">Instansi 1</option>
                                                            <option value="Instansi 2">Instansi 2</option>
                                                            <option value="Instansi 3">Instansi 3</option>
                                                  </select>
                                        </div>
                                        <div className="overflow-x-auto">
                                                  <table className="w-full border-collapse mt-4">
                                                            <thead>
                                                                      <tr className="bg-purple-600 text-white text-left text-sm">
                                                                                <th className="p-2 w-1/6 text-center">Email</th>
                                                                                <th className="p-2 w-1/6 text-center">Nama Dosen</th>
                                                                                <th className="p-2 w-1/6 text-center">Kode Registrasi</th>
                                                                                <th className="p-2 w-1/6 text-center">Status</th>
                                                                      </tr>
                                                            </thead>
                                                            <tbody>
                                                                      <tr className="border-t text-sm p-2">
                                                                                <td className="p-4">
                                                                                          <input
                                                                                                    type="email"
                                                                                                    name="email"
                                                                                                    value={formData.email}
                                                                                                    onChange={handleChange}
                                                                                                    className="w-full border px-2 py-1 rounded"
                                                                                                    required
                                                                                          />
                                                                                </td>
                                                                                <td className="p-4">
                                                                                          <input
                                                                                                    type="text"
                                                                                                    name="namaDosen"
                                                                                                    value={formData.namaDosen}
                                                                                                    onChange={handleChange}
                                                                                                    className="w-full border px-2 py-1 rounded"
                                                                                                    required
                                                                                          />
                                                                                </td>
                                                                                <td className="p-2">
                                                                                          <input
                                                                                                    type="number"
                                                                                                    name="jumlahSiswa"
                                                                                                    value={formData.jumlahSiswa}
                                                                                                    onChange={handleChange}
                                                                                                    className="w-full border px-2 py-1 rounded"
                                                                                                    required
                                                                                          />
                                                                                </td>
                                                                                <td className="p-2">
                                                                                          <select
                                                                                                    name="status"
                                                                                                    value={formData.status}
                                                                                                    onChange={handleChange}
                                                                                                    className="w-full border px-2 py-1 rounded"
                                                                                                    required
                                                                                          >
                                                                                                    <option value="">Pilih Status</option>
                                                                                                    <option value="Active">Active</option>
                                                                                                    <option value="Expired">Expired</option>
                                                                                          </select>
                                                                                </td>
                                                                      </tr>
                                                            </tbody>
                                                  </table>
                                        </div>
                                        <div className="flex justify-end mt-4 gap-2">
                                                  <button
                                                            onClick={handleSave}
                                                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                                                  >
                                                            Simpan
                                                  </button>
                                                  <button
                                                            onClick={onClose}
                                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                                  >
                                                            Batal
                                                  </button>
                                        </div>
                              </div>
                    </div>
          );
};

export default TambahDosen;
