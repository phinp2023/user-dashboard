import React from 'react';
import { Button } from 'antd';

interface ButtonOptionProps {
    onMenuClick: (e: any) => void;
    buttonOptions: Array<OptionType>;
    buttonStyle?: React.CSSProperties;
    dropdownProps?: object;
    disabled?: boolean;
}

interface OptionType {
    key: string;
    name?: string;
    danger?: boolean;
}

const ButtonOption: React.FC<ButtonOptionProps> = ({
    onMenuClick,
    buttonOptions = [],
    buttonStyle,
    disabled,
    dropdownProps,
}) => {
    const renderButton = buttonOptions.map((item, index) => (
        <Button key={item.key} type='primary' danger={item.danger} onClick={() => onMenuClick({ key: item.key })}>
            {item.name}
        </Button>
    ));

    return <div className='operation-btn'>{renderButton}</div>;
};

export default ButtonOption;
