import { Paper } from "@mantine/core";
import { FC, useState } from "react";
import classes from './crimes.module.css';
import CrimesTable from "../../../components/Crimes/table";
import CrimesModal from "../../../components/Crimes/modal";
import SearchButtonHeader from "../../../components/Layout/SearchButtonHeader";
import { useExcelExport } from "../../../hooks/useExcelExport";
import { api_routes } from "../../../utils/api_routes";

export type CrimesModalProps = {
    status: boolean;
    type: "Create",
} | {
    status: boolean;
    type: "Edit";
    id: number;
}

const CrimesPage:FC = () => {
    const { exportExcel, excelLoading } = useExcelExport();
    const [modal, setModal] = useState<CrimesModalProps>({status: false, type: 'Create'});
    const toggleModal = (value:CrimesModalProps) => setModal(value);
    const exportExcelHandler = async () => await exportExcel(api_routes.crimes + '/export', 'crimes.xlsx');

    return (
        <div>
            <SearchButtonHeader hasButton={true} buttonText="Create" searchText="Search by Type_of_Crime/Section_of_law/MOB_file.no/HS.NO." buttonClickHandler={() => toggleModal({status: true, type: 'Create'})} hasExport={true} excelLoading={excelLoading} exportClickHandler={exportExcelHandler} hasImport={false} />
            <Paper shadow="sm" className={classes.paper_background}>
                <CrimesTable toggleModal={toggleModal} />
            </Paper>
            <CrimesModal {...modal} toggleModal={toggleModal} />
        </div>
    )
}

export default CrimesPage;