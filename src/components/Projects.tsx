import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Implementation of IAM Policies and Secure Access Management in AWS",
    category: "Cloud Security",
    description: `Implemented secure AWS IAM access using least privilege policies.
Configured RBAC and audited permissions for compliance and security.`,
    image:
      "https://res.cloudinary.com/dswfth5zu/image/upload/v1770405147/134452997-cloud-security-in-the-post-pandemic-era_ozjlcp.jpg",
    link: "#",
    year: "JUNE/2025",
  },
  {
    title: "End-to-End DevOps CI/CD Pipeline using Jenkins, Docker, and Kubernetes",
    category: "DevOps & CI/CD",
    description: `Built an end-to-end CI/CD pipeline using Jenkins for automated builds and deployments.
Containerized applications with Docker and deployed them on Kubernetes.`,
    image:
      "https://res.cloudinary.com/dswfth5zu/image/upload/v1770406164/873531-azure-devops-services-cloud4c-azure_gmjjef.jpg",
    link: "#",
    year: "JULY/2025",
  },
  {
    title: "Deployment of a Highly Available and Scalable Website on AWS",
    category: "Cloud Infrastructure",
    description:
      `Deployed a highly available website on AWS using EC2, Load Balancer, and Auto Scaling.
Ensured scalability, fault tolerance, and high uptime through multi-AZ architecture.`,
    image:
      "https://res.cloudinary.com/dswfth5zu/image/upload/v1770407063/ilustrasi-cloud-computing-7-l-min_x1cql6.jpg",
    link: "#",
    year: "SEPTEMBER/2025",
  },
];

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.a
      ref={ref}
      href={project.link}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-2xl bg-dark-surface mb-6">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500">
            <ArrowUpRight className="w-6 h-6 text-primary-foreground" />
          </div>
        </div>

        {/* Year badge */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium">
          {project.year}
        </div>
      </div>

      <p className="text-sm text-primary mb-2">{project.category}</p>
      <h3 className="text-xl md:text-2xl font-display font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
        {project.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {project.description}
      </p>
    </motion.a>
  );
};

const Projects = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding bg-dark-elevated">
      <div className="container-custom">
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold"
            >
              <span className="text-gradient">Projects</span>
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            href="#"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary link-underline transition-colors duration-300"
          >
            View All Projects
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={project.title === "Health & Wellness App" ? "md:col-span-2 md:max-w-lg md:mx-auto" : ""}
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
