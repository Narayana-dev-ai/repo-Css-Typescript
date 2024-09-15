import { useState } from "react";
import "./JiraController.css";
import { JiraBoard } from "./JiraBoard";

export const JiraController = () => {
  const [backlog, setBacklog] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [ticket, setTicket] = useState("");

  const addTicket = () => {
    setBacklog([...backlog, ticket]);
    setTicket("");
  };

  const onDragStart = (e, item, title) => {
    e.dataTransfer.setData("item", item);
    e.dataTransfer.setData("column", title);
  };

  const handleDrop = (e, title) => {
    const item = e.dataTransfer.getData("item");
    const startColumn = e.dataTransfer.getData("column");
    if (startColumn != title) {
      switch (title) {
        case "Backlog":
          setBacklog([...backlog, item]);
          break;
        case "InProgress":
          setInprogress([...inprogress, item]);
          break;
        case "Completed":
          setCompleted([...completed, item]);
          break;
        default:
          break;
      }
      switch (startColumn) {
        case "Backlog":
          setBacklog(backlog.filter((e) => e != item));
          break;
        case "InProgress":
          setInprogress(inprogress.filter((e) => e != item));
          break;
        case "Completed":
          setCompleted(completed.filter((e) => e != item));
          break;
        default:
          break;
      }
    }
  };

  return (
    <div>
      <h1>Agile Board</h1>
      <div className="jiraInput">
        <input
          value={ticket}
          style={{ width: "70%" }}
          placeholder="Enter new ticket"
          onChange={(e) => setTicket(e.target.value)}
        />
        <button onClick={addTicket}>Add Ticket</button>
      </div>
      <JiraBoard
        backlog={backlog}
        inprogress={inprogress}
        completed={completed}
        onDragStart={onDragStart}
        handleDrop={handleDrop}
      />
    </div>
  );
};
