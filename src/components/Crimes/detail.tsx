import { FC } from "react"
import { Table, Group, Text, Button, SimpleGrid } from '@mantine/core';
import { Link, useParams } from "react-router-dom";
import { CrimesDetailModalProps } from "../../pages/crimes/detail";
import { useCrimeQuery } from "../../hooks/data/crimes";
import ErrorBoundary from "../Layout/ErrorBoundary";
import dayjs from "dayjs";
import { page_routes } from "../../utils/page_routes";

const CrimeDetail:FC<{toggleModal: (value: CrimesDetailModalProps) => void}> = (props) => {
  const param = useParams<{crimeId: string}>();
  const {data, isFetching, isLoading, status, error, refetch} = useCrimeQuery(Number(param.crimeId), true);
  return (
    <ErrorBoundary hasData={data ? true : false} isLoading={isLoading || isFetching} status={status} error={error} hasPagination={false} refetch={refetch}>
        <Group justify="space-between" mb="lg" align="center">
            <Link to={`${page_routes.crimes.list}`}>
                <Button type='button' variant="filled" color='dark'>
                    Back
                </Button>
            </Link>
            <Button type='submit' variant="filled" color='main' onClick={() => props.toggleModal({status: true, type: 'Edit', id: Number(param.crimeId)})}>
                Edit
            </Button>
        </Group>
        <div>
            {(data) && <>
                <Table.ScrollContainer minWidth={800}>
                    <Table verticalSpacing="sm" striped highlightOnHover withTableBorder>
                        <Table.Thead bg="main">
                            <Table.Tr>
                                <Table.Th style={{color: 'white'}}>Names</Table.Th>
                                <Table.Th style={{color: 'white'}}>Type of Crime</Table.Th>
                                <Table.Th style={{color: 'white'}}>Section Of Law</Table.Th>
                                <Table.Th style={{color: 'white'}}>M.O.B. File No</Table.Th>
                                <Table.Th style={{color: 'white'}}>HS. No.</Table.Th>
                                <Table.Th style={{color: 'white'}}>Created On</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            <Table.Tr>
                                <Table.Td>{data.criminals.map((criminal) => criminal.criminal.name).join(', ')}</Table.Td>
                                <Table.Td>{data.typeOfCrime}</Table.Td>
                                <Table.Td>{data.sectionOfLaw}</Table.Td>
                                <Table.Td>{data.mobFileNo}</Table.Td>
                                <Table.Td>{data.hsNo}</Table.Td>
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
                    <Text size="lg" fw={700} p="sm" bg="main" color="white">Special Features</Text>
                </div>
                {(data) && <>
                    <Table.ScrollContainer minWidth={'100%'}>
                        <Table verticalSpacing="sm" striped highlightOnHover withTableBorder>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>HS. Opening Date</Table.Th>
                                    <Table.Td>{data.hsOpeningDate && dayjs(data.hsOpeningDate.toString()).locale(Intl.DateTimeFormat().resolvedOptions().locale).format('DD MMM YYYY')}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>HS. Closing Date</Table.Th>
                                    <Table.Td>{data.hsClosingDate && dayjs(data.hsClosingDate.toString()).locale(Intl.DateTimeFormat().resolvedOptions().locale).format('DD MMM YYYY')}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Clues left at or Near the Scene of Occurrence</Table.Th>
                                    <Table.Td>{data.cluesLeft}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Languages Known</Table.Th>
                                    <Table.Td>{data.languagesKnown}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Language Used During the Offence</Table.Th>
                                    <Table.Td>{data.languagesUsed}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Place Attacked</Table.Th>
                                    <Table.Td>{data.placeAttacked}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Places of Assembly After Offence</Table.Th>
                                    <Table.Td>{data.placeOfAssemblyAfterOffence}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Places of Assembly Before Offence</Table.Th>
                                    <Table.Td>{data.placeOfAssemblyBeforeOffence}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Properties Attacked/stolen</Table.Th>
                                    <Table.Td>{data.propertiesAttacked}</Table.Td>
                                </Table.Tr>
                            </Table.Thead>
                        </Table>
                    </Table.ScrollContainer>
                </>}
            </div>
            <div>
                <div style={{textAlign: 'center'}}>
                        <Text size="lg" fw={700} p="sm" bg="main" color="white">Physical Peculiarities</Text>
                    </div>
                {(data) && <>
                    <Table.ScrollContainer minWidth={'100%'}>
                        <Table verticalSpacing="sm" striped highlightOnHover withTableBorder>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Style Assumed</Table.Th>
                                    <Table.Td>{data.styleAssumed}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Tool/Weapons Used</Table.Th>
                                    <Table.Td>{data.toolsUsed}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Trade Marks</Table.Th>
                                    <Table.Td>{data.tradeMarks}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Transport used After</Table.Th>
                                    <Table.Td>{data.transportUsedAfter}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Transport used Before</Table.Th>
                                    <Table.Td>{data.transportUsedBefore}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Gang</Table.Th>
                                    <Table.Td>{data.gang}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Gang Strength</Table.Th>
                                    <Table.Td>{data.gangStrength}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Brief Fact</Table.Th>
                                    <Table.Td>{data.briefFact}</Table.Td>
                                </Table.Tr>
                            </Table.Thead>
                        </Table>
                    </Table.ScrollContainer>
                </>}
            </div>
        </SimpleGrid>
    </ErrorBoundary>
  );
}

export default CrimeDetail