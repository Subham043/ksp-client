import { FC, useEffect, useState } from "react";
import { useToast } from "../../hooks/useToast";
import { useForm } from "@mantine/form";
import { yupResolver } from "mantine-form-yup-resolver";
import { Box, Button, Checkbox, Divider, InputLabel, SimpleGrid, Table, Text, TextInput } from "@mantine/core";
import { isAxiosError } from "axios";
import { useAddCrimesByCriminalsMutation, useCrimesByCriminalQuery, useUpdateCrimesByCriminalsMutation } from "../../hooks/data/crimesByCriminals";
import { MutateOptions } from "@tanstack/react-query";
import { AxiosErrorResponseType, CrimesByCriminalsFormType, CrimesByCriminalsType } from "../../utils/types";
import { CrimesByCriminalsListModalProps } from "../../pages/crimes/crimesByCriminals";
import { SchemaType, initialValues, schema } from "./schema";
import ErrorBoundary from "../Layout/ErrorBoundary";
import debounce from "lodash.debounce";
import ASelect from "react-dropdown-select";
import { useCriminalsSelectQuery } from "../../hooks/data/criminals";


type CrimesByCriminalsFormProps = {
    status: boolean;
    type: "Create",
} | {
    status: boolean;
    type: "Edit";
    id: number;
}
type visitorsMutateOptionsType = MutateOptions<CrimesByCriminalsType, Error, CrimesByCriminalsFormType, unknown>;

const CrimesByCriminalsForm:FC<CrimesByCriminalsFormProps & {mainCrimeId: number, toggleModal: (value: CrimesByCriminalsListModalProps) => void}> = (props) => {

    const {toastError} = useToast();
    const {data, isFetching, isLoading, status, error,  refetch} = useCrimesByCriminalQuery(props.type === "Edit" ? props.id : 0, (props.type === "Edit" && props.status && props.id>0));
    const [search, setSearch] = useState<string>("");
    const {data:criminals, isFetching:isCriminalFetching, isLoading:isCriminalLoading} = useCriminalsSelectQuery({search: search, enabled:props.status, page: 1, limit: 100});
    const searchHandler = debounce((value: string) => setSearch(value), 500);
    const addCrimesByCriminals = useAddCrimesByCriminalsMutation(props.mainCrimeId)
    const updateCrimesByCriminals = useUpdateCrimesByCriminalsMutation(props.type === "Edit" ? props.id : 0, props.mainCrimeId)
    const form = useForm<SchemaType>({
        initialValues,
        validate: yupResolver(schema),
    });
    
    useEffect(() => {
        if(props.type === "Edit" && data && props.status){
            form.setValues({
                ageWhileOpening: data.ageWhileOpening ? data.ageWhileOpening : undefined,
                aliases: data.aliases ? data.aliases : undefined,
                crimeArrestOrder: data.crimeArrestOrder ? data.crimeArrestOrder : undefined,
                criminalId: data.criminalId ? data.criminalId : undefined,
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, props.type, props.status]);

    const onSelectHandler = (value: number) => form.setFieldValue('criminalId', value)
    
    const onSubmit = async () => {
        const visitorsMutateOptions:visitorsMutateOptionsType = {
            onSuccess: () => {
                props.type==="Create" && form.reset();
                props.toggleModal({status: false, type: "Create", crimeId: props.mainCrimeId});
            },
            onError: (error:Error) => {
                if(isAxiosError<AxiosErrorResponseType>(error)){
                    if(error?.response?.data?.formErrors){
                        for (const [key, value] of Object.entries(error?.response?.data?.formErrors)) {
                            form.setFieldError(key, value[0]);
                        }
                    }else if(error?.response?.data?.message){
                        toastError(error.response.data.message);
                    }
                }
            }
        }
        
        if(props.type === "Edit"){
            await updateCrimesByCriminals.mutateAsync(form.values as CrimesByCriminalsFormType, visitorsMutateOptions);
        }else{
            await addCrimesByCriminals.mutateAsync(form.values as CrimesByCriminalsFormType, visitorsMutateOptions);
        }
    };

    return (
        <ErrorBoundary hasData={props.status && props.type==="Edit" ? (data ? true : false): true} isLoading={props.status && props.type==="Edit" ? (isLoading || isFetching) : (false)} status={props.status && props.type==="Edit" ? status : "success"} error={props.status && props.type==="Edit" ? error : undefined} hasPagination={false} refetch={props.status && props.type==="Edit" ? refetch : () => {}}>
            <form onSubmit={form.onSubmit(onSubmit)}>
                <SimpleGrid cols={{ base: 1, sm: 1 }}>
                    <Box>
                        <InputLabel>Criminal</InputLabel>
                        <ASelect
                            options={(criminals && criminals.criminal.length > 0) ? criminals.criminal.map((item) => ({label: `${item.name}`, value: item.id.toString(), criminal: {
                                id: item.id,
                                name: item.name,
                                sex: item.sex,
                                dob: item.dob ? new Date(item.dob) : undefined,
                                phone: item.phone,
                                aadhar_no: item.aadhar_no,
                            }}))
                            : []}
                            values={props.type === "Edit" && data && data.criminal ? [{label: `${data.criminal.name}`, value: data.criminal.id.toString(), criminal: data.criminal}] :[]}
                            closeOnSelect={true}
                            onChange={(values)=> onSelectHandler(values.length > 0 ? parseInt(values[0].value) : 0)}
                            placeholder="Type to search for criminal" 
                            loading={isCriminalFetching || isCriminalLoading}
                            keepSelectedInList={true}
                            searchFn={(searchProps) => {
                                searchHandler(searchProps.state.search);
                                return (criminals && criminals.criminal.length > 0)
                                    ? criminals.criminal.map((item) => {
                                        return { label: item.name, value: item.id.toString(), criminal: {
                                id: item.id,
                                name: item.name,
                                sex: item.sex,
                                dob: item.dob ? new Date(item.dob) : undefined,
                                phone: item.phone,
                                aadhar_no: item.aadhar_no,
                            }};
                                        })
                                    : []
                            }}
                            separatorRenderer={()=><div>abc</div>}
                            itemRenderer={({item, itemIndex, methods}) => <div onClick={() => methods.addItem(item)}>
                                <Divider my="xs" label={<div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                                    <Checkbox
                                        checked={methods.isSelected(item)}
                                        onChange={() => methods.addItem(item)}
                                    />
                                    <Text size="md" fw={700} p="sm" color="main" tt="uppercase">{item.criminal.name}</Text>
                                </div>} labelPosition="center" />
                                <Table verticalSpacing="sm" striped highlightOnHover withTableBorder mb={criminals && itemIndex && criminals.criminal.length === (itemIndex+1) ? 'md' : undefined}>
                                    <Table.Thead bg="main">
                                        <Table.Tr>
                                            <Table.Th style={{color: 'white'}}>Criminal ID</Table.Th>
                                            <Table.Th style={{color: 'white'}}>Name</Table.Th>
                                            <Table.Th style={{color: 'white'}}>Sex</Table.Th>
                                            <Table.Th style={{color: 'white'}}>Aadhar No</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody>
                                        <Table.Tr>
                                            <Table.Td>
                                                <Text fz="sm" fw={500}>
                                                    {item.criminal.id}
                                                </Text>
                                            </Table.Td>
                                            <Table.Td>
                                                <Text fz="sm" fw={500}>
                                                    {item.criminal.name}
                                                </Text>
                                            </Table.Td>
                                            <Table.Td>
                                                <Text fz="sm" fw={500}>
                                                    {item.criminal.sex}
                                                </Text>
                                            </Table.Td>
                                            <Table.Td>
                                                <Text fz="sm" fw={500}>
                                                    {item.criminal.aadhar_no}
                                                </Text>
                                            </Table.Td>
                                        </Table.Tr>
                                    </Table.Tbody>
                                </Table>
                            </div>}
                        />
                        <Text color="red">{form.errors.criminalId}</Text>
                    </Box>
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
                    <TextInput data-autofocus label="Aliases" {...form.getInputProps('aliases')} />
                    <TextInput label="Age While Opening" {...form.getInputProps('ageWhileOpening')} />
                    <TextInput label="Crime Arrest Order" {...form.getInputProps('crimeArrestOrder')} />
                </SimpleGrid>
                <Button type='submit' variant="filled" color='main' mt="lg" loading={props.type === "Create" ? addCrimesByCriminals.isPending : updateCrimesByCriminals.isPending} disabled={props.type === "Create" ? addCrimesByCriminals.isPending : updateCrimesByCriminals.isPending} data-disabled={props.type === "Create" ? addCrimesByCriminals.isPending : updateCrimesByCriminals.isPending}>
                    {props.type === "Create" ? "Create" : "Update"}
                </Button>
            </form>
        </ErrorBoundary>
    )
}

export default CrimesByCriminalsForm