import { Paper } from "@mantine/core";
import { FC, useState } from "react";
import classes from './visitors.module.css';
import { useParams } from "react-router-dom";
import VisitorsTable from "../../../components/Visitors/table";
import VisitorsModal from "../../../components/Visitors/modal";
import VisitorsDrawer from "../../../components/Visitors/drawer";
import SearchButtonHeader from "../../../components/Layout/SearchButtonHeader";
import { useExcelExport } from "../../../hooks/useExcelExport";
import { api_routes } from "../../../utils/api_routes";

export type VisitorsListModalProps = {
    status: boolean;
    type: "Create",
    punishmentId: number;
} | {
    status: boolean;
    type: "Edit";
    id: number;
}

export type VisitorsListDrawerProps = {
    drawerStatus: false;
} | {
    drawerStatus: true;
    id: number;
}

const VisitorsListPage:FC = () => {
    const param = useParams<{punishmentId: string}>()
    const [selectedData, setSelectedData] = useState<number[]>([]);
    const { exportExcel, excelLoading } = useExcelExport();
    const exportExcelHandler = async () => await exportExcel(api_routes.visitors + `/export/${param.punishmentId}`, 'visitors.xlsx');
    const [modal, setModal] = useState<VisitorsListModalProps>({status: false, type: 'Create', punishmentId: Number(param.punishmentId)});
    const toggleModal = (value:VisitorsListModalProps) => setModal(value);
    const [drawerStatus, setDrawerStatus] = useState<VisitorsListDrawerProps>({drawerStatus: false});
    const toggleDrawer = (value:VisitorsListDrawerProps) => setDrawerStatus(value);

    return (
        <div>
            <SearchButtonHeader hasButton={true} buttonText="Create" buttonClickHandler={() => toggleModal({status: true, type: 'Create', punishmentId: Number(param.punishmentId)})} hasExport={true} excelLoading={excelLoading} exportClickHandler={exportExcelHandler} hasImport={false} />
            <Paper shadow="sm" className={classes.paper_background}>
                <VisitorsTable toggleModal={toggleModal} toggleDrawer={toggleDrawer} punishmentId={Number(param.punishmentId)} selectedData={selectedData} setSelectedData={setSelectedData} />
            </Paper>
            <VisitorsModal {...modal} mainPunishmentId={Number(param.punishmentId)} toggleModal={toggleModal} />
            <VisitorsDrawer {...drawerStatus} toggleDrawer={toggleDrawer} />
        </div>
    )
}

export default VisitorsListPage;