import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Github, Linkedin, Twitter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { submitToInbox } from "@/lib/submitContactEmail";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [feedbackData, setFeedbackData] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  const [sendingMessage, setSendingMessage] = useState(false);
  const [sendingFeedback, setSendingFeedback] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendingMessage(true);
    const result = await submitToInbox({
      subject: `[Portfolio] Message from ${formData.name || "visitor"}`,
      name: formData.name,
      email: formData.email,
      message: formData.message,
    });
    setSendingMessage(false);

    if (result.success === false) {
      toast.error(result.error);
      return;
    }
    toast.success("Message sent. I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendingFeedback(true);
    const result = await submitToInbox({
      subject: `[Portfolio] Feedback from ${feedbackData.name || "visitor"}`,
      name: feedbackData.name,
      email: feedbackData.email,
      message: feedbackData.feedback,
    });
    setSendingFeedback(false);

    if (result.success === false) {
      toast.error(result.error);
      return;
    }
    toast.success("Thank you for your feedback!");
    setFeedbackData({ name: "", email: "", feedback: "" });
  };

  return (
    <section id="contact" className="section-padding bg-dark-elevated" ref={ref}>
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-primary font-medium mb-4"
          >
            Get In Touch
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
          >
            Let's connect <span className="text-gradient">and collaborate</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Open to internship or full-time opportunities in DevOps, Cloud Engineering, or SRE. 
            Let's discuss how I can contribute to your team and grow together in the cloud infrastructure space.
          </motion.p>

          {/* Social links — three cards, centered as a group */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-16 w-full max-w-3xl mx-auto justify-items-stretch [&>*]:min-w-0"
          >
            <div className="glass-card rounded-2xl p-6 text-center flex flex-col items-center">
              <Linkedin className="w-6 h-6 text-primary mb-4 shrink-0" />
              <p className="text-sm text-muted-foreground mb-1">LinkedIn</p>
              <a href="https://www.linkedin.com/in/manoj-patil-9507bb277/" className="font-medium hover:text-primary transition-colors">
                Connect with me
              </a>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center flex flex-col items-center">
              <Github className="w-6 h-6 text-primary mb-4 shrink-0" />
              <p className="text-sm text-muted-foreground mb-1">GitHub</p>
              <a href="https://github.com/manojpatil1831" className="font-medium hover:text-primary transition-colors">
                View my code
              </a>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center flex flex-col items-center">
              <Twitter className="w-6 h-6 text-primary mb-4 shrink-0" />
              <p className="text-sm text-muted-foreground mb-1">X</p>
              <a href="https://x.com/Manojpdevops" className="font-medium hover:text-primary transition-colors">
                Follow me
              </a>
            </div>
          </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            id="send-message"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass-card rounded-2xl p-8 md:p-12 mt-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-3xl md:text-4xl font-display font-bold mb-8"
            >
              Send me a message
            </motion.h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <label htmlFor="contact-name" className="block text-sm font-medium mb-2">
                  Your name:
                </label>
                <Input
                  id="contact-name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <label htmlFor="contact-email" className="block text-sm font-medium mb-2">
                  Your email:
                </label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <label htmlFor="contact-message" className="block text-sm font-medium mb-2">
                  Your message:
                </label>
                <Textarea
                  id="contact-message"
                  placeholder="Enter your message..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={6}
                  className="w-full resize-none"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="flex justify-end"
              >
                <Button type="submit" size="lg" className="px-8" disabled={sendingMessage}>
                  {sendingMessage ? "Sending…" : "Send Message"}
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* Feedback Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="glass-card rounded-2xl p-8 md:p-12 mt-16"
            id="feedback"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="text-primary font-medium mb-4"
            >
              Share Your Feedback
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-8"
            >
              We'd love to hear from <span className="text-gradient">you</span>
            </motion.h2>

            <form onSubmit={handleFeedbackSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.5 }}
              >
                <label htmlFor="feedback-name" className="block text-sm font-medium mb-2">
                  Your name:
                </label>
                <Input
                  id="feedback-name"
                  type="text"
                  placeholder="Enter your name"
                  value={feedbackData.name}
                  onChange={(e) =>
                    setFeedbackData({ ...feedbackData, name: e.target.value })
                  }
                  required
                  className="w-full"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.55 }}
              >
                <label htmlFor="feedback-email" className="block text-sm font-medium mb-2">
                  Your email:
                </label>
                <Input
                  id="feedback-email"
                  type="email"
                  placeholder="Enter your email"
                  value={feedbackData.email}
                  onChange={(e) =>
                    setFeedbackData({ ...feedbackData, email: e.target.value })
                  }
                  required
                  className="w-full"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.6 }}
              >
                <label htmlFor="feedback-text" className="block text-sm font-medium mb-2">
                  Your feedback:
                </label>
                <Textarea
                  id="feedback-text"
                  placeholder="Share your thoughts, suggestions, or feedback..."
                  value={feedbackData.feedback}
                  onChange={(e) =>
                    setFeedbackData({ ...feedbackData, feedback: e.target.value })
                  }
                  required
                  rows={6}
                  className="w-full resize-none"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.7 }}
                className="flex justify-end"
              >
                <Button type="submit" size="lg" className="px-8" disabled={sendingFeedback}>
                  {sendingFeedback ? "Sending…" : "Submit Feedback"}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
