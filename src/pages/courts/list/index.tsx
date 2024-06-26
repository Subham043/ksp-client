import { Paper } from "@mantine/core";
import { FC, useState } from "react";
import classes from './courts.module.css';
import CourtsTable from "../../../components/Courts/table";
import CourtsModal from "../../../components/Courts/modal";
import SearchButtonHeader from "../../../components/Layout/SearchButtonHeader";
import { useExcelExport } from "../../../hooks/useExcelExport";
import { api_routes } from "../../../utils/api_routes";

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

    return (
        <div>
            <SearchButtonHeader hasButton={true} buttonText="Create" searchText="Search" buttonClickHandler={() => toggleModal({status: true, type: 'Create'})} hasExport={true} excelLoading={excelLoading} exportClickHandler={exportExcelHandler} hasImport={false} />
            <Paper shadow="sm" className={classes.paper_background}>
                <CourtsTable toggleModal={toggleModal} />
            </Paper>
            <CourtsModal {...modal} toggleModal={toggleModal} />
        </div>
    )
}

export default CourtsPage;