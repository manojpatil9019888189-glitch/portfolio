import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* IMAGE SECTION */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-dark-surface">
              <img
                src="https://res.cloudinary.com/dswfth5zu/image/upload/c_fill,g_face,w_800,h_1000/ChatGPT_Image_Jan_28_2026_02_57_31_AM_otikau.png"
                alt="Manoj Patil Portrait"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* Decorative Border */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-primary rounded-2xl -z-10" />
          </motion.div>

          {/* CONTENT SECTION */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-primary font-medium mb-4"
            >
              About Me
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-8 leading-tight"
            >
              Building scalable cloud
              <br />
              <span className="text-gradient">
                infrastructure & automation
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6 text-muted-foreground"
            >
              <p>
                I'm <strong>Manoj Patil</strong>, an aspiring Cloud Engineer and
                DevOps enthusiast with hands-on experience in AWS cloud
                infrastructure, containerization, and CI/CD pipelines. I'm
                passionate about building scalable, secure, and automated cloud
                solutions.
              </p>

              <p>
                As a fresher, I'm focused on building real-world DevOps projects
                to strengthen my skills in infrastructure as code, automation,
                and cloud best practices. I'm eager to contribute to innovative
                teams while continuously growing my expertise.
              </p>
            </motion.div>

            {/* DETAILS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 gap-6 mt-10"
            >
              {[
                { label: "Name", value: "Manoj Patil" },
                { label: "Location", value: "Bangalore, Karnataka" },
                { label: "Email", value: "manojpatil1831@gmail.com" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-sm text-muted-foreground mb-1">
                    {item.label}
                  </p>
                  <p className="font-medium">{item.value}</p>
                </div>
              ))}
            </motion.div>

            {/* RESUME BUTTON */}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              href="public\Manoj Patil.pdf"
              download
              className="inline-flex items-center gap-2 mt-10 px-8 py-4 rounded-full border border-border text-foreground font-medium hover:border-primary hover:text-primary transition-colors duration-300"
            >
              Download Resume
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
