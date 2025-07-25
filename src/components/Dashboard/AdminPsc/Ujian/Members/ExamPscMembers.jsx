import React, { useState } from "react";
import "./memberStyles.css";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { ClipLoader } from "react-spinners";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
// import ExamPscMemb from "./ExamPscMemb";

const ExamPscMembers = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState(null);
  // const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [cookies] = useCookies(["user"]);
  const [url, setUrl] = useState(
    `${RoutesApi.psc.assignments.url}/${examId}/members`
  );
  const [search, setSearch] = useState("");

  // Fetch exam details
  const { data: examData } = useQuery({
    queryKey: ["exam_detail", examId],
    queryFn: async () => {
      const { data } = await axios.get(`${RoutesApi.psc.assignments.url}/${examId}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          Accept: "application/json",
        },
      });
      return data;
    },
    enabled: !!examId,
  });

  // Fetch members data
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["exam_members", url],
    queryFn: async () => {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          Accept: "application/json",
        },
      });
      return data;
    },
    enabled: !!examId,
  });

  // Member removal mutation
  const removeMemberMutation = useMutation({
    mutationFn: async (memberId) => {
      // Get CSRF token
      const response = await axios.get(`${RoutesApi.csrf.url()}`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });

      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;

      return await axios.delete(
        `${RoutesApi.psc.assignments.url}/${examId}/members/${memberId}`,
        {
          headers: {
            "X-CSRF-TOKEN": response.data.token,
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
    },
    onSuccess: () => {
      Swal.fire(
        "Berhasil!",
        "Member berhasil dikeluarkan dari ujian!",
        "success"
      );
      refetch();
    },
    onError: (error) => {
      console.log(error.response);
      if (error.response === undefined) {
        Swal.fire("Gagal!", error.message, "error");
        return;
      }
      Swal.fire("Gagal!", error.response.data.message, "error");
    },
  });

  // Member detail fetch mutation
  // const memberDetailMutation = useMutation({
  //   mutationFn: async (memberId) => {
  //     return await axios.get(
  //       `${RoutesApi.psc.assignments.url}/${examId}/members/${memberId}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${cookies.token}`,
  //           Accept: "application/json",
  //         }
  //       }
  //     );
  //   },
  //   onSuccess: (response) => {
  //     setSelectedMember(response.data);
  //     setIsDetailOpen(true);
  //   },
  //   onError: (error) => {
  //     console.log(error.response);
  //     Swal.fire("Gagal!", "Gagal mengambil detail member", "error");
  //   },
  // });

  // const handleViewDetail = (memberId) => {
  //   memberDetailMutation.mutate(memberId);
  // };

  const handleRemoveMember = (memberId) => {
    Swal.fire({
      title: "Hapus Anggota?",
      text: "Anggota akan dikeluarkan dari ujian ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        removeMemberMutation.mutate(memberId);
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

  const handleBack = () => {
    navigate("/psc/ujian");
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
      <div className="h-screen w-full justify-center items-center flex">
        <Alert variant="destructive" className="w-1/2 bg-white">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error!</AlertTitle>
          <div className="">
            <p>{error?.message ?? "Error!"}</p>
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
  const filteredData =
    data?.data?.filter(
      (item) =>
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.email?.toLowerCase().includes(search.toLowerCase())
    ) || [];

  return (
    <div className="member-container">
      <div className="header">
        <h2>Peserta Ujian: {examData?.data?.name || "Loading..."}</h2>
      </div>
      <div className="search-add-container">
        <div className="search-input-container">
          <input
            type="text"
            id="search"
            className="search-input"
            placeholder="Cari Peserta 🔎"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <button
          className="back-button"
          onClick={handleBack}
        >
          Kembali
        </button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th onClick={() => handleSort("name")}>
                Nama{" "}
                {sortConfig.key === "name"
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
              <th>Status</th>
              <th>Nilai</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  {/* <td>
                      {item.pivot?.status === 'COMPLETED' ? (
                        <span className="status-badge completed">Selesai</span>
                      ) : item.pivot?.status === 'IN_PROGRESS' ? (
                        <span className="status-badge in-progress">Sedang Mengerjakan</span>
                      ) : (
                        <span className="status-badge not-started">Belum Mulai</span>
                      )}
                    </td> */}
                  <td>{item.status}</td>
                  <td>{item.pivot?.score || "-"}</td>
                  <td>
                    {/* <button
                        className="action-button view"
                        onClick={() => handleViewDetail(item.id)}
                      >
                        Detail
                      </button> */}
                    <button
                      className="action-button delete"
                      onClick={() => handleRemoveMember(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Belum ada peserta yang bergabung
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="pagination-container">
          <div className="pagination-info">
            {data?.meta
              ? `Showing ${data.meta.from} to ${data.meta.to} of ${data.meta.total} entries`
              : "No data available"}
          </div>
          <div className="pagination">
            <button
              className="page-item"
              onClick={() => {
                if (data?.links?.prev) setUrl(data.links.prev);
              }}
              disabled={!data?.links?.prev}
            >
              &lt;
            </button>
            <button className="page-item active">
              {data?.meta?.current_page || 1}
            </button>
            <button
              className="page-item"
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

      {/* Member */}
      {/* {isDetailOpen && (
          <ExamPscMemb
            onClose={() => setIsDetailOpen(false)}
            member={selectedMember}
          />
        )} */}
    </div>
  );
};

export default ExamPscMembers;
