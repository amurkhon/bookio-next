import React from 'react';
import { Stack, Box} from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import BlurOnIcon from '@mui/icons-material/BlurOn';

import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { CssVarsProvider } from '@mui/joy/styles';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';

const EventCard = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <div>EVENT CARD</div>;
	} else {
		return (
			<CssVarsProvider>
			<Stack className={'card-box'}>
				<Stack className={'introduction'}>
					<Card
						className={'card'}
						variant="plain"
						orientation="horizontal"
					>
						<span className='img-field'></span>
						<AspectRatio ratio="1" sx={{ width: 90, borderRadius: "50%", marginLeft: '3px'}}>
							<img
							src={'/img/profile/defaultUser.svg'}
							loading="lazy"
							alt=""
							/>
						</AspectRatio>
						<CardContent>
							<Typography level="title-lg" id="card-description">
								Yosemite Park
							</Typography>
							<Typography
							level="body-sm"
							aria-describedby="card-description"
							sx={{ mb: 1 }}
							>
								California, USA
							</Typography>
						</CardContent>
					</Card>
				</Stack>
				<Stack className={'card-body'}>
					<Stack className={'feedback-purpose'}>
						<BlurOnIcon className={'icon'} sx={{ fontSize: 40, marginRight: '10px', color: '#e96d5a' }} />
						<Typography>Website adventages</Typography>
					</Stack>
					<Typography>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
						Cupiditate eligendi harum repellendus, similique ipsa ipsam amet. 
						Magni est magnam, dolorem molestiae vel pariatur, fugit, 
						velit minus quaerat maxime libero mollitia.
					</Typography>
				</Stack>
			</Stack>
			</CssVarsProvider>
		);
	}
};

const Events = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <div>EVENT CARD</div>;
	} else {
		return (
			<Stack className={'client-feedback'}>
				<Stack className={'container'}>
					<Box className={'title'}>
						Our Client's feedbacks
					</Box>
					<Stack className={'feedback-box'}>
						<Swiper
							className={'feedback-swiper'}
							slidesPerView={2}
							spaceBetween={10}
							modules={[Autoplay, Navigation, Pagination]}
							navigation={{
								nextEl: '.swiper-popular-next',
								prevEl: '.swiper-popular-prev',
							}}
							pagination={{
								el: '.swiper-popular-pagination',
							}}
						>
							{[1,2,3,4].map((ele, index) => {
								return (
									<SwiperSlide key={index} className={'feedback-slide'}>
										<EventCard />
									</SwiperSlide>
								);
							})}
						</Swiper>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default Events;
