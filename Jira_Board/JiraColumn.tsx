import "./JiraController.css";

export const JiraColumn = ({ items, title, onDrop, onDragStart }) => {
  return (
    <div
      className="container_item"
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <span className="title">{title}</span>
      <div className="item_board">
        {[...items].map((item, index) => (
          <div
            key={index}
            className="each_item"
            draggable
            onDragStart={(e) => onDragStart(e, item, title)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
