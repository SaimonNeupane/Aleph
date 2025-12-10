import React from "react";
import { Shield, Lock, Eye, Database, AlertCircle } from "lucide-react";

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="bg-linear-to-r from-emerald-600 to-teal-600 px-8 py-10 text-center">
            <Shield className="w-16 h-16 text-white mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">
              Privacy Policy
            </h1>
            <p className="text-emerald-100">Your privacy is our priority</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 mb-6">
          <p className="text-gray-600 text-sm mb-8">
            Last updated: December 10, 2024
          </p>

          {/* Data Collection */}
          <div className="mb-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-emerald-100 p-3 rounded-lg">
                <Database className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  What We Collect
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Aleph is committed to minimal data collection. We only collect
                  information necessary to provide you with search services:
                </p>
                <ul className="space-y-2 text-gray-700 ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>
                      Search queries (anonymized and not linked to your
                      identity)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>Browser type and language preferences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>
                      Approximate location (country/region level only)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Data */}
          <div className="mb-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-teal-100 p-3 rounded-lg">
                <Eye className="w-6 h-6 text-teal-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  How We Use Your Data
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Your data helps us improve Aleph's search results and user
                  experience:
                </p>
                <div className="bg-teal-50 border-l-4 border-teal-600 p-4 rounded">
                  <p className="text-gray-700">
                    We <strong>never</strong> sell your data to third parties.
                    We <strong>never</strong> track your individual browsing
                    history. We <strong>never</strong> create user profiles for
                    advertising.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Protection */}
          <div className="mb-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-cyan-100 p-3 rounded-lg">
                <Lock className="w-6 h-6 text-cyan-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  How We Protect Your Data
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Security is at the core of everything we do:
                </p>
                <ul className="space-y-2 text-gray-700 ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 mt-1">•</span>
                    <span>End-to-end encryption for all search queries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 mt-1">•</span>
                    <span>Regular security audits and updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 mt-1">•</span>
                    <span>Automatic data deletion after 90 days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 mt-1">•</span>
                    <span>No third-party tracking scripts or cookies</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="mb-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  Your Rights
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  You have the right to access, correct, or delete any data we
                  hold about you. Contact us at{" "}
                  <a
                    href="mailto:privacy@aleph.com"
                    className="text-emerald-600 hover:underline font-semibold"
                  >
                    privacy@aleph.com
                  </a>{" "}
                  for any privacy-related inquiries.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mb-6">
          <a
            href="/"
            className="bg-white hover:bg-emerald-600 text-gray-800 hover:text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 font-semibold"
          >
            Back to Search
          </a>
          <a
            href="/pages/about"
            className="bg-white hover:bg-teal-600 text-gray-800 hover:text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 font-semibold"
          >
            About Aleph
          </a>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
