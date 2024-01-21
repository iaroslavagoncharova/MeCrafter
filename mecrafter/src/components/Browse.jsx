import React from "react";

export default function Browse() {
  return (
    <div id="browse" className="col">
      <p>Or browse our categories</p>
      <ul id="categories" className="list-group list-group-horizontal flex-wrap">
        <li className="list-group-item">Health</li>
        <li className="list-group-item">Productivity</li>
        <li className="list-group-item">Relationships</li>
        <li className="list-group-item">Finance</li>
        <li className="list-group-item">Self-care</li>
        <li className="list-group-item">Personal</li>
      </ul>
    </div>
  );
}
