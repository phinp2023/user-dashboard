import React from 'react';
import classnames from 'classnames';

interface LoaderProps {
    spinning: boolean;
    fullScreen?: boolean;
    size?: number;
    text?: boolean;
}

const Loading: React.FC<LoaderProps> = ({
    spinning = false,
    fullScreen,
    size = 40,
    text = true,
}) => {
    return (
        <div
            className={classnames('loader', {
                hidden: !spinning,
                fullScreen: fullScreen,
            })}
        >
            <div className='warpper'>
                <div className='inner' style={{ width: size, height: size }} />
                {text && <div className='text'>LOADING</div>}
            </div>
        </div>
    );
};

export default Loading;
