import React from "react";

export function AdminLayout({ children }) {
  return (
    <div>
      <h2>Se esta usando el admin layout</h2>
      {children}
    </div>
  );
}
