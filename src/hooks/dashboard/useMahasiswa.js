import { dashboard_const } from "@/constant/dashboard";
import { getCookieToken } from "@/service";
import { getCsrf } from "@/service/getCsrf";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { IntentEnum } from "@/enums/IntentEnum";

export const getMahasiswa = (url, cookie) =>
  useQuery({
    queryKey: [dashboard_const.mahasiswa, url],
    queryFn: async () => {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
        params: {
          intent: RoutesApi.getUserAdmin.intent.mahasiswa,
        },
      });
      console.log(data.data);
      return data;
    },
  });

export const joinAssignmentMahasiswa = (cookie, formData, refetch) =>
  useMutation({
    mutationFn: async () => {
      console.log("button clicked");
      const csrf = getCsrf();
      const data = await axios.post(
        `${RoutesApi.url}api/student/assignments`,
        {
          assignment_code: formData.assignment_code,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${cookie.token}`,
          },
          params: {
            intent: IntentEnum.API_USER_JOIN_ASSIGNMENT,
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire(
        "Berhasil!",
        "Berhasil bergabung dengan Praktikum!",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          refetch();
          // window.location.reload();
        }
      });

      //   window.location.href = "/" + cookie.role;
    },

    onError: (error) => {
      console.log("hello!");
      console.log(error);
      Swal.fire("Gagal !", error.response.data.message, "error");
    },
  });

  export const joinExamMahasiswa = (cookie, formData, refetch) =>
  useMutation({
    mutationFn: async () => {
      console.log("button clicked");
      const csrf = getCsrf();
      const data = await axios.post(
        `${RoutesApi.url}api/student/assignments`,
        {
          assignment_code: formData.assignment_code,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${cookie.token}`,
          },
          params: {
            intent: IntentEnum.API_USER_JOIN_EXAM,
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire(
        "Berhasil!",
        "Berhasil bergabung dengan Ujian!",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          refetch();
          // window.location.reload();
        }
      });

      //   window.location.href = "/" + cookie.role;
    },

    onError: (error) => {
      console.log("hello!");
      console.log(error);
      Swal.fire("Gagal !", error.response.data.message, "error");
    },
  });

export const deleteMahasiswa = (cookie) =>
  useMutation({
    mutationFn: async (id) => {
      console.log("button clicked");
      const csrf = getCsrf();
      const data = await axios.delete(RoutesApi.getUserAdmin.url + `/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-CSRF-TOKEN": csrf,
          Authorization: `Bearer ${cookie.token}`,
        },
      });
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire(
        "Berhasil!",
        "Data Mahasiswa berhasil dihapus!",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });

      window.location.reload();
      //   window.location.href = "/" + cookie.role;
    },

    onError: (error) => {
      console.log("hello!");
      console.log(error);
      Swal.fire("Gagal !", error.message, "error");
    },
  });
