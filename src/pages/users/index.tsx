import { Paper } from "@mantine/core";
import { FC, useState } from "react";
import classes from './users.module.css';
import UserTable from "../../components/Users/table";
import UserDrawer from "../../components/Users/drawer";
import SearchButtonHeader from "../../components/Layout/SearchButtonHeader";
import { api_routes } from "../../utils/api_routes";
import { useExcelExport } from "../../hooks/useExcelExport";
import ExcelUploadModal from "../../components/Layout/ExcelUploadModal";
import UserPasswordForm from "../../components/Users/passwordForm";

export type UserDrawerProps = {
    status: boolean;
    type: "Create",
} | {
    status: boolean;
    type: "Edit";
    id: number;
}

export type UserPasswordFormProps = {
    status: false;
} | {
    status: true;
    id: number;
};

const UsersPage:FC = () => {
    const { exportExcel, excelLoading } = useExcelExport();
    const [drawer, setDrawer] = useState<UserDrawerProps>({status: false, type: 'Create'});
    const toggleDrawer = (value:UserDrawerProps) => setDrawer(value);
    const [passwordDrawer, setPasswordDrawer] = useState<UserPasswordFormProps>({status: false});
    const togglePasswordDrawer = (value:UserPasswordFormProps) => setPasswordDrawer(value);
    const [excelModal, setExcelModal] = useState<boolean>(false);
    const toggleExcelModal = () => setExcelModal(prev => !prev);
    const exportExcelHandler = async () => await exportExcel(api_routes.users + '/export', 'users.xlsx');

    return (
        <div>
            <SearchButtonHeader hasButton={true} hasExport={true} excelLoading={excelLoading} exportClickHandler={exportExcelHandler} hasSearch={true} buttonText="Create" buttonClickHandler={() => toggleDrawer({status: true, type: 'Create'})} hasImport={true} importClickHandler={toggleExcelModal} />
            <Paper shadow="sm" className={classes.paper_background}>
                <UserTable toggleDrawer={toggleDrawer} togglePasswordDrawer={togglePasswordDrawer} />
            </Paper>
            <UserDrawer {...drawer} toggleDrawer={toggleDrawer} />
            <UserPasswordForm {...passwordDrawer} toggleDrawer={togglePasswordDrawer} />
            <ExcelUploadModal status={excelModal} toggleModal={toggleExcelModal} title="Users" uploadUrl={`${api_routes.users}/import`} sampleExcel="Sample_Users.xlsx" />
        </div>
    )
}

export default UsersPage;