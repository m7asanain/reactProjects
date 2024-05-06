import logo from "./logo.svg";
import "./App.css";
import Accordian from "./components/accordian";
import RandomColor from "./components/random-color";
import StarRating from "./components/star-rating";
import LoadMoreData from "./components/load-more-data";
import TreeView from "./components/tree-view/index";
import menus from "./components/tree-view/data";

function App() {
  return (
    <div className="App">
      {/* <Accordian /> */}
      {/* <RandomColor /> */}
      {/* <StarRating numberOfStars={10} /> */}
      {/* <LoadMoreData /> */}
      <TreeView menus={menus} />
    </div>
  );
}

export default App;
