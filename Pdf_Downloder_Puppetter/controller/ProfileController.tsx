import {
  preparePdfContent,
  sendBackPdf,
  uint8ArrayFromBase64,
} from "../utils/exportReport";
import { LeftViewProfile } from "../views/LeftViewProfile";
import { RightViewProfile } from "../views/RightViewProfile";
import "./ProfileController.css";

export const ProfileController = () => {
  const handleDownloadBtn = async () => {
    const response = await sendBackPdf(preparePdfContent());

    const bytes = uint8ArrayFromBase64(response);
    const blob = new Blob([bytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "grid_2024_09.pdf";
    link.click();
  };

  return (
    <div className="controller_view">
      <button className="download_btn" onClick={handleDownloadBtn}>
        Download
      </button>
      <div className="container" id="containerId">
        <div className="container__left">
          <LeftViewProfile />
        </div>
        <div className="container__right">
          <RightViewProfile />
        </div>
      </div>
    </div>
  );
};
