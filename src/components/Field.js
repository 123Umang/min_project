import React from "react";

const Field = ({ label, type, placeholder, value, onChange }) => {
  return (
    <div className="field">
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Field;
