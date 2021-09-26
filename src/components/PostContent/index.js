import React from "react";

export default React.memo(({children}) => (
    <React.Fragment>
        {children}
    </React.Fragment>
));
