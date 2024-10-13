import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheck, FaCaretLeft, FaTrash, FaTimes } from 'react-icons/fa';

const TutorSubjectsView = () => {
  const [tutors, setTutors] = useState([]);
  const [notification, setNotification] = useState({ message: '', success: null });

  useEffect(() => {
    // Fetch tutor data from your Laravel API
    axios.get('/api/tutors')
      .then(response => {
        setTutors(response.data);
      })
      .catch(error => {
        console.error('Error fetching tutors:', error);
      });
  }, []);

  const displayToastNotification = (msg, success) => {
    setNotification({ message: msg, success: success });
    setTimeout(() => {
      setNotification({ message: '', success: null });
    }, 3000);
  };

  const removeSubject = (e) => {
    const subjectId = e.target.dataset.subjectId;
    const classId = e.target.dataset.classId;
    const teacherId = e.target.dataset.teacherId;

    // API call to remove the subject
    axios.post('/api/remove-subject', { subjectId, classId, teacherId })
      .then(res => {
        displayToastNotification(res.data.message, res.data.response);
        // Refresh the page or update the state to reflect the change
        setTutors(prevTutors => {
          return prevTutors.map(tutor => {
            if (tutor.id === teacherId) {
              // Update the tutor data in state accordingly
            }
            return tutor;
          });
        });
      })
      .catch(err => {
        console.error('Error removing subject:', err);
      });
  };

  return (
    <div className="p-1 max-h-screen sm:ml-64">
      <div className="p-4 rounded-lg mt-14">
        {notification.message && (
          <div
            className={`flex z-50 fixed top-6 right-5 items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow ${notification.success ? 'text-green-500' : 'text-orange-500'}`}
            role="alert"
          >
            <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${notification.success ? 'bg-green-100' : 'bg-orange-100'} rounded-full`}>
              {notification.success ? <FaCheck className="w-5 h-5" /> : <FaTimes className="w-5 h-5" />}
            </div>
            <div className="ml-3 text-sm font-normal">{notification.message}</div>
            <button
              type="button"
              className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
              onClick={() => setNotification({ message: '', success: null })}
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="flex justify-end">
          <a href="/subject/index" className="hover:font-semibold flex content-center align-middle rounded-md border border-transparent p-2 hover:border-primary">
            <FaCaretLeft className="w-5 h-5 pt-1" />
            <span>Back</span>
          </a>
        </div>

        <h1 className="my-5">Subjects and Streams</h1>

        {tutors.map((tutor) => (
          <div key={tutor.id}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-3 sm:gap-x-3">
              <div className="border flex align-middle bg-slate-50 rounded-md overflow-clip w-72">
                <div className="bg-slate-100 p-2">Name</div>
                <div className="w-full py-2 text-center">{tutor.first_name} {tutor.last_name}</div>
              </div>
              <div className="border flex align-middle bg-slate-50 rounded-md overflow-clip w-72">
                <div className="bg-slate-100 p-2">Gender</div>
                <div className="w-full py-2 text-center">{tutor.gender}</div>
              </div>
              <div className="border flex align-middle bg-slate-50 rounded-md overflow-clip w-72">
                <div className="bg-slate-100 p-2">Phone</div>
                <div className="w-full py-2 text-center">{tutor.phone_number}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2">
              {tutor.classes.map((classItem) => (
                <div key={classItem.id} className="shadow-md rounded-md my-3 p-3">
                  <div className="flex justify-between">
                    <span className="border-b-2">{classItem.name}</span>
                    <button
                      data-class-id={classItem.id}
                      className="text-sm p-1 border-2 transition-all duration-100 border-red-500 bg-red-500 rounded-md text-white hover:bg-transparent hover:text-red-500"
                      onClick={removeSubject}
                    >
                      <FaTrash className="w-5 h-5 text-white" />
                    </button>
                  </div>
                  <div className="mt-5 grid grid-cols-1 gap-2">
                    {classItem.subjects.map((subject) => (
                      <div
                        key={subject.id}
                        className="flex justify-between text-center rounded-md bg-blue-200 p-2 mx-1 sm:text-sm"
                      >
                        <div className="mx-2">{subject.name}</div>
                        <div
                          data-subject-id={subject.id}
                          data-class-id={classItem.id}
                          data-teacher-id={tutor.id}
                          className="cursor-pointer bg-slate-400 rounded-full p-1 text-gray-200 hover:bg-red-400 hover:font-bold"
                          onClick={removeSubject}
                        >
                          <FaTimes className="w-3 h-3" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorSubjectsView;
