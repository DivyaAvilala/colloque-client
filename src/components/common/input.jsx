import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  const placeholder="Enter "+label+"..."
  return (
    <div className="form-group form-input-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} placeholder={placeholder} className="form-input form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
