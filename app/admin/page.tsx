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

  const updateText = () => {
    const textRef = ref(db, "sharedText");
    set(textRef, adminText);
    alert("Text updated!");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Admin Panel</h1>
      <h3>Update Text for Home Page</h3>
      <input
        type="text"
        value={adminText}
        onChange={(e) => setAdminText(e.target.value)}
        placeholder="Enter text"
        style={{ padding: "10px", width: "300px", fontSize: "16px" }}
      />
      <br />
      <button
        onClick={updateText}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Update Text
      </button>
    </div>
  );
}
