import React, { useState } from "react";

export const FileExplorer = () => {
  // Sample directory structure
  const initialDirectory = {
    name: "root",
    type: "directory",
    children: [
      {
        name: "Documents",
        type: "directory",
        children: [
          {
            name: "Work",
            type: "directory",
            children: [
              { name: "Project1.docx", type: "file" },
              { name: "Project2.docx", type: "file" },
            ],
          },
          { name: "Personal", type: "directory", children: [] },
        ],
      },
      {
        name: "Pictures",
        type: "directory",
        children: [
          { name: "Vacation.jpg", type: "file" },
          { name: "Family.png", type: "file" },
        ],
      },
      { name: "Notes.txt", type: "file" },
    ],
  };

  const [expandedDirectories, setExpandedDirectories] = useState({});

  const toggleDirectory = (directoryName) => {
    setExpandedDirectories({
      ...expandedDirectories,
      [directoryName]: !expandedDirectories[directoryName],
    });
  };

  const renderDirectory = (directory) => {
    const isExpanded = expandedDirectories[directory.name];

    return (
      <div key={directory.name} style={{ marginLeft: "20px" }}>
        <div
          onClick={() => toggleDirectory(directory.name)}
          style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          {directory.type === "directory" ? (
            <span>📂 {directory.name}</span>
          ) : (
            <span>📄 {directory.name}</span>
          )}
        </div>
        {isExpanded && directory.children && (
          <div style={{ marginLeft: "20px" }}>
            {directory.children.map((item) =>
              item.type === "directory"
                ? renderDirectory(item)
                : renderFile(item)
            )}
          </div>
        )}
      </div>
    );
  };

  const renderFile = (file) => {
    return (
      <div key={file.name} style={{ marginLeft: "20px" }}>
        <span>📄 {file.name}</span>
      </div>
    );
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h1>File Explorer</h1>
      <div style={{ border: "1px solid #ccc", padding: "10px" }}>
        {renderDirectory(initialDirectory)}
      </div>
    </div>
  );
};
