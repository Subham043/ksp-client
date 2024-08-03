import { FC, useState } from "react";
import { useToast } from "../../hooks/useToast";
import { useForm } from "@mantine/form";
import { yupResolver } from "mantine-form-yup-resolver";
import { Button, Drawer, PasswordInput } from "@mantine/core";
import { PasswordSchemaType, passwordSchema } from "./schema";
import { useAxios } from "../../hooks/useAxios";
import { api_routes } from "../../utils/api_routes";
import { isAxiosError } from "axios";
import { AxiosErrorResponseType } from "../../utils/types";
import { UserPasswordFormProps } from "../../pages/users";

const UserPasswordForm:FC<UserPasswordFormProps & {toggleDrawer: (value: UserPasswordFormProps) => void}> = (props) => {

    const {toastError, toastSuccess} = useToast();
    const { axios } = useAxios();
    const [loading, setLoading] = useState<boolean>(false);
    const form = useForm<PasswordSchemaType>({
        validate: yupResolver(passwordSchema),
    });

    
    const onSubmit = async () => {
        if(!props.status) return;
        setLoading(true);
        try {
            await axios.put(
                api_routes.users + `/password/${props.id}`,
                form.values
            );
            form.reset();
            setLoading(false);
            toastSuccess("Password Reset Successful");
            props.toggleDrawer({status: false});
        } catch (error) {
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
    };

    return (
        <Drawer opened={props.status} onClose={() => props.toggleDrawer({status: false})} position="right" title={"Reset Password"} overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}>
            <form onSubmit={form.onSubmit(onSubmit)}>
                <PasswordInput label="Password" placeholder="Password" withAsterisk mt="md" {...form.getInputProps('password')} />
                <PasswordInput label="Confirm Password" placeholder="Confirm password" withAsterisk mt="md" {...form.getInputProps('confirm_password')} />
                <Button type='submit' variant="filled" color='main' mt="lg" loading={loading} disabled={loading} data-disabled={loading}>
                    Reset
                </Button>
            </form>
        </Drawer>
    )
}

export default UserPasswordForm