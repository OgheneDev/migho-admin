import React from 'react'

const Sidebar = ({ activeSection, setActiveSection }) => {
  return (
    <nav className="bg-very-dark-grey p-6 md:my-5 flex md:flex-col gap-5 items-center justify-between md:justify-start md:w-[250px] md:rounded-[15px]">
      <button
        className={`font-bold w-fit text-[15px] ${activeSection === 1 ? 'bg-custom-orange text-white px-[20px] py-[5px] rounded-[15px] transition-all duration-300 ease-in-out' : 'text-custom-orange bg-transparent'}`}
        onClick={() => setActiveSection(1)}
      >
        Manage Products
      </button>
      <button
        className={`font-bold w-fit text-[15px] ${activeSection === 2 ? 'bg-custom-orange text-white px-[20px] py-[5px] rounded-[15px] transition-all duration-300 ease-in-out' : 'text-custom-orange bg-transparent'}`}
        onClick={() => setActiveSection(2)}
      >
        View Contacts
      </button>
    </nav>
  )
}

export default Sidebar
