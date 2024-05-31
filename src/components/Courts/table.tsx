import { FC, useState } from "react"
import { Table, Group, Text, ActionIcon, rem, Popover, Anchor } from '@mantine/core';
import { IconCheck, IconEye, IconPencil, IconTrash, IconX } from '@tabler/icons-react';
import { CourtType } from "../../utils/types";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import { CourtsModalProps } from "../../pages/courts/list";
import { useDeleteCourtMutation, useCourtsQuery } from "../../hooks/data/courts";
import { page_routes } from "../../utils/page_routes";
import ErrorBoundary from "../Layout/ErrorBoundary";


const CourtTableRow:FC<CourtType & {toggleModal: (value: CourtsModalProps) => void}> = ({id, accused, crime, courtName, createdAt, toggleModal}) => {
  const [opened, setOpened] = useState<boolean>(false);
  const deleteCourt = useDeleteCourtMutation(id)

  const onDelete = async () => {
    await deleteCourt.mutateAsync(undefined)
  }
  return (
    <Table.Tr>
      <Table.Td>
          <Link to={`${page_routes.court_details.list}/${id}`}>
            <Anchor component="button" size="sm">
              {accused?.name}
            </Anchor>
          </Link>
      </Table.Td>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {courtName}
          </Text>
      </Table.Td>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {crime?.typeOfCrime}
          </Text>
      </Table.Td>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {crime?.sectionOfLaw}
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
            <Link to={`${page_routes.court_details.view(id)}`}>
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
                    <ActionIcon variant="subtle" color="red" onClick={onDelete} loading={deleteCourt.isPending} disabled={deleteCourt.isPending}>
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

const CourtTable:FC<{toggleModal: (value: CourtsModalProps) => void}> = (props) => {
  const {data:courts, isFetching, isLoading, status, error, refetch} = useCourtsQuery();
  return (
    <>
      <ErrorBoundary hasData={courts ? courts.court.length>0 : false} isLoading={isLoading || isFetching} status={status} error={error} hasPagination={true} current_page={courts?.current_page} last_page={courts?.last_page} refetch={refetch}>
        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="sm" striped highlightOnHover withTableBorder>
            <Table.Thead bg="main">
              <Table.Tr>
                <Table.Th style={{color: 'white'}}>Accused</Table.Th>
                <Table.Th style={{color: 'white'}}>Court Name</Table.Th>
                <Table.Th style={{color: 'white'}}>Type of Crime</Table.Th>
                <Table.Th style={{color: 'white'}}>Section Of Law</Table.Th>
                <Table.Th style={{color: 'white'}}>M.O.B. File No</Table.Th>
                <Table.Th style={{color: 'white'}}>HS. No.</Table.Th>
                <Table.Th style={{color: 'white'}}>Created On</Table.Th>
                <Table.Th />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{
              (courts ? courts.court : []).map((item) => <CourtTableRow key={item.id} {...item} toggleModal={props.toggleModal} />)
            }</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </ErrorBoundary>
    </>
  );
}

export default CourtTable