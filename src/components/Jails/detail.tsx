import { FC } from "react"
import { Table, Group, Text, Button, SimpleGrid, Box } from '@mantine/core';
import { Link, useParams } from "react-router-dom";
import { JailsDetailModalProps } from "../../pages/jails/detail";
import { useJailQuery } from "../../hooks/data/jails";
import ErrorBoundary from "../Layout/ErrorBoundary";
import dayjs from "dayjs";
import { page_routes } from "../../utils/page_routes";
import VisitorsListPage from "../../pages/jails/visitors";

const JailDetail:FC<{toggleModal: (value: JailsDetailModalProps) => void}> = (props) => {
  const param = useParams<{punishmentId: string}>();
  const {data, isFetching, isLoading, status, error, refetch} = useJailQuery(Number(param.punishmentId), true);
  return (
    <ErrorBoundary hasData={data ? true : false} isLoading={isLoading || isFetching} status={status} error={error} hasPagination={false} refetch={refetch}>
        <Group justify="space-between" mb="lg" align="center">
            <Link to={`${page_routes.punishment.list}`}>
                <Button type='button' variant="filled" color='dark'>
                    Back
                </Button>
            </Link>
            <Button type='submit' variant="filled" color='main' onClick={() => props.toggleModal({status: true, type: 'Edit', id: Number(param.punishmentId)})}>
                Edit
            </Button>
        </Group>
        <div>
            {(data) && <>
                <Table.ScrollContainer minWidth={800}>
                    <Table verticalSpacing="sm" striped highlightOnHover withTableBorder>
                        <Table.Thead bg="main">
                            <Table.Tr>
                                <Table.Th style={{color: 'white'}}>Jail ID</Table.Th>
                                <Table.Th style={{color: 'white'}}>Names</Table.Th>
                                <Table.Th style={{color: 'white'}}>Police Station</Table.Th>
                                <Table.Th style={{color: 'white'}}>Type of Crime</Table.Th>
                                <Table.Th style={{color: 'white'}}>Section Of Law</Table.Th>
                                <Table.Th style={{color: 'white'}}>Jail Entry Date</Table.Th>
                                <Table.Th style={{color: 'white'}}>Jail Release Date</Table.Th>
                                <Table.Th style={{color: 'white'}}>Created On</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            <Table.Tr>
                                <Table.Td>{data.id}</Table.Td>
                                <Table.Td>{data.accused?.name}</Table.Td>
                                <Table.Td>{data.policeStation}</Table.Td>
                                <Table.Td>{data.crime?.typeOfCrime}</Table.Td>
                                <Table.Td>{data.lawSection}</Table.Td>
                                <Table.Td><Text color="blue" fw={800}>{data.jailEntryDate && dayjs(data.jailEntryDate.toString()).locale(Intl.DateTimeFormat().resolvedOptions().locale).format('DD MMM YYYY')}</Text></Table.Td>
                                <Table.Td><Text color="purple" fw={800}>{data.jailReleaseDate && dayjs(data.jailReleaseDate.toString()).locale(Intl.DateTimeFormat().resolvedOptions().locale).format('DD MMM YYYY')}</Text></Table.Td>
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
                    <Text size="lg" fw={700} p="sm" bg="main" color="white">Jail Detail</Text>
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
                                    <Table.Th>UTP No.</Table.Th>
                                    <Table.Td>{data.utpNo}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Ward</Table.Th>
                                    <Table.Td>{data.ward}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Barrack</Table.Th>
                                    <Table.Td>{data.barrack}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Register No</Table.Th>
                                    <Table.Td>{data.registerNo}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>First Admission Date</Table.Th>
                                    <Table.Td>{data.firstAdmissionDate && dayjs(data.firstAdmissionDate.toString()).locale(Intl.DateTimeFormat().resolvedOptions().locale).format('DD MMM YYYY')}</Table.Td>
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
                                    <Table.Th>Jail Name</Table.Th>
                                    <Table.Td>{data.jailName}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Jail Id</Table.Th>
                                    <Table.Td>{data.jailId}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Prisoner Id</Table.Th>
                                    <Table.Td>{data.prisonerId}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Prisoner Type</Table.Th>
                                    <Table.Td>{data.prisonerType}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Period Undergone</Table.Th>
                                    <Table.Td>{data.periodUndergone}</Table.Td>
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
                <Text size="xl" fw={700} p="sm" >Visitors</Text>
            </div>
            <VisitorsListPage />
        </Box>
    </ErrorBoundary>
  );
}

export default JailDetail