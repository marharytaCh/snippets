import React from 'react';

interface ToggleSwitchProps {
    isOn: boolean;
    label: string;
    onToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, label, onToggle }) => {
    return (
        <div className="toggle-switch">
            <span>{label}</span>
            <label className="switch">
                <input type="checkbox" checked={isOn} onChange={onToggle} />
                <span className="slider"></span>
            </label>
        </div>
    );
};

export default ToggleSwitch;