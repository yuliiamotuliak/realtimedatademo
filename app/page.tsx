"use client";

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../lib/firebase";

export default function HomePage() {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    const textRef = ref(db, "sharedText");
    const unsubscribe = onValue(textRef, (snapshot) => {
      const data = snapshot.val();
      setText(data || "");
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🏡 Welcome Home 🏡</h1>

      <div style={styles.card}>
        <h3 style={styles.subtitle}>Realtime Shared Message:</h3>
        <p style={styles.sharedText}>{text}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #74ebd5, #ACB6E5)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#2c3e50",
  },
  title: {
    fontSize: "48px",
    marginBottom: "40px",
    textShadow: "1px 1px 1px rgba(0,0,0,0.2)",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: "25px",
    width: "100%",
    maxWidth: "500px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "22px",
    marginBottom: "20px",
    color: "#16a085",
  },
  sharedText: {
    fontSize: "26px",
    fontWeight: "500",
    padding: "10px",
    borderRadius: "6px",
    background: "#ecf0f1",
    wordWrap: "break-word",
  },
};
