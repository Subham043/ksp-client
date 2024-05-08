import { FC, useState } from "react"
import { Table, Group, Text, ActionIcon, rem, Popover, Anchor } from '@mantine/core';
import { IconCheck, IconEye, IconPencil, IconTrash, IconX } from '@tabler/icons-react';
import { CrimeType } from "../../utils/types";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import { CrimesModalProps } from "../../pages/crimes/list";
import { useDeleteCrimeMutation, useCrimesQuery } from "../../hooks/data/crimes";
import { page_routes } from "../../utils/page_routes";
import ErrorBoundary from "../Layout/ErrorBoundary";


const CrimeTableRow:FC<CrimeType & {toggleModal: (value: CrimesModalProps) => void}> = ({id, name, typeOfCrime, sectionOfLaw, mobFileNo, hsNo, createdAt, toggleModal}) => {
  const [opened, setOpened] = useState<boolean>(false);
  const deleteCrime = useDeleteCrimeMutation(id)

  const onDelete = async () => {
    await deleteCrime.mutateAsync(undefined)
  }
  return (
    <Table.Tr>
      <Table.Td>
          <Link to={`${page_routes.crimes.list}/${id}`}>
            <Anchor component="button" size="sm">
              {name}
            </Anchor>
          </Link>
      </Table.Td>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {typeOfCrime}
          </Text>
      </Table.Td>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {sectionOfLaw}
          </Text>
      </Table.Td>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {mobFileNo}
          </Text>
      </Table.Td>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {hsNo}
          </Text>
      </Table.Td>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {createdAt && dayjs(createdAt.toString()).locale(Intl.DateTimeFormat().resolvedOptions().locale).format('DD MMM YYYY hh:mm a')}
          </Text>
      </Table.Td>
      <Table.Td>
          <Group gap={0} justify="flex-end">
            <Link to={`${page_routes.crimes.view(id)}`}>
              <ActionIcon  variant="subtle" color="gray">
                  <IconEye style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
              </ActionIcon>
            </Link>
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
                    <ActionIcon variant="subtle" color="red" onClick={onDelete} loading={deleteCrime.isPending} disabled={deleteCrime.isPending}>
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

const CrimeTable:FC<{toggleModal: (value: CrimesModalProps) => void}> = (props) => {
  const {data:crimes, isFetching, isLoading, status, error, refetch} = useCrimesQuery();
  return (
    <>
      <ErrorBoundary hasData={crimes ? crimes.crime.length>0 : false} isLoading={isLoading || isFetching} status={status} error={error} hasPagination={true} current_page={crimes?.current_page} last_page={crimes?.last_page} refetch={refetch}>
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
                <Table.Th />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{
              (crimes ? crimes.crime : []).map((item) => <CrimeTableRow key={item.id} {...item} toggleModal={props.toggleModal} />)
            }</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </ErrorBoundary>
    </>
  );
}

export default CrimeTable