import { Paper } from "@mantine/core";
import { FC, useState } from "react";
import classes from './criminals.module.css';
import CriminalsTable from "../../../components/Criminals/table";
import CriminalsModal from "../../../components/Criminals/modal";
import SearchButtonHeader from "../../../components/Layout/SearchButtonHeader";
import { useExcelExport } from "../../../hooks/useExcelExport";
import { api_routes } from "../../../utils/api_routes";
import ExcelUploadModal from "../../../components/Layout/ExcelUploadModal";

export type CriminalsModalProps = {
    status: boolean;
    type: "Create",
} | {
    status: boolean;
    type: "Edit";
    id: number;
}

const CriminalsPage:FC = () => {
    const { exportExcel, excelLoading } = useExcelExport();
    const [modal, setModal] = useState<CriminalsModalProps>({status: false, type: 'Create'});
    const toggleModal = (value:CriminalsModalProps) => setModal(value);
    const exportExcelHandler = async () => await exportExcel(api_routes.criminals + '/export', 'criminals.xlsx');
    const [excelModal, setExcelModal] = useState<boolean>(false);
    const toggleExcelModal = () => setExcelModal(prev => !prev);

    return (
        <div>
            <SearchButtonHeader hasButton={true} buttonText="Create" searchText="Search by Name/Aadhar no" buttonClickHandler={() => toggleModal({status: true, type: 'Create'})} hasExport={true} excelLoading={excelLoading} exportClickHandler={exportExcelHandler} hasImport={true} importClickHandler={toggleExcelModal} />
            <Paper shadow="sm" className={classes.paper_background}>
                <CriminalsTable toggleModal={toggleModal} />
            </Paper>
            <CriminalsModal {...modal} toggleModal={toggleModal} />
            <ExcelUploadModal status={excelModal} toggleModal={toggleExcelModal} title="Criminals" uploadUrl={`${api_routes.criminals}/import`} sampleExcel="Sample_Criminals.xlsx" />
        </div>
    )
}

export default CriminalsPage;