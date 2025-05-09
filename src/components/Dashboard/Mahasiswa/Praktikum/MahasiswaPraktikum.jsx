// import React from "react";
import React, { useState } from "react";
// import "../Pengguna/Mahasiswa/editMahasiswa.css";
// import EditPopupMahasiswa from "../Pengguna/Mahasiswa/EditPopupMahasiswa";
import Swal from "sweetalert2";

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
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RoutesApi } from "@/Routes";
import { ClipLoader } from "react-spinners";
import { joinAssignmentMahasiswa } from "@/hooks/dashboard/useMahasiswa";
import { getCookie } from "@/service";
import { getCsrf } from "@/service/getCsrf";

export default function MahasiswaPraktikum() {
  const [isOpen, setIsOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [cookies, setCookie] = useCookies(["user"]);
  // const [url, setUrl] = useState(`${RoutesApi.url}api/student/assignments`);
  const [url, setUrl] = useState(`${RoutesApi.url}api/student/assignment-user`);

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["praktikum", url],
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

  const startPraktikum = useMutation({
    mutationFn: async (assignment_id) => {
      console.log("Start button clicked");
      const csrf = await getCsrf();
      const data = await axios.post(
        `${RoutesApi.url}api/student/sistem`,
        {
          assignment: String(assignment_id),
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
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire("Berhasil!", "Praktikum berhasil dimulai!", "success").then(
        (result) => {
          if (result.isConfirmed) {
            // Navigate to the praktikum system or refresh
            window.location.href = `/praktikum/${data.data.assignment_user_id}`;
            refetch();
          }
        }
      );
    },
    onError: (error) => {
      console.log("Error starting praktikum:", error);
      Swal.fire("Gagal!", error.message, "error");
    },
  });

  // const mutation = useMutation(())

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 - mahasiswa : 1;
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
  // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [formData, setFormData] = useState({
    assignment_code: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    // Logic to save the data
    // const
    onClose();
  };
  const [file, setFile] = useState();
  function handleChangeFile(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  const [search, setSearch] = useState("");

  // const processedData = data.map((item) => ({
  //   ...item,
  //   highlight:
  //     search &&
  //     Object.values(item).some((value) =>
  //       String(value).toLowerCase().includes(search.toLowerCase())
  //     ),
  // }));
  const mutation = joinAssignmentMahasiswa(getCookie(), formData, refetch);
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
        <h2>Data Praktikum</h2>
        {/* <p>{cookies.user ? cookies.user : "no user"}</p>
        {processedData.map((item) => (
          <li key={item.id} style={{ color: item.highlight ? "red" : "black" }}>
            {item.namaPraktikum}
          </li>
        ))} */}
      </div>
      <div className="search-add-container flex justify-between">
        <div className="search-input-container flex justify-between pr-7 w-full">
          <input
            type="text"
            id="search"
            className="search-input"
            placeholder="Cari Praktikum   🔎"
            onChange={(e) => setSearch(e.target.value)}
          />
          <AlertDialog>
            <AlertDialogTrigger className="bg-blue-800 p-2 rounded-md text-white hover:bg-blue-900">
              Tambah Praktikum
            </AlertDialogTrigger>
            <AlertDialogContent>
              <div className="edit-form-group-mahasiswa">
                <label className="!text-black">Kode Praktikum :</label>
                <div className="flex items-center gap-2">
                  <input
                    className="text-black"
                    name="assignment_code"
                    value=""
                    onChange={handleChange}
                    // readOnly
                  />
                </div>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-red-600 text-white hover:bg-red-800 hover:text-white">
                  Batal
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-green-600"
                  // onClick={handleSave}
                  onClick={() => {
                    mutation.mutate();
                  }}
                >
                  Gabung Praktikum
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {/* <th onClick={() => handleSort("namaPraktikum")}>
                Judul Praktikum{" "}
                {sortConfig.key === "namaPraktikum"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : sortConfig.direction === "descending"
                  ? "↓"
                  : "↑"}
              </th> */}
              <th className="">Nama Kelas</th>
              <th className="">Nama Dosen</th>
              <th className="">Judul Praktikum</th>
              <th className="">Deadline Praktikum</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((item, index) => (
              <tr key={index}>
                <td>{item.group.name}</td>
                <td>{item.group.teacher}</td>
                {/* <td>{item.dosen.name}</td> */}
                <td>{item.name}</td>
                {/* <td>{item.assignment.group.name}</td> */}
                {/* <td></td> */}
                {/* <td>{item.assignment.dosen.name}</td> */}
                {/* <td>{item.assignment.name}</td> */}
                {/* <td className="max-w-5">
                  <p className="truncate">{item.assignment.assignment_code}</p>
                </td> */}
                <td className="max-w-5">
                  <p className="">{item.assignment.end_period}</p>
                </td>
                <td>
                  <button
                    className="action-button"
                    // onClick={() => {
                    //   startPraktikum.mutate(item.id);
                    // }}
                    onClick={() => {
                      if (item.is_start === 1) {
                        // If already started, redirect directly
                        window.location.href = `/praktikum/${item.id}`;
                      } else {
                        // If not started, call the mutation to start
                        startPraktikum.mutate(item.id);
                      }
                    }}
                  >
                    Mulai
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="">
          <div className="pagination-info">
            {`Showing ${indexOfFirstItem + 1} to ${Math.min(
              indexOfLastItem,
              data.data.length
            )} of ${data.data.length} entries`}
          </div>

          <div className="pagination">
            <button
              className={`page-item`}
              onClick={() => {
                setUrl(data.links.prev);
              }}
              disabled={data.meta.current_page === 1}
            >
              &lt;
            </button>
            <button className="page-item">{data.meta.current_page}</button>
            {/* {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
                            <button key={index + 1} className={`page-item ${currentPage === index + 1 ? "active" : ""}`} onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </button>
                        ))} */}
            <button
              className={`page-item ${
                currentPage === Math.ceil(data.length / itemsPerPage)
                  ? "disabled"
                  : ""
              }`}
              onClick={() => {
                console.log(data.links.next);
                setUrl(data.links.next);
              }}
              disabled={data.links.next == null}
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
    </div>
  );
}
