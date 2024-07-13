import { Paper } from "@mantine/core";
import { FC, useState } from "react";
import classes from './courts.module.css';
import CourtsTable from "../../../components/Courts/table";
import CourtsModal from "../../../components/Courts/modal";
import SearchButtonHeader from "../../../components/Layout/SearchButtonHeader";
import { useExcelExport } from "../../../hooks/useExcelExport";
import { api_routes } from "../../../utils/api_routes";
import ExcelUploadModal from "../../../components/Layout/ExcelUploadModal";

export type CourtsModalProps = {
    status: boolean;
    type: "Create",
} | {
    status: boolean;
    type: "Edit";
    id: number;
}

const CourtsPage:FC = () => {
    const { exportExcel, excelLoading } = useExcelExport();
    const [modal, setModal] = useState<CourtsModalProps>({status: false, type: 'Create'});
    const toggleModal = (value:CourtsModalProps) => setModal(value);
    const exportExcelHandler = async () => await exportExcel(api_routes.courts + '/export', 'courts.xlsx');
    const [excelModal, setExcelModal] = useState<boolean>(false);
    const toggleExcelModal = () => setExcelModal(prev => !prev);

    return (
        <div>
            <SearchButtonHeader hasButton={true} buttonText="Create" searchText="Search" buttonClickHandler={() => toggleModal({status: true, type: 'Create'})} hasExport={true} excelLoading={excelLoading} exportClickHandler={exportExcelHandler} hasImport={true} importClickHandler={toggleExcelModal} />
            <Paper shadow="sm" className={classes.paper_background}>
                <CourtsTable toggleModal={toggleModal} />
            </Paper>
            <CourtsModal {...modal} toggleModal={toggleModal} />
            <ExcelUploadModal status={excelModal} toggleModal={toggleExcelModal} title="Court Details" uploadUrl={`${api_routes.courts}/import`} sampleUrl="/Sample_Courts.xlsx" />
        </div>
    )
}

export default CourtsPage;