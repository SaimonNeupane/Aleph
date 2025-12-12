import React from "react";
import {
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Scale,
} from "lucide-react";

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="bg-linear-to-r from-gray-200 to-slate-300 px-8 py-10 text-center">
            <FileText className="w-16 h-16 text-black mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-black mb-2">
              Terms of Service
            </h1>
            <p className="text-black-100">Please read these terms carefully</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 mb-6">
          <p className="text-gray-600 text-sm mb-8">
            Effective Date: December 10, 2024
          </p>

          {/* Acceptance */}
          <div className="mb-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-amber-100 p-3 rounded-lg">
                <Scale className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  1. Acceptance of Terms
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  By accessing or using Aleph search engine, you agree to be
                  bound by these Terms of Service. If you do not agree to these
                  terms, please do not use our services.
                </p>
                <div className="bg-amber-50 border-l-4 border-amber-600 p-4 rounded">
                  <p className="text-gray-700 text-sm">
                    <strong>Important:</strong> These terms constitute a legally
                    binding agreement between you and Aleph.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Use of Service */}
          <div className="mb-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  2. Permitted Use
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  You may use Aleph for lawful purposes only. You agree to:
                </p>
                <ul className="space-y-2 text-gray-700 ml-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                    <span>
                      Use the service for personal or commercial information
                      retrieval
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                    <span>Comply with all applicable laws and regulations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                    <span>Respect intellectual property rights of others</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                    <span>
                      Maintain the security of your account credentials
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Prohibited Activities */}
          <div className="mb-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  3. Prohibited Activities
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  You must not use Aleph to:
                </p>
                <ul className="space-y-2 text-gray-700 ml-6">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                    <span>
                      Attempt to gain unauthorized access to our systems
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                    <span>
                      Use automated bots or scrapers without permission
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                    <span>Transmit malware, viruses, or harmful code</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                    <span>
                      Engage in activities that harm or disrupt the service
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                    <span>
                      Violate any applicable laws or third-party rights
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mb-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  4. Disclaimer of Warranties
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Aleph is provided "as is" without warranties of any kind.
                  While we strive for accuracy, we do not guarantee that:
                </p>
                <ul className="space-y-2 text-gray-700 ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>
                      Search results will be complete, accurate, or up-to-date
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>The service will be uninterrupted or error-free</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>All defects will be corrected immediately</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="mb-10">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                5. Limitation of Liability
              </h2>
              <p className="text-gray-700 leading-relaxed">
                To the maximum extent permitted by law, Aleph shall not be
                liable for any indirect, incidental, special, or consequential
                damages arising from your use of the service. Our total
                liability shall not exceed the amount paid by you (if any) for
                using Aleph.
              </p>
            </div>
          </div>

          {/* Changes to Terms */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              6. Changes to Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these terms at any time. Changes
              will be effective immediately upon posting. Continued use of Aleph
              after changes constitutes acceptance of the modified terms.
            </p>
          </div>

          {/* Contact */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              7. Contact Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              For questions about these terms, please contact us at{" "}
              <a
                href="mailto:legal@aleph.com"
                className="text-amber-600 hover:underline font-semibold"
              >
                legal@aleph.com
              </a>
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mb-6">
          <a
            href="/"
            className="bg-white hover:bg-amber-600 text-gray-800 hover:text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 font-semibold"
          >
            Back to Search
          </a>
          <a
            href="/pages/privacy"
            className="bg-white hover:bg-orange-600 text-gray-800 hover:text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 font-semibold"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default Terms;
