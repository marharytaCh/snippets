import React, { useState, useRef, useEffect } from 'react';
import './style.scss';

interface DropdownProps {
    label: string;
    options: { label: string; value: string }[];
    onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={containerRef} className="dropdown">
            <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>{label}</button>
            {isOpen && (
                <ul className="dropdown-menu">
                    {options.map((option) => (
                        <li key={option.value} onClick={() => {
                            onChange(option.value);
                            setIsOpen(false);
                        }}>
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;