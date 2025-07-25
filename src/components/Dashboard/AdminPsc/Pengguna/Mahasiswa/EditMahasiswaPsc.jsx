import React, { useState } from "react";
import "./editMahasiswa.css";
import EditPopupMahasiswa from "./EditPopupMahasiswa";
import Swal from "sweetalert2";
import { CookiesProvider, useCookies } from "react-cookie";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { RoutesApi } from "@/Routes";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { IntentEnum } from "@/enums/IntentEnum"

const EditMahasiswaPsc = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isMultipleCreateOpen, setIsMultipleCreateOpen] = useState(false); // New state for multiple create mode
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cookies, setCookie] = useCookies(["user"]);
  const [url, setUrl] = useState(RoutesApi.psc.users.index().url);
  const [search, setSearch] = useState("");

  // Form data state for editing/creating student
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: ""
  });

  // Fetch users/students data
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["mahasiswa_psc", url],
    queryFn: async () => {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          Accept: "application/json",
        },
        params: {
          intent: IntentEnum.API_USER_GET_MAHASISWA_PSC // Filter for PSC students
        }
      });
      return data;
    },
  });

  // Mutation for student operations (create, update, delete)
  const mutation = useMutation({
    mutationFn: async ({ id, action, multipleStudents = null }) => {
      // Get CSRF token
      const response = await axios.get(RoutesApi.csrf, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });

      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;

      if (action === "create") {

        if (multipleStudents && multipleStudents.length > 0) {
          const createPromises = multipleStudents.map(student => {
            return axios.post(
              RoutesApi.psc.users.store().url,
              {
                name: student.name,
                email: student.email,
                status: student.status
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  "X-CSRF-TOKEN": response.data.token,
                  Authorization: `Bearer ${cookies.token}`,
                },
                params: {
                  intent: IntentEnum.API_USER_CREATE_MAHASISWA_PSC
                }
              }
            );
          });
          // execute all request and return the combined
          return Promise.all(createPromises);
        } else {
          return await axios.post(
            RoutesApi.psc.users.store().url,
            {
              name: formData.name,
              email: formData.email,
              status: formData.status
              // No password - it's generated by the backend and sent via email
            },
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-CSRF-TOKEN": response.data.token,
                Authorization: `Bearer ${cookies.token}`,
              },
              params: {
                intent: IntentEnum.API_USER_CREATE_MAHASISWA_PSC // Use the correct intent
              }
            }
          );
        }
      } else if (action === "update" && id) {
        const updateEndpoint = RoutesApi.psc.users.update(id);
        return await axios.put(
          updateEndpoint.url,
          {
            name: formData.name,
            email: formData.email,
            status: formData.status,
            // contract_id is optional and not included by default
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "X-CSRF-TOKEN": response.data.token,
              Authorization: `Bearer ${cookies.token}`,
            }
          }
        );
      }
      // } else if (action === "delete" && id) {
      //   const deleteEndpoint = RoutesApi.psc.users.destroy(id);
      //   return await axios.delete(
      //     deleteEndpoint.url, 
      //     {
      //       headers: {
      //         "X-CSRF-TOKEN": response.data.token,
      //         Authorization: `Bearer ${cookies.token}`,
      //       }
      //     }
      //   );
      // }
    },

    onSuccess: (data, variables) => {
      const { action } = variables;
      if (action === "create") {
        if (Array.isArray(data)) {
          Swal.fire("Berhasil!", `${data.length} mahasiswa berhasil ditambahkan!`, "success");
        } else {
          Swal.fire("Berhasil!", "Operasi berhasil dilakukan!", "success");
        }
      } else if (action === "update") {
        Swal.fire("Berhasil!", "Mahasiswa berhasil diperbarui!", "success");
      } else if (action === "delete") {
        Swal.fire("Berhasil!", "Mahasiswa berhasil dihapus!", "success");
      }
      refetch();
      setIsOpen(false);
      setIsCreateOpen(false);
      setIsMultipleCreateOpen(false);
    },
    
    onError: (error) => {
      console.log(error.response);
      if (error.response === undefined) {
        Swal.fire("Gagal !", error.message, "error");
        return;
      }
      Swal.fire("Gagal !", error.response.data.message, "error");
    },
  });

  const handleEdit = (student) => {
    setSelectedData(student);
    setFormData({
      name: student.name,
      email: student.email,
      status: student.status
    });
    setIsOpen(true);
  };

  const handleCreate = () => {
    setFormData({
      name: "",
      email: "",
      status: "ACTIVE"
    });
    setIsCreateOpen(true);
  };

  // New function to handle multiple student creation
  const handleMultipleCreate = () => {
    setIsMultipleCreateOpen(true);
  };

  const handleUpdateStudent = () => {
    mutation.mutate({ id: selectedData.id, action: "update" });
  };

  const handleCreateStudent = () => {
    mutation.mutate({ action: "create" });
  };

  // New function to handle multiple students creation
  const handleCreateMultipleStudents = (students) => {
    const invalidStudents = students.filter(student =>
      !student.name || !student.email || !student.status
    );

    if (invalidStudents.length > 0) {
      Swal.fire(
        "Validasi Gagal",
        "Semua mahasiswa harus memili nama, email, dan status",
        "error"
      );
      return;
    }

    // check duplicate email
    const emails = students.map(student => student.email);
    const uniqueEmails = new Set(emails);

    if (emails.length !== uniqueEmails.size) {
      Swal.fire(
        "Validasi Gagal",
        "Terdapat email duplikat. Email setiap mahasiswa harus unik",
        "error"
      );
      return;
    }

    Swal.fire({
      title: "Tambah Mahasiswa",
      text: `Anda akan menambahkan ${students.length} mahasiswa baru. Lanjutkan?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, lanjutkan",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate({
          action: "create",
          multipleStudents: students
        });
      }
    });
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="loading">
        <ClipLoader color="#7502B5" size={50} />
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="h-screen w-full justify-center items-center flex ">
        <Alert variant="destructive" className="w-1/2 bg-white ">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error !</AlertTitle>
          <div className="">
            <p>{error?.message ?? "error !"}</p>
            <div className="w-full flex justify-end">
              <button
                className="bg-green-500 p-2 rounded-md text-white"
                onClick={() => refetch()}
              >
                Ulangi
              </button>
            </div>
          </div>
        </Alert>
      </div>
    );
  }

  // Filter data based on search
  const filteredData = data?.data?.filter(item => 
    item.name?.toLowerCase().includes(search.toLowerCase()) ||
    item.email?.toLowerCase().includes(search.toLowerCase()) ||
    (item.status && item.status.toLowerCase().includes(search.toLowerCase()))
  ) || [];

  return (
    <div className="kontrak-container">
      <div className="header">
        <h2>Data Mahasiswa</h2>
      </div>
      <div className="search-add-container">
        <div className="search-input-container">
          <input
            type="text"
            id="search"
            className="search-input"
            placeholder="Cari Data Mahasiswa 🔎"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <div className="button-group">
          {/* <button
            className="add-button"
            onClick={handleCreate}
          >
            Tambah Mahasiswa
          </button> */}
          <button
            className="add-button multiple"
            onClick={handleMultipleCreate}
            style={{ marginLeft: '10px', backgroundColor: '#4A148C' }}
          >
            Tambah Mahasiswa
          </button>
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>
                Nama Mahasiswa{" "}
                {sortConfig.key === "name"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th onClick={() => handleSort("created_at")}>
                Tanggal Daftar{" "}
                {sortConfig.key === "created_at"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th onClick={() => handleSort("email")}>
                Email{" "}
                {sortConfig.key === "email"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th onClick={() => handleSort("groups")}>
                Nama Kelas{" "}
                {sortConfig.key === "groups"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th onClick={() => handleSort("status")}>
                Status{" "}
                {sortConfig.key === "status"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  {item.created_at ? new Date(item.created_at).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  }).replace(/\//g, '-') : ''}
                </td>
                <td>{item.email}</td>
                <td>
                  {item.groups && item.groups.length > 0 ? (
                    <ul className="list-disc pl-4">
                      {item.groups.map(group => (
                        <li key={group.id}>{group.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-400 italic">No groups</span>
                  )}
                </td>
                <td>{item.status}</td>
                <td>
                  <button
                    className="action-button edit"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  {/* <button
                    className="action-button delete"
                    onClick={() => {
                      Swal.fire({
                        title: "Hapus Mahasiswa?",
                        text: "Data akan dihapus secara permanen!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Ya, hapus!",
                        cancelButtonText: "Batal",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          mutation.mutate({
                            id: item.id,
                            action: "delete",
                          });
                        }
                      });
                    }}
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-container">
          <div className="pagination-info">
            {data?.meta ? `Showing ${data.meta.from} to ${data.meta.to} of ${data.meta.total} entries` : "No data available"}
          </div>
          <div className="pagination">
            <button
              className={`page-item`}
              onClick={() => {
                if (data?.links?.prev) setUrl(data.links.prev);
              }}
              disabled={!data?.links?.prev}
            >
              &lt;
            </button>
            <button className="page-item active">{data?.meta?.current_page || 1}</button>
            <button
              className={`page-item`}
              onClick={() => {
                if (data?.links?.next) setUrl(data.links.next);
              }}
              disabled={!data?.links?.next}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
      {/* Edit Student Popup */}
      {isOpen && (
        <EditPopupMahasiswa
          onClose={() => setIsOpen(false)}
          data={selectedData}
          onSave={handleUpdateStudent}
          formData={formData}
          setFormData={setFormData}
          isLoading={mutation.isPending}
          title="Edit Mahasiswa"
        />
      )}
      
      {/* Create Student Popup */}
      {isCreateOpen && (
        <EditPopupMahasiswa
          onClose={() => setIsCreateOpen(false)}
          onSave={handleCreateStudent}
          formData={formData}
          setFormData={setFormData}
          isLoading={mutation.isPending}
          title="Tambah Mahasiswa"
          isCreateMode={true}
        />
      )}

      {/* Create Multiple Students Popup */}
      {isMultipleCreateOpen && (
        <EditPopupMahasiswa
          onClose={() => setIsMultipleCreateOpen(false)}
          onSave={handleCreateMultipleStudents}
          isLoading={mutation.isPending}
          title="Tambah Mahasiswa"
          isCreateMode={true}
          isMultipleMode={true}
        />
      )}
    </div>
  );
};

export default EditMahasiswaPsc;
