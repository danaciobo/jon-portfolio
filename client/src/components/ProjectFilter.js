import React from 'react';


const ProjectFilter = ({categories, onSelectCategory, selectedCategory}) => {

  return (
    <div className="filter-container">
      <ul className="filter-list">
        {categories.map(category =>(
                  <li
                  key={category}
                  className={category === selectedCategory ? 'filter-item active' : 'filter-item'}
                  onClick={() => onSelectCategory(category)}
                >
                  {category}
                </li>
                ))}


      </ul>
    </div>
  )
}

export default ProjectFilter;