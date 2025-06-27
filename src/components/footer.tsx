import { footerContacts, footerLinks, footerSocilalMedia } from "@/helpers/footer"
import { Link } from "react-router-dom"
import MaxWidthWrapper from "./MaxWidthWrapper"

const Footer = () => {
  return (
    <div className=" border-t border dark:border-white/5 py-12 mt-auto bg-gradient-to-br from-blue-50 to-white dark:from-green-900/10 dark:to-blue-900/10">
      <MaxWidthWrapper className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 lg:px-10">

        {/* Logo Section */}
        <div className="flex flex-col space-x-4 space-y-3 ">
          <div className="flex items-center gap-1">
            <div className="p-2 rounded-full bg-white/20 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl">
              <img src="/logo.png" alt="logo" className="w-12 h-12 rounded-full" />
            </div>
            <p className="text-lg text-gray-800 dark:text-gray-200 font-bold">Vertica Healthcare</p>
          </div>
          <p className="font-semibold text-gray-800 dark:text-gray-200">Efficiency in Care, Excellence in Service</p>
          <p className="text-gray-600 dark:text-gray-400">
            Vertica Healthcare is a leading provider of healthcare services in the India. Our mission is to provide the highest quality of care to our patients, while ensuring that our staff is always available to provide the best possible service.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Quick Links
            </h3>
            <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-transparent w-20 rounded-full" />
          </div>
          <ul className="space-y-3">
            {footerLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={{ pathname: link.path }}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 mr-0 group-hover:mr-2 transition-all duration-200 rounded-full"></span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Follow Us
            </h3>
            <div className="h-1 bg-gradient-to-r from-pink-500 via-red-500 to-transparent w-20 rounded-full" />
          </div>

          <div className="space-y-4">
            {footerSocilalMedia.map((social, index) => (
              <div key={index} className="relative">
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-br shadow-sm hover:shadow-lg transition-all duration-300 group hover:scale-105  backdrop-blur-sm border dark:border-white/10"
                >
                  <div className={`p-2 rounded-lg transition-all duration-300 ${social.bgColor} ${social.hoverColor}`}>
                    <social.icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                    {social.name}
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="space-y-4 md:col-span-2 lg:col-span-1">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Contact Info
            </h3>
            <div className="h-1 bg-gradient-to-r from-green-500 via-teal-500 to-transparent w-20 rounded-full" />
          </div>

          <div className="space-y-4">
            {footerContacts.map((contact, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                <div className={`p-2 rounded-lg ${contact.bgColor} flex-shrink-0`}>
                  <contact.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  {contact.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>

      {/* Copyright Section */}
      <div className="mt-8 pt-6 border-t dark:border-white/5">
        <MaxWidthWrapper>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} All rights reserved. Developed by <a href="https://tvssolutions.in/" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-500 hover:text-blue-400 transition-colors duration-200">TVS SOLUTIONS</a>
            </p>
          </div>
        </MaxWidthWrapper>
      </div>
    </div>
  )
}

export default Footer