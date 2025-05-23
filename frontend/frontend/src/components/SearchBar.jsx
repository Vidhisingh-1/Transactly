
export function SearchBar ({setFilter})
{
    return (
        <div className="search-bar-container">
            <input onChange={(e) => {
                setFilter(e.target.value);
            }} type="text" placeholder="Search" className = "search-bar-input" />
        </div>
    )
}