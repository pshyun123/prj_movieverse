const Kiki = ({ data, onClick }) => {
  const dateTimeString = data.regDate;
  const toDate = new Date(dateTimeString);
  const regDate = toDate.toISOString().split("T")[0];

  return (
    <div className="chatBox" onClick={onClick}>
      <div className="title">{data.roomName}</div>
      <div className="createdAt">{regDate}</div>
    </div>
  );
};
export default Kiki;
