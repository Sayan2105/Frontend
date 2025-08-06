import { footerContacts, footerLinks, footerSocilalMedia } from "@/helpers/footer"
import { Link } from "react-router-dom"
import MaxWidthWrapper from "./MaxWidthWrapper"

const Footer = () => {
  return (
    <div className="relative border-t border-border py-16 mt-auto bg-secondary dark:bg-gray-900/50 overflow-hidden">


      <MaxWidthWrapper className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 lg:px-10">

        {/* Enhanced Logo Section */}
        <div className="flex flex-col space-y-4 group">
          <div className="flex items-center gap-3">
            <div className="relative p-3 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-200 shadow-md shadow-blue-200/40 dark:shadow-blue-500/20 group-hover:shadow-lg group-hover:shadow-blue-300/50 transition-all duration-300 group-hover:scale-105">
              <img src="/logo.png" alt="logo" className="w-12 h-12 rounded-xl" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent"></div>
            </div>
            <div>
              <p className="text-xl text-gray-700 dark:text-gray-100 font-bold bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Vertica Healthcare
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="font-semibold text-blue-600 dark:text-blue-300 text-sm tracking-wide">
              Efficiency in Care, Excellence in Service
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Vertica Healthcare is a leading provider of healthcare services in India. Our mission is to provide the highest quality of care to our patients, while ensuring that our staff is always available to provide the best possible service.
            </p>
          </div>
        </div>

        {/* Enhanced Quick Links Section */}
        <div className="space-y-5">
          <div className="relative">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              Quick Links
            </h3>
            <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-500 w-16 rounded-full shadow-sm shadow-blue-500/50" />
          </div>

          <ul className="space-y-2">
            {footerLinks.map((link, index) => (
              <li key={index} className="transform transition-all duration-200 hover:translate-x-1">
                <Link
                  to={{ pathname: link.path }}
                  className="group flex items-center p-2 -m-2 rounded-lg hover:bg-blue-25/80 dark:hover:bg-blue-900/20 transition-all duration-200"
                >
                  <div className="w-0 group-hover:w-3 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 mr-0 group-hover:mr-3 transition-all duration-300 rounded-full shadow-sm shadow-blue-500/50"></div>
                  <span className="text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 font-medium">
                    {link.name}
                  </span>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Enhanced Social Media Section */}
        <div className="space-y-5">
          <div className="relative">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse delay-500"></div>
              Follow Us
            </h3>
            <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-16 rounded-full shadow-sm shadow-indigo-500/50" />
          </div>

          <div className="space-y-3">
            {footerSocilalMedia.map((social, index) => (
              <div key={index} className="transform transition-all duration-300 hover:scale-105">
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-3 p-3 rounded-xl bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm border border-blue-100/60 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-800/80 hover:border-blue-200/80 shadow-sm transition-all duration-300"
                >
                  <div className={`p-2.5 rounded-lg transition-all duration-300 ${social.bgColor} ${social.hoverColor} group-hover:scale-110 shadow-sm`}>
                    <social.icon className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {social.name}
                  </span>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-0 translate-x-2">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Contact Information Section */}
        <div className="space-y-5 md:col-span-2 lg:col-span-1">
          <div className="relative">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse delay-1000"></div>
              Contact Info
            </h3>
            <div className="h-1 bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 w-16 rounded-full shadow-sm shadow-sky-500/50" />
          </div>

          <div className="space-y-3">
            {footerContacts.map((contact, index) => (
              <div key={index} className="group transform transition-all duration-300 hover:scale-105">
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm border border-blue-100/60 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-800/80 hover:border-blue-200/80 shadow-sm transition-all duration-300">
                  <div className={`p-2.5 rounded-lg ${contact.bgColor} flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <contact.icon className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    {contact.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Copyright Section */}
        <div className="col-span-full border-t border-blue-100/60 dark:border-blue-800/30 pt-8 mt-8">
          <div className="relative">
            {/* Decorative line */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
                <span>© {new Date().getFullYear()} All rights reserved.</span>
                <span className="hidden sm:inline">•</span>
                <span>Developed by</span>
              </p>
              <a
                href="https://tvssolutions.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-all duration-200 hover:scale-105 group"
              >
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  TVS SOLUTIONS
                </span>
              </a>
            </div>
          </div>
        </div>

      </MaxWidthWrapper>
    </div>
  )
}

export default Footer