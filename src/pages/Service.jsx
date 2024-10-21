import { Link } from 'react-router-dom';
import { bg, graph, parents, school, skuliAppLogo, student } from '../assets/images';


const Service = () => {
  return (
    <div className="bg-indigo-50 text-gray-700">
      {/* Header */}
      <header className="container mx-auto py-5">
        <div className="flex justify-center md:justify-between items-center">
          <Link className="w-3/5 md:w-2/5" to="/">
            <img src={skuliAppLogo} alt="SkuliApp Logo" />
          </Link>
          {/* Uncomment the following for support info if needed */}
          {/* <div className="hidden md:block text-primary">
            <a href="mailto:skuliapp@altus.co.tz">Support: skuliapp@altus.co.tz / +255 692 070 579</a>
          </div> */}
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto">
        <div className="flex justify-center">
          <img src={bg} alt="Hero Image" className="w-3/5 md:w-2/5 object-cover" />
        </div>
        <h5 className="text-center text-xl mt-4">Our <span className="text-primary">Clients</span></h5>

        {/* Clients Section */}
        <div className="clients flex flex-wrap justify-center gap-4 mt-4">
          {/* Client Card */}
          <div className="card w-72 border-2 border-blue-400 p-4 hover:shadow-lg transition-all">
            <img src={school} alt="School" className="card-img-top mx-auto w-24 h-24" />
            <div className="card-body flex justify-center items-center">
              <h3 className="text-primary text-xl">126 |</h3>
              <p className="ml-4">School</p>
            </div>
          </div>

          <div className="card w-72 border-2 border-blue-400 p-4 hover:shadow-lg transition-all">
            <img src={student} alt="Student" className="card-img-top mx-auto w-24 h-24" />
            <div className="card-body flex justify-center items-center">
              <h3 className="text-primary text-xl">1000 |</h3>
              <p className="ml-4">Student</p>
            </div>
          </div>

          <div className="card w-72 border-2 border-blue-400 p-4 hover:shadow-lg transition-all">
            <img src={parents} alt="Parents" className="card-img-top mx-auto w-24 h-24" />
            <div className="card-body flex justify-center items-center">
              <h3 className="text-primary text-xl">240 |</h3>
              <p className="ml-4">Parents</p>
            </div>
          </div>
        </div>

        <h5 className="text-center text-xl mt-8">Our <span className="text-primary">Services</span></h5>

        {/* Services Section */}
        <div className="service flex flex-wrap justify-center gap-4 mt-4">
          <div className="card w-72 border-2 border-blue-400 p-4 text-center hover:shadow-lg transition-all">
            <img src={graph} alt="Graph" className="card-img-top mx-auto w-36" />
            <div className="card-body">
              <h5 className="text-primary text-xl">Examination Analytics</h5>
              <p className="mt-2">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>

          <div className="card w-72 border-2 border-blue-400 p-4 text-center hover:shadow-lg transition-all">
            <img src={graph} alt="Graph" className="card-img-top mx-auto w-36" />
            <div className="card-body">
              <h5 className="text-primary text-xl">Examination Analytics</h5>
              <p className="mt-2">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>

          <div className="card w-72 border-2 border-blue-400 p-4 text-center hover:shadow-lg transition-all">
            <img src={graph} alt="Graph" className="card-img-top mx-auto w-36" />
            <div className="card-body">
              <h5 className="text-primary text-xl">Examination Analytics</h5>
              <p className="mt-2">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer bg-blue-700 text-white text-center py-4 mt-8">
        <div className="container mx-auto">
          <div className="flex justify-between">
            <p>&copy; 2024 Altus Smart Solution. All Rights Reserved.</p>
            <p>Developed & Powered by: Altus Smart Solution</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Service;
