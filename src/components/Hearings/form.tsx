import { FC, useEffect } from "react";
import { useToast } from "../../hooks/useToast";
import { useForm } from "@mantine/form";
import { yupResolver } from "mantine-form-yup-resolver";
import { Button, SimpleGrid, TextInput } from "@mantine/core";
import { isAxiosError } from "axios";
import { useAddHearingMutation, useHearingQuery, useUpdateHearingMutation } from "../../hooks/data/hearings";
import { MutateOptions } from "@tanstack/react-query";
import { AxiosErrorResponseType, HearingFormType, HearingType } from "../../utils/types";
import { HearingsListModalProps } from "../../pages/courts/hearings";
import { SchemaType, initialValues, schema } from "./schema";
import ErrorBoundary from "../Layout/ErrorBoundary";
import { DateInput } from "@mantine/dates";


type HearingsFormProps = {
    status: boolean;
    type: "Create",
} | {
    status: boolean;
    type: "Edit";
    id: number;
}
type visitorsMutateOptionsType = MutateOptions<HearingType, Error, HearingFormType, unknown>;

const HearingsForm:FC<HearingsFormProps & {mainCourtId: number, toggleModal: (value: HearingsListModalProps) => void}> = (props) => {

    const {toastError} = useToast();
    const {data, isFetching, isLoading, status, error,  refetch} = useHearingQuery(props.type === "Edit" ? props.id : 0, (props.type === "Edit" && props.status && props.id>0));
    const addHearings = useAddHearingMutation(props.mainCourtId)
    const updateHearings = useUpdateHearingMutation(props.type === "Edit" ? props.id : 0, props.mainCourtId)
    const form = useForm<SchemaType>({
        initialValues,
        validate: yupResolver(schema),
    });
    
    useEffect(() => {
        if(props.type === "Edit" && data && props.status){
            form.setValues({
                judgeName: data.judgeName ? data.judgeName : undefined,
                actionCode: data.actionCode ? data.actionCode : undefined,
                attendance: data.attendance ? data.attendance : undefined,
                hearingDate: data.hearingDate ? data.hearingDate.toString() : undefined,
                nextHearingDate: data.nextHearingDate ? data.nextHearingDate.toString() : undefined,
                additionalRemarks: data.additionalRemarks ? data.additionalRemarks : undefined,
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, props.type, props.status]);
    
    const onSubmit = async () => {
        const visitorsMutateOptions:visitorsMutateOptionsType = {
            onSuccess: () => {
                props.type==="Create" && form.reset();
                props.toggleModal({status: false, type: "Create", courtDetailId: props.mainCourtId});
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
            await updateHearings.mutateAsync(form.values as HearingFormType, visitorsMutateOptions);
        }else{
            await addHearings.mutateAsync(form.values as HearingFormType, visitorsMutateOptions);
        }
    };

    return (
        <ErrorBoundary hasData={props.status && props.type==="Edit" ? (data ? true : false): true} isLoading={props.status && props.type==="Edit" ? (isLoading || isFetching) : (false)} status={props.status && props.type==="Edit" ? status : "success"} error={props.status && props.type==="Edit" ? error : undefined} hasPagination={false} refetch={props.status && props.type==="Edit" ? refetch : () => {}}>
            <form onSubmit={form.onSubmit(onSubmit)}>
                <SimpleGrid cols={{ base: 1, sm: 3 }}>
                    <TextInput data-autofocus withAsterisk label="Judge Name" {...form.getInputProps('judgeName')} />
                    <TextInput label="Action Code" {...form.getInputProps('actionCode')} />
                    <TextInput label="Attendance" {...form.getInputProps('attendance')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
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
                    <TextInput label="Additional Remarks" {...form.getInputProps('additionalRemarks')} />
                </SimpleGrid>
                <Button type='submit' variant="filled" color='main' mt="lg" loading={props.type === "Create" ? addHearings.isPending : updateHearings.isPending} disabled={props.type === "Create" ? addHearings.isPending : updateHearings.isPending} data-disabled={props.type === "Create" ? addHearings.isPending : updateHearings.isPending}>
                    {props.type === "Create" ? "Create" : "Update"}
                </Button>
            </form>
        </ErrorBoundary>
    )
}

export default HearingsForm