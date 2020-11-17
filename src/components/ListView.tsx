import * as React from "react";
import * as  _ from "lodash";
import LoadingIcon from "./LoadingIcon";




export interface props {
    style?: React.CSSProperties;
    data: Array<any>;
    ItemTemplate: any;
    fetchingData?: boolean;
    className?: string
}

function ListItemView({ style, data, ItemTemplate, fetchingData, className = "" }: props): JSX.Element {
    return (
        <ul className="list-group elements-list border-right" style={style}>
            <div className="scrollable">
                {fetchingData ? (
                    <div className="text-center">
                        <LoadingIcon />
                    </div>
                ) : !_.isEmpty(data) ? (
                    data.map((item, i) => <ItemTemplate key={i} {...item} />)
                ) : (
                            <div className="text-center">
                                <h3>No Data Found</h3>
                            </div>
                        )}
            </div>
        </ul>
    );
}

export default ListItemView;
