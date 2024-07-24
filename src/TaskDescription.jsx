const TaskDescription = () => (
    <div className="App">
      <h2>Coding task</h2>
      <ul>
        <li>Your task is to display the results list in tabular format</li>
        <li>In Last column print Winner if view count is greater than 10.</li>
        <li>
          Modify and Persist the date field in results. Validate date cannot be
          greater than current day
        </li>
        <li>Add a filter dropdown on the top to filter by channel.</li>
        <li>Add a sort dropdown for channel asc or desc.</li>
        <li>Add a button to reset data.</li>
      </ul>
    </div>
  );
  
  export default TaskDescription;