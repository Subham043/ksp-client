import { FC } from "react"
import { Table, Group, Text, Box, Button, Paper, SimpleGrid } from '@mantine/core';
import { useParams } from "react-router-dom";
import { CriminalsDetailModalProps } from "../../pages/criminals/detail";
import classes from '../../pages/criminals/detail/criminals.module.css'
import { useCriminalQuery } from "../../hooks/data/criminals";
import ErrorBoundary from "../Layout/ErrorBoundary";
import dayjs from "dayjs";

const CriminalDetail:FC<{toggleModal: (value: CriminalsDetailModalProps) => void}> = (props) => {
  const param = useParams<{criminalId: string}>();
  const {data, isFetching, isLoading, status, error, refetch} = useCriminalQuery(Number(param.criminalId), true);
  return (
    <ErrorBoundary hasData={data ? true : false} isLoading={isLoading || isFetching} status={status} error={error} hasPagination={false} refetch={refetch}>
        <Group justify="flex-end" mb="lg" align="center">
            <Button type='submit' variant="filled" color='main' onClick={() => props.toggleModal({status: true, type: 'Edit', id: Number(param.criminalId)})}>
                Edit
            </Button>
        </Group>
        <Box pos="relative" mb="sm">
            <Paper shadow="sm" className={classes.paper_background}>
                {(data) && <>
                    <Table.ScrollContainer minWidth={800}>
                        <Table verticalSpacing="sm" striped highlightOnHover withTableBorder>
                            <Table.Thead bg="main">
                                <Table.Tr>
                                    <Table.Th style={{color: 'white'}}>Name</Table.Th>
                                    <Table.Th style={{color: 'white'}}>Sex</Table.Th>
                                    <Table.Th style={{color: 'white'}}>Aadhar Number</Table.Th>
                                    <Table.Th style={{color: 'white'}}>Relation Name</Table.Th>
                                    <Table.Th style={{color: 'white'}}>Relation Type</Table.Th>
                                    <Table.Th style={{color: 'white'}}>Created On</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                <Table.Tr>
                                    <Table.Td>{data.name}</Table.Td>
                                    <Table.Td>{data.sex}</Table.Td>
                                    <Table.Td>{data.aadhar_no}</Table.Td>
                                    <Table.Td>{data.relation_name}</Table.Td>
                                    <Table.Td>{data.relation_type}</Table.Td>
                                    <Table.Td>{dayjs(data.createdAt.toString()).locale(Intl.DateTimeFormat().resolvedOptions().locale).format('DD MMM YYYY hh:mm a')}</Table.Td>
                                </Table.Tr>
                            </Table.Tbody>
                        </Table>
                    </Table.ScrollContainer>
                </>}
            </Paper>
        </Box>
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <Box pos="relative" className={classes.paper_background}>
                <Paper shadow="sm" className={classes.paper_background}>
                    <div style={{textAlign: 'center'}}>
                        <Text size="lg" fw={700} p="sm" bg="main" color="white">Personal Information</Text>
                    </div>
                    {(data) && <>
                        <Table.ScrollContainer minWidth={'100%'}>
                            <Table verticalSpacing="sm" striped highlightOnHover withTableBorder>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>Phone</Table.Th>
                                        <Table.Td>{data.phone}</Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Th>Caste</Table.Th>
                                        <Table.Td>{data.caste}</Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Th>Occupation</Table.Th>
                                        <Table.Td>{data.occupation}</Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Th>Educational Qualification</Table.Th>
                                        <Table.Td>{data.educational_qualification}</Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Th>Permenant Address</Table.Th>
                                        <Table.Td>{data.permanent_address}</Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Th>Present Address</Table.Th>
                                        <Table.Td>{data.present_address}</Table.Td>
                                    </Table.Tr>
                                </Table.Thead>
                            </Table>
                        </Table.ScrollContainer>
                    </>}
                </Paper>
            </Box>
            <Box pos="relative">
                <Paper shadow="sm" className={classes.paper_background}>
                    <div style={{textAlign: 'center'}}>
                        <Text size="lg" fw={700} p="sm" bg="main" color="white">Other Information</Text>
                    </div>
                    {(data) && <>
                        <Table.ScrollContainer minWidth={'100%'}>
                            <Table verticalSpacing="sm" striped highlightOnHover withTableBorder>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>FPB Sl.No</Table.Th>
                                        <Table.Td>{data.fpb_sl_no}</Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Th>FPB Classn.No</Table.Th>
                                        <Table.Td>{data.fpb_classn_no}</Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Th>Native PS</Table.Th>
                                        <Table.Td>{data.native_ps}</Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Th>Native District</Table.Th>
                                        <Table.Td>{data.native_district}</Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Th>Aadhar Photo</Table.Th>
                                        <Table.Td>{data.aadhar_photo}</Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Th>Photo</Table.Th>
                                        <Table.Td>{data.photo}</Table.Td>
                                    </Table.Tr>
                                </Table.Thead>
                            </Table>
                        </Table.ScrollContainer>
                    </>}
                </Paper>
            </Box>
        </SimpleGrid>
    </ErrorBoundary>
  );
}

export default CriminalDetail