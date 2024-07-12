import { FC, useState } from "react"
import { Table, Group, Text, ActionIcon, rem, Popover } from '@mantine/core';
import { IconCheck, IconEye, IconPencil, IconTrash, IconX } from '@tabler/icons-react';
import { HearingType } from "../../utils/types";
import dayjs from 'dayjs';
import { HearingsListDrawerProps, HearingsListModalProps } from "../../pages/courts/hearings";
import { useDeleteHearingMutation, useHearingsQuery } from "../../hooks/data/hearings";
import ErrorBoundary from "../Layout/ErrorBoundary";


const HearingsTableRow:FC<HearingType & {toggleModal: (value: HearingsListModalProps) => void, toggleDrawer: (value: HearingsListDrawerProps) => void}> = ({id, courtId, judgeName, actionCode, attendance, hearingDate, nextHearingDate, createdAt, toggleDrawer, toggleModal}) => {
  const [opened, setOpened] = useState<boolean>(false);
  const deleteHearings = useDeleteHearingMutation(id, courtId||0)
  const onDelete = async () => {
    await deleteHearings.mutateAsync(undefined)
  }
  return (
    <Table.Tr>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {judgeName}
          </Text>
      </Table.Td>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {actionCode}
          </Text>
      </Table.Td>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {attendance}
          </Text>
      </Table.Td>
      <Table.Td>
          <Text fz="sm" fw={800} color="blue">
              {hearingDate && dayjs(hearingDate?.toString()).locale(Intl.DateTimeFormat().resolvedOptions().locale).format('DD MMM YYYY')}
          </Text>
      </Table.Td>
      <Table.Td>
          <Text fz="sm" fw={800} color="purple">
              {nextHearingDate && dayjs(nextHearingDate?.toString()).locale(Intl.DateTimeFormat().resolvedOptions().locale).format('DD MMM YYYY')}
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
                    <ActionIcon variant="subtle" color="red" onClick={onDelete} loading={deleteHearings.isPending} disabled={deleteHearings.isPending}>
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

const HearingsTable:FC<{toggleModal: (value: HearingsListModalProps) => void, toggleDrawer: (value: HearingsListDrawerProps) => void, courtId: number, selectedData: number[], setSelectedData: (value: number[]) => void}> = (props) => {
  const {data:hearings, isFetching, isLoading, status, error, refetch} = useHearingsQuery({jailId: props.courtId});
  return (
    <ErrorBoundary hasData={hearings ? hearings.hearing.length>0 : false} isLoading={isLoading || isFetching} status={status} error={error} hasPagination={true} current_page={hearings?.current_page} last_page={hearings?.last_page} refetch={refetch}>
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="sm" striped highlightOnHover withTableBorder>
          <Table.Thead bg="main">
            <Table.Tr>
              <Table.Th style={{color: 'white'}}>Judge Name</Table.Th>
              <Table.Th style={{color: 'white'}}>Action Code</Table.Th>
              <Table.Th style={{color: 'white'}}>Attendance</Table.Th>
              <Table.Th style={{color: 'white'}}>Hearing Date</Table.Th>
              <Table.Th style={{color: 'white'}}>Next Hearing Date</Table.Th>
              <Table.Th style={{color: 'white'}}>Created On</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{
            (hearings ? hearings.hearing : []).map((item) => <HearingsTableRow key={item.id} {...item} toggleModal={props.toggleModal} toggleDrawer={props.toggleDrawer} />)
          }</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </ErrorBoundary>
  );
}

export default HearingsTable