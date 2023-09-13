import React from 'react';
import classnames from 'classnames';
import CLoading from './CLoading';

interface PageProps extends Props {
    className?: string;
    loading?: boolean;
    inner: boolean;
}

const Page: React.FC<PageProps> = (props) => {
    const { className, children, loading = false, inner = false } = props;
    const loadingStyle = {
        height: 'calc(100vh - 184px)',
        overflow: 'hidden',
    };
    return (
        <div
            className={classnames(className, {
                'content-inner': inner,
            })}
            style={loading ? loadingStyle : {}}
        >
            {loading ? <CLoading spinning /> : ''}
            {children}
        </div>
    );
};

export default Page;
