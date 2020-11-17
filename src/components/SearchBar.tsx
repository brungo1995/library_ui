import * as React from "react";

interface Props {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    title?: string;
    onKeyDown?: React.KeyboardEventHandler;
    style?: React.CSSProperties;
}

function SearchBar({ onChange, value, onKeyDown, style, title }: Props) {
    return (
        <div
            className="input-group search"
            style={{ ...style, }}
        >
            <input
                title={title}
                value={value}
                onKeyDown={onKeyDown}
                onChange={onChange}
                placeholder="&#xF002; Search..."
                type="text"
                className={`form-control form-control-sm font-awesome `}
                style={{ fontFamily: "Arial, FontAwesome" }}
            />
        </div>
    );
}

export default SearchBar;
