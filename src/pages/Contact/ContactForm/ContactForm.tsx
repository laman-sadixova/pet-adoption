import { useState, type FormEvent } from "react";
import { api } from "../../../services/api";
import Modal from "./Modal/Modal";
import styles from "./ContactForm.module.css";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<{
    message: string;
    isError: boolean;
  } | null>(null);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!name) {
      newErrors.name = "Name is required";
    } else if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@")) {
      newErrors.email = "Email must contain @";
    }
    if (!message) {
      newErrors.message = "Message is required";
    } else if (message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await api.post("/contacts", { name, email, message });
      console.log("Form submitted:", response.data);
      setModal({ message: "Message sent successfully!", isError: false });
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setModal({ message: "Failed to send message", isError: true });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
          placeholder="Your name"
          required
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
      </div>
      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          placeholder="Your email"
          required
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}
      </div>
      <div className={styles.field}>
        <label htmlFor="message" className={styles.label}>
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${styles.textarea} ${
            errors.message ? styles.inputError : ""
          }`}
          placeholder="Your message"
          rows={5}
          required
        />
        {errors.message && <p className={styles.error}>{errors.message}</p>}
      </div>
      <button type="submit" className={styles.submitButton} disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </button>
      {modal && (
        <Modal
          message={modal.message}
          isError={modal.isError}
          onClose={() => setModal(null)}
        />
      )}
    </form>
  );
}
