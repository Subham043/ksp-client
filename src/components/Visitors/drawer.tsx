import { FC } from "react";
import { Drawer } from '@mantine/core';
import { VisitorsListDrawerProps } from "../../pages/jails/visitors";
import VisitoreDetail from "./detail";

const VisitoreDrawer:FC<VisitorsListDrawerProps & {toggleDrawer: (value: VisitorsListDrawerProps) => void}> = (props) => {
    return (<Drawer opened={props.drawerStatus} onClose={() => props.toggleDrawer({drawerStatus: false})} position="right" title="Visitor" overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}>
        <VisitoreDetail {...props} />
    </Drawer>)
}

export default VisitoreDrawer;