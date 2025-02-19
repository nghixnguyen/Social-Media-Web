import "./SearchList.css";
import SearchOutput  from "./SearchOutput";

const SearchList = ({ results }) => {
    console.log(results);
    return (
      <div className="results-list">
        {results.map((result, id) => {
          return <SearchOutput result={result.FirstName + " " + result.LastName} key={result.UserID} />;
        })}
      </div>
    );
  };

export default SearchList
