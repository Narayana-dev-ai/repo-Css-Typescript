import { JiraColumn } from "./JiraColumn";

export const JiraBoard = ({
  backlog,
  inprogress,
  completed,
  onDragStart,
  handleDrop
}) => {
  return (
    <div className="container">
      <JiraColumn
        items={backlog}
        title="Backlog"
        onDrop={(e) => handleDrop(e, "Backlog")}
        onDragStart={onDragStart}
      />
      <JiraColumn
        items={inprogress}
        title="InProgress"
        onDrop={(e) => handleDrop(e, "InProgress")}
        onDragStart={onDragStart}
      />
      <JiraColumn
        items={completed}
        title="Completed"
        onDrop={(e) => handleDrop(e, "Completed")}
        onDragStart={onDragStart}
      />
    </div>
  );
};
