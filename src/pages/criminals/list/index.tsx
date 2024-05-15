import { Paper } from "@mantine/core";
import { FC, useState } from "react";
import classes from './criminals.module.css';
import CriminalsTable from "../../../components/Criminals/table";
import CriminalsModal from "../../../components/Criminals/modal";
import SearchButtonHeader from "../../../components/Layout/SearchButtonHeader";
import { useExcelExport } from "../../../hooks/useExcelExport";
import { api_routes } from "../../../utils/api_routes";

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

    return (
        <div>
            <SearchButtonHeader hasButton={true} buttonText="Create" searchText="Search by Name/Aadhar no" buttonClickHandler={() => toggleModal({status: true, type: 'Create'})} hasExport={true} excelLoading={excelLoading} exportClickHandler={exportExcelHandler} hasImport={false} />
            <Paper shadow="sm" className={classes.paper_background}>
                <CriminalsTable toggleModal={toggleModal} />
            </Paper>
            <CriminalsModal {...modal} toggleModal={toggleModal} />
        </div>
    )
}

export default CriminalsPage;