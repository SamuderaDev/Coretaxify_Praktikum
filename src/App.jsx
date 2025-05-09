import { useEffect, useState } from "react";
import "./App.css";
import SidebarAdmin from "./components/Dashboard/Admin/SidebarAdmin/SidebarAdmin";
import Login from "./components/Dashboard/Auth/Login/Login";
import Register from "./components/Dashboard/Auth/Register/Register";
import ConfirmOTP from "./components/Dashboard/Auth/ConfirmEmail/ConfirmOTP";
import ResetPassword from "./components/Dashboard/Auth/ResetPassword/ResetPassword";
import DashboardAdmin from "./components/Dashboard/Admin/Dashboard/DashboardAdmin";
import Kontrak from "./components/Dashboard/Admin/Kontrak/Kontrak";
import DashboardDosen from "./components/Dashboard/Dosen/Dashboard/DashboardDosen";
// import DosenTugas from "./components/Dashboard/Dosen/Kelas/DosenKelas";
import DosenKelas from "./components/Dashboard/Dosen/Kelas/DosenKelas";
// import DosenCardKelas from "./components/Dashboard/Dosen/Kelas/DosenCardKelas";
import UjianDosen from "./components/Dashboard/Dosen/Ujian/UjianDosen";
import UjianDosenMember from "./components/Dashboard/Dosen/Ujian/Members/UjianDosenMember";
import EditDosen from "./components/Dashboard/Admin/Pengguna/Dosen/EditDosen";
import PenilaianDosen from "./components/Dashboard/Dosen/Penilaian/PenilaianDosen";
import DetailPenilaian from "./components/Dashboard/Dosen/Penilaian/DetailPenilaianDosen";
import DetailTugasPenilaianDosen from "./components/Dashboard/Dosen/Penilaian/DetailTugasPenilaianDosen";
import EditMahasiswa from "./components/Dashboard/Admin/Pengguna/Mahasiswa/EditMahasiswa";
import EditAdmin from "./components/Dashboard/Admin/Pengguna/Admin/EditAdmin";
import EditKelas from "./components/Dashboard/Admin/Pengguna/Kelas/EditKelas";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RoleProtectedRoutes from "./components/Dashboard/Auth/RoleProtectedRoutes";
import NotFound from "./components/NotFound";
// import { BrowserRouter, Routes, Route, Router } from "react-router";
import ClipLoader from "react-spinners/ClipLoader";
import EditArtikel from "./components/Dashboard/Admin/LandingPage/EditArtikel";
import EditUlasan from "./components/Dashboard/Admin/LandingPage/EditUlasan";
import Praktikum from "./components/Dashboard/Dosen/Praktikum/Praktikum";
// import Praktikum from "./components/Dashboard/Admin/Praktikum/Praktikum";
import Ujian from "./components/Dashboard/Admin/Praktikum/Ujian";
import AdminPraktikum from "./components/Dashboard/Admin/Praktikum/Praktikum";
import AdminPraktikumMember from "./components/Dashboard/Admin/Praktikum/Members/PraktikumMember";
import UploadSoal from "./components/Dashboard/Admin/Praktikum/UploadSoal";
import KontrakBackup from "./components/Dashboard/Admin/Kontrak/KontrakBackup";
import PraktikumBackup from "./components/Dashboard/Admin/Praktikum/PraktikumBackup";
import MahasiswaKelas from "./components/Dashboard/Mahasiswa/Kelas/MahasiswaKelas";
import MahasiswaPraktikum from "./components/Dashboard/Mahasiswa/Praktikum/MahasiswaPraktikum";
import MahasiswaUjian from "./components/Dashboard/Mahasiswa/Praktikum/MahasiswaUjian";
import EditPengajar from "./components/Dashboard/AdminPsc/Pengguna/Pengajar/EditPengajar";
import EditKelasPsc from "./components/Dashboard/AdminPsc/Pengguna/Kelas/EditKelasPsc";
import PraktikumPsc from "./components/Dashboard/AdminPsc/Pengguna/Praktikum/PraktikumPsc";
import AssignmentPscMember from "./components/Dashboard/AdminPsc/Pengguna/Praktikum/Members/AssignmentPscMember";
import ExamPsc from "./components/Dashboard/AdminPsc/Ujian/ExamPsc";
import ExamPscMembers from "./components/Dashboard/AdminPsc/Ujian/Members/ExamPscMembers";;
import EditMahasiswaPsc from "./components/Dashboard/AdminPsc/Pengguna/Mahasiswa/EditMahasiswaPsc";
import Header from "./components/Header/Header";
import Home from "./components/Header/Home";
import CoretaxifyList from "./components/Dashboard/Admin/Coretaxify/CoretaxifyList";
import CoretaxifySendDetail from "./components/Dashboard/Admin/Coretaxify/CoretaxifySendDetail";

//Route Praktikum Orang Pribadi
import DokumenSaya from "./components/PraktikumPage/OrangPribadi/PortalSaya/DokumenSaya";
import NotifikasiSaya from "./components/PraktikumPage/OrangPribadi/PortalSaya/NotifikasiSaya";
import KasusSaya from "./components/PraktikumPage/OrangPribadi/PortalSaya/KasusSaya";
import ProfilSaya from "./components/PraktikumPage/OrangPribadi/PortalSaya/ProfilSaya";
import InformasiSaya from "./components/PraktikumPage/OrangPribadi/PortalSaya/InformasiSaya";
import EditDataProfil from "./components/PraktikumPage/OrangPribadi/PortalSaya/EditDataProfil";
import AlamatSaya from "./components/PraktikumPage/OrangPribadi/PortalSaya/AlamatSaya";
import DetailKontak from "./components/PraktikumPage/OrangPribadi/PortalSaya/DetailKontak";
import PihakTerkait from "./components/PraktikumPage/OrangPribadi/PortalSaya/PihakTerkait";
import DetailBank from "./components/PraktikumPage/OrangPribadi/PortalSaya/DetailBank";
import ObjekPBB from "./components/PraktikumPage/OrangPribadi/PortalSaya/ObjekPBB";
import KlasifikasiLapanganUsaha from "./components/PraktikumPage/OrangPribadi/PortalSaya/KlasifikasiLapanganUsaha";
import DataUnitKeluarga from "./components/PraktikumPage/OrangPribadi/PortalSaya/DataUnitKeluarga";
import TempatKegiatanUsaha from "./components/PraktikumPage/OrangPribadi/PortalSaya/TempatKegiatanUsaha";
import NomorIdentifikasiEksternal from "./components/PraktikumPage/OrangPribadi/PortalSaya/NomorIdentifikasiEksternal";
import JenisPajak from "./components/PraktikumPage/OrangPribadi/PortalSaya/JenisPajak";
import WakilKuasaSaya from "./components/PraktikumPage/OrangPribadi/PortalSaya/WakilKuasaSaya";
import WajibPajakYangDiwakili from "./components/PraktikumPage/OrangPribadi/PortalSaya/WajibPajakYangDiwakili";
import TwoAuthentication from "./components/PraktikumPage/OrangPribadi/PortalSaya/TwoAuthentication";
import PermohonanTertunda from "./components/PraktikumPage/OrangPribadi/PortalSaya/PermohonanTertunda";

// MAHASISWA-PSC
import MahasiswaPscKelas from "./components/Dashboard/MahasiswaPsc/Kelas/MahasiswaPscKelas";
import MahasiswaPscKelasPraktikum from "./components/Dashboard/MahasiswaPsc/Kelas/Praktikum/MahasiswaPscKelasPraktikum";
import MahasiswaPscPraktikum from "./components/Dashboard/MahasiswaPsc/Praktikum/MahasiswaPscPraktikum";
import MahasiswaPscUjian from "./components/Dashboard/MahasiswaPsc/Ujian/MahasiswaPscUjian";

// INSTRUKTUR
import InstrukturPraktikum from "./components/Dashboard/Instruktur/Praktikum/InstrukturPraktikum";
import BlankAssignment from "./components/Dashboard/Instruktur/Praktikum/Blank/BlankAssignment";
import FilledAssignment from "./components/Dashboard/Instruktur/Praktikum/Filled/FilledAssignment";

import DashboardEFakturOP from "./components/PraktikumPage/OrangPribadi/EFaktur/DashboardEFaktur";
import PajakKeluaranOP from "./components/PraktikumPage/OrangPribadi/EFaktur/PajakKeluaran";
import TambahFakturKeluaranOP from "./components/PraktikumPage/OrangPribadi/EFaktur/TambahFakturKeluaran";
import PajakMasukanOP from "./components/PraktikumPage/OrangPribadi/EFaktur/PajakMasukan";

//Route Praktikum

// Route Badan
import DokumenSayaBadan from "./components/PraktikumPage/Badan/PortalSaya/DokumenSaya";
import NotifikasiSayaBadan from "./components/PraktikumPage/Badan/PortalSaya/NotifikasiSaya";
import KasusSayaBadan from "./components/PraktikumPage/Badan/PortalSaya/KasusSaya";
import ProfilSayaBadan from "./components/PraktikumPage/Badan/PortalSaya/ProfilSaya";
import InformasiSayaBadan from "./components/PraktikumPage/Badan/PortalSaya/InformasiSaya";
import EditDataProfilBadan from "./components/PraktikumPage/Badan/PortalSaya/EditDataProfil";
import AlamatSayaBadan from "./components/PraktikumPage/Badan/PortalSaya/AlamatSaya";
import DetailKontakBadan from "./components/PraktikumPage/Badan/PortalSaya/DetailKontak";
import PihakTerkaitBadan from "./components/PraktikumPage/Badan/PortalSaya/PihakTerkait";
import DetailBankBadan from "./components/PraktikumPage/Badan/PortalSaya/DetailBank";
import ObjekPBBBadan from "./components/PraktikumPage/Badan/PortalSaya/ObjekPBB";
import KlasifikasiLapanganUsahaBadan from "./components/PraktikumPage/Badan/PortalSaya/KlasifikasiLapanganUsaha";
import DataUnitKeluargaBadan from "./components/PraktikumPage/Badan/PortalSaya/DataUnitKeluarga";
import TempatKegiatanUsahaBadan from "./components/PraktikumPage/Badan/PortalSaya/TempatKegiatanUsaha";
import NomorIdentifikasiEksternalBadan from "./components/PraktikumPage/Badan/PortalSaya/NomorIdentifikasiEksternal";
import JenisPajakBadan from "./components/PraktikumPage/Badan/PortalSaya/JenisPajak";
import WakilKuasaSayaBadan from "./components/PraktikumPage/Badan/PortalSaya/WakilKuasaSaya";
import WajibPajakYangDiwakiliBadan from "./components/PraktikumPage/Badan/PortalSaya/WajibPajakYangDiwakili";
import TwoAuthenticationBadan from "./components/PraktikumPage/Badan/PortalSaya/TwoAuthentication";
import PermohonanTertundaBadan from "./components/PraktikumPage/Badan/PortalSaya/PermohonanTertunda";
import DashboardEFaktur from "./components/PraktikumPage/Badan/EFaktur/DashboardEFaktur";
import PajakKeluaran from "./components/PraktikumPage/Badan/EFaktur/PajakKeluaran";
import TambahFakturKeluaran from "./components/PraktikumPage/Badan/EFaktur/TambahFakturKeluaran";
import PajakMasukan from "./components/PraktikumPage/Badan/EFaktur/PajakMasukan";
import KonsepSPT from "./components/PraktikumPage/Badan/SPT/KonsepSPT";
import BuatKonsepSPT from "./components/PraktikumPage/Badan/SPT/BuatKonsepSPT";
import CreateKonsepSPT from "./components/PraktikumPage/Badan/SPT/CreateKonsepSPT";
import BupotBulananPegawaiTetap from "./components/PraktikumPage/Badan/BUPOT/BupotBulananPegawaiTetap";
import BupotBulananPegawaiTetapTelahTerbit from "./components/PraktikumPage/Badan/BUPOT/BupotBulananPegawaiTetapTelahTerbit";
import BupotBulananPegawaiTetapTidakValid from "./components/PraktikumPage/Badan/BUPOT/BupotBulananPegawaiTetapTidakValid";
import BppuBelumTerbit from "./components/PraktikumPage/Badan/BUPOT/BPPU/BppuBelumTerbit";
import CreateEbupot from "./components/PraktikumPage/Badan/BUPOT/CreateEbupot";
// Route Badan

import ProtectedRoutes from "./components/Dashboard/Auth/ProtectedRoutes";
import MahasiswaPraktikumKelas from "./components/Dashboard/Mahasiswa/Kelas/MahasiswaPraktikumKelas";
import DashboardPsc from "./components/Dashboard/AdminPsc/Dashboard/DashboardPsc";
import UploadSoalPsc from "./components/Dashboard/AdminPsc/Upload Soal/UploadSoal";
import EditMahasiswaPscKelas from "./components/Dashboard/AdminPsc/Pengguna/Kelas/Mahasiswa/EditMahasiswaPscKelas";
import DosenPraktikumKelas from "./components/Dashboard/Dosen/Kelas/DosenPraktikumKelas";
import { CookiesProvider, useCookies } from "react-cookie";
import DosenPraktikumKelasMember from "./components/Dashboard/Dosen/Kelas/DosenPraktikumKelasMember";
import RoleBasedRenderer from "./components/PraktikumPage/RoleBaseRenderer";

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie] = useCookies(["token, role"]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);

  // In the useEffect that validates the token
  // useEffect(() => {
  //   const validateToken = async () => {
  //     if (cookies.token) {
  //       try {
  //         // Try to get user profile to validate token
  //         await axios.get(RoutesApi.profile, {
  //           headers: {
  //             Authorization: `Bearer ${cookies.token}`,
  //             Accept: "application/json",
  //           }
  //         });
  //         // Token is valid, check verification status
  //         try {
  //           const verificationResponse = await axios.get(RoutesApi.apiUrl + "verification-status", {
  //             headers: {
  //               Authorization: `Bearer ${cookies.token}`,
  //               Accept: "application/json",
  //             }
  //           });

  //           // If not verified, store email for OTP verification
  //           if (!verificationResponse.data.verified) {
  //             localStorage.setItem("pendingVerificationEmail", verificationResponse.data.email);
  //           }
  //         } catch (verificationError) {
  //           console.error("Verification status check error:", verificationError);
  //         }
  //       } catch (error) {
  //         console.error("Token validation error:", error);
  //         // If token is invalid, clear cookies and redirect to login
  //         if (error.response?.status === 401) {
  //           setCookie("token", "", { path: "/", expires: new Date(0) });
  //           setCookie("role", "", { path: "/", expires: new Date(0) });
  //           window.location.href = "/login";
  //         }
  //       }
  //     }
  //   };

  //   validateToken();
  // }, [cookies.token, setCookie]);

  return loading ? (
    <div className="loading">
      <ClipLoader color="#7502B5" size={50} />
    </div>
  ) : (
    // <BrowserRouter>
    // <userContext.js>
    <Router>
      <Routes>
        {/* ROOT REDIRECT */}
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Navigate to={`/${cookies.role}`} replace />
            </ProtectedRoutes>
          }
        />
        {/* AUTHENTICATION */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/confirm-otp" element={<ConfirmOTP />} />
        {/* ADMIN ROUTE */}
        <Route
          element={
            <RoleProtectedRoutes allowedRoles={["admin"]} layout="admin" />
          }
        >
          <Route path="/admin" element={<DashboardAdmin />} />
          <Route path="/admin/kontrak" element={<Kontrak />} />
          <Route path="/admin/coretaxify" element={<CoretaxifyList />} />
          <Route path="/admin/edit-dosen" element={<EditDosen />} />
          <Route path="/admin/upload-soal" element={<UploadSoal />} />
          <Route path="/admin/praktikum" element={<AdminPraktikum />} />
          <Route path="/admin/praktikum/:assignmentId/members" element={<AdminPraktikumMember />} />
          <Route
            path="/admin/coretaxify/coretaxify-send"
            element={<CoretaxifySendDetail />}
          />
          <Route path="/admin/ujian" element={<Ujian />} />
          <Route path="/admin/edit-admin" element={<EditAdmin />} />
          <Route path="/admin/edit-kelas" element={<EditKelas />} />
          <Route path="/admin/edit-mahasiswa" element={<EditMahasiswa />} />
          <Route path="/admin/edit-artikel" element={<EditArtikel />} />
          <Route path="/admin/edit-ulasan" element={<EditUlasan />} />
          <Route path="/admin/kontrak-backup" element={<KontrakBackup />} />
          <Route path="/admin/praktikum-backup" element={<PraktikumBackup />} />
          <Route path="/admin/praktikum" element={<Praktikum />} />
        </Route>

        {/* DOSEN ROUTE */}
        <Route element={ <RoleProtectedRoutes allowedRoles={["dosen"]} layout="admin" /> } >
          <Route path="/dosen" element={<DashboardDosen />} />
          <Route path="/dosen/kelas" element={<DosenKelas />} />
          <Route path="/dosen/kelas/praktikum/:id" element={<DosenPraktikumKelas />} />
          <Route path="/dosen/kelas/:id/praktikum/:idpraktikum" element={<DosenPraktikumKelasMember />} />
          <Route path="/dosen/praktikum" element={<Praktikum />} />
          <Route path="/dosen/penilaian" element={<PenilaianDosen />} />
          <Route path="/dosen/penilaian/detail-tugas" element={<DetailTugasPenilaianDosen />} />
          <Route path="/dosen/penilaian/detail-tugas/detail-penilaian" element={<DetailPenilaian />} />
          <Route path="/dosen/ujian" element={<UjianDosen />} />
          <Route path="/dosen/ujian/:examId/members" element={<UjianDosenMember />} />
        </Route>

        {/* MAHASISWA ROUTE */}
        <Route
          element={
            <RoleProtectedRoutes allowedRoles={["mahasiswa"]} layout="admin" />
          }
        >
          <Route path="/mahasiswa/kelas" element={<MahasiswaKelas />} />
          <Route
            path="/mahasiswa/kelas/:id"
            element={<MahasiswaPraktikumKelas />}
          />
          <Route
            path="/mahasiswa"
            element={<Navigate to="/mahasiswa/kelas" replace />}
          />
          <Route path="/mahasiswa/praktikum" element={<MahasiswaPraktikum />} />
          <Route path="/mahasiswa/ujian" element={<MahasiswaUjian />} />
        </Route>
        {/* PSC ROUTE */}
        <Route
          element={
            <RoleProtectedRoutes allowedRoles={["psc"]} layout="admin" />
          }
        >
          <Route path="/psc/" element={<DashboardPsc />} />
          <Route path="/psc/master-soal" element={<UploadSoalPsc />} />
          <Route path="/psc/edit-pengajar" element={<EditPengajar />} />
          <Route path="/psc/edit-kelas" element={<EditKelasPsc />} />
          {/* <Route path="/psc/edit-kelas/1" element={<EditMahasiswaPscKelas />} /> */}
          <Route
            path="/psc/kelas/:groupId/mahasiswa"
            element={<EditMahasiswaPscKelas />}
          />
          {/* <Route path="/psc/kelas/:groupId/mahasiswa/:memberId" element={<MemberDetailPage />} /> */}
          <Route path="/psc/praktikum" element={<PraktikumPsc />} />
          <Route path="/psc/praktikum/:assignmentId/members" element={<AssignmentPscMember />} />
          <Route path="/psc/ujian" element={<ExamPsc />} />
          <Route path="/psc/ujian/:examId/members" element={<ExamPscMembers />} />
          <Route path="/psc/edit-mahasiswa" element={<EditMahasiswaPsc />} />
        </Route>
        {/* MAHASISWA-PSC ROUTE */}
        <Route element={<RoleProtectedRoutes allowedRoles={["mahasiswa-psc"]} layout="admin" />}>
          <Route path="/mahasiswa-psc" element={<Navigate to="/mahasiswa-psc/kelas" replace />} />
          <Route path="/mahasiswa-psc/kelas" element={<MahasiswaPscKelas />} />
          <Route
            path="/mahasiswa-psc/kelas/:id/praktikum"
            element={<MahasiswaPscKelasPraktikum />}
          />
          {/* <Route path="/mahasiswa-psc/kelas/:id/praktikum/:idpraktikum" element={<MahasiswaPscPraktikumKelasMember />} /> */}
          <Route
            path="/mahasiswa-psc/praktikum"
            element={<MahasiswaPscPraktikum />}
          />
          <Route path="/mahasiswa-psc/ujian" element={<MahasiswaPscUjian />} />
        </Route>
        {/* PENGAJAR ROUTE */}
        <Route element={<RoleProtectedRoutes allowedRoles={["instruktur"]} layout="admin" />}>
          <Route path="/instruktur" element={<Navigate to="/instruktur/praktikum" replace />} />
          <Route path="/instruktur/praktikum" element={<InstrukturPraktikum />} />
          <Route path="/instruktur/praktikum/terisi" element={<FilledAssignment />} />
          <Route path="/instruktur/praktikum/kosong" element={<BlankAssignment />} />
        </Route>
        {/* Praktikum */}
        <Route
          path="/admin/praktikum/prak1"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/admin/praktikum/dokumen-saya"
          element={
            <>
              <Header />
              <DokumenSaya />
            </>
          }
        />
        <Route
          path="/admin/praktikum/notifikasi-saya"
          element={
            <>
              <Header />
              <NotifikasiSaya />
            </>
          }
        />
        <Route
          path="/admin/praktikum/dokumen-saya"
          element={
            <>
              <Header />
              <DokumenSaya />
            </>
          }
        />
        <Route
          path="/admin/praktikum/notifikasi-saya"
          element={
            <>
              <Header />
              <NotifikasiSaya />
            </>
          }
        />
        <Route
          path="/admin/praktikum/kasus-saya"
          element={
            <>
              <Header />
              <KasusSaya />
            </>
          }
        />
        <Route
          path="/admin/praktikum/profil-saya"
          element={
            <>
              <Header />
              <ProfilSaya />
            </>
          }
        />
        <Route
          path="/admin/praktikum/profil-saya/informasi-umum"
          element={
            <>
              <Header />
              <InformasiSaya />
            </>
          }
        />
        {/* <Route
          path="/admin/praktikum/profil-saya/informasi-umum/edit-data-profil"
          element={
            <>
              <Header />
              <EditDataProfil />
            </>
          }
        /> */}
        <Route
          path="/admin/praktikum/profil-saya/alamat"
          element={
            <>
              <Header />
              <AlamatSaya />
            </>
          }
        />
        <Route
          path="/admin/praktikum/profil-saya/detail-kontak"
          element={
            <>
              <Header />
              <DetailKontak />
            </>
          }
        />
        <Route
          path="/admin/praktikum/profil-saya/pihak-terkait"
          element={
            <>
              <Header />
              <PihakTerkait />
            </>
          }
        />
        <Route
          path="/admin/praktikum/profil-saya/detail-bank"
          element={
            <>
              <Header />
              <DetailBank />
            </>
          }
        />
        <Route
          path="/admin/praktikum/profil-saya/objek-pajak-bumi-dan-bangunan-(pbb)"
          element={
            <>
              <Header />
              <ObjekPBB />
            </>
          }
        />
        <Route
          path="/admin/praktikum/profil-saya/klasifikasi-lapangan-usaha-(klu)"
          element={
            <>
              <Header />
              <KlasifikasiLapanganUsaha />
            </>
          }
        />
        <Route
          path="/admin/praktikum/profil-saya/data-unit-keluarga"
          element={
            <>
              <Header />
              <DataUnitKeluarga />
            </>
          }
        />
        <Route
          path="/admin/praktikum/profil-saya/tempat-kegiatan-usaha/sub-unit"
          element={
            <>
              <Header />
              <TempatKegiatanUsaha />
            </>
          }
        />
        <Route
          path="/admin/praktikum/profil-saya/nomor-identifikasi-eksternal"
          element={
            <>
              <Header />
              <NomorIdentifikasiEksternal />
            </>
          }
        />
        <Route
          path="/admin/praktikum/profil-saya/jenis-pajak"
          element={
            <>
              <Header />
              <JenisPajak />
            </>
          }
        />
        <Route
          path="/admin/praktikum/profil-saya/wakil-kuasa-saya"
          element={
            <>
              <Header />
              <WakilKuasaSaya />
            </>
          }
        />
        <Route
          path="/admin/praktikum/profil-saya/wajib-pajak-yang-diwakili"
          element={
            <>
              <Header />
              <WajibPajakYangDiwakili />
            </>
          }
        />
        <Route
          path="/admin/praktikum/profil-saya/verifikasi-dua-langkah"
          element={
            <>
              <Header />
              <TwoAuthentication />
            </>
          }
        />
        <Route
          path="/admin/praktikum/profil-saya/permohonan-tertunda"
          element={
            <>
              <Header />
              <PermohonanTertunda />
            </>
          }
        />
        {/* Praktikum */}
        {/* Praktikum  Orang Pribadi*/}
        {/* <Route
          path="/admin/praktikum/1/prak1"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        /> */}
        <Route
          path="/praktikum/:id/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/admin/praktikum/1/dokumen-saya"
          element={
            <>
              <Header />
              <DokumenSaya />
            </>
          }
        />
        <Route
          path="/admin/praktikum/1/notifikasi-saya"
          element={
            <>
              <Header />
              <NotifikasiSaya />
            </>
          }
        />
        <Route
          path="/admin/praktikum/1/dokumen-saya"
          element={
            <>
              <Header />
              <DokumenSaya />
            </>
          }
        />
        <Route
          path="/admin/praktikum/1/notifikasi-saya"
          element={
            <>
              <Header />
              <NotifikasiSaya />
            </>
          }
        />
        <Route
          path="/admin/praktikum/1/kasus-saya"
          element={
            <>
              <Header />
              <KasusSaya />
            </>
          }
        />
        <Route
          path="/praktikum/:id/sistem/:akun/profil-saya"
          element={
            <>
              {/* <p>12</p> */}
              <Header />
              <ProfilSaya />
            </>
          }
        />
        <Route
          path="/praktikum/:id/sistem/:akun/informasi-umum"
          // path="/admin/praktikum/1/profil-saya/informasi-umum"
          element={
            <>
              <Header />
              <InformasiSaya />
            </>
          }
        />
        <Route
          path="/praktikum/:id/sistem/:akun/edit-informasi-umum"
          // path="/admin/praktikum/1/profil-saya/informasi-umum/edit-data-profil"
          element={
            <>
              <Header />
              <EditDataProfil />
            </>
          }
        />
        <Route
          path="/admin/praktikum/1/profil-saya/alamat"
          element={
            <>
              <Header />
              <AlamatSaya />
            </>
          }
        />
        <Route
          path="/admin/praktikum/1/profil-saya/detail-kontak"
          element={
            <>
              <Header />
              <DetailKontak />
            </>
          }
        />
        <Route
          path="/admin/praktikum/1/profil-saya/pihak-terkait"
          element={
            <>
              <Header />
              <PihakTerkait />
            </>
          }
        />
        <Route
          path="/admin/praktikum/1/profil-saya/detail-bank"
          element={
            <>
              <Header />
              <DetailBank />
            </>
          }
        />
        <Route
          path="/admin/praktikum/1/profil-saya/objek-pajak-bumi-dan-bangunan-(pbb)"
          element={
            <>
              <Header />
              <ObjekPBB />
            </>
          }
        />
        <Route
          path="/admin/praktikum/1/profil-saya/klasifikasi-lapangan-usaha-(klu)"
          element={
            <>
              <Header />
              <KlasifikasiLapanganUsaha />
            </>
          }
        />
        <Route
          path="/admin/praktikum/1/profil-saya/data-unit-keluarga"
          element={
            <>
              <Header />
              <DataUnitKeluarga />
            </>
          }
        />
        <Route
          path="/admin/praktikum/1/profil-saya/tempat-kegiatan-usaha/sub-unit"
          element={
            <>
              <Header />
              <TempatKegiatanUsaha />
            </>
          }
        />
        <Route
          path="/admin/praktikum/1/profil-saya/nomor-identifikasi-eksternal"
          element={
            <>
              <Header />
              <NomorIdentifikasiEksternal />
            </>
          }
        />
        <Route
          path="/admin/praktikum/1/profil-saya/jenis-pajak"
          element={
            <>
              <Header />
              <JenisPajak />
            </>
          }
        />
        <Route
          path="/admin/praktikum/1/profil-saya/wakil-kuasa-saya"
          element={
            <>
              <Header />
              <WakilKuasaSaya />
            </>
          }
        />
        <Route
          path="/admin/praktikum/1/profil-saya/wajib-pajak-yang-diwakili"
          element={
            <>
              <Header />
              <WajibPajakYangDiwakili />
            </>
          }
        />
        <Route
          path="/admin/praktikum/1/profil-saya/verifikasi-dua-langkah"
          element={
            <>
              <Header />
              <TwoAuthentication />
            </>
          }
        />
        <Route
          path="/admin/praktikum/1/profil-saya/permohonan-tertunda"
          element={
            <>
              <Header />
              <PermohonanTertunda />
            </>
          }
        />
        <Route
          path="/admin/praktikum/1/e-faktur"
          element={
            <>
              <Header />
              <DashboardEFakturOP />
            </>
          }
        />
        <Route
          path="/admin/praktikum/1/e-faktur/pajak-keluaran"
          element={
            <>
              <Header />
              <PajakKeluaranOP />
            </>
          }
        />
        <Route
          path="/admin/praktikum/1/e-faktur/pajak-keluaran/tambah-faktur-keluaran"
          element={
            <>
              <Header />
              <TambahFakturKeluaranOP />
            </>
          }
        />
        <Route
          path="/admin/praktikum/1/e-faktur/pajak-masukan"
          element={
            <>
              <Header />
              <PajakMasukanOP />
            </>
          }
        />
        {/* Praktikum Orang Pribadi*/}
        {/* Praktikum  Orang Badan*/}
        <Route
          path="/admin/praktikum/2/prak1"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/dokumen-saya"
          element={
            <>
              <Header />
              <DokumenSayaBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/notifikasi-saya"
          element={
            <>
              <Header />
              <NotifikasiSayaBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/dokumen-saya"
          element={
            <>
              <Header />
              <DokumenSayaBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/notifikasi-saya"
          element={
            <>
              <Header />
              <NotifikasiSayaBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/kasus-saya"
          element={
            <>
              <Header />
              <KasusSayaBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya"
          element={
            <>
              <Header />
              <ProfilSayaBadan />
            </>
          }
        />
        <Route
          path="/tes/:id/:akun"
          element={
            <>
              <RoleBasedRenderer
                OrangPribadi={DashboardAdmin}
                Badan={DetailKontakBadan}
              ></RoleBasedRenderer>
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya/informasi-umum"
          element={
            <>
              <Header />
              <InformasiSayaBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya/informasi-umum/edit-data-profil"
          element={
            <>
              <Header />
              <EditDataProfilBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya/alamat"
          element={
            <>
              <Header />
              <AlamatSayaBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya/detail-kontak"
          element={
            <>
              <Header />
              <DetailKontakBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya/pihak-terkait"
          element={
            <>
              <Header />
              <PihakTerkaitBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya/detail-bank"
          element={
            <>
              <Header />
              <DetailBankBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya/objek-pajak-bumi-dan-bangunan-(pbb)"
          element={
            <>
              <Header />
              <ObjekPBBBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya/klasifikasi-lapangan-usaha-(klu)"
          element={
            <>
              <Header />
              <KlasifikasiLapanganUsahaBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya/data-unit-keluarga"
          element={
            <>
              <Header />
              <DataUnitKeluargaBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya/tempat-kegiatan-usaha/sub-unit"
          element={
            <>
              <Header />
              <TempatKegiatanUsahaBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya/nomor-identifikasi-eksternal"
          element={
            <>
              <Header />
              <NomorIdentifikasiEksternalBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya/jenis-pajak"
          element={
            <>
              <Header />
              <JenisPajakBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya/wakil-kuasa-saya"
          element={
            <>
              <Header />
              <WakilKuasaSayaBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya/wajib-pajak-yang-diwakili"
          element={
            <>
              <Header />
              <WajibPajakYangDiwakiliBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya/verifikasi-dua-langkah"
          element={
            <>
              <Header />
              <TwoAuthenticationBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya/permohonan-tertunda"
          element={
            <>
              <Header />
              <PermohonanTertundaBadan />
            </>
          }
        />
        {/* Praktikum Orang Pribadi*/}
        <Route
          path="/admin/praktikum/2/e-faktur"
          element={
            <>
              <Header />
              <DashboardEFaktur />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/e-faktur/pajak-keluaran"
          element={
            <>
              <Header />
              <PajakKeluaran />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/e-faktur/pajak-keluaran/tambah-faktur-keluaran"
          element={
            <>
              <Header />
              <TambahFakturKeluaran />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/e-faktur/pajak-masukan"
          element={
            <>
              <Header />
              {/* <PajakMasukan /> */}
            </>
          }
        />

        {/* Praktikum  Orang Badan*/}
        <Route
          path="/admin/praktikum/2/prak1"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/dokumen-saya"
          element={
            <>
              <Header />
              <DokumenSayaBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/notifikasi-saya"
          element={
            <>
              <Header />
              <NotifikasiSayaBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/dokumen-saya"
          element={
            <>
              <Header />
              <DokumenSayaBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/notifikasi-saya"
          element={
            <>
              <Header />
              <NotifikasiSayaBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/kasus-saya"
          element={
            <>
              <Header />
              <KasusSayaBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya"
          element={
            <>
              <Header />
              <ProfilSayaBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya/informasi-umum"
          element={
            <>
              <Header />
              <InformasiSayaBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya/informasi-umum/edit-data-profil"
          element={
            <>
              <Header />
              <EditDataProfilBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya/alamat"
          element={
            <>
              <Header />
              <AlamatSayaBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya/detail-kontak"
          element={
            <>
              <Header />
              <DetailKontakBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya/pihak-terkait"
          element={
            <>
              <Header />
              <PihakTerkaitBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya/detail-bank"
          element={
            <>
              <Header />
              <DetailBankBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya/objek-pajak-bumi-dan-bangunan-(pbb)"
          element={
            <>
              <Header />
              <ObjekPBBBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya/klasifikasi-lapangan-usaha-(klu)"
          element={
            <>
              <Header />
              <KlasifikasiLapanganUsahaBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya/data-unit-keluarga"
          element={
            <>
              <Header />
              <DataUnitKeluargaBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya/tempat-kegiatan-usaha/sub-unit"
          element={
            <>
              <Header />
              <TempatKegiatanUsahaBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya/nomor-identifikasi-eksternal"
          element={
            <>
              <Header />
              <NomorIdentifikasiEksternalBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya/jenis-pajak"
          element={
            <>
              <Header />
              <JenisPajakBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya/wakil-kuasa-saya"
          element={
            <>
              <Header />
              <WakilKuasaSayaBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya/wajib-pajak-yang-diwakili"
          element={
            <>
              <Header />
              <WajibPajakYangDiwakiliBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya/verifikasi-dua-langkah"
          element={
            <>
              <Header />
              <TwoAuthenticationBadan />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/profil-saya/permohonan-tertunda"
          element={
            <>
              <Header />
              <PermohonanTertundaBadan />
            </>
          }
        />
        {/* Praktikum Orang Pribadi*/}

        <Route
          path="/admin/praktikum/2/e-faktur"
          element={
            <>
              <Header />
              <DashboardEFaktur />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/e-faktur/pajak-keluaran"
          element={
            <>
              <Header />
              <PajakKeluaran />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/e-faktur/pajak-keluaran/tambah-faktur-keluaran"
          element={
            <>
              <Header />
              <TambahFakturKeluaran />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/e-faktur/pajak-masukan"
          element={
            <>
              <Header />
              {/* <PajakMasukan /> */}
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/surat-pemberitahuan-(spt)"
          element={
            <>
              <Header />
              <KonsepSPT />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/surat-pemberitahuan-(spt)/buat-konsep-spt"
          element={
            <>
              <Header />
              <BuatKonsepSPT />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/surat-pemberitahuan-(spt)/tambah-konsep-spt"
          element={
            <>
              <Header />
              <CreateKonsepSPT />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/bukti-pemotongan-bulanan-pegawai-tetap"
          element={
            <>
              <Header />
              <BupotBulananPegawaiTetap />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/bukti-pemotongan-bulanan-pegawai-tetap/telah-terbit"
          element={
            <>
              <Header />
              <BupotBulananPegawaiTetapTelahTerbit />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/bukti-pemotongan-bulanan-pegawai-tetap/tidak-valid"
          element={
            <>
              <Header />
              <BupotBulananPegawaiTetapTidakValid />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/bukti-pemotongan-bulanan-pegawai-tetap/tambah-bukti-pemotongan-bulanan-pegawai-tetap"
          element={
            <>
              <Header />
              <CreateEbupot />
            </>
          }
        />
          <Route
            path="/admin/praktikum/2/bppu"
            element={
              <>
                <Header />
                <BppuBelumTerbit />
              </>
            }
          />
        {/* NOT FOUND ROUTE - LAST REGISTERED ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    // </BrowserRouter>
  );
};

export default Main;
