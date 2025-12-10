// import { Search } from "lucide-react";
// import React from "react";

// const About: React.FC = () => {
//   return (
//     <div className="h-screen w-screen bg-[#c6c8cd]  text-black p-2">
//       <div className="p-4 sm:max-w-lvh sm:mx-auto bg-gray-100 rounded-xl h-full">
//         <header className="border-b border-gray-900 p-x-5">
//           <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 justify-center items-center flex">
//             <h1 className="text-3xl font-bold">About Aleph</h1>
//           </div>
//         </header>
//         <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
//           <p className="mb-4">
//             Aleph is a cutting-edge search engine designed to provide users with
//             fast, accurate, and relevant search results. Our mission is to
//             revolutionize the way people access information on the internet by
//             leveraging advanced algorithms and user-centric design.
//           </p>
//           <p className="mb-4">
//             At Aleph, we prioritize user privacy and data security. We are
//             committed to ensuring that your search experience is safe and
//             secure, without compromising on performance or functionality.
//           </p>
//           <p className="mb-4">
//             Our team of dedicated professionals is constantly working to improve
//             Aleph and introduce new features that enhance the search experience.
//             We believe in innovation, transparency, and user empowerment.
//           </p>
//           <p className="mb-4">
//             Thank you for choosing Aleph as your preferred search engine. We
//             look forward to helping you discover the information you need
//             quickly and efficiently.
//           </p>
//           <p className="mb-4">The Aleph Team</p>
//         </div>
//         <div className="p-8 flex justify-center items-center gap-1">
//           <a
//             href="/"
//             className="text-blue-600 hover:underline justify-center items-center flex"
//           >
//             &larr; Back to Search
//           </a>
//           <Search className="text-blue-600 w-5 h-5 mr-3" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;
// import React from 'react';
import { Search, Shield, Zap, Users } from "lucide-react";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 px-8 py-12 text-center">
            <h1 className="text-5xl font-bold text-white mb-3">About Aleph</h1>
            <p className="text-blue-100 text-lg">
              Your Trusted Search Companion
            </p>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-6">
          {/* Mission Statement */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="w-1 h-8 bg-blue-600 rounded-full"></span>
              Our Mission
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Aleph is a cutting-edge search engine designed to provide users
              with fast, accurate, and relevant search results. Our mission is
              to revolutionize the way people access information on the internet
              by leveraging advanced algorithms and user-centric design.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Privacy First
              </h3>
              <p className="text-gray-600">
                Your data security is our top priority. We ensure a safe search
                experience.
              </p>
            </div>

            <div className="bg-linear-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-200">
              <div className="bg-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                Get instant results with our optimized search algorithms.
              </p>
            </div>

            <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                User Centric
              </h3>
              <p className="text-gray-600">
                Designed with you in mind for the best search experience.
              </p>
            </div>
          </div>

          {/* Commitment Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="w-1 h-8 bg-indigo-600 rounded-full"></span>
              Our Commitment
            </h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                At Aleph, we prioritize user privacy and data security. We are
                committed to ensuring that your search experience is safe and
                secure, without compromising on performance or functionality.
              </p>
              <p>
                Our team of dedicated professionals is constantly working to
                improve Aleph and introduce new features that enhance the search
                experience. We believe in innovation, transparency, and user
                empowerment.
              </p>
              <p>
                Thank you for choosing Aleph as your preferred search engine. We
                look forward to helping you discover the information you need
                quickly and efficiently.
              </p>
            </div>
          </div>

          {/* Team Signature */}
          <div className="border-t border-gray-200 pt-8">
            <p className="text-gray-600 text-lg italic">— The Aleph Team</p>
          </div>
        </div>

        {/* Back to Search Button */}
        <div className="flex justify-center mb-6">
          <a
            href="/"
            className="group bg-white hover:bg-blue-600 text-gray-800 hover:text-white px-8 py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center gap-3 font-semibold"
          >
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Back to Search</span>
          </a>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 pb-6">
          <p className="text-sm">
            © 2024 Aleph. Empowering your search experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
