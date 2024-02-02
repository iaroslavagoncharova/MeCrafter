import { Link } from "react-router-dom";

export default function Browse({ setSelectedCategory }: { setSelectedCategory: (selectedCategory: string) => void }) {
  const handleCategoryClick = (selectedCategory: string) => {
    setSelectedCategory(selectedCategory);
    console.log(selectedCategory);
  };
  return (
    <div id="browse" className="col">
      <p>Or browse our categories</p>
      <ul
        id="categories"
        className="list-group list-group-horizontal flex-wrap"
      >
        <li className="list-group-item col-4 col-md-2">
        <Link to="/explore" onClick={() => handleCategoryClick("Health")}>Health
        </Link>
        </li>
        <li className="list-group-item col-4 col-md-2">
          <Link to="/explore" onClick={() => handleCategoryClick("Productivity")}>
            Productivity
          </Link>
        </li>
        <li className="list-group-item col-4 col-md-2">
          <Link
            to="/explore"
            onClick={() => handleCategoryClick("Relationships")}
          >
            Relationships
          </Link>
        </li>
        <li className="list-group-item col-4 col-md-2">
          <Link to="/explore" onClick={() => handleCategoryClick("Finance")}>
            Finance
          </Link>
        </li>
        <li className="list-group-item col-4 col-md-2">
          <Link to="/explore" onClick={() => handleCategoryClick("Self-care")}>
            Self-care
          </Link>
        </li>
        <li className="list-group-item col-4 col-md-2">
          <Link to="/explore" onClick={() => handleCategoryClick("Personal")}>
            Personal
          </Link>
        </li>
      </ul>
    </div>
  );
}
