import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { EmergencyContacts } from "@/helpers/homepage";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";




const Contact = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 text-gray-800 dark:text-gray-100">
      <MaxWidthWrapper className="flex flex-col gap-12 pt-12 pb-24">
        {/* header */}
        <div className="space-x-2 text-center text-4xl sm:text-5xl font-bold text-gray-800 dark:text-neutral-100">
          <span>Contact</span>
          <span className="text-blue-600">Us</span>
        </div>

        <div className="h-1 mx-auto w-48 bg-gradient-to-r from-green-500 via-purple-500 to-slate-500 rounded-full animate-bounce duration-1000" />

        {/* Emergency Contacts */}
        <div className="flex flex-col gap-10">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {EmergencyContacts.map((contact, index) => (
              <div className={cn("p-3 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 border", contact.border, contact.bg)} key={index}>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-full bg-white/20 dark:bg-white/10 shadow-lg`}>
                    <contact.icon className={`h-6 w-6 ${contact.color}`} />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold text-gray-800 dark:text-neutral-100`}>{contact.title}</h3>
                    <p className={`text-sm text-gray-600 dark:text-neutral-300`}>{contact.description}</p>
                  </div>
                </div>
                <a href={`tel:${contact.phone}`} className={`text-2xl font-bold ${contact.color}`}> {contact.phone}</a>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-6 rounded-2xl text-center dark:bg-red-900/20 border dark:border-red-800/30  bg-red-50 border-red-200
          `}>
          <p className={`text-lg font-semibold dark:text-red-300 text-red-700
            `}>
            🚨 For life-threatening emergencies, call <a href="tel:108" className="underline">108</a> immediately or visit our Emergency Department
          </p>
        </div>

        {/* Location */}
        <div className="space-y-10">
          {/* grid */}
          <div className="grid lg:grid-cols-3 gap-y-5  items-center">
            {/* text content */}
            <div className="space-y-5">
              <h1 className="text-2xl font-bold text-center">Opening <span className="text-blue-500">Hours</span></h1>
              <div className="h-1 mx-auto w-28 bg-blue-500 rounded-full animate-bounce duration-1000" />
              <div className="space-y-2 bg-gradient-to-br  dark:from-blue-500/10 dark:to-green-500/10 w-fit mx-auto p-3 rounded-lg backdrop-blur-sm border dark:border-white/10 shadow-lg">
                <div className="grid grid-cols-2">
                  <span>Mon - Fri</span>
                  <span>9:00AM - 5:00PM</span>
                </div>
                <div className="grid grid-cols-2">
                  <span>Saturday</span>
                  <span>9:00AM - 3:00PM</span>
                </div>
                <div className="grid grid-cols-2">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
            {/* Map */}
            <div className="lg:col-span-2 space-y-5 w-full bg-green-50 dark:bg-green-900/20 border border-green-500/10 rounded-xl p-5 shadow-lg">
              {/* header */}
              <div className="flex gap-2 items-center">
                <div className={`p-3 rounded-full bg-white/20 dark:bg-white/10 shadow-xl w-fit`}>
                  <MapPin className={`h-6 w-6 text-green-600`} />
                </div>
                <h1 className="text-center text-xl sm:text-3xl font-bold text-gray-800 dark:text-neutral-100">Location</h1>
              </div>
              <div className="relative w-full h-0 pb-[75%] overflow-hidden rounded-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3611.1111791915587!2d80.82633237538616!3d26.836139163377194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bff3e34dd1d4f%3A0xc5d69250c13efe61!2sTVS%20SOLUTIONS!5e1!3m2!1sen!2sin!4v1748941265203!5m2!1sen!2sin"
                  className="absolute top-0 left-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="TVS Solutions Location"
                />
              </div>
            </div>
          </div>
        </div>

      </MaxWidthWrapper>
    </div>
  )
}

export default Contact