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

const FeedBackCard = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <div>EVENT CARD</div>;
	} else {
		return (
			<CssVarsProvider>
			<Stack className={'card-box'}>
				<Stack className={'introduction'}>
					<img
						src={'/img/profile/girl.svg'}
						loading="lazy"
						alt=""
					/>
					<Stack>
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
					</Stack>
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

const FeedBacks = () => {
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
							loop={true}
							speed={10000}
							spaceBetween={10}
							autoplay={{
								delay: 5000,
								disableOnInteraction: false,
							}}
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
										<FeedBackCard />
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

export default FeedBacks;
