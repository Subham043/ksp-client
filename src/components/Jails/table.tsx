import { FC, useState } from "react"
import { Table, Group, Text, ActionIcon, rem, Popover, Anchor } from '@mantine/core';
import { IconCheck, IconEye, IconPencil, IconTrash, IconX } from '@tabler/icons-react';
import { JailType } from "../../utils/types";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import { JailsModalProps } from "../../pages/jails/list";
import { useDeleteJailMutation, useJailsQuery } from "../../hooks/data/jails";
import { page_routes } from "../../utils/page_routes";
import ErrorBoundary from "../Layout/ErrorBoundary";


const JailTableRow:FC<JailType & {toggleModal: (value: JailsModalProps) => void}> = ({id, accused, crime, lawSection, policeStation, createdAt, toggleModal}) => {
  const [opened, setOpened] = useState<boolean>(false);
  const deleteJail = useDeleteJailMutation(id)

  const onDelete = async () => {
    await deleteJail.mutateAsync(undefined)
  }
  return (
    <Table.Tr>
      <Table.Td>
          <Link to={`${page_routes.punishment.list}/${id}`}>
            <Anchor component="button" size="sm">
              {accused?.name}
            </Anchor>
          </Link>
      </Table.Td>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {policeStation}
          </Text>
      </Table.Td>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {crime?.typeOfCrime}
          </Text>
      </Table.Td>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {lawSection}
          </Text>
      </Table.Td>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {crime?.mobFileNo}
          </Text>
      </Table.Td>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {crime?.hsNo}
          </Text>
      </Table.Td>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {createdAt && dayjs(createdAt.toString()).locale(Intl.DateTimeFormat().resolvedOptions().locale).format('DD MMM YYYY hh:mm a')}
          </Text>
      </Table.Td>
      <Table.Td>
          <Group gap={0} justify="flex-end">
            <Link to={`${page_routes.punishment.view(id)}`}>
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
                    <ActionIcon variant="subtle" color="red" onClick={onDelete} loading={deleteJail.isPending} disabled={deleteJail.isPending}>
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

const JailTable:FC<{toggleModal: (value: JailsModalProps) => void}> = (props) => {
  const {data:jails, isFetching, isLoading, status, error, refetch} = useJailsQuery();
  return (
    <>
      <ErrorBoundary hasData={jails ? jails.jail.length>0 : false} isLoading={isLoading || isFetching} status={status} error={error} hasPagination={true} current_page={jails?.current_page} last_page={jails?.last_page} refetch={refetch}>
        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="sm" striped highlightOnHover withTableBorder>
            <Table.Thead bg="main">
              <Table.Tr>
                <Table.Th style={{color: 'white'}}>Accused</Table.Th>
                <Table.Th style={{color: 'white'}}>Police Station</Table.Th>
                <Table.Th style={{color: 'white'}}>Type of Crime</Table.Th>
                <Table.Th style={{color: 'white'}}>Section Of Law</Table.Th>
                <Table.Th style={{color: 'white'}}>M.O.B. File No</Table.Th>
                <Table.Th style={{color: 'white'}}>HS. No.</Table.Th>
                <Table.Th style={{color: 'white'}}>Created On</Table.Th>
                <Table.Th />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{
              (jails ? jails.jail : []).map((item) => <JailTableRow key={item.id} {...item} toggleModal={props.toggleModal} />)
            }</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </ErrorBoundary>
    </>
  );
}

export default JailTable