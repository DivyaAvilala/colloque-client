import React from "react";

const Select = ({ name, label, options, onOptionSelect, selectedValue }) => {
  const onOptionSelected = (event) => {
    onOptionSelect(event.target.value);
  };
  return (
    <div className="form-group form-input-group">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        className="form-control form-input"
        onChange={onOptionSelected}
        defaultValue={selectedValue}
      >
        <option value="" />
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
