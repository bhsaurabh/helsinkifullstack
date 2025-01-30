const SearchPerson = ({ searchName, handleSearchNameChange }) => {
  return (
    <form name="searchPerson">
        <h3>search</h3>
        <div>
          find name: <input value={searchName} onChange={handleSearchNameChange} />
        </div>
    </form>
  )
}

export default SearchPerson