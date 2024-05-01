import { FC } from "react"
import { Table, Group, Text, Button, SimpleGrid, Image, Center } from '@mantine/core';
import { useParams } from "react-router-dom";
import { CriminalsDetailModalProps } from "../../pages/criminals/detail";
import { useCriminalQuery } from "../../hooks/data/criminals";
import ErrorBoundary from "../Layout/ErrorBoundary";
import dayjs from "dayjs";
import { env } from "../../utils/env";
import { api_routes } from "../../utils/api_routes";

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
        <div>
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
        </div>
        <SimpleGrid cols={{ base: 1, sm: 2 }} mb="sm">
            <div>
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
                            </Table.Thead>
                        </Table>
                    </Table.ScrollContainer>
                </>}
            </div>
            <div>
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
                                    <Table.Th>Present Address</Table.Th>
                                    <Table.Td>{data.present_address}</Table.Td>
                                </Table.Tr>
                            </Table.Thead>
                        </Table>
                    </Table.ScrollContainer>
                </>}
            </div>
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <div style={{ border: '1px solid #dee2e6'}}>
                <div style={{textAlign: 'center'}}>
                    <Text size="lg" fw={700} p="sm" bg="main" color="white">Personal Photo</Text>
                </div>
                {(data) && <>
                    <Center>
                    {data.photo ? 
                        <Image
                            radius="md"
                            h={350}
                            w={350}
                            fit="contain"
                            src={`${env.API_ENDPOINT}${api_routes.upload.images}/${data.photo}`}
                        /> : null}
                    </Center>
                </>}
            </div>
            <div style={{ border: '1px solid #dee2e6'}}>
                <div style={{textAlign: 'center'}}>
                    <Text size="lg" fw={700} p="sm" bg="main" color="white">Aadhar Photo</Text>
                </div>
                {(data) && <>
                    <Center py={10}>
                        {data.aadhar_photo ? <Image
                            radius="md"
                            h={350}
                            w={350}
                            fit="contain"
                            src={`${env.API_ENDPOINT}${api_routes.upload.images}/${data.aadhar_photo}`}
                        /> : null}
                    </Center>
                </>}
            </div>
        </SimpleGrid>
    </ErrorBoundary>
  );
}

export default CriminalDetail