import { FC, useEffect } from "react";
import { useToast } from "../../hooks/useToast";
import { useForm } from "@mantine/form";
import { yupResolver } from "mantine-form-yup-resolver";
import { Button, SimpleGrid, TextInput } from "@mantine/core";
import { isAxiosError } from "axios";
import { useAddVisitorMutation, useVisitorQuery, useUpdateVisitorMutation } from "../../hooks/data/visitors";
import { MutateOptions } from "@tanstack/react-query";
import { AxiosErrorResponseType, VisitorFormType, VisitorType } from "../../utils/types";
import { VisitorsListModalProps } from "../../pages/jails/visitors";
import { SchemaType, initialValues, schema } from "./schema";
import ErrorBoundary from "../Layout/ErrorBoundary";
import { DateInput } from "@mantine/dates";


type VisitorsFormProps = {
    status: boolean;
    type: "Create",
} | {
    status: boolean;
    type: "Edit";
    id: number;
}
type visitorsMutateOptionsType = MutateOptions<VisitorType, Error, VisitorFormType, unknown>;

const VisitorsForm:FC<VisitorsFormProps & {mainPunishmentId: number, toggleModal: (value: VisitorsListModalProps) => void}> = (props) => {

    const {toastError} = useToast();
    const {data, isFetching, isLoading, status, error,  refetch} = useVisitorQuery(props.type === "Edit" ? props.id : 0, (props.type === "Edit" && props.status && props.id>0));
    const addVisitors = useAddVisitorMutation(props.mainPunishmentId)
    const updateVisitors = useUpdateVisitorMutation(props.type === "Edit" ? props.id : 0, props.mainPunishmentId)
    const form = useForm<SchemaType>({
        initialValues,
        validate: yupResolver(schema),
    });
    
    useEffect(() => {
        if(props.type === "Edit" && data && props.status){
            form.setValues({
                name: data.name ? data.name : undefined,
                relation: data.relation ? data.relation : undefined,
                visitonDate: data.visitonDate ? data.visitonDate.toString() : undefined,
                additionalRemarks: data.additionalRemarks ? data.additionalRemarks : undefined,
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, props.type, props.status]);
    
    const onSubmit = async () => {
        const visitorsMutateOptions:visitorsMutateOptionsType = {
            onSuccess: () => {
                props.type==="Create" && form.reset();
                props.toggleModal({status: false, type: "Create", punishmentId: props.mainPunishmentId});
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
            await updateVisitors.mutateAsync(form.values as VisitorFormType, visitorsMutateOptions);
        }else{
            await addVisitors.mutateAsync(form.values as VisitorFormType, visitorsMutateOptions);
        }
    };

    return (
        <ErrorBoundary hasData={props.status && props.type==="Edit" ? (data ? true : false): true} isLoading={props.status && props.type==="Edit" ? (isLoading || isFetching) : (false)} status={props.status && props.type==="Edit" ? status : "success"} error={props.status && props.type==="Edit" ? error : undefined} hasPagination={false} refetch={props.status && props.type==="Edit" ? refetch : () => {}}>
            <form onSubmit={form.onSubmit(onSubmit)}>
                <SimpleGrid cols={{ base: 1, sm: 2 }}>
                    <TextInput data-autofocus withAsterisk label="Name" {...form.getInputProps('name')} />
                    <TextInput label="Relation" {...form.getInputProps('relation')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
                    <DateInput
                        value={form.values.visitonDate ? new Date(form.values.visitonDate) : undefined}
                        onChange={(value) => form.setFieldValue('visitonDate', value?.toISOString())}
                        label="Visiting Date"
                        placeholder="Visiting Date"
                    />
                    <TextInput label="Additional Remarks" {...form.getInputProps('additionalRemarks')} />
                </SimpleGrid>
                <Button type='submit' variant="filled" color='main' mt="lg" loading={props.type === "Create" ? addVisitors.isPending : updateVisitors.isPending} disabled={props.type === "Create" ? addVisitors.isPending : updateVisitors.isPending} data-disabled={props.type === "Create" ? addVisitors.isPending : updateVisitors.isPending}>
                    {props.type === "Create" ? "Create" : "Update"}
                </Button>
            </form>
        </ErrorBoundary>
    )
}

export default VisitorsForm