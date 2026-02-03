import React from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import DiscountIcon from '@mui/icons-material/Discount';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const Information = () => {
    const device = useDeviceDetect();
    const router = useRouter();

    const infoItems = [
        {
            icon: <SecurityIcon className={'icon'} sx={{ fontSize: 40, color: 'white' }} />,
            title: 'Secure Payment',
            subtitle: '30% off by subscribing',
        },
        {
            icon: <SupportAgentIcon className={'icon'} sx={{ fontSize: 40, color: 'white' }} />,
            title: 'Quality Support',
            subtitle: 'Always online 24/7',
        },
        {
            icon: <DiscountIcon className={'icon'} sx={{ fontSize: 40, color: 'white' }} />,
            title: 'Daily Offers',
            subtitle: '20% off by subscribing',
        },
    ];

    if (device === 'mobile') {
        return (
            <Stack className="info-section-mobile">
                <Stack className="container">
                    {infoItems.map((item, index) => (
                        <Stack key={index} className="info-item-mobile">
                            <Box className="icon-box">
                                {item.icon}
                            </Box>
                            <Stack className="text-box">
                                <Typography className="title">{item.title}</Typography>
                                <span className="subtitle">{item.subtitle}</span>
                            </Stack>
                        </Stack>
                    ))}
                </Stack>
            </Stack>
        );
    }

    return (
        <Container className={'maininfo-box'}>
            {infoItems.map((item, index) => (
                <Stack key={index} className={'info-item'}>
                    <Box className={'icon-box'}>
                        {item.icon}
                    </Box>
                    <Stack>
                        <Typography sx={{ fontSize: '25px', fontWeight: '600' }}>
                            {item.title}
                        </Typography>
                        <span>{item.subtitle}</span>
                    </Stack>
                </Stack>
            ))}
        </Container>
    );
};

export default Information;
