import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { getResumePdfHref, RESUME_DOWNLOAD_NAME } from "@/lib/resume";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Background gradient orb */}
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl animate-float" />
      <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-primary/3 blur-3xl" />

      <div className="container-custom relative z-10 pt-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Available for work
          </span>
        </motion.div>

        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mb-6 inline-block"
          >
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-wider mb-6 relative z-10 text-gradient">
              Manoj Patil
            </div>

            <div className="absolute bottom-0 left-0 w-full h-1 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-transparent via-primary to-transparent"
                style={{ width: "40%" }}
                animate={{ x: ["-100%", "300%"] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.8,
                }}
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] mb-4"
          >
            Cloud Engineer
            <br />
            <span className="text-gradient">& DevOps Engineer</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg text-muted-foreground max-w-3xl mb-8"
          >
            DevOps Engineer (Fresher) | AWS | CI/CD | Docker | Kubernetes | Terraform | Cloud & Automation Enthusiast
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-12"
          >
            Entry-level DevOps / Cloud Engineer with hands-on experience in AWS, CI/CD automation, Docker, Kubernetes, and Terraform.
          </motion.p>

          {/* ✅ BUTTONS SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all duration-300 hover:gap-4"
            >
              View My Projects
              <ArrowDown className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border text-foreground font-medium hover:border-primary hover:text-primary transition-colors duration-300"
            >
              Get in Touch
            </a>

            <a
              href={getResumePdfHref()}
              download={RESUME_DOWNLOAD_NAME}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-secondary text-foreground font-medium hover:opacity-90 transition-all duration-300"
            >
              Download Resume
            </a>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="grid grid-cols-3 gap-8 md:gap-16 mt-24 md:mt-32 max-w-xl"
        >
          {[
            { value: "Fresher", label: "Entry Level" },
            { value: "10+", label: "Technologies" },
            { value: "Active", label: "Learning" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-display font-bold text-gradient mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;