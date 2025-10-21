import React from "react";

export default function MaintenancePage() {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #111827, #1f2937, #111827)",
      color: "#fff",
      textAlign: "center",
      padding: "24px",
      fontFamily: "'Inter', sans-serif",
    },
    box: {
      maxWidth: "500px",
    },
    title: {
      fontSize: "3rem",
      fontWeight: "700",
      marginBottom: "1rem",
    },
    message: {
      fontSize: "1.125rem",
      lineHeight: "1.6",
      marginBottom: "1.5rem",
      color: "#e5e7eb",
    },
    emoji: {
      fontSize: "2.5rem",
      animation: "bounce 1.5s infinite",
    },
    "@keyframes bounce": {
      "0%, 100%": { transform: "translateY(0)" },
      "50%": { transform: "translateY(-10px)" },
    },
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>

      <div style={styles.box}>
        <h1 style={styles.title}>We’re Remodeling!</h1>
        <p style={styles.message}>
          Our site is currently down for maintenance — we’re making improvements
          to serve you better. Please check back soon!
        </p>
        <div style={styles.emoji}>🔧</div>
      </div>
    </div>
  );
}
