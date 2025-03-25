"use client";

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../lib/firebase";

export default function HomePage() {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    const textRef = ref(db, "sharedText");
    const unsubscribeText = onValue(textRef, (snapshot) => {
      const data = snapshot.val();
      setText(data || "");
    });

    return () => {
      unsubscribeText();
    };
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Home Page</h1>
      <h2>Realtime Text from Admin:</h2>
      <p style={{ fontSize: "20px", marginTop: "20px" }}>{text}</p>
    </div>
  );
}
