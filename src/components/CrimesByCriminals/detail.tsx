import { FC } from "react"
import { Table } from '@mantine/core';
import { CrimesByCriminalsListDrawerProps } from "../../pages/crimes/crimesByCriminals";
import { useCrimesByCriminalQuery } from "../../hooks/data/crimesByCriminals";
import ErrorBoundary from "../Layout/ErrorBoundary";

const CrimesByCriminalDetail:FC<CrimesByCriminalsListDrawerProps> = (props) => {
  const {data, isFetching, isLoading, status, error, refetch} = useCrimesByCriminalQuery(props.drawerStatus ? props.id : 0, props.drawerStatus);
  return (
    <ErrorBoundary hasData={data ? true : false} isLoading={isLoading || isFetching} status={status} error={error} hasPagination={false} refetch={refetch}>
        {(data) && <Table.ScrollContainer minWidth={'100%'}>
            <Table verticalSpacing="sm" striped highlightOnHover withTableBorder>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Td>{data.criminal.name}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Sex</Table.Th>
                        <Table.Td>{data.criminal.sex}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Aadhar No</Table.Th>
                        <Table.Td>{data.criminal.aadhar_no}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Aliases</Table.Th>
                        <Table.Td>{data.aliases}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Age While Opening</Table.Th>
                        <Table.Td>{data.ageWhileOpening}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Crime Arrest Order</Table.Th>
                        <Table.Td>{data.crimeArrestOrder}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Crime ID</Table.Th>
                        <Table.Td>{data.crimeId}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Criminal ID</Table.Th>
                        <Table.Td>{data.criminalId}</Table.Td>
                    </Table.Tr>
                </Table.Thead>
            </Table>
        </Table.ScrollContainer>}
    </ErrorBoundary>
  );
}

export default CrimesByCriminalDetail