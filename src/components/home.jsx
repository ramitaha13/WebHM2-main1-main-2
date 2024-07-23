import homePhoto from "../assets/homePhoto.png";
import MainLayout from "../layouts/mainLayout";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row items-center justify-between mt-4 sm:mt-8 md:mt-12">
        <div className="text-black dark:text-white lg:max-w-xl">
          <h1 className="text-blue-800 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight sm:leading-normal">
            Welcome to Braude Analyzer
          </h1>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-2 sm:mt-3 md:mt-5">
            Unlock the Power of Your Data
          </h3>
          <p className="text-sm sm:text-base mt-2 sm:mt-3 md:mt-5">
            Our platform is designed to simplify the process of working with
            Excel files, offering a comprehensive suite of tools for data
            analysis, filtering, file management, and custom file downloads.
            Whether you're handling large datasets or combining multiple files,
            Excel Analyzer provides an intuitive interface to help you achieve
            your goals efficiently.
          </p>
          <div className="mt-4 sm:mt-6 md:mt-10">
            <Link
              to="/uploadFile"
              className="bg-green-500 text-white rounded-full py-2 px-4 sm:py-3 sm:px-8 text-sm sm:text-base font-medium inline-block mr-4 hover:bg-green-600 hover:border-green-600 duration-300 dark:bg-green-600 dark:hover:bg-green-700"
            >
              Let's start
            </Link>
          </div>
        </div>
        <img
          className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mt-4 lg:mt-0"
          src={homePhoto}
          alt="homePhoto"
        />
      </div>
    </MainLayout>
  );
}
