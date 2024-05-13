import React from 'react';
import './style.scss';

interface ButtonProps {
    text: string;
    onClick: () => void;
    children?: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, children, type = 'button', className = '' }) => {
    return (
        <button
            className={`btn ${className}`}
            onClick={onClick}
            type={type}
        >
            {children ? children : text}
        </button>
    );
};

export default Button;
