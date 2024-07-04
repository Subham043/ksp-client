import { FC } from "react"
import { Table } from '@mantine/core';
import { VisitorsListDrawerProps } from "../../pages/jails/visitors";
import { useVisitorQuery } from "../../hooks/data/visitors";
import ErrorBoundary from "../Layout/ErrorBoundary";
import dayjs from "dayjs";

const VisitorDetail:FC<VisitorsListDrawerProps> = (props) => {
  const {data, isFetching, isLoading, status, error, refetch} = useVisitorQuery(props.drawerStatus ? props.id : 0, props.drawerStatus);
  return (
    <ErrorBoundary hasData={data ? true : false} isLoading={isLoading || isFetching} status={status} error={error} hasPagination={false} refetch={refetch}>
        {(data) && <Table.ScrollContainer minWidth={'100%'}>
            <Table verticalSpacing="sm" striped highlightOnHover withTableBorder>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Td>{data.name}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Relation</Table.Th>
                        <Table.Td>{data.relation}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Visiting Date</Table.Th>
                        <Table.Td>{data.visitonDate && dayjs(data.visitonDate?.toString()).locale(Intl.DateTimeFormat().resolvedOptions().locale).format('DD MMM YYYY')}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Additional Remarks</Table.Th>
                        <Table.Td>{data.additionalRemarks}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Jail ID</Table.Th>
                        <Table.Td>{data.jailId}</Table.Td>
                    </Table.Tr>
                </Table.Thead>
            </Table>
        </Table.ScrollContainer>}
    </ErrorBoundary>
  );
}

export default VisitorDetail