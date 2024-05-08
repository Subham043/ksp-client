import { FC, useEffect, useState } from "react";
import { useToast } from "../../hooks/useToast";
import { useForm } from "@mantine/form";
import { yupResolver } from "mantine-form-yup-resolver";
import { DateInput } from '@mantine/dates';
import { Button, Select, SimpleGrid, TextInput } from "@mantine/core";
import { isAxiosError } from "axios";
import { useAddCrimeMutation, useUpdateCrimeMutation, useCrimeQuery } from "../../hooks/data/crimes";
import { MutateOptions } from "@tanstack/react-query";
import { AxiosErrorResponseType, CrimeFormType, CrimeType } from "../../utils/types";
import { CrimesModalProps } from "../../pages/crimes/list";
import { SchemaType, initialValues, schema } from "./schema";
import ErrorBoundary from "../Layout/ErrorBoundary";
import debounce from "lodash.debounce";
import { useCriminalsSelectQuery } from "../../hooks/data/criminals";

type CrimeFormProps = CrimesModalProps;
type crimeMutateOptionsType = MutateOptions<CrimeType, Error, CrimeFormType, unknown>;

const CrimeForm:FC<CrimeFormProps & {toggleModal: (value: CrimesModalProps) => void}> = (props) => {

    const {toastError} = useToast();
    const [search, setSearch] = useState<string>("");
    const {data, isFetching, isLoading, status, error, refetch} = useCrimeQuery(props.type === "Edit" ? props.id : 0, (props.type === "Edit" && props.status && props.id>0));
    const {data:criminals, isFetching:isCriminalFetching, isLoading:isCriminalLoading} = useCriminalsSelectQuery({search: search, enabled:props.status, page: 1, limit: 100});
    const searchHandler = debounce((value: string) => setSearch(value), 500);
    const addCrime = useAddCrimeMutation()
    const updateCrime = useUpdateCrimeMutation(props.type === "Edit" ? props.id : 0)
    const form = useForm<SchemaType>({
        initialValues,
        validate: yupResolver(schema),
    });
    
    useEffect(() => {
        if(props.type === "Edit" && data && props.status){
            setSearch(data.criminal ? data.criminal.toString() : "");
            form.setValues({
                criminal: data.criminal ? data.criminal : undefined,
                typeOfCrime: data.typeOfCrime ? data.typeOfCrime : undefined,
                sectionOfLaw: data.sectionOfLaw ? data.sectionOfLaw : undefined,
                mobFileNo: data.mobFileNo ? data.mobFileNo : undefined,
                hsNo: data.hsNo ? data.hsNo : undefined,
                hsOpeningDate: data.hsOpeningDate ? data.hsOpeningDate : undefined,
                hsClosingDate: data.hsClosingDate ? data.hsClosingDate : undefined,
                aliases: data.aliases ? data.aliases : undefined,
                ageWhileOpening: data.ageWhileOpening ? data.ageWhileOpening : undefined,
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
                voice: data.voice ? data.voice : undefined,
                build: data.build ? data.build : undefined,
                complexion: data.complexion ? data.complexion : undefined,
                teeth: data.teeth ? data.teeth : undefined,
                hair: data.hair ? data.hair : undefined,
                eyes: data.eyes ? data.eyes : undefined,
                habbits: data.habbits ? data.habbits : undefined,
                burnMarks: data.burnMarks ? data.burnMarks : undefined,
                tattoo: data.tattoo ? data.tattoo : undefined,
                mole: data.mole ? data.mole : undefined,
                scar: data.scar ? data.scar : undefined,
                leucoderma: data.leucoderma ? data.leucoderma : undefined,
                faceHead: data.faceHead ? data.faceHead : undefined,
                otherPartsBody: data.otherPartsBody ? data.otherPartsBody : undefined,
                dressUsed: data.dressUsed ? data.dressUsed : undefined,
                beard: data.beard ? data.beard : undefined,
                face: data.face ? data.face : undefined,
                moustache: data.moustache ? data.moustache : undefined,
                nose: data.nose ? data.nose : undefined,
                gang: data.gang ? data.gang : "No",
                gangStength: data.gangStength ? data.gangStength : undefined,
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, props.type, props.status]);

    const onSelectHandler = (value: string | null) => form.setFieldValue('criminal', value ? Number(value) : 0)
    
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
                    <Select
                        label="Criminal"
                        placeholder="Type to search for criminal"
                        maxDropdownHeight={200}
                        data={(criminals && criminals.criminal.length > 0) ? criminals.criminal.map((item) => ({label: `${item.name}`, value: item.id ? item.id.toString() : ""})) : []}
                        searchable
                        clearable
                        nothingFoundMessage="Nothing found..."
                        disabled={isCriminalFetching || isCriminalLoading}
                        error={form.errors.criminal}
                        value={form.values.criminal ? form.values.criminal.toString() : undefined}
                        onChange={onSelectHandler}
                        onSearchChange={searchHandler}
                    />
                    <TextInput label="MOB. File No." {...form.getInputProps('mobFileNo')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
                    <TextInput withAsterisk label="Type of Crime" {...form.getInputProps('typeOfCrime')} />
                    <TextInput withAsterisk label="Section of Law" {...form.getInputProps('sectionOfLaw')} />
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
                    <TextInput label="Aliases" {...form.getInputProps('aliases')} />
                    <TextInput label="Age While Opening" {...form.getInputProps('ageWhileOpening')} />
                    <TextInput label="Brief Fact" {...form.getInputProps('briefFact')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
                    <TextInput label="Crime Group" {...form.getInputProps('crimeGroup')} />
                    <TextInput label="Crime Head" {...form.getInputProps('crimeHead')} />
                    <TextInput label="Crime Class" {...form.getInputProps('crimeClass')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
                    <TextInput label="Clues Left" {...form.getInputProps('cluesLeft')} />
                    <TextInput label="Languages Known" {...form.getInputProps('languagesKnown')} />
                    <TextInput label="Languages Used" {...form.getInputProps('languagesUsed')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
                    <TextInput label="Place Attacked" {...form.getInputProps('placeAttacked')} />
                    <TextInput label="Place Of Assembly After Offence" {...form.getInputProps('placeOfAssemblyAfterOffence')} />
                    <TextInput label="Place Of Assembly Before Offence" {...form.getInputProps('placeOfAssemblyBeforeOffence')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
                    <TextInput label="Properties Attacked" {...form.getInputProps('propertiesAttacked')} />
                    <TextInput label="Style Assumed" {...form.getInputProps('styleAssumed')} />
                    <TextInput label="Tools Used" {...form.getInputProps('toolsUsed')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
                    <TextInput label="Trade Marks" {...form.getInputProps('tradeMarks')} />
                    <TextInput label="Transport Used After" {...form.getInputProps('transportUsedAfter')} />
                    <TextInput label="Transport Used Before" {...form.getInputProps('transportUsedBefore')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
                    <TextInput label="Voice" {...form.getInputProps('voice')} />
                    <TextInput label="Build" {...form.getInputProps('build')} />
                    <TextInput label="Complexion" {...form.getInputProps('complexion')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
                    <TextInput label="Teeth" {...form.getInputProps('teeth')} />
                    <TextInput label="Hair" {...form.getInputProps('hair')} />
                    <TextInput label="Eyes" {...form.getInputProps('eyes')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
                    <TextInput label="Habits" {...form.getInputProps('habbits')} />
                    <TextInput label="Burn Marks" {...form.getInputProps('burnMarks')} />
                    <TextInput label="Tattoo" {...form.getInputProps('tattoo')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
                    <TextInput label="Mole" {...form.getInputProps('mole')} />
                    <TextInput label="Scar" {...form.getInputProps('scar')} />
                    <TextInput label="Leucoderma" {...form.getInputProps('leucoderma')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
                    <TextInput label="Face/Head" {...form.getInputProps('faceHead')} />
                    <TextInput label="Other Parts of Body" {...form.getInputProps('otherPartsBody')} />
                    <TextInput label="Dress Used" {...form.getInputProps('dressUsed')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
                    <TextInput label="Beard" {...form.getInputProps('beard')} />
                    <TextInput label="Face" {...form.getInputProps('face')} />
                    <TextInput label="Moustache" {...form.getInputProps('moustache')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
                    <TextInput label="Nose" {...form.getInputProps('nose')} />
                    <Select
                        label="Gang"
                        data={['Yes', 'No']}
                        value={form.values.gang ? form.values.gang : null}
                        onChange={(value) => form.setFieldValue("gang", value ? value as 'Yes' | 'No' : "No")}
                    />
                    <TextInput label="Gang Strength" {...form.getInputProps('gangStrength')} />
                </SimpleGrid>
                <Button type='submit' variant="filled" color='main' mt="lg" loading={props.type === "Create" ? addCrime.isPending : updateCrime.isPending} disabled={props.type === "Create" ? addCrime.isPending : updateCrime.isPending} data-disabled={props.type === "Create" ? addCrime.isPending : updateCrime.isPending}>
                    {props.type === "Create" ? "Create" : "Update"}
                </Button>
            </form>
        </ErrorBoundary>
    )
}

export default CrimeForm