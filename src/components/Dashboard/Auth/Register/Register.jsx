import React, { useState } from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import CTaxifyLogo from "../../../../assets/images/4.png";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showRegistrationCode, setShowRegistrationCode] = useState(false);
  const [registrationCode, setRegistrationCode] = useState("");
  const [registrationCodeError, setRegistrationCodeError] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    contract_code: "",
  });
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      console.log("button clicked");

      if (!formData.email.includes("@")) {
        throw new Error("Email harus mengandung @");
      }

      if (formData.password !== repeatPassword) {
        throw new Error("Password tidak cocok");
      }

      if (showRegistrationCode && !formData.contract_code.trim()) {
        throw new Error("Password tidak cocok");
      }

      formData.password_confirmation = repeatPassword;

      // const { response } = await axios.post(RoutesApi.login, {
      const response = await axios.get(RoutesApi.csrf, {
        // withCredentials: true,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });
      // console.log(response.data.token);
      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
      // console.log(cookies.token);
      // if (setShowRegistrationCode == false) {
      //   return null;
      // }

      const data = await axios.post(
        RoutesApi.register,
        formData,
        // {
        //   name: formData.name,
        //   email: formData.email,
        //   password: formData.password,
        //   contract_code: formData.contract_code,
        // },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": response.data.token,
            // Authorization: `Bearer ${cookies.token}`,
          },
          //   params: {
          //     intent: RoutesApi.postAdmin.intent,
          //   },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      console.log("Registration successful:", data);
      
      // Store email for OTP verification
      localStorage.setItem("pendingVerificationEmail", formData.email);
      
      // Store token from registration response
      if (data.data && data.data.token) {
        setCookie("token", data.data.token, { path: "/" });
        
        // Store role if available
        if (data.data.user && data.data.user.roles && data.data.user.roles.length > 0) {
          const role = data.data.user.roles[0].name;
          setCookie("role", role, { path: "/" });
        }
      }
      
      Swal.fire({
        title: "Registrasi Berhasil!",
        text: "Silakan verifikasi email Anda dengan kode OTP yang telah dikirim.",
        icon: "success",
        confirmButtonText: "Verifikasi Sekarang",
      }).then(() => {
        navigate("/confirm-otp");
      });
    },
    onError: (error) => {
      console.log("Registration error: ", error);

      const errorMessage = error.response?.data?.message || error.message;
      Swal.fire("Registrasi Gagal!", errorMessage, "error");
    },
  });

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setEmailError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setPasswordError("");
  };

  const handleRepeatPasswordChange = (event) => {
    setRepeatPassword(event.target.value);
    // const { name, value } = event.target;
    // setFormData({ ...formData, [name]: value });
    setPasswordError("");
  };

  const handleRegistrationCodeChange = (event) => {
    setRegistrationCode(event.target.value);
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setRegistrationCodeError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate();
    // if (!email.includes("@")) {
    //   setEmailError("Email harus mengandung @");
    //   return;
    // }

    // if (password !== repeatPassword) {
    //   setPasswordError("Password tidak cocok");
    //   return;
    // }

    // if (showRegistrationCode && registrationCode.trim() === "") {
    //   setRegistrationCodeError("Kode registrasi wajib diisi");
    //   return;
    // }

    // console.log("Form Submitted");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <img
          src={CTaxifyLogo}
          alt="CTaxify Logo"
          className="w-50 mx-auto mb-4"
        />
        <p className="text-center text-gray-600 mb-6">
          Mari gabung dengan kami menjadi masa depan sadar pajak
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="name"
              className="mt-1 block w-full p-2 border rounded-md"
              placeholder="Masukkan username"
              required
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData({ ...formData, [name]: value });
              }}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="mt-1 block w-full p-2 border rounded-md"
              placeholder="Masukkan email"
              required
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="mt-1 block w-full p-2 border rounded-md"
                placeholder="Masukkan password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="repeat-password"
              className="block text-sm font-medium text-gray-700"
            >
              Ulangi Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="repeat-password"
                value={repeatPassword}
                onChange={handleRepeatPasswordChange}
                className="mt-1 block w-full p-2 border rounded-md"
                placeholder="Ulangi password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </div>

          {!showRegistrationCode ? (
            <div className="flex gap-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                // onClick={() => mutation.mutate()}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Mendaftar..." : "Coba Gratis 14 Hari"}
                {/* Coba Gratis 14 Hari */}
              </button>
              <button
                type="button"
                className="w-full bg-purple-900 text-white py-2 rounded-md hover:bg-purple-950"
                onClick={() => setShowRegistrationCode(true)}
              >
                Premium
              </button>
            </div>
          ) : (
            <div>
              <label
                htmlFor="registration-code"
                className="block text-sm font-medium text-gray-700"
              >
                Kode Registrasi
              </label>
              <input
                type="text"
                id="registration-code"
                value={registrationCode}
                onChange={handleRegistrationCodeChange}
                name="contract_code"
                className="mt-1 block w-full p-2 border rounded-md"
                placeholder="Masukkan Kode Registrasi"
                required
              />
              {registrationCodeError && (
                <p className="text-red-500 text-sm">{registrationCodeError}</p>
              )}
              <button
                // onClick={() => console.log(formData)}
                type="submit"
                className="mt-4 w-full bg-purple-900 text-white py-2 rounded-md hover:bg-purple-950"
                disabled={mutation.isPending}
                // onClick={() => mutation.mutate()}
              >
                {mutation.isPending ? "Mendaftar..." : "Daftar Sekarang"}
                {/* Daftar Sekarang */}
              </button>
            </div>
          )}

          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}

          {mutation.isError && !passwordError && !emailError && !registrationCodeError && (
            <p className="text-red-500 text-sm">
              {mutation.error.response?.data?.message || mutation.error.message}
            </p>
          )}
        </form>
        <p className="text-center text-sm text-black-600 mt-4">
          Memiliki akun?{" "}
          <Link
            to="/login"
            className="font-semibold text-purple-900 hover:underline"
          >
            Silahkan Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
