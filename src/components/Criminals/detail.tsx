import { FC } from "react"
import { Table, Group, Text, Button, SimpleGrid, Image, Center } from '@mantine/core';
import { Link, useParams } from "react-router-dom";
import { CriminalsDetailModalProps } from "../../pages/criminals/detail";
import { useCriminalQuery } from "../../hooks/data/criminals";
import ErrorBoundary from "../Layout/ErrorBoundary";
import dayjs from "dayjs";
import { env } from "../../utils/env";
import { api_routes } from "../../utils/api_routes";
import { useUser } from "../../hooks/useUser";
import { page_routes } from "../../utils/page_routes";

const CriminalDetail:FC<{toggleModal: (value: CriminalsDetailModalProps) => void}> = (props) => {
  const param = useParams<{criminalId: string}>();
  const { user } = useUser();
  const {data, isFetching, isLoading, status, error, refetch} = useCriminalQuery(Number(param.criminalId), true);
  return (
    <ErrorBoundary hasData={data ? true : false} isLoading={isLoading || isFetching} status={status} error={error} hasPagination={false} refetch={refetch}>
        <Group justify="space-between" mb="lg" align="center">
            <Link to={`${page_routes.criminals.list}`}>
                <Button type='button' variant="filled" color='dark'>
                    Back
                </Button>
            </Link>
            <Button type='button' variant="filled" color='main' onClick={() => props.toggleModal({status: true, type: 'Edit', id: Number(param.criminalId)})}>
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
                                    <Table.Th>Dress Used</Table.Th>
                                    <Table.Td>{data.dressUsed}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Voice / Speech</Table.Th>
                                    <Table.Td>{data.voice}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Build</Table.Th>
                                    <Table.Td>{data.build}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Complexion</Table.Th>
                                    <Table.Td>{data.complexion}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Teeth</Table.Th>
                                    <Table.Td>{data.teeth}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Hair</Table.Th>
                                    <Table.Td>{data.hair}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Eyes</Table.Th>
                                    <Table.Td>{data.eyes}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Habits And Vices</Table.Th>
                                    <Table.Td>{data.habbits}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Burn Marks</Table.Th>
                                    <Table.Td>{data.burnMarks}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Tattoo</Table.Th>
                                    <Table.Td>{data.tattoo}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Mole</Table.Th>
                                    <Table.Td>{data.mole}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Scar</Table.Th>
                                    <Table.Td>{data.scar}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Leucoderma</Table.Th>
                                    <Table.Td>{data.leucoderma}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Face/Head</Table.Th>
                                    <Table.Td>{data.faceHead}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Other parts of body</Table.Th>
                                    <Table.Td>{data.otherPartsBody}</Table.Td>
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
                                    <Table.Th>DOB</Table.Th>
                                    <Table.Td>{data.dob && dayjs(data.dob.toString()).locale(Intl.DateTimeFormat().resolvedOptions().locale).format('DD MMM YYYY')}</Table.Td>
                                </Table.Tr>
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
                                    <Table.Th>Permenant Address</Table.Th>
                                    <Table.Td>{data.permanent_address}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Present Address</Table.Th>
                                    <Table.Td>{data.present_address}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Beard</Table.Th>
                                    <Table.Td>{data.beard}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Face</Table.Th>
                                    <Table.Td>{data.face}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Moustaches</Table.Th>
                                    <Table.Td>{data.moustache}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Nose</Table.Th>
                                    <Table.Td>{data.nose}</Table.Td>
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
                            src={`${env.API_ENDPOINT}${api_routes.upload.images}/${data.photo}?token=${user?.access_token}`}
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
                            src={`${env.API_ENDPOINT}${api_routes.upload.images}/${data.aadhar_photo}?token=${user?.access_token}`}
                        /> : null}
                    </Center>
                </>}
            </div>
        </SimpleGrid>
    </ErrorBoundary>
  );
}

export default CriminalDetail