import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AboutUs = () => {
  return (
    <>
    <Navbar/>
    <section className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl mb-16">
          <div className="px-6 py-16 sm:px-12 lg:px-16">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  Saving Lives
                </span>
                <br />
                <span className="text-gray-900">Through Connection</span>
              </h1>
              <div className="mt-6 flex items-center justify-center space-x-2">
                <div className="h-1 w-16 bg-blue-600 rounded-full"></div>
                <div className="h-3 w-3 bg-blue-600 rounded-full"></div>
                <div className="h-1 w-16 bg-blue-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-[1.02] transition-transform duration-300">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Our Story
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Founded in 2023, we've created a revolutionary platform that
                  bridges the gap between organ donors and recipients. Our
                  innovative approach combines cutting-edge technology with
                  compassionate care to save lives.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-6 text-center">
                  <span className="block text-3xl font-bold text-blue-600">
                    1000+
                  </span>
                  <span className="text-gray-600">Lives Saved</span>
                </div>
                <div className="bg-purple-50 rounded-xl p-6 text-center">
                  <span className="block text-3xl font-bold text-purple-600">
                    5000+
                  </span>
                  <span className="text-gray-600">Donors Registered</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <span className="text-2xl">💙</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-600 mb-6">
              To revolutionize organ donation through innovative technology,
              creating seamless connections between donors and recipients while
              promoting awareness about the life-saving power of organ donation.
            </p>
            <div className="text-blue-600 font-semibold">
              Join Our Mission →
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <span className="text-2xl">👁️</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-gray-600 mb-6">
              A world where organ donation is normalized and accessible to all,
              eliminating waiting lists and saving thousands of lives each year
              through compassionate giving.
            </p>
            <div className="text-purple-600 font-semibold">
              Be Part of the Change →
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Medical Excellence
              </h3>
              <p className="text-gray-600">
                Partnering with leading hospitals and medical professionals
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Community Support
              </h3>
              <p className="text-gray-600">
                Building a network of dedicated volunteers and supporters
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Digital Innovation
              </h3>
              <p className="text-gray-600">
                Leveraging technology to streamline the donation process
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default AboutUs;
