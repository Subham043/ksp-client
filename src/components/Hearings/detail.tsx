import { FC } from "react"
import { Table } from '@mantine/core';
import { HearingsListDrawerProps } from "../../pages/courts/hearings";
import { useHearingQuery } from "../../hooks/data/hearings";
import ErrorBoundary from "../Layout/ErrorBoundary";
import dayjs from "dayjs";

const HearingDetail:FC<HearingsListDrawerProps> = (props) => {
  const {data, isFetching, isLoading, status, error, refetch} = useHearingQuery(props.drawerStatus ? props.id : 0, props.drawerStatus);
  return (
    <ErrorBoundary hasData={data ? true : false} isLoading={isLoading || isFetching} status={status} error={error} hasPagination={false} refetch={refetch}>
        {(data) && <Table.ScrollContainer minWidth={'100%'}>
            <Table verticalSpacing="sm" striped highlightOnHover withTableBorder>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Judge Name</Table.Th>
                        <Table.Td>{data.judgeName}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Action Code</Table.Th>
                        <Table.Td>{data.actionCode}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Attendance</Table.Th>
                        <Table.Td>{data.attendance}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Hearing Date</Table.Th>
                        <Table.Td>{data.hearingDate && dayjs(data.hearingDate?.toString()).locale(Intl.DateTimeFormat().resolvedOptions().locale).format('DD MMM YYYY')}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Next Hearing Date</Table.Th>
                        <Table.Td>{data.nextHearingDate && dayjs(data.nextHearingDate?.toString()).locale(Intl.DateTimeFormat().resolvedOptions().locale).format('DD MMM YYYY')}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Additional Remarks</Table.Th>
                        <Table.Td>{data.additionalRemarks}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Court ID</Table.Th>
                        <Table.Td>{data.courtId}</Table.Td>
                    </Table.Tr>
                </Table.Thead>
            </Table>
        </Table.ScrollContainer>}
    </ErrorBoundary>
  );
}

export default HearingDetail