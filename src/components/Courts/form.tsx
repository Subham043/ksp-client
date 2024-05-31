import { FC, useEffect, useState } from "react";
import { useToast } from "../../hooks/useToast";
import { useForm } from "@mantine/form";
import { yupResolver } from "mantine-form-yup-resolver";
import { DateInput } from '@mantine/dates';
import { Box, Button, InputLabel, SimpleGrid, Text, TextInput } from "@mantine/core";
import { isAxiosError } from "axios";
import { useAddCourtMutation, useUpdateCourtMutation, useCourtQuery } from "../../hooks/data/courts";
import { MutateOptions } from "@tanstack/react-query";
import { AxiosErrorResponseType, CourtFormType, CourtType } from "../../utils/types";
import { CourtsModalProps } from "../../pages/courts/list";
import { SchemaType, initialValues, schema } from "./schema";
import ErrorBoundary from "../Layout/ErrorBoundary";
import debounce from "lodash.debounce";
import ASelect from "react-dropdown-select";
import { useCrimeQuery, useCrimesSelectQuery } from "../../hooks/data/crimes";

type CourtFormProps = CourtsModalProps;
type courtMutateOptionsType = MutateOptions<CourtType, Error, CourtFormType, unknown>;

const CourtForm:FC<CourtFormProps & {toggleModal: (value: CourtsModalProps) => void}> = (props) => {

    const {toastError} = useToast();
    const [search, setSearch] = useState<string>("");
    const form = useForm<SchemaType>({
        initialValues,
        validate: yupResolver(schema),
    });
    const {data, isFetching, isLoading, status, error, refetch} = useCourtQuery(props.type === "Edit" ? props.id : 0, (props.type === "Edit" && props.status && props.id>0));
    const {data:criminals, isFetching:isCriminalFetching, isLoading:isCriminalLoading} = useCrimeQuery(form.values.crimeId ? form.values.crimeId : 0, (props.status && form.values.crimeId!==undefined && form.values.crimeId>0));
    const {data:crimes, isFetching:isCrimeFetching, isLoading:isCrimeLoading} = useCrimesSelectQuery({search: search, enabled:props.status, page: 1, limit: 100});
    const searchHandler = debounce((value: string) => setSearch(value), 500);
    const addCourt = useAddCourtMutation()
    const updateCourt = useUpdateCourtMutation(props.type === "Edit" ? props.id : 0)

    useEffect(() => {
        if(props.type === "Edit" && data && props.status){
            form.setValues({
                criminalId: data.criminalId ? data.criminalId : undefined,
                crimeId: data.crimeId ? data.crimeId : undefined,
                courtName: data.courtName ? data.courtName : undefined,
                ccScNo: data.ccScNo ? data.ccScNo : undefined,
                psName: data.psName ? data.psName : undefined,
                attendance: data.attendance ? data.attendance : undefined,
                hearingDate: data.hearingDate ? data.hearingDate.toString() : undefined,
                nextHearingDate: data.nextHearingDate ? data.nextHearingDate.toString() : undefined,
                lawyerName: data.lawyerName ? data.lawyerName : undefined,
                lawyerContact: data.lawyerContact ? data.lawyerContact : undefined,
                suretyProviderDetail: data.suretyProviderDetail ? data.suretyProviderDetail : undefined,
                suretyProviderContact: data.suretyProviderContact ? data.suretyProviderContact : undefined,
                stageOfCase: data.stageOfCase ? data.stageOfCase : undefined,
                additionalRemarks: data.additionalRemarks ? data.additionalRemarks : undefined,
            });
            // setSearch(data.criminal ? data.criminal.id.toString() : "");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, props.type, props.status]);

    const onSelectHandler = (value: number) => form.setFieldValue('criminalId', value)
    const onCrimeSelectHandler = (value: number) => form.setFieldValue('crimeId', value)
    
    const onSubmit = async () => {
        const courtMutateOptions:courtMutateOptionsType = {
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
            await updateCourt.mutateAsync({...form.values, crimeId: form.values.crimeId ? Number(form.values.crimeId) : undefined, criminalId: form.values.criminalId ? Number(form.values.criminalId) : undefined} as CourtFormType, courtMutateOptions);
        }else{
            await addCourt.mutateAsync({...form.values, crimeId: form.values.crimeId ? Number(form.values.crimeId) : undefined, criminalId: form.values.criminalId ? Number(form.values.criminalId) : undefined} as CourtFormType, courtMutateOptions);
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
                    <TextInput withAsterisk label="Court Name" {...form.getInputProps('courtName')} />
                    <TextInput label="Attendance" {...form.getInputProps('attendance')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
                    <TextInput label="CC/SC No." {...form.getInputProps('ccScNo')} />
                    <TextInput label="PS Name" {...form.getInputProps('psName')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 2}} mt="md">
                    <DateInput
                        value={form.values.hearingDate ? new Date(form.values.hearingDate) : undefined}
                        onChange={(value) => form.setFieldValue('hearingDate', value?.toISOString())}
                        label="Hearing Date"
                        placeholder="Hearing Date"
                    />
                    <DateInput
                        value={form.values.nextHearingDate ? new Date(form.values.nextHearingDate) : undefined}
                        onChange={(value) => form.setFieldValue('nextHearingDate', value?.toISOString())}
                        label="Next Hearing Date"
                        placeholder="Next Hearing Date"
                    />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
                    <TextInput label="Lawyer Name" {...form.getInputProps('lawyerName')} />
                    <TextInput label="Lawyer Contact" {...form.getInputProps('lawyerContact')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
                    <TextInput label="Surety Provider Detail" {...form.getInputProps('suretyProviderDetail')} />
                    <TextInput label="Surety Provider Contact" {...form.getInputProps('suretyProviderContact')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
                    <TextInput label="Stage Of Case" {...form.getInputProps('stageOfCase')} />
                    <TextInput label="Additional Remarks" {...form.getInputProps('additionalRemarks')} />
                </SimpleGrid>
                <Button type='submit' variant="filled" color='main' mt="lg" loading={props.type === "Create" ? addCourt.isPending : updateCourt.isPending} disabled={props.type === "Create" ? addCourt.isPending : updateCourt.isPending} data-disabled={props.type === "Create" ? addCourt.isPending : updateCourt.isPending}>
                    {props.type === "Create" ? "Create" : "Update"}
                </Button>
            </form>
        </ErrorBoundary>
    )
}

export default CourtForm