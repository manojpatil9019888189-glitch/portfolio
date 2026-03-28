import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Cloud & AWS",
    skills: ["AWS IAM", "AWS Cloud", "AWS ELB", "AWS Storage", "Amazon EC2", "Amazon CloudWatch", "Amazon SNS", "Amazon VPC", "Cloud Security"],
  },
  {
    title: "DevOps & Infrastructure",
    skills: ["Terraform", "Docker", "Docker Compose", "Docker Container", "Jenkins", "CI/CD", "Autoscale"],
  },
  {
    title: "Monitoring & Observability",
    skills: ["Grafana", "Prometheus", "AWS CloudWatch", "AWS CloudTrail"],
  },
  {
    title: "Development & Scripting",
    skills: ["HTML/CSS", "Python", "Shell Scripting"],
  },
  {
    title: "Operating Systems & Database",
    skills: ["Linux", "MySQL"],
  },
];

const tools = [
  { name: "Docker", icon: "🐳" },
  { name: "Jenkins", icon: "🔧" },
  { name: "Kubernetes", icon: "☸️" },
  { name: "Terraform", icon: "🏗️" },
  { name: "AWS Cloud", icon: "☁️" },
  { name: "GitHub", icon: "🐙" },
  { name: "Shell Scripting", icon: "💻" },
  { name: "Linux", icon: "🐧" },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding" ref={ref}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - Skills */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-primary font-medium mb-4"
            >
              My Expertise
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-12"
            >
              Skills & <span className="text-gradient">Technologies</span>
            </motion.h2>

            <div className="space-y-10">
              {skillCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + categoryIndex * 0.1 }}
                >
                  <h3 className="text-lg font-display font-semibold mb-4">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 rounded-full bg-dark-surface border border-border text-sm hover:border-primary hover:text-primary transition-colors duration-300 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right - Tools & Philosophy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card rounded-2xl p-8 mb-8"
            >
              <h3 className="text-lg font-display font-semibold mb-6">
                Tools I Use Daily
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-dark-surface hover:bg-muted transition-colors duration-300"
                  >
                    <span className="text-2xl">{tool.icon}</span>
                    <span className="text-sm text-muted-foreground">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
