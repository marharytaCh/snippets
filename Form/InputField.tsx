import React from 'react';

interface InputFieldProps {
    label: string;
    type: 'text' | 'number' | 'email' | 'password';
    value: string;
    onChange: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange }) => {
    return (
        <div className="input-group">
            <label>{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="input-field"
            />
        </div>
    );
};

export default InputField;