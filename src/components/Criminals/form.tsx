import { FC, useEffect } from "react";
import { useToast } from "../../hooks/useToast";
import { useForm } from "@mantine/form";
import { yupResolver } from "mantine-form-yup-resolver";
import { Button, FileInput, Select, SimpleGrid, TextInput, Textarea } from "@mantine/core";
import { isAxiosError } from "axios";
import { useAddCriminalMutation, useUpdateCriminalMutation, useCriminalQuery } from "../../hooks/data/criminals";
import { MutateOptions } from "@tanstack/react-query";
import { AxiosErrorResponseType, CriminalFormType, CriminalType } from "../../utils/types";
import { CriminalsModalProps } from "../../pages/criminals/list";
import { SchemaType, initialValues, schema } from "./schema";
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
                permanent_address: data.permanent_address ? data.permanent_address : undefined,
                present_address: data.present_address ? data.present_address : undefined,
                phone: data.phone ? data.phone : undefined,
                aadhar_no: data.aadhar_no ? data.aadhar_no : undefined,
                aadhar_photo: undefined,
                photo: undefined,
                relation_name: data.relation_name ? data.relation_name : undefined,
                relation_type: data.relation_type ? data.relation_type : undefined,
                caste: data.caste ? data.caste : undefined,
                fpb_sl_no: data.fpb_sl_no ? data.fpb_sl_no : undefined,
                fpb_classn_no: data.fpb_classn_no ? data.fpb_classn_no : undefined,
                occupation: data.occupation ? data.occupation : undefined,
                educational_qualification: data.educational_qualification ? data.educational_qualification : undefined,
                native_ps: data.native_ps ? data.native_ps : undefined,
                native_district: data.native_district ? data.native_district : undefined,
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
                    <TextInput label="Aadhar No" {...form.getInputProps('aadhar_no')} />
                    <FileInput
                        label="Upload Aadhar Photo"
                        placeholder="Aadhar Photo file"
                        clearable
                        accept="image/png,image/jpeg,image/webp,image/jpg"
                        leftSection={<IconFileInfo size={16} />}
                        {...form.getInputProps('aadhar_photo')}
                    />
                    <TextInput label="Caste" {...form.getInputProps('caste')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
                    <TextInput label="Relation Name" {...form.getInputProps('relation_name')} />
                    <Select
                        label="Relation Type"
                        data={['Husband', 'Father', 'Wife', 'Mother']}
                        value={form.values.relation_type ? form.values.relation_type : null}
                        onChange={(value) => form.setFieldValue("relation_type", value ? value as "Husband" | "Father" : undefined)}
                    />
                    <TextInput label="Occupation" {...form.getInputProps('occupation')} />
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
                <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
                    <Textarea
                        label="Permenant Address"
                         {...form.getInputProps('permenant_address')}
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