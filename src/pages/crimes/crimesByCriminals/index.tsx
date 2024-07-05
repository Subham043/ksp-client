import { Paper } from "@mantine/core";
import { FC, useState } from "react";
import classes from './crimesByCriminals.module.css';
import { useParams } from "react-router-dom";
import CrimesByCriminalsTable from "../../../components/CrimesByCriminals/table";
import CrimesByCriminalsModal from "../../../components/CrimesByCriminals/modal";
import CrimesByCriminalsDrawer from "../../../components/CrimesByCriminals/drawer";
import SearchButtonHeader from "../../../components/Layout/SearchButtonHeader";
import { useExcelExport } from "../../../hooks/useExcelExport";
import { api_routes } from "../../../utils/api_routes";

export type CrimesByCriminalsListModalProps = {
    status: boolean;
    type: "Create",
    crimeId: number;
} | {
    status: boolean;
    type: "Edit";
    id: number;
}

export type CrimesByCriminalsListDrawerProps = {
    drawerStatus: false;
} | {
    drawerStatus: true;
    id: number;
}

const CrimesByCriminalsListPage:FC = () => {
    const param = useParams<{crimeId: string}>()
    const [selectedData, setSelectedData] = useState<number[]>([]);
    const { exportExcel, excelLoading } = useExcelExport();
    const exportExcelHandler = async () => await exportExcel(api_routes.crimesByCriminals + `/export/${param.crimeId}`, 'crimesByCriminals.xlsx');
    const [modal, setModal] = useState<CrimesByCriminalsListModalProps>({status: false, type: 'Create', crimeId: Number(param.crimeId)});
    const toggleModal = (value:CrimesByCriminalsListModalProps) => setModal(value);
    const [drawerStatus, setDrawerStatus] = useState<CrimesByCriminalsListDrawerProps>({drawerStatus: false});
    const toggleDrawer = (value:CrimesByCriminalsListDrawerProps) => setDrawerStatus(value);

    return (
        <div>
            <SearchButtonHeader hasButton={true} buttonText="Create" buttonClickHandler={() => toggleModal({status: true, type: 'Create', crimeId: Number(param.crimeId)})} hasExport={true} excelLoading={excelLoading} exportClickHandler={exportExcelHandler} hasImport={false} />
            <Paper shadow="sm" className={classes.paper_background}>
                <CrimesByCriminalsTable toggleModal={toggleModal} toggleDrawer={toggleDrawer} crimeId={Number(param.crimeId)} selectedData={selectedData} setSelectedData={setSelectedData} />
            </Paper>
            <CrimesByCriminalsModal {...modal} mainCrimeId={Number(param.crimeId)} toggleModal={toggleModal} />
            <CrimesByCriminalsDrawer {...drawerStatus} toggleDrawer={toggleDrawer} />
        </div>
    )
}

export default CrimesByCriminalsListPage;