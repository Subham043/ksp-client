import { FC, useEffect } from "react";
import { useToast } from "../../hooks/useToast";
import { useForm } from "@mantine/form";
import { yupResolver } from "mantine-form-yup-resolver";
import { DateInput } from '@mantine/dates';
import { Button, MultiSelect, Select, SimpleGrid, TextInput } from "@mantine/core";
import { isAxiosError } from "axios";
import { useAddCrimeMutation, useUpdateCrimeMutation, useCrimeQuery } from "../../hooks/data/crimes";
import { MutateOptions } from "@tanstack/react-query";
import { AxiosErrorResponseType, CrimeFormType, CrimeType } from "../../utils/types";
import { CrimesModalProps } from "../../pages/crimes/list";
import { CluesLeft, LanguagesKnown, PlaceAttacked, PropertiesAttacked, SchemaType, StyleAssumed, ToolsUsed, TradeMarks, TransportUsed, initialValues, schema } from "./schema";
import ErrorBoundary from "../Layout/ErrorBoundary";

type CrimeFormProps = CrimesModalProps;
type crimeMutateOptionsType = MutateOptions<CrimeType, Error, CrimeFormType, unknown>;

const CrimeForm:FC<CrimeFormProps & {toggleModal: (value: CrimesModalProps) => void}> = (props) => {

    const {toastError} = useToast();
    const {data, isFetching, isLoading, status, error, refetch} = useCrimeQuery(props.type === "Edit" ? props.id : 0, (props.type === "Edit" && props.status && props.id>0));
    const addCrime = useAddCrimeMutation()
    const updateCrime = useUpdateCrimeMutation(props.type === "Edit" ? props.id : 0)
    const form = useForm<SchemaType>({
        initialValues,
        validate: yupResolver(schema),
    });

    useEffect(() => {
        if(props.type === "Edit" && data && props.status){
            form.setValues({
                typeOfCrime: data.typeOfCrime ? data.typeOfCrime : undefined,
                sectionOfLaw: data.sectionOfLaw ? data.sectionOfLaw : undefined,
                mobFileNo: data.mobFileNo ? data.mobFileNo : undefined,
                firNo: data.firNo ? data.firNo : undefined,
                policeStation: data.policeStation ? data.policeStation : undefined,
                hsNo: data.hsNo ? data.hsNo : undefined,
                dateOfCrime: data.dateOfCrime ? data.dateOfCrime : undefined,
                hsOpeningDate: data.hsOpeningDate ? data.hsOpeningDate : undefined,
                hsClosingDate: data.hsClosingDate ? data.hsClosingDate : undefined,
                crimeGroup: data.crimeGroup ? data.crimeGroup : undefined,
                crimeHead: data.crimeHead ? data.crimeHead : undefined,
                crimeClass: data.crimeClass ? data.crimeClass : undefined,
                briefFact: data.briefFact ? data.briefFact : undefined,
                cluesLeft: data.cluesLeft ? data.cluesLeft : undefined,
                languagesKnown: data.languagesKnown ? data.languagesKnown : undefined,
                languagesUsed: data.languagesUsed ? data.languagesUsed : undefined,
                placeAttacked: data.placeAttacked ? data.placeAttacked : undefined,
                placeOfAssemblyAfterOffence: data.placeOfAssemblyAfterOffence ? data.placeOfAssemblyAfterOffence : undefined,
                placeOfAssemblyBeforeOffence: data.placeOfAssemblyBeforeOffence ? data.placeOfAssemblyBeforeOffence : undefined,
                propertiesAttacked: data.propertiesAttacked ? data.propertiesAttacked : undefined,
                styleAssumed: data.styleAssumed ? data.styleAssumed : undefined,
                toolsUsed: data.toolsUsed ? data.toolsUsed : undefined,
                tradeMarks: data.tradeMarks ? data.tradeMarks : undefined,
                transportUsedAfter: data.transportUsedAfter ? data.transportUsedAfter : undefined,
                transportUsedBefore: data.transportUsedBefore ? data.transportUsedBefore : undefined,
                gang: data.gang ? data.gang : "No",
                gangStrength: data.gangStrength ? data.gangStrength : undefined,
            });
            // setSearch(data.criminal ? data.criminal.id.toString() : "");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, props.type, props.status]);
    
    const onSubmit = async () => {
        const crimeMutateOptions:crimeMutateOptionsType = {
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
            await updateCrime.mutateAsync(form.values, crimeMutateOptions);
        }else{
            await addCrime.mutateAsync(form.values, crimeMutateOptions);
        }
    };

    return (
        <ErrorBoundary hasData={props.status && props.type==="Edit" ? (data ? true : false): true} isLoading={isLoading || isFetching} status={props.status && props.type==="Edit" ? status : "success"} error={error} hasPagination={false} refetch={refetch}>
            <form onSubmit={form.onSubmit(onSubmit)}>
                <SimpleGrid cols={{ base: 1, sm: 2 }}>
                    <TextInput withAsterisk label="Type of Crime" {...form.getInputProps('typeOfCrime')} />
                    <TextInput withAsterisk label="Section of Law" {...form.getInputProps('sectionOfLaw')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
                    <TextInput label="MOB. File No." {...form.getInputProps('mobFileNo')} />
                    <DateInput
                        value={form.values.dateOfCrime ? new Date(form.values.dateOfCrime) : undefined}
                        onChange={(value) => form.setFieldValue('dateOfCrime', value?.toISOString())}
                        label="Date Of Crime"
                        placeholder="Date Of Crime"
                    />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3}} mt="md">
                    <TextInput label="HS. No." {...form.getInputProps('hsNo')} />
                    <DateInput
                        value={form.values.hsOpeningDate ? new Date(form.values.hsOpeningDate) : undefined}
                        onChange={(value) => form.setFieldValue('hsOpeningDate', value?.toISOString())}
                        label="HS. Opening Date"
                        placeholder="HS. Opening Date"
                    />
                    <DateInput
                        value={form.values.hsClosingDate ? new Date(form.values.hsClosingDate) : undefined}
                        onChange={(value) => form.setFieldValue('hsClosingDate', value?.toISOString())}
                        label="HS. Closing Date"
                        placeholder="HS. Closing Date"
                    />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
                    <TextInput label="Brief Fact" {...form.getInputProps('briefFact')} />
                    <TextInput label="Police Station" {...form.getInputProps('policeStation')} />
                    <TextInput label="FIR No." {...form.getInputProps('firNo')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
                    <TextInput label="Crime Group" {...form.getInputProps('crimeGroup')} />
                    <TextInput label="Crime Head" {...form.getInputProps('crimeHead')} />
                    <TextInput label="Crime Class" {...form.getInputProps('crimeClass')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
                    <MultiSelect
                        label="Clues left at or Near the Scene of Occurrence"
                        placeholder="Type to search for Clues left at or Near the Scene of Occurrence"
                        maxDropdownHeight={200}
                        data={CluesLeft}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        error={form.errors.cluesLeft}
                        value={form.values.cluesLeft ? form.values.cluesLeft.split(",") : undefined}
                        onChange={(value)=>form.setFieldValue('cluesLeft', value ? value.join(",") : undefined)}
                    />
                    <MultiSelect
                        label="Languages Known"
                        placeholder="Type to search for Languages Known"
                        maxDropdownHeight={200}
                        data={LanguagesKnown}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        error={form.errors.languagesKnown}
                        value={form.values.languagesKnown ? form.values.languagesKnown.split(",") : undefined}
                        onChange={(value)=>form.setFieldValue('languagesKnown', value ? value.join(",") : undefined)}
                    />
                    <MultiSelect
                        label="Languages Used During the Offence"
                        placeholder="Type to search for Languages Used During the Offence"
                        maxDropdownHeight={200}
                        data={LanguagesKnown}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        error={form.errors.languagesUsed}
                        value={form.values.languagesUsed ? form.values.languagesUsed.split(",") : undefined}
                        onChange={(value)=>form.setFieldValue('languagesUsed', value ? value.join(",") : undefined)}
                    />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
                    <MultiSelect
                        label="Place Attacked"
                        placeholder="Type to search for Place Attacked"
                        maxDropdownHeight={200}
                        data={PlaceAttacked}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        error={form.errors.placeAttacked}
                        value={form.values.placeAttacked ? form.values.placeAttacked.split(",") : undefined}
                        onChange={(value)=>form.setFieldValue('placeAttacked', value ? value.join(",") : undefined)}
                    />
                    <MultiSelect
                        label="Place Of Assembly After Offence"
                        placeholder="Type to search for Place Of Assembly After Offence"
                        maxDropdownHeight={200}
                        data={PlaceAttacked}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        error={form.errors.placeOfAssemblyAfterOffence}
                        value={form.values.placeOfAssemblyAfterOffence ? form.values.placeOfAssemblyAfterOffence.split(",") : undefined}
                        onChange={(value)=>form.setFieldValue('placeOfAssemblyAfterOffence', value ? value.join(",") : undefined)}
                    />
                    <MultiSelect
                        label="Place Of Assembly Before Offence"
                        placeholder="Type to search for Place Of Assembly Before Offence"
                        maxDropdownHeight={200}
                        data={PlaceAttacked}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        error={form.errors.placeOfAssemblyBeforeOffence}
                        value={form.values.placeOfAssemblyBeforeOffence ? form.values.placeOfAssemblyBeforeOffence.split(",") : undefined}
                        onChange={(value)=>form.setFieldValue('placeOfAssemblyBeforeOffence', value ? value.join(",") : undefined)}
                    />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
                    <MultiSelect
                        label="Properties Attacked/Stolen"
                        placeholder="Type to search for Properties Attacked/Stolen"
                        maxDropdownHeight={200}
                        data={PropertiesAttacked}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        error={form.errors.propertiesAttacked}
                        value={form.values.propertiesAttacked ? form.values.propertiesAttacked.split(",") : undefined}
                        onChange={(value)=>form.setFieldValue('propertiesAttacked', value ? value.join(",") : undefined)}
                    />
                    <MultiSelect
                        label="Style Assumed"
                        placeholder="Type to search for Style Assumed"
                        maxDropdownHeight={200}
                        data={StyleAssumed}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        error={form.errors.styleAssumed}
                        value={form.values.styleAssumed ? form.values.styleAssumed.split(",") : undefined}
                        onChange={(value)=>form.setFieldValue('styleAssumed', value ? value.join(",") : undefined)}
                    />
                    <MultiSelect
                        label="Tools/Weapons Used"
                        placeholder="Type to search for Tools/Weapons Used"
                        maxDropdownHeight={200}
                        data={ToolsUsed}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        error={form.errors.toolsUsed}
                        value={form.values.toolsUsed ? form.values.toolsUsed.split(",") : undefined}
                        onChange={(value)=>form.setFieldValue('toolsUsed', value ? value.join(",") : undefined)}
                    />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
                    <MultiSelect
                        label="Trade Marks"
                        placeholder="Type to search for Trade Marks"
                        maxDropdownHeight={200}
                        data={TradeMarks}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        error={form.errors.tradeMarks}
                        value={form.values.tradeMarks ? form.values.tradeMarks.split(",") : undefined}
                        onChange={(value)=>form.setFieldValue('tradeMarks', value ? value.join(",") : undefined)}
                    />
                    <MultiSelect
                        label="Transport Used After"
                        placeholder="Type to search for Transport Used After"
                        maxDropdownHeight={200}
                        data={TransportUsed}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        error={form.errors.transportUsedAfter}
                        value={form.values.transportUsedAfter ? form.values.transportUsedAfter.split(",") : undefined}
                        onChange={(value)=>form.setFieldValue('transportUsedAfter', value ? value.join(",") : undefined)}
                    />
                    <MultiSelect
                        label="Transport Used Before"
                        placeholder="Type to search for Transport Used Before"
                        maxDropdownHeight={200}
                        data={TransportUsed}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        error={form.errors.transportUsedBefore}
                        value={form.values.transportUsedBefore ? form.values.transportUsedBefore.split(",") : undefined}
                        onChange={(value)=>form.setFieldValue('transportUsedBefore', value ? value.join(",") : undefined)}
                    />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
                    <Select
                        label="Gang"
                        data={['Yes', 'No']}
                        value={form.values.gang ? form.values.gang : null}
                        onChange={(value) => form.setFieldValue("gang", value ? value as 'Yes' | 'No' : "No")}
                    />
                    <TextInput label="Gang Strength" {...form.getInputProps('gangStrength')} disabled={form.values.gang === "No"} />
                </SimpleGrid>
                <Button type='submit' variant="filled" color='main' mt="lg" loading={props.type === "Create" ? addCrime.isPending : updateCrime.isPending} disabled={props.type === "Create" ? addCrime.isPending : updateCrime.isPending} data-disabled={props.type === "Create" ? addCrime.isPending : updateCrime.isPending}>
                    {props.type === "Create" ? "Create" : "Update"}
                </Button>
            </form>
        </ErrorBoundary>
    )
}

export default CrimeForm