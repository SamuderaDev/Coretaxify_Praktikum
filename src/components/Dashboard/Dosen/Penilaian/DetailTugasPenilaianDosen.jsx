import React from "react";
import { useNavigate } from "react-router-dom";
import Wulan from "../../../Assets/image/wulan.png";
import { BsThreeDotsVertical } from "react-icons/bs";

const kelasList = [
          { id: 1, nama: "KELAS ABC", mentor: "Dika", perusahaan: "PT NARA JAYA", deadline: "March 1, 2025", join: "February 7, 2025" },
          { id: 2, nama: "KELAS ABC", mentor: "Dika", perusahaan: "PT NARA JAYA", deadline: "March 1, 2025", join: "February 7, 2025" },
];

const DetailTugasPenilaianDosen = ({ sidebarOpen }) => {
          const navigate = useNavigate();

          return (
                    <div
                              className={`transition-all duration-300 px-4 py-6 ${sidebarOpen ? "ml-64" : "ml-16"
                                        }`}
                    >
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 place-items-start">
                                        {kelasList.map((kelas) => (

                                                  <div
                                                            key={kelas.id}
                                                            className="relative  shadow-lg rounded-lg w-100 md:w-96 p-4 cursor-pointer"
                                                            onClick={() => navigate("/dosen/penilaian/detail-tugas/detail-penilaian")}
                                                  >
                                                            <div className="bg-purple-700 text-white p-4 rounded-t-lg w-150">
                                                                      <h3 className="font-bold text-lg">{kelas.nama}</h3>
                                                                      <p className="text-sm">{kelas.mentor}</p>
                                                            </div>
                                                            <div className="p-4">
                                                                      <ul className="text-gray-700 text-sm space-y-2">
                                                                                <li>
                                                                                          <strong className="text-indigo-700">{kelas.perusahaan}</strong>
                                                                                          <p className="text-gray-500 p-4">Deadline {kelas.deadline}</p>
                                                                                </li>
                                                                      </ul>
                                                            </div>
                                                            <div className="border-t px-4 py-2 flex items-center text-gray-700 text-sm">
                                                                      <span className="mr-2">⏳</span>
                                                                      <span>
                                                                                <strong>Join Kelas :</strong> {kelas.join}
                                                                      </span>
                                                            </div>
                                                            <img
                                                                      src={Wulan}
                                                                      alt="Icon"
                                                                      className="absolute bottom-[200px] right-4 w-12 h-12 rounded-full border-2 border-white shadow-md"
                                                            />
                                                  </div>
                                        ))}
                              </div>
                    </div>
          );
};

export default DetailTugasPenilaianDosen;
