import "./CardFlip.css";

export const CardFlip = () => {
  return (
    <div className="container">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <h1>
            Sharmi Love's Narayana{" "}
            <>
              <>&#10084;&#65039;</>
            </>
          </h1>
        </div>
        <div className="flip-card-back">
          <h1>
            Narayana Love's Sharmi{" "}
            <>
              <>&#10084;&#65039;</>
            </>
          </h1>
        </div>
      </div>
    </div>
  );
};
