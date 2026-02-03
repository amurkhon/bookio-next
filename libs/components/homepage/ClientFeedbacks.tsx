import React, { useState, useEffect } from 'react';
import { Stack, Box, Typography, Rating } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';

import 'swiper/css';
import 'swiper/css/pagination';

const userOpinions = [
	{
		name: 'Alan Wolker',
		image: '/img/profile/feature-author.jpg',
		address: 'South Korea, Daegu',
		rating: 5,
		opinion: 'I love how shopping from Bookle supports my local bookstores! Plus, they have great deals and the books always arrive quickly.'
	},
	{
		name: 'Shari Lapena',
		image: '/img/profile/feature-author-1-3.jpg',
		address: 'USA, California',
		rating: 4,
		opinion: 'Perfectly fine online bookstore. You pay a little for that—shipping charges and relatively slow delivery. But then, you seldom need a book next day. I try to relax into it.'
	},
	{
		name: 'Sharly Bon',
		image: '/img/profile/secondGirl.jpg',
		address: 'England, Manchester',
		rating: 5,
		opinion: 'I love that I was able to support one of my favorite local independent bookstores and still get the books I wanted. I even found a few books that I haven\'t been able to find at the bigger retail bookstores!'
	},
	{
		name: 'Akramjonov Amurkhon',
		image: '/img/profile/feature-author-1-6.jpg',
		address: 'Uzbekistan, Tashkent',
		rating: 5,
		opinion: 'An author led me to this company and I love the vision and mission. It was easy to order online and my books showed up when expected.'
	},
];

interface FeedBackCardProps {
	opinion: typeof userOpinions[0];
}

const FeedBackCard = ({ opinion }: FeedBackCardProps) => {
	return (
		<Stack className="feedback-card-modern">
			<Box className="quote-icon">
				<FormatQuoteIcon />
			</Box>
			<Typography className="feedback-text">
				"{opinion?.opinion}"
			</Typography>
			<Rating 
				value={opinion?.rating} 
				readOnly 
				size="small" 
				className="rating"
			/>
			<Stack className="user-info">
				<img
					src={opinion?.image}
					loading="lazy"
					alt={opinion?.name}
					className="user-avatar"
				/>
				<Stack className="user-details">
					<Typography className="user-name">
						{opinion?.name}
					</Typography>
					<Typography className="user-location">
						{opinion?.address}
					</Typography>
				</Stack>
			</Stack>
		</Stack>
	);
};

const FeedBacks = () => {
	const device = useDeviceDetect();
	const [isMounted, setIsMounted] = useState(false);

	// Prevent hydration mismatch by only enabling loop/autoplay after mount
	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (device === 'mobile') {
		return (
			<Stack className="client-feedback-modern mobile">
				<Stack className="container">
					<Stack className="section-header">
						<Typography variant="overline" className="subtitle">
							Testimonials
						</Typography>
						<Typography variant="h5" className="title">
							What Our Readers Say
						</Typography>
					</Stack>
					<Swiper
						key={isMounted ? 'mounted-mobile' : 'ssr-mobile'}
						className="feedback-swiper-mobile"
						slidesPerView={1}
						spaceBetween={20}
						centeredSlides={true}
						pagination={{ clickable: true }}
						autoplay={isMounted ? { delay: 5000, disableOnInteraction: false } : false}
						modules={[Autoplay, Pagination]}
					>
						{userOpinions.map((opinion, index) => (
							<SwiperSlide key={index}>
								<FeedBackCard opinion={opinion} />
							</SwiperSlide>
						))}
					</Swiper>
				</Stack>
			</Stack>
		);
	}

	return (
		<Stack className="client-feedback-modern">
			<Stack className="container">
				<Stack className="section-header">
					<Typography variant="overline" className="subtitle">
						Testimonials
					</Typography>
					<Typography variant="h3" className="title">
						What Our Readers Say
					</Typography>
					<Typography className="description">
						Hear from our community of book lovers about their experience
					</Typography>
				</Stack>
				<Box className="swiper-container">
					<Box className="nav-btn prev swiper-feedback-prev">
						<WestIcon />
					</Box>
					<Swiper
						key={isMounted ? 'mounted-desktop' : 'ssr-desktop'}
						className="feedback-swiper"
						slidesPerView={1}
						spaceBetween={30}
						loop={isMounted}
						autoplay={isMounted ? { delay: 5000, disableOnInteraction: false } : false}
						pagination={{ clickable: true, el: '.swiper-feedback-pagination' }}
						navigation={{
							nextEl: '.swiper-feedback-next',
							prevEl: '.swiper-feedback-prev',
						}}
						breakpoints={{
							640: { slidesPerView: 1 },
							768: { slidesPerView: 2 },
							1024: { slidesPerView: 2 },
							1280: { slidesPerView: 3 },
						}}
						modules={[Autoplay, Navigation, Pagination]}
					>
						{userOpinions.map((opinion, index) => (
							<SwiperSlide key={index}>
								<FeedBackCard opinion={opinion} />
							</SwiperSlide>
						))}
					</Swiper>
					<Box className="nav-btn next swiper-feedback-next">
						<EastIcon />
					</Box>
				</Box>
				<Box className="swiper-feedback-pagination" />
			</Stack>
		</Stack>
	);
};

export default FeedBacks;
