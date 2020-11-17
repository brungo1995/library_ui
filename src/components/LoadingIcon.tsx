import * as React from 'react';

function LoadingIcon({ title = "LoadingData" }) {
    return (
        <h4 className="text-center p-3">{title}<i className="fa fa-spinner fa-spin ml-1"></i></h4>
    )
}

export default LoadingIcon;