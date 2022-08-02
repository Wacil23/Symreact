import React from 'react';

const Select = ({ name, value, error="", onChange, label, children }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select onChange={onChange} name={name} id={name} value={value} className={"form-select" + (error && " is-invalid")}>
                {children}
            </select>
            <p className="invalid-feedback">{error}</p>
        </div>
    );
}

export default Select;