import { FC, useState } from "react"
import { Table, Group, Text, ActionIcon, rem, Popover } from '@mantine/core';
import { IconCheck, IconEye, IconPencil, IconTrash, IconX } from '@tabler/icons-react';
import { VisitorType } from "../../utils/types";
import dayjs from 'dayjs';
import { VisitorsListDrawerProps, VisitorsListModalProps } from "../../pages/jails/visitors";
import { useDeleteVisitorMutation, useVisitorsQuery } from "../../hooks/data/visitors";
import ErrorBoundary from "../Layout/ErrorBoundary";


const VisitorsTableRow:FC<VisitorType & {toggleModal: (value: VisitorsListModalProps) => void, toggleDrawer: (value: VisitorsListDrawerProps) => void}> = ({id, jailId, name, relation, visitonDate, createdAt, toggleDrawer, toggleModal}) => {
  const [opened, setOpened] = useState<boolean>(false);
  const deleteVisitors = useDeleteVisitorMutation(id, jailId||0)
  const onDelete = async () => {
    await deleteVisitors.mutateAsync(undefined)
  }
  return (
    <Table.Tr>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {name}
          </Text>
      </Table.Td>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {relation}
          </Text>
      </Table.Td>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {visitonDate && dayjs(visitonDate?.toString()).locale(Intl.DateTimeFormat().resolvedOptions().locale).format('DD MMM YYYY')}
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
                    <ActionIcon variant="subtle" color="red" onClick={onDelete} loading={deleteVisitors.isPending} disabled={deleteVisitors.isPending}>
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

const VisitorsTable:FC<{toggleModal: (value: VisitorsListModalProps) => void, toggleDrawer: (value: VisitorsListDrawerProps) => void, punishmentId: number, selectedData: number[], setSelectedData: (value: number[]) => void}> = (props) => {
  const {data:visitors, isFetching, isLoading, status, error, refetch} = useVisitorsQuery({jailId: props.punishmentId});
  return (
    <ErrorBoundary hasData={visitors ? visitors.visitor.length>0 : false} isLoading={isLoading || isFetching} status={status} error={error} hasPagination={true} current_page={visitors?.current_page} last_page={visitors?.last_page} refetch={refetch}>
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="sm" striped highlightOnHover withTableBorder>
          <Table.Thead bg="main">
            <Table.Tr>
              <Table.Th style={{color: 'white'}}>Name</Table.Th>
              <Table.Th style={{color: 'white'}}>Relation</Table.Th>
              <Table.Th style={{color: 'white'}}>Visiting Date</Table.Th>
              <Table.Th style={{color: 'white'}}>Created On</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{
            (visitors ? visitors.visitor : []).map((item) => <VisitorsTableRow key={item.id} {...item} toggleModal={props.toggleModal} toggleDrawer={props.toggleDrawer} />)
          }</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </ErrorBoundary>
  );
}

export default VisitorsTable