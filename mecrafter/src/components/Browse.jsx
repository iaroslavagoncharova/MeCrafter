import React from "react";

export default function Browse() {
  return (
    <div id="browse" className="col">
      <p>Or browse our categories</p>
      <ul id="categories" className="list-group list-group-horizontal flex-wrap">
        <li className="list-group-item col-4 col-md-2">Health</li>
        <li className="list-group-item col-4 col-md-2">Productivity</li>
        <li className="list-group-item col-4 col-md-2">Relationships</li>
        <li className="list-group-item col-4 col-md-2">Finance</li>
        <li className="list-group-item col-4 col-md-2">Self-care</li>
        <li className="list-group-item col-4 col-md-2">Personal</li>
      </ul>
    </div>
  );
}
