import { FC, useEffect, useState } from "react";
import { useToast } from "../../hooks/useToast";
import { useForm } from "@mantine/form";
import { yupResolver } from "mantine-form-yup-resolver";
import { DateInput } from '@mantine/dates';
import { Box, Button, InputLabel, SimpleGrid, Text, TextInput } from "@mantine/core";
import { isAxiosError } from "axios";
import { useAddJailMutation, useUpdateJailMutation, useJailQuery } from "../../hooks/data/jails";
import { MutateOptions } from "@tanstack/react-query";
import { AxiosErrorResponseType, JailFormType, JailType } from "../../utils/types";
import { JailsModalProps } from "../../pages/jails/list";
import { SchemaType, initialValues, schema } from "./schema";
import ErrorBoundary from "../Layout/ErrorBoundary";
import debounce from "lodash.debounce";
import ASelect from "react-dropdown-select";
import { useCrimeQuery, useCrimesSelectQuery } from "../../hooks/data/crimes";

type JailFormProps = JailsModalProps;
type jailMutateOptionsType = MutateOptions<JailType, Error, JailFormType, unknown>;

const JailForm:FC<JailFormProps & {toggleModal: (value: JailsModalProps) => void}> = (props) => {

    const {toastError} = useToast();
    const [search, setSearch] = useState<string>("");
    const form = useForm<SchemaType>({
        initialValues,
        validate: yupResolver(schema),
    });
    const {data, isFetching, isLoading, status, error, refetch} = useJailQuery(props.type === "Edit" ? props.id : 0, (props.type === "Edit" && props.status && props.id>0));
    const {data:criminals, isFetching:isCriminalFetching, isLoading:isCriminalLoading} = useCrimeQuery(form.values.crimeId ? form.values.crimeId : 0, (props.status && form.values.crimeId!==undefined && form.values.crimeId>0));
    const {data:crimes, isFetching:isCrimeFetching, isLoading:isCrimeLoading} = useCrimesSelectQuery({search: search, enabled:props.status, page: 1, limit: 100});
    const searchHandler = debounce((value: string) => setSearch(value), 500);
    const addJail = useAddJailMutation()
    const updateJail = useUpdateJailMutation(props.type === "Edit" ? props.id : 0)

    useEffect(() => {
        if(props.type === "Edit" && data && props.status){
            form.setValues({
                criminalId: data.criminalId ? data.criminalId : undefined,
                crimeId: data.crimeId ? data.crimeId : undefined,
                lawSection: data.lawSection ? data.lawSection : undefined,
                policeStation: data.policeStation ? data.policeStation : undefined,
                utpNo: data.utpNo ? data.utpNo : undefined,
                jailEntryDate: data.jailEntryDate ? data.jailEntryDate.toString() : undefined,
                jailReleaseDate: data.jailReleaseDate ? data.jailReleaseDate.toString() : undefined,
                jailVisitorDetail: data.jailVisitorDetail ? data.jailVisitorDetail : undefined,
                visitorRelationship: data.visitorRelationship ? data.visitorRelationship : undefined,
                additionalRemarks: data.additionalRemarks ? data.additionalRemarks : undefined,
            });
            // setSearch(data.criminal ? data.criminal.id.toString() : "");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, props.type, props.status]);

    const onSelectHandler = (value: number) => form.setFieldValue('criminalId', value)
    const onCrimeSelectHandler = (value: number) => form.setFieldValue('crimeId', value)
    
    const onSubmit = async () => {
        const jailMutateOptions:jailMutateOptionsType = {
            onSuccess: () => {
                props.type==="Create" && form.reset();
                props.toggleModal({type: "Create", status: false});
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
            await updateJail.mutateAsync({...form.values, crimeId: form.values.crimeId ? Number(form.values.crimeId) : undefined, criminalId: form.values.criminalId ? Number(form.values.criminalId) : undefined} as JailFormType, jailMutateOptions);
        }else{
            await addJail.mutateAsync({...form.values, crimeId: form.values.crimeId ? Number(form.values.crimeId) : undefined, criminalId: form.values.criminalId ? Number(form.values.criminalId) : undefined} as JailFormType, jailMutateOptions);
        }
    };

    return (
        <ErrorBoundary hasData={props.status && props.type==="Edit" ? (data ? true : false): true} isLoading={isLoading || isFetching} status={props.status && props.type==="Edit" ? status : "success"} error={error} hasPagination={false} refetch={refetch}>
            <form onSubmit={form.onSubmit(onSubmit)}>
                <SimpleGrid cols={{ base: 1, sm: 2 }}>
                    <Box>
                        <InputLabel>Crime NO</InputLabel>
                        <ASelect
                            options={(crimes && crimes.crime.length > 0) ? crimes.crime.map((item) => ({label: `${item.typeOfCrime + " - " + item.id}`, value: item.id.toString()}))
                            : []}
                            values={props.type === "Edit" && data && data.crime ? [{label: `${data.crime.typeOfCrime + " - " + data.crime.id}`, value: data.crime.id.toString()}] :[]}
                            closeOnSelect={true}
                            // disabled={isFetching || isLoading}
                            onChange={(values)=> onCrimeSelectHandler(values.length > 0 ? parseInt(values[0].value) : 0)}
                            placeholder="Type to search for crimes" 
                            loading={isCrimeFetching || isCrimeLoading}
                            keepSelectedInList={true}
                            searchFn={(searchProps) => {
                                searchHandler(searchProps.state.search);
                                return (crimes && crimes.crime.length > 0)
                                    ? crimes.crime.map((item) => {
                                        return { label: item.typeOfCrime + " - " + item.id, value: item.id.toString() };
                                        })
                                    : []
                            }}
                        />
                        <Text color="red">{form.errors.crimeId}</Text>
                    </Box>
                    <Box>
                        <InputLabel>Accused</InputLabel>
                        <ASelect
                            options={(criminals && criminals.criminals.length > 0) ? criminals.criminals.map((item) => ({label: `${item.criminal.name}`, value: item.criminal.id.toString()}))
                            : []}
                            values={props.type === "Edit" && data && data.accused ? [{label: `${data.accused.name}`, value: data.accused.id.toString()}] :[]}
                            closeOnSelect={true}
                            disabled={!(props.status && form.values.crimeId!==undefined && form.values.crimeId>0)}
                            onChange={(values)=> onSelectHandler(values.length > 0 ? parseInt(values[0].value) : 0)}
                            placeholder="Type to search for accussed" 
                            loading={isCriminalFetching || isCriminalLoading}
                            keepSelectedInList={true}
                        />
                        <Text color="red">{form.errors.criminalId}</Text>
                    </Box>
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
                    <TextInput label="Law Section" {...form.getInputProps('lawSection')} />
                    <TextInput label="Police Station" {...form.getInputProps('policeStation')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 2}} mt="md">
                    <DateInput
                        value={form.values.jailEntryDate ? new Date(form.values.jailEntryDate) : undefined}
                        onChange={(value) => form.setFieldValue('jailEntryDate', value?.toISOString())}
                        label="Jail Entry Date"
                        placeholder="Jail Entry Date"
                    />
                    <DateInput
                        value={form.values.jailReleaseDate ? new Date(form.values.jailReleaseDate) : undefined}
                        onChange={(value) => form.setFieldValue('jailReleaseDate', value?.toISOString())}
                        label="Jail Release Date"
                        placeholder="Jail Release Date"
                    />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
                    <TextInput label="Jail Visitor Detail" {...form.getInputProps('jailVisitorDetail')} />
                    <TextInput label="Visitor Relationship" {...form.getInputProps('visitorRelationship')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
                    <TextInput label="UTP No." {...form.getInputProps('utpNo')} />
                    <TextInput label="Additional Remarks" {...form.getInputProps('additionalRemarks')} />
                </SimpleGrid>
                <Button type='submit' variant="filled" color='main' mt="lg" loading={props.type === "Create" ? addJail.isPending : updateJail.isPending} disabled={props.type === "Create" ? addJail.isPending : updateJail.isPending} data-disabled={props.type === "Create" ? addJail.isPending : updateJail.isPending}>
                    {props.type === "Create" ? "Create" : "Update"}
                </Button>
            </form>
        </ErrorBoundary>
    )
}

export default JailForm