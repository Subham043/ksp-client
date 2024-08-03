import {
    Container,
    Center,
    Grid,
    rem,
} from '@mantine/core';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import logo from '../../assets/logo.png'
import powered from '../../assets/powered.png'

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
                            <Center mt={40}>
                                <div style={{textAlign: 'center'}}>
                                    <img src={powered} alt="" style={{ width: rem(100), margin: 'auto' }} />
                                    <h5 style={{ margin: '0px' }}>Powered by GANAKA LABS</h5>
                                    <p style={{ margin: '0px', fontSize: '13px', color: 'rgb(215 0 105)' }}>v1.0.1</p>
                                </div>
                            </Center>
                        </Grid.Col>
                    </Grid>
                </Center>
            </Container>
        </>
    )
}

export default AuthLayout
