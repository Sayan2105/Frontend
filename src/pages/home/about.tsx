import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Stethoscope, Microscope, Heart, UserRound, Goal } from "lucide-react";

const AboutUs = () => {
    const certifications = [
        "Joint Commission Accredited",
        "MAGNET Recognition",
        "ISO 9001:2015 Certified",
        "NABH Accredited",
        "Green Hospital Certified",
    ];

    return (
        <div className="bg-gradient-to-br from-blue-50 dark:from-blue-500/10 dark:to-green-500/10 dark:bg-neutral-900 text-gray-800 dark:text-gray-100">
            <MaxWidthWrapper className="flex flex-col gap-12 lg:gap-10 pt-12 pb-24 lg:px-10">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-center">
                    About <span className="text-blue-600">Us</span>
                </h1>

                <div className="grid lg:grid-cols-2 gap-10 items-center">
                    <div className="space-y-6">
                        <p className="text-lg leading-relaxed">
                            <span className="font-semibold text-blue-600">Vertica Healthcare</span> is dedicated to
                            providing exceptional healthcare services with compassion,
                            innovation, and excellence. We are committed to improving the
                            health and well-being of our community through advanced medical
                            care, education, and research.
                        </p>
                        <p className="text-lg leading-relaxed">
                            Our state-of-the-art facility combines cutting-edge medical
                            technology with a warm, patient-centered approach, ensuring every
                            individual receives personalized care tailored to their unique
                            needs.
                        </p>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                Accreditations & Certifications
                            </h3>
                            <ul className="space-y-2">
                                {certifications.map((cert, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                                        <span className="text-gray-700 dark:text-neutral-300">{cert}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="relative rounded-3xl overflow-hidden dark:bg-white/5 dark:border-white/10 shadow-xl">
                        <img
                            src="/about.svg"
                            alt="about"
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>

                <div className="rounded-3xl p-8 border dark:border-white/5 dark:bg-white/5 shadow-md">
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: <Stethoscope />, label: "Modern Facility" },
                            { icon: <Microscope />, label: "Advanced Technology" },
                            { icon: <Heart />, label: "Compassionate Care" },
                            { icon: <UserRound />, label: "Expert Staff" },
                        ].map(({ icon, label }, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col items-center text-center gap-3"
                            >
                                <div className="p-4 bg-rose-100 text-rose-600 dark:bg-white/10 rounded-full shadow-lg">
                                    {icon}
                                </div>
                                <div className="text-base font-medium text-gray-800 dark:text-rose-200">
                                    {label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="mt-20 flex flex-col gap-10 items-center justify-center">
                    <div className="flex items-center gap-2 px-5 py-2 rounded-full  border-blue-100 dark:border-blue-500/10 w-fit shadow-lg bg-white/10 backdrop-blur-sm boder">
                        <Goal className="text-blue-500 w-8 h-8" /> <h1 className="text-3xl sm:text-4xl font-semibold">Our <span className="text-blue-600">Mission</span></h1>
                    </div>

                    <div className="text-center lg:px-20">
                        <p>
                           <span className="font-serif text-xl text-blue-500">""</span> At Vertica Healthcare, our mission is to redefine the future of healthcare by delivering compassionate, patient-centered, and high-quality medical services that inspire trust and promote holistic well-being. We believe that healthcare is not just about treating illness — it's about nurturing life, empowering individuals, and building healthier communities through integrity, innovation, and empathy.
                            Every day, we strive to bridge the gap between advanced medical science and personalized human care. By embracing the latest technologies, pioneering medical research, and fostering an environment of continuous learning, we ensure that every patient receives care that is not only clinically exceptional but also emotionally supportive.<span className="font-serif text-xl text-blue-500">""</span>
                        </p>
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    );
};

export default AboutUs;
