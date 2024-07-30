import { Paper } from "@mantine/core";
import { FC, useState } from "react";
import classes from './jails.module.css';
import JailsTable from "../../../components/Jails/table";
import JailsModal from "../../../components/Jails/modal";
import SearchButtonHeader from "../../../components/Layout/SearchButtonHeader";
import { useExcelExport } from "../../../hooks/useExcelExport";
import { api_routes } from "../../../utils/api_routes";
import ExcelUploadModal from "../../../components/Layout/ExcelUploadModal";

export type JailsModalProps = {
    status: boolean;
    type: "Create",
} | {
    status: boolean;
    type: "Edit";
    id: number;
}

const JailsPage:FC = () => {
    const { exportExcel, excelLoading } = useExcelExport();
    const [modal, setModal] = useState<JailsModalProps>({status: false, type: 'Create'});
    const toggleModal = (value:JailsModalProps) => setModal(value);
    const exportExcelHandler = async () => await exportExcel(api_routes.jails + '/export', 'jails.xlsx');
    const [excelModal, setExcelModal] = useState<boolean>(false);
    const toggleExcelModal = () => setExcelModal(prev => !prev);

    return (
        <div>
            <SearchButtonHeader hasButton={true} buttonText="Create" searchText="Search" buttonClickHandler={() => toggleModal({status: true, type: 'Create'})} hasExport={true} excelLoading={excelLoading} exportClickHandler={exportExcelHandler} hasImport={true} importClickHandler={toggleExcelModal} />
            <Paper shadow="sm" className={classes.paper_background}>
                <JailsTable toggleModal={toggleModal} />
            </Paper>
            <JailsModal {...modal} toggleModal={toggleModal} />
            <ExcelUploadModal status={excelModal} toggleModal={toggleExcelModal} title="Jail Details" uploadUrl={`${api_routes.jails}/import`} sampleExcel="Sample_Jails.xlsx" />
        </div>
    )
}

export default JailsPage;