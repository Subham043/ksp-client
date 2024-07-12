import { FC } from "react"
import { Center, Image, SimpleGrid, Table, Text } from '@mantine/core';
import { CrimesByCriminalsListDrawerProps } from "../../pages/crimes/crimesByCriminals";
import { useCrimesByCriminalQuery } from "../../hooks/data/crimesByCriminals";
import ErrorBoundary from "../Layout/ErrorBoundary";
import { env } from "../../utils/env";
import { api_routes } from "../../utils/api_routes";
import { useUser } from "../../hooks/useUser";

const CrimesByCriminalDetail:FC<CrimesByCriminalsListDrawerProps> = (props) => {
  const {user} = useUser();
  const {data, isFetching, isLoading, status, error, refetch} = useCrimesByCriminalQuery(props.drawerStatus ? props.id : 0, props.drawerStatus);
  return (
    <ErrorBoundary hasData={data ? true : false} isLoading={isLoading || isFetching} status={status} error={error} hasPagination={false} refetch={refetch}>
        {(data) && <>
            <Table.ScrollContainer minWidth={'100%'}>
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
            </Table.ScrollContainer>
            <SimpleGrid cols={{ base: 1, sm: 1 }}>
                <div style={{ border: '1px solid #dee2e6'}}>
                    <div style={{textAlign: 'center'}}>
                        <Text size="lg" fw={700} p="sm" bg="main" color="white">Personal Photo</Text>
                    </div>
                    {(data) && <>
                        <Center>
                        {data.criminal.photo ? 
                            <Image
                                radius="md"
                                h={350}
                                w={350}
                                fit="contain"
                                src={`${env.API_ENDPOINT}${api_routes.upload.images}/${data.criminal.photo}?token=${user?.access_token}`}
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
                            {data.criminal.aadhar_photo ? <Image
                                radius="md"
                                h={350}
                                w={350}
                                fit="contain"
                                src={`${env.API_ENDPOINT}${api_routes.upload.images}/${data.criminal.aadhar_photo}?token=${user?.access_token}`}
                            /> : null}
                        </Center>
                    </>}
                </div>
            </SimpleGrid>
        </>
        }
        
    </ErrorBoundary>
  );
}

export default CrimesByCriminalDetail