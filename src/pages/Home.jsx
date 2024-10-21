import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import { home, skuliAppLogo } from '../assets/images';

const Home = () => {
  return (
    <div className="bg-indigo-50 min-h-screen">
      <header className="bg-white shadow">
        <div className="flex justify-between sm:px-5 sm:py-1">
          <div className="col-md-6">
            <Link className="navbar-brand" to="/">
              <img src={skuliAppLogo} alt="SkuliApp Logo" className="w-40" />
            </Link>
          </div>
        </div>
      </header>
      <main className="h-auto sm:h-auto md:h-auto lg:h-screen px-2 mb-auto mx-2">
        <div className="flex flex-col justify-center items-center w-auto sm:flex-row md:flex-row">
          <div className="sm:mt-2 md:mt-2 mt-0">
            <img src={home} alt="Hero Image" className="w-4/5 md:w-11/12" />
          </div>
          <div className="mt-4">
            <h2 className="title">
              <p className="text-text_color text-5xl sm:text-7xl">Welcome to</p>
              <p className="text-blue-800 text-4xl sm:text-5xl font-semibold">SkuliApp</p>
            </h2>
            <p className="text-justify my-2">
              SkuliApp is a collaborative teaching and learning digital platform, enabling parents and teachers to
              remotely work together to improve pupils learning experience. The ultimate goal is to make teaching and
              learning process more fun and enjoyable and subsequently increase teachers productivity and pupils
              performance. Click <Link to="/service" className="here text-blue-800">here</Link> for more details about the platform.
            </p>
            <div className="my-5">
              <Link
                to="/school-request"
                className="decoration-0 border-2 border-blue-700 rounded-md p-3 me-3 hover:no-underline text-blue-700 hover:bg-blue-700 hover:text-white"
              >
                Register a School
              </Link>
              <Link
                to="/teacher-login"
                className="text-white border-2 border-blue-700 bg-blue-700 hover:no-underline p-3 rounded-md hover:bg-transparent hover:text-blue-700"
              >
                Login Now
              </Link>
            </div>
            <div className="sm:mt-5">
              <h6 className="sm:my-5">
                Are you a parent? Click a button below to get your account.
              </h6>
              <div className="sm:my-5 my-5">
                <Link
                  to="/parents"
                  className="rounded-md p-3 border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white hover:no-underline"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-indigo-100 py-4">
                <div className="container mx-auto text-center">
                    <div className="flex justify-between">
                        <p className="text-gray-600">&copy; 2024 Altus Smart Solution. All Rights Reserved.</p>
                        <p className="text-gray-600">Developed & Powered by: Altus Smart Solution</p>
                    </div>
                </div>
      </footer>
    </div>
  );
};

export default Home;