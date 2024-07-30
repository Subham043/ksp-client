import { Paper } from "@mantine/core";
import { FC, useState } from "react";
import classes from './hearings.module.css';
import { useParams } from "react-router-dom";
import HearingsTable from "../../../components/Hearings/table";
import HearingsModal from "../../../components/Hearings/modal";
import HearingsDrawer from "../../../components/Hearings/drawer";
import SearchButtonHeader from "../../../components/Layout/SearchButtonHeader";
import { useExcelExport } from "../../../hooks/useExcelExport";
import { api_routes } from "../../../utils/api_routes";
import ExcelUploadModal from "../../../components/Layout/ExcelUploadModal";

export type HearingsListModalProps = {
    status: boolean;
    type: "Create",
    courtDetailId: number;
} | {
    status: boolean;
    type: "Edit";
    id: number;
}

export type HearingsListDrawerProps = {
    drawerStatus: false;
} | {
    drawerStatus: true;
    id: number;
}

const HearingsListPage:FC = () => {
    const param = useParams<{courtDetailId: string}>()
    const [selectedData, setSelectedData] = useState<number[]>([]);
    const { exportExcel, excelLoading } = useExcelExport();
    const exportExcelHandler = async () => await exportExcel(api_routes.hearings + `/export/${param.courtDetailId}`, 'hearings.xlsx');
    const [modal, setModal] = useState<HearingsListModalProps>({status: false, type: 'Create', courtDetailId: Number(param.courtDetailId)});
    const toggleModal = (value:HearingsListModalProps) => setModal(value);
    const [drawerStatus, setDrawerStatus] = useState<HearingsListDrawerProps>({drawerStatus: false});
    const toggleDrawer = (value:HearingsListDrawerProps) => setDrawerStatus(value);
    const [excelModal, setExcelModal] = useState<boolean>(false);
    const toggleExcelModal = () => setExcelModal(prev => !prev);

    return (
        <div>
            <SearchButtonHeader hasButton={true} buttonText="Create" buttonClickHandler={() => toggleModal({status: true, type: 'Create', courtDetailId: Number(param.courtDetailId)})} hasExport={true} excelLoading={excelLoading} exportClickHandler={exportExcelHandler} hasImport={true} importClickHandler={toggleExcelModal} />
            <Paper shadow="sm" className={classes.paper_background}>
                <HearingsTable toggleModal={toggleModal} toggleDrawer={toggleDrawer} courtId={Number(param.courtDetailId)} selectedData={selectedData} setSelectedData={setSelectedData} />
            </Paper>
            <HearingsModal {...modal} mainCourtId={Number(param.courtDetailId)} toggleModal={toggleModal} />
            <HearingsDrawer {...drawerStatus} toggleDrawer={toggleDrawer} />
            <ExcelUploadModal status={excelModal} toggleModal={toggleExcelModal} title="Hearings" uploadUrl={`${api_routes.hearings}/import/${param.courtDetailId}`} sampleExcel="Sample_Hearings.xlsx" />
        </div>
    )
}

export default HearingsListPage;