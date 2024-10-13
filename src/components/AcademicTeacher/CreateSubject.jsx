import { useState } from "react";
import axios from "axios";

const CreateSubject = () => {
  const [formData, setFormData] = useState({
    name: "",
    sw_name: "",
    code: "",
  });
  const [subjects, setSubjects] = useState([]);
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editSubjectId, setEditSubjectId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/subject", formData); // Change this to your backend route
      setSubjects((prevSubjects) => [...prevSubjects, response.data]);
      setMessage("Subject created successfully!");
      setIsSuccess(true);
      resetForm();
    } catch (error) {
      setMessage("Failed to create subject!");
      setIsSuccess(false);
    } finally {
      displayToastNotification();
    }
  };

  const handleEdit = (subject) => {
    setFormData({
      name: subject.name,
      sw_name: subject.sw_name || "",
      code: subject.code || "",
    });
    setEditMode(true);
    setEditSubjectId(subject.id);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/subject/${editSubjectId}`, formData); // Update the subject
      setSubjects((prevSubjects) =>
        prevSubjects.map((subject) =>
          subject.id === editSubjectId ? { ...subject, ...formData } : subject
        )
      );
      setMessage("Subject updated successfully!");
      setIsSuccess(true);
      resetForm();
      setEditMode(false);
    } catch (error) {
      setMessage("Failed to update subject!");
      setIsSuccess(false);
    } finally {
      displayToastNotification();
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      sw_name: "",
      code: "",
    });
  };

  const displayToastNotification = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="p-4 max-h-screen">
      <h1 className="my-3">
        {editMode ? "Update Subject" : "Add Subject"}
        <span className="text-slate-400">
          (the subject should not be part of the government curriculum)
        </span>
      </h1>
      {showNotification && (
        <div
          className={`fixed top-6 right-5 w-full max-w-xs p-4 mb-4 rounded-lg shadow ${
            isSuccess ? "bg-green-100" : "bg-orange-100"
          }`}
        >
          <div className="flex items-center">
            <div className="inline-flex items-center justify-center w-8 h-8">
              <span>{isSuccess ? "✓" : "!"}</span>
            </div>
            <div className="ml-3 text-sm font-normal">{message}</div>
          </div>
        </div>
      )}
      <form onSubmit={editMode ? handleUpdate : handleSubmit}>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <div className="w-full">
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Name (English)
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="name..."
              required
            />
          </div>
          <div className="w-full">
            <label htmlFor="sw_name" className="block mb-2 text-sm font-medium">
              Name (Swahili)
            </label>
            <input
              type="text"
              id="sw_name"
              name="sw_name"
              value={formData.sw_name}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="optional.."
            />
          </div>
          <div className="w-full">
            <label htmlFor="subject_code" className="block mb-2 text-sm font-medium">
              Code (optional)
            </label>
            <input
              type="text"
              id="subject_code"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="..."
            />
          </div>
        </div>
        <div className="flex justify-end w-full my-2">
          <button
            type="submit"
            className="w-40 bg-primary hover:bg-blue-400 text-white p-2 rounded-md font-semibold"
          >
            {editMode ? "Update" : "Create"}
          </button>
        </div>
      </form>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-center">NO</th>
              <th className="px-6 py-3 text-center">Name</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={subject.id}>
                <td className="px-6 py-2 text-center">{index + 1}</td>
                <td className="px-6 py-4 text-center">
                  {subject.name}{" "}
                  {subject.sw_name && (
                    <span className="text-slate-500 px-2">({subject.sw_name})</span>
                  )}
                </td>
                <td className="text-center flex justify-center align-bottom pt-1">
                  <button
                    onClick={() => handleEdit(subject)}
                    className="font-medium text-white text-sm hover:bg-transparent border-2 border-primary bg-primary rounded-md p-2 mx-1"
                  >
                    Edit
                  </button>
                  {/* Implement delete functionality */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateSubject;
