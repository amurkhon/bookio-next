import React, { useState, useEffect } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import Typography from '@mui/joy/Typography';
import { CssVarsProvider } from '@mui/joy/styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const userOpinions = [
	{
		name: 'Alan Wolker',
		image: '/img/profile/feature-author.jpg',
		address: 'South Korea, Daegu',
		opinion: 'I love how shopping from Bookle supports my local bookstores! Plus, they have great deals and the books always arrive quickly.'
	},
	{
		name: 'Shari Lapena',
		image: '/img/profile/feature-author-1-3.jpg',
		address: 'USA, California',
		opinion: 'Perfectly fine online bookstore. You pay a little for that—shipping charges and relatively slow delivery. But then, you seldom need a book next day. I try to relax into it.'
	},
	{
		name: 'Sharly Bon',
		image: '/img/profile/secondGirl.jpg',
		address: 'England, Manchester',
		opinion: 'I love that I was able to support one of my favorite local independent bookstores and still get the books I wanted. I even found a few books that I haven\'t been able to find at the bigger retail bookstores!'
	},
	{
		name: 'Akramjonov Amurkhon',
		image: '/img/profile/feature-author-1-6.jpg',
		address: 'Uzbekistan, Tashkent',
		opinion: 'An author led me to this company and I love the vision and mission. It was easy to order online and my books showed up when expected.'
	},
];

interface FeedBackCardProps {
	opinion: typeof userOpinions[0];
}

const FeedBackCard = ({ opinion }: FeedBackCardProps) => {
	return (
		<CssVarsProvider>
			<Stack className={'card-box'}>
				<Stack className={'introduction'}>
					<img
						src={opinion?.image}
						loading="lazy"
						alt={opinion?.name}
					/>
					<Stack>
						<Typography level="title-lg" id="card-description">
							{opinion?.name}
						</Typography>
						<Typography
							level="body-sm"
							aria-describedby="card-description"
							sx={{ mb: 1 }}
						>
							{opinion?.address}
						</Typography>
					</Stack>
				</Stack>
				<Stack className={'card-body'}>
					<Stack className={'feedback-purpose'}>
						<BlurOnIcon className={'icon'} sx={{ fontSize: 40, marginRight: '10px', color: '#42a5f5' }} />
						<Typography>User About Platform</Typography>
					</Stack>
					<Typography>
						{opinion?.opinion}
					</Typography>
				</Stack>
			</Stack>
		</CssVarsProvider>
	);
};

const FeedBacks = () => {
	const device = useDeviceDetect();
	const [isClient, setIsClient] = useState(false);
	const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.1 });

	// Fix hydration mismatch - only enable dynamic features after mount
	useEffect(() => {
		setIsClient(true);
	}, []);

	// Don't render Swiper until client-side to avoid hydration issues
	if (!isClient) {
		return (
			<Stack ref={sectionRef} className={`client-feedback ${isVisible ? 'animate-in' : ''}`}>
				<Stack className={'container'}>
					<Box className={'title'}>
						Our Client's feedbacks
					</Box>
					<Stack className={'feedback-box'}>
						<Stack direction="row" spacing={2} sx={{ width: '100%', justifyContent: 'center' }}>
							{userOpinions.slice(0, device === 'mobile' ? 1 : 2).map((opinion, index) => (
								<Box key={index} sx={{ flex: 1, maxWidth: device === 'mobile' ? '100%' : '50%' }}>
									<FeedBackCard opinion={opinion} />
								</Box>
							))}
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		);
	}

	if (device === 'mobile') {
		return (
			<Stack ref={sectionRef} className={`client-feedback ${isVisible ? 'animate-in' : ''}`}>
				<Stack className={'container'}>
					<Box className={'title'}>
						Our Client's feedbacks
					</Box>
					<Stack className={'feedback-box'}>
						<Swiper
							className={'feedback-swiper'}
							spaceBetween={10}
							slidesPerView={1}
							centeredSlides={true}
							modules={[Autoplay]}
							autoplay={{
								delay: 5000,
								disableOnInteraction: false,
							}}
						>
							{userOpinions.map((opinion, index) => (
								<SwiperSlide key={index} className={'feedback-slide'}>
									<FeedBackCard opinion={opinion} />
								</SwiperSlide>
							))}
						</Swiper>
					</Stack>
				</Stack>
			</Stack>
		);
	}

	return (
		<Stack ref={sectionRef} className={`client-feedback ${isVisible ? 'animate-in' : ''}`}>
			<Stack className={'container'}>
				<Box className={'title'}>
					Our Client's feedbacks
				</Box>
				<Stack className={'feedback-box'}>
					<Swiper
						className={'feedback-swiper'}
						slidesPerView={2}
						spaceBetween={20}
						autoplay={{
							delay: 5000,
							disableOnInteraction: false,
						}}
						breakpoints={{
							320: { slidesPerView: 1, spaceBetween: 10 },
							768: { slidesPerView: 2, spaceBetween: 15 },
							1024: { slidesPerView: 2, spaceBetween: 20 },
						}}
						modules={[Autoplay, Navigation, Pagination]}
						navigation={{
							nextEl: '.swiper-feedback-next',
							prevEl: '.swiper-feedback-prev',
						}}
					>
						{userOpinions.map((opinion, index) => (
							<SwiperSlide key={index} className={'feedback-slide'}>
								<FeedBackCard opinion={opinion} />
							</SwiperSlide>
						))}
					</Swiper>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default FeedBacks;
