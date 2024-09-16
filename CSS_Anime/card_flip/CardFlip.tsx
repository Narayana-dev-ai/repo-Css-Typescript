import "./CardFlip.css";

export const CardFlip = () => {
  return (
    <div className="container">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <h1>
            I need You{" "}
            <>
              <>&#10084;&#65039;</>
            </>
          </h1>
        </div>
        <div className="flip-card-back">
          <h1>
            You need Me{" "}
            <>
              <>&#10084;&#65039;</>
            </>
          </h1>
        </div>
      </div>
    </div>
  );
};
