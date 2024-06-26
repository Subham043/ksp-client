import {
    Container,
    Center,
    Grid,
    rem,
} from '@mantine/core';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import logo from '../../assets/logo.png'

const AuthLayout:FC = () => {

    return (
        <>
            <Container size='lg'>
                <Center maw='100%' w='100%' h='100%' mih='80vh' my={40}>
                    <Grid
                        justify="center"
                        align="center"
                        w='100%'
                    >
                        <Grid.Col span={{ base: 12, sm: 7, md: 5, lg: 5 }}>
                            <Center>
                                <img src={logo} alt="" style={{ width: rem(150) }} />
                            </Center>
                            <Outlet /> 
                        </Grid.Col>
                    </Grid>
                </Center>
            </Container>
        </>
    )
}

export default AuthLayout
