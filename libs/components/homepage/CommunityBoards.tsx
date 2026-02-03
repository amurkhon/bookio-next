import React, { useState } from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Box, Stack, Typography, Skeleton, Chip } from '@mui/material';
import CommunityCard from './CommunityCard';
import { BoardArticle } from '../../types/board-article/board-article';
import { GET_BOARD_ARTICLES } from '../../../apollo/user/query';
import { useQuery } from '@apollo/client';
import { T } from '../../types/common';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper';
import Moment from 'react-moment';
import extractTextOnly from '../../config';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const CommunityBoards = () => {
	const device = useDeviceDetect();
	const router = useRouter();
	const [searchCommunity, setSearchCommunity] = useState({
		page: 1,
		direction: 'DESC',
	});
	const [articles, setArticles] = useState<BoardArticle[]>([]);

	/** APOLLO REQUESTS **/
	const {
		loading: getNewsArticlesLoading,
		data: getNewsArticlesData,
		error: getNewsArticlesError,
		refetch: getNewsArticlesRefetch,		
	} = useQuery(GET_BOARD_ARTICLES, {
		fetchPolicy: "network-only",
		variables: { input: { ...searchCommunity, limit: 4, search: {} } },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setArticles(data?.getBoardArticles?.list);
		}
	});

	/* Handlers */
	const pushHandler = async () => {
		await router.push({ pathname: '/community' });
	};

	const pushDetailHandler = async (propertyCat: string, propertyId: string) => {
		await router.push({ pathname: '/community/detail', query: { articleCategory: propertyCat, id: propertyId } });
	};

	// Loading skeleton
	const LoadingSkeleton = () => (
		<Stack className="community-board-modern">
			<Stack className="container">
				<Skeleton variant="text" width={300} height={50} />
				<Stack className="community-grid" sx={{ mt: 4 }}>
					<Skeleton variant="rectangular" height={400} sx={{ borderRadius: 3 }} />
					<Stack gap={2}>
						{[1, 2, 3].map((i) => (
							<Skeleton key={i} variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
						))}
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);

	if (getNewsArticlesLoading) return <LoadingSkeleton />;

	if (device === 'mobile') {
		return (
			<Stack className="community-board-modern mobile">
				<Stack className="container">
					{/* Header */}
					<Stack className="section-header">
						<Box className="title-wrapper">
							<Typography variant="overline" className="subtitle">
								Latest Updates
							</Typography>
							<Typography variant="h4" className="title">
								Community Board
							</Typography>
						</Box>
						<Box className="see-all-btn" onClick={pushHandler}>
							<span>See All</span>
							<ArrowForwardIcon className="arrow-icon" />
						</Box>
					</Stack>

					{/* Mobile Swiper */}
					<Swiper
						className="community-swiper-mobile"
						slidesPerView={1.15}
						centeredSlides={false}
						spaceBetween={16}
						modules={[Autoplay, Pagination]}
						pagination={{ clickable: true }}
						autoplay={{ delay: 4000, disableOnInteraction: false }}
					>
						{articles?.map((article: BoardArticle) => (
							<SwiperSlide key={article?._id}>
								<CommunityCard article={article} />
							</SwiperSlide>
						))}
					</Swiper>
				</Stack>
			</Stack>
		);
	}

	return (
		<Stack className="community-board-modern">
			<Stack className="container">
				{/* Header Section */}
				<Stack className="section-header">
					<Box className="title-wrapper">
						<Typography variant="overline" className="subtitle">
							Latest Updates
						</Typography>
						<Typography variant="h3" className="title">
							Community Board Highlights
						</Typography>
						<Typography className="description">
							Stay connected with the latest news, stories, and insights from our community
						</Typography>
					</Box>
					<Box className="see-all-btn" onClick={pushHandler}>
						<span>See All Articles</span>
						<ArrowForwardIcon className="arrow-icon" />
					</Box>
				</Stack>

				{/* Main Content Grid */}
				<Stack className="community-grid">
					{/* Featured Article (Left Side) */}
					{articles?.[0] && (
						<Box 
							className="featured-article"
							onClick={() => pushDetailHandler(articles[0]?.articleCategory, articles[0]?._id)}
						>
							<Box className="featured-image">
								<img 
									src={articles[0]?.articleImage
										? `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/${articles[0]?.articleImage}`
										: '/img/event.svg'
									} 
									alt={articles[0]?.articleTitle} 
								/>
								<Box className="image-overlay" />
								<Chip 
									label={articles[0]?.articleCategory || 'Article'} 
									className="category-chip"
								/>
							</Box>
							<Stack className="featured-content">
								<Box className="meta-info">
									<Box className="meta-item">
										<CalendarTodayIcon />
										<Moment format="MMM DD, YYYY">{articles[0]?.createdAt}</Moment>
									</Box>
									<Box className="meta-item">
										<AccessTimeIcon />
										<span>5 min read</span>
									</Box>
								</Box>
								<Typography variant="h4" className="featured-title">
									{articles[0]?.articleTitle}
								</Typography>
								<Typography className="featured-excerpt">
									{extractTextOnly(articles[0]?.articleContent)?.slice(0, 180)}...
								</Typography>
								<Box className="read-more">
									<span>Read Full Article</span>
									<ArrowForwardIcon />
								</Box>
							</Stack>
						</Box>
					)}

					{/* Article List (Right Side) */}
					<Stack className="article-list">
						{articles?.slice(1).map((article: BoardArticle) => (
							<CommunityCard key={article?._id} article={article} />
						))}
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default CommunityBoards;
