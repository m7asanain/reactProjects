import { useState, useEffect } from "react";
import Suggestion from "./suggestions";

export default function SearchAutocomplete() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [searchParam, setSearchParam] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  function handleChange(event) {
    const query = event.target.value.toLowerCase();
    setSearchParam(query);
    if (query.length > 1) {
      const filterDate =
        users && users.length
          ? users.filter((item) => item.toLowerCase().indexOf(query) > -1)
          : [];
      setFilteredUsers(filterDate);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }

  function handleClick(event) {
    setShowDropdown(false);
    setSearchParam(event.target.innerText);
    setFilteredUsers([]);
  }

  async function fetchListOfUsers() {
    try {
      setLoading(true);
      const response = await fetch("http://dummyjson.com/users");
      const data = await response.json();

      if (data && data.users && data.users.length) {
        setLoading(false);
        setUsers(data.users.map((userItem) => userItem.firstName));
        setErrorMsg(null);
      }
    } catch (error) {
      setLoading(false);
      console.log(errorMsg);
      setErrorMsg(error);
    }
  }

  useEffect(() => {
    fetchListOfUsers();
  }, []);

  console.log(users, filteredUsers);

  return (
    <div className="search-autocomplete-container">
      {loading ? (
        <h1>Loading Data! Please Wait...</h1>
      ) : (
        <input
          value={searchParam}
          name="search-user"
          type="text"
          placeholder="Search Users..."
          onChange={handleChange}
        />
      )}

      {showDropdown && (
        <Suggestion handleClick={handleClick} data={filteredUsers} />
      )}
    </div>
  );
}
