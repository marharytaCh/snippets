import React, { useState, useRef, useEffect } from 'react';
import './style.scss'

interface TooltipProps {
    text: string;
    children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const handleMouseOver = () => setIsVisible(true);
    const handleMouseOut = () => setIsVisible(false);

    useEffect(() => {
        const checkIfClickedOutside = (e: MouseEvent) => {
            if (isVisible && tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
                setIsVisible(false);
            }
        };

        document.addEventListener('mousedown', checkIfClickedOutside);

        return () => {
            document.removeEventListener('mousedown', checkIfClickedOutside);
        };
    }, [isVisible]);

    return (
        <div className="tooltip-wrapper" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            {children}
            {isVisible && (
                <div className="tooltip-box" ref={tooltipRef}>
                    {text}
                </div>
            )}
        </div>
    );
};

export default Tooltip;