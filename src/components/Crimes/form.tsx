import { FC, useEffect, useState } from "react";
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
import { Beard, Build, BurnMarks, CluesLeft, Complexion, DressUsed, Eyes, Face, FaceHead, Habbits, Hair, LanguagesKnown, Leucoderma, Mole, Moustaches, Nose, OtherParts, PlaceAttacked, PropertiesAttacked, Scar, SchemaType, StyleAssumed, Tattoo, Teeth, ToolsUsed, TradeMarks, TransportUsed, Voice, initialValues, schema } from "./schema";
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
                gangStrength: data.gangStrength ? data.gangStrength : undefined,
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
                <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
                    <MultiSelect
                        label="Voice/Speech"
                        placeholder="Type to search for Voice/Speech"
                        maxDropdownHeight={200}
                        data={Voice}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        error={form.errors.voice}
                        value={form.values.voice ? form.values.voice.split(",") : undefined}
                        onChange={(value)=>form.setFieldValue('voice', value ? value.join(",") : undefined)}
                    />
                    <MultiSelect
                        label="Build"
                        placeholder="Type to search for Build"
                        maxDropdownHeight={200}
                        data={Build}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        error={form.errors.build}
                        value={form.values.build ? form.values.build.split(",") : undefined}
                        onChange={(value)=>form.setFieldValue('build', value ? value.join(",") : undefined)}
                    />
                    <MultiSelect
                        label="Complexion"
                        placeholder="Type to search for Complexion"
                        maxDropdownHeight={200}
                        data={Complexion}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        error={form.errors.complexion}
                        value={form.values.complexion ? form.values.complexion.split(",") : undefined}
                        onChange={(value)=>form.setFieldValue('complexion', value ? value.join(",") : undefined)}
                    />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
                    <MultiSelect
                        label="Teeth"
                        placeholder="Type to search for Teeth"
                        maxDropdownHeight={200}
                        data={Teeth}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        error={form.errors.teeth}
                        value={form.values.teeth ? form.values.teeth.split(",") : undefined}
                        onChange={(value)=>form.setFieldValue('teeth', value ? value.join(",") : undefined)}
                    />
                    <MultiSelect
                        label="Hair"
                        placeholder="Type to search for Hair"
                        maxDropdownHeight={200}
                        data={Hair}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        error={form.errors.hair}
                        value={form.values.hair ? form.values.hair.split(",") : undefined}
                        onChange={(value)=>form.setFieldValue('hair', value ? value.join(",") : undefined)}
                    />
                    <MultiSelect
                        label="Eyes"
                        placeholder="Type to search for Eyes"
                        maxDropdownHeight={200}
                        data={Eyes}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        error={form.errors.eyes}
                        value={form.values.eyes ? form.values.eyes.split(",") : undefined}
                        onChange={(value)=>form.setFieldValue('eyes', value ? value.join(",") : undefined)}
                    />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
                    <MultiSelect
                        label="Habits And Vices"
                        placeholder="Type to search for Habits And Vices"
                        maxDropdownHeight={200}
                        data={Habbits}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        error={form.errors.habbits}
                        value={form.values.habbits ? form.values.habbits.split(",") : undefined}
                        onChange={(value)=>form.setFieldValue('habbits', value ? value.join(",") : undefined)}
                    />
                    <MultiSelect
                        label="Burn Marks"
                        placeholder="Type to search for Burn Marks"
                        maxDropdownHeight={200}
                        data={BurnMarks}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        error={form.errors.burnMarks}
                        value={form.values.burnMarks ? form.values.burnMarks.split(",") : undefined}
                        onChange={(value)=>form.setFieldValue('burnMarks', value ? value.join(",") : undefined)}
                    />
                    <MultiSelect
                        label="Tattoo"
                        placeholder="Type to search for Tattoo"
                        maxDropdownHeight={200}
                        data={Tattoo}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        error={form.errors.tattoo}
                        value={form.values.tattoo ? form.values.tattoo.split(",") : undefined}
                        onChange={(value)=>form.setFieldValue('tattoo', value ? value.join(",") : undefined)}
                    />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
                    <MultiSelect
                        label="Mole"
                        placeholder="Type to search for Mole"
                        maxDropdownHeight={200}
                        data={Mole}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        error={form.errors.mole}
                        value={form.values.mole ? form.values.mole.split(",") : undefined}
                        onChange={(value)=>form.setFieldValue('mole', value ? value.join(",") : undefined)}
                    />
                    <MultiSelect
                        label="Scar"
                        placeholder="Type to search for Scar"
                        maxDropdownHeight={200}
                        data={Scar}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        error={form.errors.scar}
                        value={form.values.scar ? form.values.scar.split(",") : undefined}
                        onChange={(value)=>form.setFieldValue('scar', value ? value.join(",") : undefined)}
                    />
                    <MultiSelect
                        label="Leucoderma"
                        placeholder="Type to search for Leucoderma"
                        maxDropdownHeight={200}
                        data={Leucoderma}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        error={form.errors.leucoderma}
                        value={form.values.leucoderma ? form.values.leucoderma.split(",") : undefined}
                        onChange={(value)=>form.setFieldValue('leucoderma', value ? value.join(",") : undefined)}
                    />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
                    <MultiSelect
                        label="Face/Head"
                        placeholder="Type to search for Face/Head"
                        maxDropdownHeight={200}
                        data={FaceHead}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        error={form.errors.faceHead}
                        value={form.values.faceHead ? form.values.faceHead.split(",") : undefined}
                        onChange={(value)=>form.setFieldValue('faceHead', value ? value.join(",") : undefined)}
                    />
                    <MultiSelect
                        label="Other Parts of Body"
                        placeholder="Type to search for Other Parts of Body"
                        maxDropdownHeight={200}
                        data={OtherParts}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        error={form.errors.otherPartsBody}
                        value={form.values.otherPartsBody ? form.values.otherPartsBody.split(",") : undefined}
                        onChange={(value)=>form.setFieldValue('otherPartsBody', value ? value.join(",") : undefined)}
                    />
                    <MultiSelect
                        label="Dress Used"
                        placeholder="Type to search for Dress Used"
                        maxDropdownHeight={200}
                        data={DressUsed}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        error={form.errors.dressUsed}
                        value={form.values.dressUsed ? form.values.dressUsed.split(",") : undefined}
                        onChange={(value)=>form.setFieldValue('dressUsed', value ? value.join(",") : undefined)}
                    />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
                    <MultiSelect
                        label="Beard"
                        placeholder="Type to search for Beard"
                        maxDropdownHeight={200}
                        data={Beard}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        error={form.errors.beard}
                        value={form.values.beard ? form.values.beard.split(",") : undefined}
                        onChange={(value)=>form.setFieldValue('beard', value ? value.join(",") : undefined)}
                    />
                    <MultiSelect
                        label="Face"
                        placeholder="Type to search for Face"
                        maxDropdownHeight={200}
                        data={Face}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        error={form.errors.face}
                        value={form.values.face ? form.values.face.split(",") : undefined}
                        onChange={(value)=>form.setFieldValue('face', value ? value.join(",") : undefined)}
                    />
                    <MultiSelect
                        label="Moustache"
                        placeholder="Type to search for Moustache"
                        maxDropdownHeight={200}
                        data={Moustaches}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        error={form.errors.moustache}
                        value={form.values.moustache ? form.values.moustache.split(",") : undefined}
                        onChange={(value)=>form.setFieldValue('moustache', value ? value.join(",") : undefined)}
                    />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
                    <MultiSelect
                        label="Nose"
                        placeholder="Type to search for Nose"
                        maxDropdownHeight={200}
                        data={Nose}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        error={form.errors.nose}
                        value={form.values.nose ? form.values.nose.split(",") : undefined}
                        onChange={(value)=>form.setFieldValue('nose', value ? value.join(",") : undefined)}
                    />
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