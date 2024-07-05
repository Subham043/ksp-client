import { FC, useState } from "react"
import { Table, Group, Text, ActionIcon, rem, Popover } from '@mantine/core';
import { IconCheck, IconEye, IconPencil, IconTrash, IconX } from '@tabler/icons-react';
import { CrimesByCriminalsType } from "../../utils/types";
import dayjs from 'dayjs';
import { CrimesByCriminalsListDrawerProps, CrimesByCriminalsListModalProps } from "../../pages/crimes/crimesByCriminals";
import { useDeleteCrimesByCriminalsMutation, useCrimesByCriminalsQuery } from "../../hooks/data/crimesByCriminals";
import ErrorBoundary from "../Layout/ErrorBoundary";


const CrimesByCriminalsTableRow:FC<CrimesByCriminalsType & {toggleModal: (value: CrimesByCriminalsListModalProps) => void, toggleDrawer: (value: CrimesByCriminalsListDrawerProps) => void}> = ({id, crimeId, aliases, ageWhileOpening, crimeArrestOrder, criminal, createdAt, toggleDrawer, toggleModal}) => {
  const [opened, setOpened] = useState<boolean>(false);
  const deleteCrimesByCriminals = useDeleteCrimesByCriminalsMutation(id, crimeId||0)
  const onDelete = async () => {
    await deleteCrimesByCriminals.mutateAsync(undefined)
  }
  return (
    <Table.Tr>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {criminal.name}
          </Text>
      </Table.Td>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {criminal.sex}
          </Text>
      </Table.Td>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {criminal.aadhar_no}
          </Text>
      </Table.Td>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {aliases}
          </Text>
      </Table.Td>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {ageWhileOpening}
          </Text>
      </Table.Td>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {crimeArrestOrder}
          </Text>
      </Table.Td>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {dayjs(createdAt?.toString()).locale(Intl.DateTimeFormat().resolvedOptions().locale).format('DD MMM YYYY hh:mm a')}
          </Text>
      </Table.Td>
      <Table.Td>
          <Group gap={0} justify="flex-end">
            <ActionIcon  variant="subtle" color="gray" onClick={() => toggleDrawer({drawerStatus: true, id: id})}>
                <IconEye style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="gray" onClick={() => toggleModal({status: true, type: 'Edit', id: id})}>
                <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </ActionIcon>
            <Popover width={200} opened={opened} onChange={setOpened} trapFocus position="bottom-end" withArrow shadow="md" clickOutsideEvents={['mouseup', 'touchend']}>
              <Popover.Target>
                <ActionIcon variant="subtle" color="red" onClick={() => setOpened((o) => !o)}>
                    <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                </ActionIcon>
              </Popover.Target>
              <Popover.Dropdown>
                <Group gap={0} justify="space-between">
                  <Text size="sm">Are you sure?</Text>
                  <Group gap={0}>
                    <ActionIcon variant="subtle" color="gray" onClick={() => setOpened((o) => !o)}>
                        <IconX style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon variant="subtle" color="red" onClick={onDelete} loading={deleteCrimesByCriminals.isPending} disabled={deleteCrimesByCriminals.isPending}>
                        <IconCheck style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </ActionIcon>
                  </Group>
                </Group>
              </Popover.Dropdown>
            </Popover>
          </Group>
      </Table.Td>
    </Table.Tr>
  )
}

const CrimesByCriminalsTable:FC<{toggleModal: (value: CrimesByCriminalsListModalProps) => void, toggleDrawer: (value: CrimesByCriminalsListDrawerProps) => void, crimeId: number, selectedData: number[], setSelectedData: (value: number[]) => void}> = (props) => {
  const {data:crimesByCriminals, isFetching, isLoading, status, error, refetch} = useCrimesByCriminalsQuery({crimeId: props.crimeId});
  return (
    <ErrorBoundary hasData={crimesByCriminals ? crimesByCriminals.crimesByCriminals.length>0 : false} isLoading={isLoading || isFetching} status={status} error={error} hasPagination={true} current_page={crimesByCriminals?.current_page} last_page={crimesByCriminals?.last_page} refetch={refetch}>
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="sm" striped highlightOnHover withTableBorder>
          <Table.Thead bg="main">
            <Table.Tr>
              <Table.Th style={{color: 'white'}}>Name</Table.Th>
              <Table.Th style={{color: 'white'}}>Sex</Table.Th>
              <Table.Th style={{color: 'white'}}>Aadhar No</Table.Th>
              <Table.Th style={{color: 'white'}}>Aliases</Table.Th>
              <Table.Th style={{color: 'white'}}>Age While Opening</Table.Th>
              <Table.Th style={{color: 'white'}}>Crime Arrest Order</Table.Th>
              <Table.Th style={{color: 'white'}}>Created On</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{
            (crimesByCriminals ? crimesByCriminals.crimesByCriminals : []).map((item) => <CrimesByCriminalsTableRow key={item.id} {...item} toggleModal={props.toggleModal} toggleDrawer={props.toggleDrawer} />)
          }</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </ErrorBoundary>
  );
}

export default CrimesByCriminalsTable