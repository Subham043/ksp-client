import { FC } from "react";
import { Drawer } from '@mantine/core';
import { CrimesByCriminalsListDrawerProps } from "../../pages/crimes/crimesByCriminals";
import CrimesByCriminalDetail from "./detail";

const CrimesByCriminalDrawer:FC<CrimesByCriminalsListDrawerProps & {toggleDrawer: (value: CrimesByCriminalsListDrawerProps) => void}> = (props) => {
    return (<Drawer opened={props.drawerStatus} onClose={() => props.toggleDrawer({drawerStatus: false})} position="right" title="Criminal" overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}>
        <CrimesByCriminalDetail {...props} />
    </Drawer>)
}

export default CrimesByCriminalDrawer;