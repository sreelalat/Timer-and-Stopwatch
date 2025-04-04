import React from "react";

interface ButtonProps {
    label: string | React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "tertiary" | "outline" | "danger";
    disabled?: boolean;
    className?: string;
    type?: "button" | "submit" | "reset";
    tooltip?: string;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    variant = "primary",
    disabled = false,
    className = "",
    type = "button",
    tooltip
}) => {
    const baseStyles = "transition-colors";

    const variantStyles = {
        primary: 'px-4 py-2 text-sm text-white rounded-md bg-green-600 hover:bg-green-700',
        secondary: "p-3 px-3.5 bg-green-100 text-green-600 hover:bg-green-200",
        tertiary: 'px-3.5 py-3 text-sm text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200',
        outline: "text-gray-700 rounded-md lg:hover:bg-gray-100",
        danger: "p-2 rounded-full hover:bg-red-50 text-red-500"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={` ${className} ${baseStyles} ${variantStyles[variant]} ${disabled ? "opacity-50 !bg-gray-300 !text-[#000000] hover:!bg-gray-300 cursor-not-allowed" : ""} `}
            title={tooltip}
        >
            {label}
        </button>
    );
};

export default Button;