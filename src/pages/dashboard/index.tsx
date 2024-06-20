import { Button, Divider, Group, SimpleGrid, Text, TextInput, rem } from "@mantine/core";
import { FC } from "react";
import {
    IconBuildingBank,
    IconFilePercent,
    IconPrison,
    IconSearch,
    IconUsersMinus,
} from '@tabler/icons-react';
import Stat from "../../components/Dashboard/stat";
import Crimes from "../../components/Dashboard/crimes";
import { useSearchQueryParam } from "../../hooks/useSearchQueryParam";
import { useExcelExport } from "../../hooks/useExcelExport";
import { api_routes } from "../../utils/api_routes";
import { useDashboardQuery } from "../../hooks/data/dashboard";

const DashboardPage:FC = () => {
    const icon = <IconSearch style={{ width: rem(16), height: rem(16) }} />;
    const {searchHandler} = useSearchQueryParam();
    const { exportExcel, excelLoading } = useExcelExport();
    const exportExcelHandler = async () => await exportExcel(api_routes.crimes + '/export', 'crimes.xlsx');
    const {data, isLoading, isFetching} = useDashboardQuery();

    return (
        <div>
            <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>
                <Stat Icon={IconUsersMinus} title="Total Criminals" count={data ? data.criminals : 0} loading={isLoading || isFetching} />
                <Stat Icon={IconFilePercent} title="Total Crimes" count={data ? data.crimes : 0} loading={isLoading || isFetching} />
                <Stat Icon={IconBuildingBank} title="Total Court Cases" count={data ? data.courts : 0} loading={isLoading || isFetching} />
                <Stat Icon={IconPrison} title="Total Punishments" count={data ? data.punishments : 0} loading={isLoading || isFetching} />
            </SimpleGrid>
            <Divider mt="lg" mb="sm" size="lg" label={<Text color="main" fw={700}>Recent Crimes</Text>} labelPosition="center" />
            <Group justify={"space-between"} mb="sm">
                <TextInput
                    leftSectionPointerEvents="none"
                    leftSection={icon}
                    placeholder={"Search by Type_of_Crime/Section_of_law/MOB_file.no/HS.NO."}
                    onChange={(event) => searchHandler(event.target.value)}
                    w={'25%'}
                />
                <Button type='button' variant="filled" color='main' disabled={excelLoading} loading={excelLoading} onClick={exportExcelHandler}>
                    Export
                </Button>
            </Group>
            <Crimes />
        </div>
    )
}

export default DashboardPage;