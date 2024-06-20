import { FC, useState } from "react"
import { Table, Group, Text, ActionIcon, rem, Popover, Anchor } from '@mantine/core';
import { IconCheck, IconEye, IconPencil, IconTrash, IconX } from '@tabler/icons-react';
import { CriminalType } from "../../utils/types";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import { CriminalsModalProps } from "../../pages/criminals/list";
import { useDeleteCriminalMutation, useCriminalsQuery } from "../../hooks/data/criminals";
import { page_routes } from "../../utils/page_routes";
import ErrorBoundary from "../Layout/ErrorBoundary";


const CriminalTableRow:FC<CriminalType & {toggleModal: (value: CriminalsModalProps) => void}> = ({id, name, sex, aadhar_no, relation_name, relation_type, createdAt, toggleModal}) => {
  const [opened, setOpened] = useState<boolean>(false);
  const deleteCriminal = useDeleteCriminalMutation(id)

  const onDelete = async () => {
    await deleteCriminal.mutateAsync(undefined)
  }
  return (
    <Table.Tr>
      <Table.Td>
          <Link to={`${page_routes.criminals.list}/${id}`}>
            <Anchor component="button" size="sm">
              {id}
            </Anchor>
          </Link>
      </Table.Td>
      <Table.Td>
          <Link to={`${page_routes.criminals.list}/${id}`}>
            <Anchor component="button" size="sm">
              {name}
            </Anchor>
          </Link>
      </Table.Td>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {sex}
          </Text>
      </Table.Td>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {aadhar_no}
          </Text>
      </Table.Td>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {relation_name}
          </Text>
      </Table.Td>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {relation_type}
          </Text>
      </Table.Td>
      <Table.Td>
          <Text fz="sm" fw={500}>
              {dayjs(createdAt.toString()).locale(Intl.DateTimeFormat().resolvedOptions().locale).format('DD MMM YYYY hh:mm a')}
          </Text>
      </Table.Td>
      <Table.Td>
          <Group gap={0} justify="flex-end">
            <Link to={`${page_routes.criminals.view(id)}`}>
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
                    <ActionIcon variant="subtle" color="red" onClick={onDelete} loading={deleteCriminal.isPending} disabled={deleteCriminal.isPending}>
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

const CriminalTable:FC<{toggleModal: (value: CriminalsModalProps) => void}> = (props) => {
  const {data:criminals, isFetching, isLoading, status, error, refetch} = useCriminalsQuery();
  return (
    <>
      <ErrorBoundary hasData={criminals ? criminals.criminal.length>0 : false} isLoading={isLoading || isFetching} status={status} error={error} hasPagination={true} current_page={criminals?.current_page} last_page={criminals?.last_page} refetch={refetch}>
        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="sm" striped highlightOnHover withTableBorder>
            <Table.Thead bg="main">
              <Table.Tr>
                <Table.Th style={{color: 'white'}}>Criminal ID</Table.Th>
                <Table.Th style={{color: 'white'}}>Name</Table.Th>
                <Table.Th style={{color: 'white'}}>Sex</Table.Th>
                <Table.Th style={{color: 'white'}}>Aadhar No</Table.Th>
                <Table.Th style={{color: 'white'}}>Relation Name</Table.Th>
                <Table.Th style={{color: 'white'}}>Relation Type</Table.Th>
                <Table.Th style={{color: 'white'}}>Created On</Table.Th>
                <Table.Th />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{
              (criminals ? criminals.criminal : []).map((item) => <CriminalTableRow key={item.id} {...item} toggleModal={props.toggleModal} />)
            }</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </ErrorBoundary>
    </>
  );
}

export default CriminalTable