import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Stethoscope, Microscope, Heart, UserRound, Goal, CheckCircle } from "lucide-react";

const AboutUs = () => {
    const certifications = [
        "Joint Commission Accredited",
        "MAGNET Recognition",
        "ISO 9001:2015 Certified",
        "NABH Accredited",
        "Green Hospital Certified",
    ];

    return (
        <div className="min-h-screen bg-background">
            <MaxWidthWrapper className="flex flex-col gap-16 py-16 lg:px-10">

                {/* Header Section */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                        About <span className="text-blue-600">Us</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Leading healthcare services with compassion, innovation, and excellence
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <p className="text-base leading-relaxed text-muted-foreground">
                                <span className="font-semibold text-blue-600">Vertica Healthcare</span> is dedicated to
                                providing exceptional healthcare services with compassion,
                                innovation, and excellence. We are committed to improving the
                                health and well-being of our community through advanced medical
                                care, education, and research.
                            </p>
                            <p className="text-base leading-relaxed text-muted-foreground">
                                Our state-of-the-art facility combines cutting-edge medical
                                technology with a warm, patient-centered approach, ensuring every
                                individual receives personalized care tailored to their unique
                                needs.
                            </p>
                        </div>

                        {/* Certifications Card */}
                        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-blue-600" />
                                Accreditations & Certifications
                            </h3>
                            <ul className="space-y-3">
                                {certifications.map((cert, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                                        <span className="text-sm text-muted-foreground">{cert}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="relative rounded-lg overflow-hidden border border-border shadow-sm bg-card">
                        <img
                            src="/about-2.svg"
                            alt="about"
                            className="w-full object-cover fill-black"
                        />
                    </div>
                </div>

                {/* Features Grid */}
                <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <Stethoscope className="w-6 h-6" />, label: "Modern Facility" },
                            { icon: <Microscope className="w-6 h-6" />, label: "Advanced Technology" },
                            { icon: <Heart className="w-6 h-6" />, label: "Compassionate Care" },
                            { icon: <UserRound className="w-6 h-6" />, label: "Expert Staff" },
                        ].map(({ icon, label }, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col items-center text-center gap-3 p-4 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                                <div className="p-3 bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 rounded-full">
                                    {icon}
                                </div>
                                <div className="text-sm font-medium text-card-foreground">
                                    {label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mission Section */}
                <div className="space-y-8">
                    <div className="flex items-center justify-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-card shadow-sm">
                            <Goal className="text-blue-600 w-5 h-5" />
                            <h2 className="text-2xl font-semibold text-card-foreground">
                                Our <span className="text-blue-600">Mission</span>
                            </h2>
                        </div>
                    </div>

                    <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
                        <blockquote className="text-center space-y-4">
                            <div className="text-4xl text-blue-600 font-serif leading-none">"</div>
                            <p className="text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                                At Vertica Healthcare, our mission is to redefine the future of healthcare by delivering compassionate, patient-centered, and high-quality medical services that inspire trust and promote holistic well-being. We believe that healthcare is not just about treating illness — it's about nurturing life, empowering individuals, and building healthier communities through integrity, innovation, and empathy.
                            </p>
                            <p className="text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                                Every day, we strive to bridge the gap between advanced medical science and personalized human care. By embracing the latest technologies, pioneering medical research, and fostering an environment of continuous learning, we ensure that every patient receives care that is not only clinically exceptional but also emotionally supportive.
                            </p>
                            <div className="text-4xl text-blue-600 font-serif leading-none rotate-180 inline-block">"</div>
                        </blockquote>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { number: "10+", label: "Years Experience" },
                        { number: "50K+", label: "Patients Served" },
                        { number: "100+", label: "Expert Doctors" },
                        { number: "24/7", label: "Emergency Care" },
                    ].map(({ number, label }, idx) => (
                        <div key={idx} className="text-center p-6 rounded-lg border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-3xl font-bold text-blue-600 mb-2">{number}</div>
                            <div className="text-sm text-muted-foreground">{label}</div>
                        </div>
                    ))}
                </div>

            </MaxWidthWrapper>
        </div>
    );
};

export default AboutUs;