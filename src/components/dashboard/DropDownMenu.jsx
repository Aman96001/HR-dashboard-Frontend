export default function DropdownMenu({ children, dropdownRef, dropdownOpen, setDropdownOpen }) {
    return (
      <div className="dropdown" ref={dropdownRef}>
        <button className="dropdown-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
          ⋮
        </button>
        {dropdownOpen && <div className="dropdown-menu">{children}</div>}
      </div>
    );
  }
  