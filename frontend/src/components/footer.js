const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.text}>
          © {new Date().getFullYear()} MyApp. All rights reserved.
        </p>
        <nav style={styles.nav}>
          <a href="#privacy" style={styles.navLink}>
            Privacy Policy
          </a>
          <a href="#terms" style={styles.navLink}>
            Terms of Service
          </a>
          <a href="#contact" style={styles.navLink}>
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "1rem 2rem",
    textAlign: "center",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  text: {
    marginBottom: "0.5rem",
  },
  nav: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginTop: "0.5rem",
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1rem",
  },
};

export default Footer;
