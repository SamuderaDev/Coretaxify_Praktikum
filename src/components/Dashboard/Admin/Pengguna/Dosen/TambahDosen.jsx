import React, { useState, useRef } from "react";
import "./editPopupMahasiswa.css";
import { FaPlus, FaTrash, FaFileImport } from "react-icons/fa";
import * as XLSX from "xlsx";

const TambahDosen = ({
  onClose,
  data = {},
  onSave,
  // formData,
  // setFormData,
  isLoading = false,
  title = "Edit Dosen",
  isCreateMode = false,
  isReadOnly = false,
  isMultipleMode = true, // bulk
}) => {
  // For multiple students mode
  const [students, setStudents] = useState(
    isMultipleMode ? [{ name: "", email: "", status: "ACTIVE" }] : []
  );
  const [importError, setImportError] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "",
  });
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    if (isReadOnly) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // For handling changes in multiple students mode
  const handleStudentChange = (index, field, value) => {
    const updatedStudents = [...students];
    updatedStudents[index] = { ...updatedStudents[index], [field]: value };
    setStudents(updatedStudents);
  };

  // Add a new student row
  const addStudentRow = () => {
    setStudents([...students, { name: "", email: "" }]);
  };

  // Remove a student row
  const removeStudentRow = (index) => {
    const updatedStudents = [...students];
    updatedStudents.splice(index, 1);
    setStudents(updatedStudents);
  };

  // Handle save for multiple students
  const handleSaveMultiple = () => {
    // Filter out any empty rows
    const validStudents = students.filter(
      (student) => student.name && student.email && student.status
    );
    if (validStudents.length === 0) {
      alert("Harap isi setidaknya satu dosen dengan nama, email.");
      return;
    }

    // check email duplicates
    const emails = validStudents.map((student) => student.email);
    const uniqueEmails = new Set(emails);

    if (emails.length !== uniqueEmails.size) {
      alert("Terdapat email duplikat. Email dosen tidak boleh sama");
      return;
    }

    onSave(validStudents);
  };

  // file input
  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  // handle file import
  const handleFileImport = (e) => {
    setImportError("");
    setImportSuccess("");
    const file = e.target.files[0];
    if (!file) return;

    setIsImporting(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // get first sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // convert to json
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // check the data in file
        if (jsonData.length < 2) {
          setImportError(
            "File tidak memiliki data yang cukup. Pastikan file berisi header dan minimal satu baris data."
          );
          return;
        }

        // get headers (first row)
        const headers = jsonData[0].map((header) =>
          header.toLowerCase().trim()
        );

        // check if required column exist
        const nameIndex = headers.indexOf("name");
        const emailIndex = headers.indexOf("email");
        // const statusIndex = headers.indexOf("status");

        if (nameIndex === -1 || emailIndex === -1) {
          setImportError(
            "Format file tidak valid. Pastikan memiliki kolom 'name' dan 'email'."
          );
          return;
        }

        // process data rows
        const importedStudents = jsonData
          .slice(1)
          .map((row) => {
            const status = statusIndex !== -1 ? row[statusIndex] : "ACTIVE";
            return {
              name: row[nameIndex] || "",
              email: row[emailIndex] || "",
              // status: ["ACTIVE", "INACTIVE"].includes(status)
              //   ? status
              //   : "ACTIVE",
            };
          })
          .filter((student) => student.name && student.email);

        if (importedStudents.length === 0) {
          setImportError("Tidak ada data valid yang dapat diimport dari file.");
          return;
        }

        // set imported students
        setStudents(importedStudents);

        // show success message
        setImportSuccess(
          `${importedStudents.length} mahasiswa berhasil diimport.`
        );

        // reset file input
        e.target.value = null;
      } catch (error) {
        console.error("Error parsing file:", error);
        setImportError(
          "Terjadi kesalahan saat memproses file. Pastikan file memiliki format yang benar."
        );
      } finally {
        setIsImporting(false);
      }
    };

    reader.onerror = () => {
      setImportError("Terjadi kesalahan saat membaca file.");
      setIsImporting(false);
    };

    reader.readAsArrayBuffer(file);
  };

  // download template
  const downloadTemplate = () => {
    // create worksheet
    const ws = XLSX.utils.aoa_to_sheet([
      ["name", "email"],
      ["John Doe", "john.doe@example.com"],
      ["Jane Smith", "jane.smith@example.com"],
    ]);

    // create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");

    // generate and download
    XLSX.writeFile(wb, "student_import_template.xlsx");
  };

  return (
    <div className="edit-popup-container-mahasiswa">
      <div className="edit-popup-content-mahasiswa">
        <div className="edit-popup-header-mahasiswa">
          <h2>{title}</h2>
        </div>

        {/* Handle Multiple Students Mode */}
        {isMultipleMode ? (
          <div>
            {importSuccess && (
              <div className="import-success">{importSuccess}</div>
            )}
            <div className="import-section">
              <div className="import-buttons">
                <button
                  type="button"
                  className="import-button"
                  onClick={handleImportClick}
                  disabled={isImporting}
                >
                  {isImporting ? (
                    <>
                      <span className="loading-spinner"></span>
                      Importing...
                    </>
                  ) : (
                    <>
                      <FaFileImport /> Import dari Excel/CSV
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="template-button"
                  onClick={downloadTemplate}
                >
                  Download Template
                </button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept=".xlsx,.xls,.csv"
                onChange={handleFileImport}
              />
              {importError && <div className="import-erro">{importError}</div>}
            </div>

            <div className="students-counter">
              <strong>{students.length}</strong> mahasiswa akan ditambahkan
            </div>
            <div className="students-table">
              <div className="students-table-header">
                <div className="student-field-header">Nama Mahasiswa</div>
                <div className="student-field-header">Email</div>
                {/* <div className="student-field-header">Status</div> */}
                <div className="student-field-header actions">Actions</div>
              </div>

              {students.map((student, index) => (
                <div key={index} className="student-row">
                  <div className="student-field">
                    <input
                      type="text"
                      value={student.name}
                      onChange={(e) =>
                        handleStudentChange(index, "name", e.target.value)
                      }
                      placeholder="Nama Dosen"
                      required
                    />
                  </div>
                  <div className="student-field">
                    <input
                      type="email"
                      value={student.email}
                      onChange={(e) =>
                        handleStudentChange(index, "email", e.target.value)
                      }
                      placeholder="Email"
                      required
                    />
                  </div>
                  {/* <div className="student-field">
                    <select
                      value={student.status}
                      onChange={(e) =>
                        handleStudentChange(index, "status", e.target.value)
                      }
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">Inactive</option>
                    </select>
                  </div> */}
                  <div className="student-field actions">
                    <button
                      type="button"
                      className="remove-student-btn"
                      onClick={() => removeStudentRow(index)}
                      disabled={students.length === 1}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="add-student-row">
              <button
                type="button"
                className="add-student-btn"
                onClick={addStudentRow}
              >
                <FaPlus /> Add Another Student
              </button>
            </div>

            <div className="edit-popup-actions-mahasiswa">
              <button
                className="edit-save-button"
                type="button"
                onClick={handleSaveMultiple}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Menyimpan...
                  </>
                ) : (
                  "Simpan Semua"
                )}
              </button>
              <button
                className="edit-cancel-button"
                type="button"
                onClick={onClose}
              >
                Batal
              </button>
            </div>
          </div>
        ) : (
          // single student
          <form>
            <div className="edit-form-group-mahasiswa">
              <label>Nama Mahasiswa:</label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                required
                readOnly={isReadOnly}
                className={isReadOnly ? "read-only-field" : ""}
              />
            </div>
            <div className="edit-form-group-mahasiswa">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                required
                readOnly={isReadOnly}
                className={isReadOnly ? "read-only-field" : ""}
              />
            </div>
            <div className="edit-form-group-mahasiswa">
              <label>Status:</label>
              {isReadOnly ? (
                <input
                  type="text"
                  value={formData.status || ""}
                  readOnly
                  className="read-only-field"
                />
              ) : (
                <select
                  name="status"
                  value={formData.status || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Pilih Status</option>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              )}
            </div>
            {isCreateMode && (
              <div className="edit-form-group-mahasiswa">
                <p className="text-info">
                  <small>
                    Password akan digenerate secara otomatis dan akan dikirimkan
                    ke email mahasiswa.
                  </small>
                </p>
              </div>
            )}

            <div className="edit-popup-actions-mahasiswa">
              {!isReadOnly && (
                <button
                  className="edit-save-button"
                  type="button"
                  onClick={onSave}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Simpan"}
                </button>
              )}
              <button
                className="edit-cancel-button"
                type="button"
                onClick={onClose}
              >
                {isReadOnly ? "Tutup" : "Batal"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TambahDosen;
