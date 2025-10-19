import { NextPage } from "next";
import useDeviceDetect from "../../libs/hooks/useDeviceDetect";
import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";
import { userVar } from "../../apollo/store";
import { Button, Divider, Stack } from "@mui/material";
import withLayoutFull from "../../libs/components/layout/LayoutFull";

import Box from '@mui/joy/Box';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import { CssVarsProvider, List } from "@mui/joy";
import Typography from '@mui/joy/Typography';
import { useRef } from "react";
import CloseIcon from '@mui/icons-material/Close';



const Notification: NextPage = () => {
    const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const router = useRouter();
    const scrollToRef = useRef();

    if(device === 'mobile') {
        return <div>Notifications</div>
    } else {
        return (
            <div className="notification-page" style={{marginTop: '150px', marginBottom: '50px'}}>
                <div className="container">
                    <Stack className={'notification-list'}>
                        <CssVarsProvider>
                            <Box sx={{ width: 300 }}>
                                <RadioGroup
                                    className={'controller'}
                                    aria-labelledby="storage-label"
                                    defaultValue=""
                                    size="sm"
                                    sx={{ gap: 1.5 }}
                                >
                                    <Sheet key={'all'} sx={{ width: "80px", height: "40px", p: 1, borderRadius: 'md', boxShadow: 'sm' }}>
                                        <Radio
                                            label={`All`}
                                            overlay
                                            disableIcon
                                            value={''}
                                            slotProps={{
                                                label: ({checked}: any) => ({
                                                sx: {
                                                    fontWeight: 'lg',
                                                    fontSize: 'md',
                                                    color: checked ? 'text.primary' : 'text.secondary',
                                                },
                                                }),
                                                action: ({checked}: any) => ({
                                                sx: (theme: any) => ({
                                                    ...(checked && {
                                                    '--variant-borderWidth': '2px',
                                                    '&&': {
                                                        // && to increase the specificity to win the base :hover styles
                                                        borderColor: theme.vars.palette.primary[400],
                                                    },
                                                    }),
                                                }),
                                                }),
                                            }}
                                        />
                                    </Sheet>
                                    <Sheet key={'raed'} sx={{width: "80px", height: "40px", p: 1, borderRadius: 'md', boxShadow: 'sm' }}>
                                        <Radio
                                            label={`Unread`}
                                            overlay
                                            disableIcon
                                            value={'WAIT'}
                                            slotProps={{
                                                label: ({checked}: any) => ({
                                                sx: {
                                                    fontWeight: 'lg',
                                                    fontSize: 'md',
                                                    color: checked ? 'text.primary' : 'text.secondary',
                                                },
                                                }),
                                                action: ({checked}: any) => ({
                                                sx: (theme: any) => ({
                                                    ...(checked && {
                                                    '--variant-borderWidth': '2px',
                                                    '&&': {
                                                        // && to increase the specificity to win the base :hover styles
                                                        borderColor: theme.vars.palette.primary[400],
                                                    },
                                                    }),
                                                }),
                                                }),
                                            }}
                                        />
                                    </Sheet>
                                </RadioGroup>
                            </Box>
                        </CssVarsProvider>
                        <Button variant={'outlined'} sx={{marginTop: '20px'}}>
                            Select all as read
                        </Button>
                        <Divider sx={{width: '100%', height: '1px', color: 'black', marginTop: '20px', marginBottom: '20px'}} />
                        <CssVarsProvider>
                            <List className={'list'}>
                                {[1,2,3,4,5,6,7,8,9].map((ele) => {
                                    return (
                                        <Stack className={'list-item'}>
                                            <Box className={'profile-img'}>
                                                <img
                                                    src="/img/profile/girl.svg"
                                                />
                                            </Box>
                                            <Box className={'inform'}>
                                                <Typography className={'title'}>
                                                    Commented
                                                </Typography>
                                                <span style={{position: 'absolute', right: '0px', top:'0px'}}> 18:20, 29.09.2025</span>
                                                <Typography>I liked your book because of its ...</Typography>
                                            </Box>
                                        </Stack>
                                    );
                                })}
                            </List>
                        </CssVarsProvider>
                    </Stack>
                    <Stack className={'notification-detail'}>
                        <Stack className={'header'}>
                            <Stack className={'notification-info'}>
                                <img src="/img/profile/defaultUser.svg" alt="" />
                                <Box>
                                    <Typography>Notification Title</Typography>
                                    <span>15:36, 23.06.2025</span>
                                </Box>
                            </Stack>
                            <CloseIcon variant={'lg'} />
                        </Stack>
                        <Box className={'main-body'}>
                            Full Stack Python kursi Django asoslari (YANGI) moduliga yangi Django yangi versiyalar bilan ishlash videodarsi qoʻshildi.
                        </Box>
                    </Stack>
                </div>
            </div>
        )
    }
}

export default withLayoutFull(Notification);