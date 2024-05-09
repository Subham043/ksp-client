import { FC } from "react"
import { Table, Group, Text, Button, SimpleGrid } from '@mantine/core';
import { useParams } from "react-router-dom";
import { CrimesDetailModalProps } from "../../pages/crimes/detail";
import { useCrimeQuery } from "../../hooks/data/crimes";
import ErrorBoundary from "../Layout/ErrorBoundary";
import dayjs from "dayjs";

const CrimeDetail:FC<{toggleModal: (value: CrimesDetailModalProps) => void}> = (props) => {
  const param = useParams<{crimeId: string}>();
  const {data, isFetching, isLoading, status, error, refetch} = useCrimeQuery(Number(param.crimeId), true);
  return (
    <ErrorBoundary hasData={data ? true : false} isLoading={isLoading || isFetching} status={status} error={error} hasPagination={false} refetch={refetch}>
        <Group justify="flex-end" mb="lg" align="center">
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
                                <Table.Th style={{color: 'white'}}>Name</Table.Th>
                                <Table.Th style={{color: 'white'}}>Type of Crime</Table.Th>
                                <Table.Th style={{color: 'white'}}>Section Of Law</Table.Th>
                                <Table.Th style={{color: 'white'}}>M.O.B. File No</Table.Th>
                                <Table.Th style={{color: 'white'}}>HS. No.</Table.Th>
                                <Table.Th style={{color: 'white'}}>Created On</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            <Table.Tr>
                                <Table.Td>{data.name}</Table.Td>
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
                                    <Table.Th>Clues left at or Near the Scene of Occurrence</Table.Th>
                                    <Table.Td>{data.cluesLeft}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th>Dress Used</Table.Th>
                                    <Table.Td>{data.dressUsed}</Table.Td>
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
                                    <Table.Th>Voice / Speech</Table.Th>
                                    <Table.Td>{data.voice}</Table.Td>
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
            <div>
                <div style={{textAlign: 'center'}}>
                        <Text size="lg" fw={700} p="sm" bg="main" color="white">Physical Peculiarities</Text>
                    </div>
                {(data) && <>
                    <Table.ScrollContainer minWidth={'100%'}>
                        <Table verticalSpacing="sm" striped highlightOnHover withTableBorder>
                            <Table.Thead>
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
    </ErrorBoundary>
  );
}

export default CrimeDetail