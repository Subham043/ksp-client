import { FC } from "react"
import { Table, Group, Text, Button, SimpleGrid, Box } from '@mantine/core';
import { Link, useParams } from "react-router-dom";
import { CourtsDetailModalProps } from "../../pages/courts/detail";
import { useCourtQuery } from "../../hooks/data/courts";
import ErrorBoundary from "../Layout/ErrorBoundary";
import dayjs from "dayjs";
import { page_routes } from "../../utils/page_routes";
import HearingsListPage from "../../pages/courts/hearings";

const CourtDetail:FC<{toggleModal: (value: CourtsDetailModalProps) => void}> = (props) => {
  const param = useParams<{courtDetailId: string}>();
  const {data, isFetching, isLoading, status, error, refetch} = useCourtQuery(Number(param.courtDetailId), true);
  return (
    <ErrorBoundary hasData={data ? true : false} isLoading={isLoading || isFetching} status={status} error={error} hasPagination={false} refetch={refetch}>
        <Group justify="space-between" mb="lg" align="center">
            <Link to={`${page_routes.court_details.list}`}>
                <Button type='button' variant="filled" color='dark'>
                    Back
                </Button>
            </Link>
            <Button type='submit' variant="filled" color='main' onClick={() => props.toggleModal({status: true, type: 'Edit', id: Number(param.courtDetailId)})}>
                Edit
            </Button>
        </Group>
        <div>
            {(data) && <>
                <Table.ScrollContainer minWidth={800}>
                    <Table verticalSpacing="sm" striped highlightOnHover withTableBorder>
                        <Table.Thead bg="main">
                            <Table.Tr>
                                <Table.Th style={{color: 'white'}}>Court ID</Table.Th>
                                <Table.Th style={{color: 'white'}}>Names</Table.Th>
                                <Table.Th style={{color: 'white'}}>Court Name</Table.Th>
                                <Table.Th style={{color: 'white'}}>Type of Crime</Table.Th>
                                <Table.Th style={{color: 'white'}}>Section Of Law</Table.Th>
                                <Table.Th style={{color: 'white'}}>Fir no.</Table.Th>
                                <Table.Th style={{color: 'white'}}>Created On</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            <Table.Tr>
                                <Table.Td>{data.id}</Table.Td>
                                <Table.Td>{data.accused?.name}</Table.Td>
                                <Table.Td>{data.courtName}</Table.Td>
                                <Table.Td>{data.crime?.typeOfCrime}</Table.Td>
                                <Table.Td>{data.crime?.sectionOfLaw}</Table.Td>
                                <Table.Td>{data.firNo}</Table.Td>
                                <Table.Td>{data.createdAt && dayjs(data.createdAt.toString()).locale(Intl.DateTimeFormat().resolvedOptions().locale).format('DD MMM YYYY hh:mm a')}</Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                </Table.ScrollContainer>
            </>}
        </div>
        <SimpleGrid cols={{ base: 1, sm: 2 }} mb="sm">
            <div>
                <div style={{textAlign: 'center'}}>
                    <Text size="lg" fw={700} p="sm" bg="main" color="white">Court Detail</Text>
                </div>
                {(data) && <>
                    <Table.ScrollContainer minWidth={'100%'}>
                        <Table verticalSpacing="sm" striped highlightOnHover withTableBorder>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>M.O.B. File No</Table.Th>
                                    <Table.Td>{data.crime?.mobFileNo}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>HS. No.</Table.Th>
                                    <Table.Td>{data.crime?.hsNo}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>CC/SC No.</Table.Th>
                                    <Table.Td>{data.ccScNo}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Lawyer Name</Table.Th>
                                    <Table.Td>{data.lawyerName}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Lawyer Contact</Table.Th>
                                    <Table.Td>{data.lawyerContact}</Table.Td>
                                </Table.Tr>
                            </Table.Thead>
                        </Table>
                    </Table.ScrollContainer>
                </>}
            </div>
            <div>
                <div style={{textAlign: 'center'}}>
                        <Text size="lg" fw={700} p="sm" bg="main" color="white">Other Details</Text>
                    </div>
                {(data) && <>
                    <Table.ScrollContainer minWidth={'100%'}>
                        <Table verticalSpacing="sm" striped highlightOnHover withTableBorder>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>PS Name</Table.Th>
                                    <Table.Td>{data.psName}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Surety Provider Detail</Table.Th>
                                    <Table.Td>{data.suretyProviderDetail}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Surety Provider Contact</Table.Th>
                                    <Table.Td>{data.suretyProviderContact}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Stage Of Case</Table.Th>
                                    <Table.Td>{data.stageOfCase}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Additional Remarks</Table.Th>
                                    <Table.Td>{data.additionalRemarks}</Table.Td>
                                </Table.Tr>
                            </Table.Thead>
                        </Table>
                    </Table.ScrollContainer>
                </>}
            </div>
        </SimpleGrid>
        <Box bg="transparent" mt="md">
            <div style={{textAlign: 'center'}}>
                <Text size="xl" fw={700} p="sm" >Hearings</Text>
            </div>
            <HearingsListPage />
        </Box>
    </ErrorBoundary>
  );
}

export default CourtDetail