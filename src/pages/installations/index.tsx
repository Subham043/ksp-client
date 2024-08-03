import { Paper } from "@mantine/core";
import { FC } from "react";
import classes from './installations.module.css';
import InstallationTable from "../../components/Installations/table";
import SearchButtonHeader from "../../components/Layout/SearchButtonHeader";
import { api_routes } from "../../utils/api_routes";
import { useExcelExport } from "../../hooks/useExcelExport";

const InstallationsPage:FC = () => {
    const { exportExcel, excelLoading } = useExcelExport();
    const exportExcelHandler = async () => await exportExcel(api_routes.installations + '/export', 'installations.xlsx');

    return (
        <div>
            <SearchButtonHeader hasButton={false} hasExport={true} excelLoading={excelLoading} exportClickHandler={exportExcelHandler} hasSearch={true} hasImport={false} />
            <Paper shadow="sm" className={classes.paper_background}>
                <InstallationTable />
            </Paper>
        </div>
    )
}

export default InstallationsPage;