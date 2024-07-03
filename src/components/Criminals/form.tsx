import { FC, useEffect } from "react";
import { useToast } from "../../hooks/useToast";
import { useForm } from "@mantine/form";
import { yupResolver } from "mantine-form-yup-resolver";
import { DateInput } from '@mantine/dates';
import { Button, FileInput, Select, SimpleGrid, TextInput, Textarea, MultiSelect } from "@mantine/core";
import { isAxiosError } from "axios";
import { useAddCriminalMutation, useUpdateCriminalMutation, useCriminalQuery } from "../../hooks/data/criminals";
import { MutateOptions } from "@tanstack/react-query";
import { AxiosErrorResponseType, CriminalFormType, CriminalType } from "../../utils/types";
import { CriminalsModalProps } from "../../pages/criminals/list";
import { Beard, Build, BurnMarks, Complexion, DressUsed, Eyes, Face, FaceHead, Habbits, Hair, Leucoderma, Mole, Moustaches, Nose, OtherParts, Scar, SchemaType, Tattoo, Teeth, Voice, initialValues, schema } from "./schema";
import ErrorBoundary from "../Layout/ErrorBoundary";
import { IconFileInfo, IconPhotoScan } from "@tabler/icons-react";

type CriminalFormProps = CriminalsModalProps;
type criminalMutateOptionsType = MutateOptions<CriminalType, Error, CriminalFormType, unknown>;

const CriminalForm:FC<CriminalFormProps & {toggleModal: (value: CriminalsModalProps) => void}> = (props) => {

    const {toastError} = useToast();
    const {data, isFetching, isLoading, status, error, refetch} = useCriminalQuery(props.type === "Edit" ? props.id : 0, (props.type === "Edit" && props.status && props.id>0));
    const addCriminal = useAddCriminalMutation()
    const updateCriminal = useUpdateCriminalMutation(props.type === "Edit" ? props.id : 0)
    const form = useForm<SchemaType>({
        initialValues,
        validate: yupResolver(schema),
    });
    
    useEffect(() => {
        if(props.type === "Edit" && data && props.status){
            form.setValues({
                name: data.name,
                sex: data.sex,
                dob: data.dob ? data.dob : undefined,
                permanent_address: data.permanent_address ? data.permanent_address : undefined,
                present_address: data.present_address ? data.present_address : undefined,
                phone: data.phone ? data.phone : undefined,
                aadhar_no: data.aadhar_no ? data.aadhar_no : undefined,
                aadhar_photo: undefined,
                photo: undefined,
                father_name: data.father_name ? data.father_name : undefined,
                mother_name: data.mother_name ? data.mother_name : undefined,
                spouse_name: data.spouse_name ? data.spouse_name : undefined,
                religion: data.religion ? data.religion : undefined,
                caste: data.caste ? data.caste : undefined,
                fpb_sl_no: data.fpb_sl_no ? data.fpb_sl_no : undefined,
                fpb_classn_no: data.fpb_classn_no ? data.fpb_classn_no : undefined,
                occupation: data.occupation ? data.occupation : undefined,
                educational_qualification: data.educational_qualification ? data.educational_qualification : undefined,
                native_ps: data.native_ps ? data.native_ps : undefined,
                native_district: data.native_district ? data.native_district : undefined,
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
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, props.type, props.status]);
    
    const onSubmit = async () => {
        const criminalMutateOptions:criminalMutateOptionsType = {
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
            await updateCriminal.mutateAsync(form.values, criminalMutateOptions);
        }else{
            await addCriminal.mutateAsync(form.values, criminalMutateOptions);
        }
    };

    return (
        <ErrorBoundary hasData={props.status && props.type==="Edit" ? (data ? true : false): true} isLoading={isLoading || isFetching} status={props.status && props.type==="Edit" ? status : "success"} error={error} hasPagination={false} refetch={refetch}>
            <form onSubmit={form.onSubmit(onSubmit)}>
                <SimpleGrid cols={{ base: 1, sm: 3 }}>
                    <TextInput withAsterisk label="Name" {...form.getInputProps('name')} />
                    <Select
                        label="Sex"
                        data={['Male', 'Female', 'Others']}
                        value={form.values.sex ? form.values.sex : null}
                        onChange={(value) => form.setFieldValue("sex", value ? value as 'Male' | 'Female' | 'Others' : "Male")}
                    />
                    <TextInput label="Phone" {...form.getInputProps('phone')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3}} mt="md">
                    <DateInput
                        value={form.values.dob ? new Date(form.values.dob) : undefined}
                        onChange={(value) => form.setFieldValue('dob', value?.toISOString())}
                        label="Date of Birth"
                        placeholder="Date of Birth"
                    />
                    <TextInput label="Aadhar No" {...form.getInputProps('aadhar_no')} />
                    <FileInput
                        label="Upload Aadhar Photo"
                        placeholder="Aadhar Photo file"
                        clearable
                        accept="image/png,image/jpeg,image/webp,image/jpg"
                        leftSection={<IconFileInfo size={16} />}
                        {...form.getInputProps('aadhar_photo')}
                    />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
                    <TextInput label="Religion" {...form.getInputProps('religion')} />
                    <TextInput label="Caste" {...form.getInputProps('caste')} />
                    <TextInput label="Occupation" {...form.getInputProps('occupation')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
                    <TextInput label="Father's Name" {...form.getInputProps('father_name')} />
                    <TextInput label="Mother's Name" {...form.getInputProps('mother_name')} />
                    <TextInput label="Spouse's Name" {...form.getInputProps('spouse_name')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
                    <TextInput label="Educational Qualification" {...form.getInputProps('educational_qualification')} />
                    <TextInput label="FPB Sl.No" {...form.getInputProps('fpb_sl_no')} />
                    <TextInput label="FPB Classn.No" {...form.getInputProps('fpb_classn_no')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
                    <TextInput label="Native PS" {...form.getInputProps('native_ps')} />
                    <TextInput label="Native District" {...form.getInputProps('native_district')} />
                    <FileInput
                        label="Upload Personal Photo"
                        placeholder="Personal Photo file"
                        clearable
                        accept="image/png,image/jpeg,image/webp,image/jpg"
                        leftSection={<IconPhotoScan size={16} />}
                        {...form.getInputProps('photo')}
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
                    <Textarea
                        label="Permenant Address"
                         {...form.getInputProps('permanent_address')}
                    />
                    <Textarea
                        label="Present Address"
                         {...form.getInputProps('present_address')}
                    />
                </SimpleGrid>
                <Button type='submit' variant="filled" color='main' mt="lg" loading={props.type === "Create" ? addCriminal.isPending : updateCriminal.isPending} disabled={props.type === "Create" ? addCriminal.isPending : updateCriminal.isPending} data-disabled={props.type === "Create" ? addCriminal.isPending : updateCriminal.isPending}>
                    {props.type === "Create" ? "Create" : "Update"}
                </Button>
            </form>
        </ErrorBoundary>
    )
}

export default CriminalForm