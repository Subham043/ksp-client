import { FC } from "react";
import { Drawer } from '@mantine/core';
import { HearingsListDrawerProps } from "../../pages/courts/hearings";
import HearingeDetail from "./detail";

const HearingeDrawer:FC<HearingsListDrawerProps & {toggleDrawer: (value: HearingsListDrawerProps) => void}> = (props) => {
    return (<Drawer opened={props.drawerStatus} onClose={() => props.toggleDrawer({drawerStatus: false})} position="right" title="Hearing" overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}>
        <HearingeDetail {...props} />
    </Drawer>)
}

export default HearingeDrawer;