import React from 'react';

const Field = ({ name, label, value, onChange, type = "text", error = "", placeholder="" }) => (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                value={value}
                onChange={onChange}
                type={type}
                className={"form-control" + (error && " is-invalid")}
                placeholder={placeholder || label}
                id={name}
                name={name}
            />
            {error && <p className="invalid-feedback">{error}</p>}
        </div>
);

export default Field;