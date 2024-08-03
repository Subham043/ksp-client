import { FC } from "react"
import { Table, Text } from '@mantine/core';
import { InstallationQueryType } from "../../utils/types";
import dayjs from 'dayjs';
import { useInstallationsQuery } from "../../hooks/data/installations";
import ErrorBoundary from "../Layout/ErrorBoundary";

const InstallationTableRow:FC<InstallationQueryType> = ({id, IPv4, createdAt}) => {
  return (
    <Table.Tr>
      <Table.Td>
        <Text fz="sm" fw={500}>
          {id}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text fz="sm" fw={500}>
          {IPv4}
        </Text>
      </Table.Td>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {dayjs(createdAt.toString()).locale(Intl.DateTimeFormat().resolvedOptions().locale).format('DD MMM YYYY hh:mm a')}
          </Text>
      </Table.Td>
    </Table.Tr>
  )
}

const InstallationTable:FC = () => {
  const {data:installations, isFetching, isLoading, status, error, refetch} = useInstallationsQuery();
  
  return (
    <>
      <ErrorBoundary hasData={installations ? installations.installation.length>0 : false} isLoading={isLoading || isFetching} status={status} error={error} hasPagination={true} current_page={installations?.current_page} last_page={installations?.last_page} refetch={refetch}>
        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="sm" striped highlightOnHover withTableBorder>
            <Table.Thead bg="main">
              <Table.Tr>
                <Table.Th style={{color: 'white'}}>ID</Table.Th>
                <Table.Th style={{color: 'white'}}>IPv4</Table.Th>
                <Table.Th style={{color: 'white'}}>Created On</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{
              (installations ? installations.installation : []).map((item) => <InstallationTableRow key={item.id} {...item} />)
            }</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </ErrorBoundary>
    </>
  );
}

export default InstallationTable