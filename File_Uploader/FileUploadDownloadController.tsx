import { useState } from "react";
import "./FileUploadDownloadController.css";

export const FileUploadDownloadController: React.FC<{}> = () => {
  const [allFiles, setAllFiles] = useState<File>([]);
  const [currFile, setCurrFile] = useState<File>();

  const handleAddUpload = () => {
    setAllFiles([...allFiles, ...currFile]);
    setCurrFile([]);
  };

  const onChangeFile = (e: any) => {
    const files = (e.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      setCurrFile([...files]);
    }
  };

  return (
    <div>
      <h2>File Upload & Downloader</h2>
      <div className="container">
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => onChangeFile(e)}
          multiple
        />
        <button onClick={handleAddUpload}>Uplode File</button>
      </div>
      <div className="container-files">
        Download Files Here:{" "}
        {allFiles.map((e) => {
          return (
            <img
              className="downloader"
              src={URL.createObjectURL(e)}
              alt={e.name}
            />
          );
        })}
      </div>
    </div>
  );
};
