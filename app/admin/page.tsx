"use client";

import { useEffect, useState } from "react";
import { ref, set, onValue } from "firebase/database";
import { db } from "../../lib/firebase";

export default function AdminPage() {
  const [adminText, setAdminText] = useState<string>("");

  useEffect(() => {
    const textRef = ref(db, "sharedText");
    const unsubscribe = onValue(textRef, (snapshot) => {
      const data = snapshot.val();
      setAdminText(data || "");
    });

    return () => unsubscribe();
  }, []);

  const handleTextChange = (newText: string) => {
    setAdminText(newText);
    const textRef = ref(db, "sharedText");
    set(textRef, newText);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>✨ Admin Panel ✨</h1>

      <div style={styles.card}>
        <label htmlFor="sharedText" style={styles.label}>
          Update Shared Text:
        </label>
        <input
          id="sharedText"
          type="text"
          value={adminText}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder="Type something awesome 🍀"
          style={styles.input}
        />
        <p style={styles.info}>Text updates instantly as you type!</p>
      </div>
    </div>
  );
}

import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #e09, #d0e)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#fff",
    padding: "20px",
    boxSizing: "border-box",
  },
  title: {
    marginBottom: "30px",
    fontSize: "48px",
    textShadow: "1px 2px 2px rgba(0,0,0,0.2)",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
    width: "100%",
    maxWidth: "450px",
    color: "#333",
  },
  label: {
    fontSize: "18px",
    fontWeight: "600",
  },
  input: {
    marginTop: "8px",
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
    outline: "none",
  },
  info: {
    marginTop: "12px",
    fontSize: "14px",
    color: "#555",
    fontStyle: "italic",
  },
};
