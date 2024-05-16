import React from "react";

export function ClientLayout({ children }) {
  return (
    <div>
      <h2>Se esta usando el client layout</h2>
      {children}
    </div>
  );
}
