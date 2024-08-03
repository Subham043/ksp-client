import {
    TextInput,
    PasswordInput,
    Checkbox,
    Paper,
    Title,
    Group,
    Button,
} from '@mantine/core';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { page_routes } from '../../../utils/page_routes';
import { yupResolver } from 'mantine-form-yup-resolver';
import * as yup from 'yup';
import { useForm } from '@mantine/form';
import api from '../../../utils/axios';
import { api_routes } from '../../../utils/api_routes';
import { useToast } from '../../../hooks/useToast';
import { UserType } from '../../../utils/types';
import { useUser } from '../../../hooks/useUser';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email'),
  password: yup
    .string()
    .required('Password is required')
});

const LoginPage:FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const {setUser} = useUser();
    const navigate = useNavigate();
    const from = page_routes.dashboard;
    const {toastError, toastSuccess} = useToast();
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: yupResolver(schema),
    });

    const onSubmit = async () => {
        setLoading(true);
        try {
            const response = await api.post<{data:UserType}>(api_routes.auth.login, form.values);
            setUser(response.data.data);
            toastSuccess("Login successful.");
            form.reset();
            navigate(from, {replace: true});
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
            if(error?.response?.data?.formErrors?.email){
                form.setFieldError('email', error.response.data.formErrors?.email[0]);
            }else if(error?.response?.data?.formErrors?.password){
                form.setFieldError('password', error.response.data.formErrors?.password[0]);
            }else if(error?.response?.data?.message){
                toastError(error.response.data.message);
            }else{
                toastError('Invalid credentials.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>

            <Title ta="center" style={{color: '#087593'}}>
                Welcome back!
            </Title>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={form.onSubmit(onSubmit)}>
                    <TextInput withAsterisk label="Email" placeholder="you@mantine.dev" {...form.getInputProps('email')} />
                    <PasswordInput withAsterisk label="Password" placeholder="Your password" mt="md" {...form.getInputProps('password')} />
                    <Group justify="space-between" mt="lg">
                        <Checkbox label="Remember me" />
                        {/* <Link to={page_routes.auth.forgot_password}>
                            <Anchor component="button" type='button' size="sm">
                                Forgot password?
                            </Anchor>
                        </Link> */}
                    </Group>
                    <Button type='submit' variant="filled" color='main' loading={loading} disabled={loading} data-disabled={loading} fullWidth mt="xl">
                        Sign in
                    </Button>
                </form>
            </Paper>
        </>
    )
}

export default LoginPage
