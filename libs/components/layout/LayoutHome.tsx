import React, { useEffect } from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import Head from 'next/head';
import Top from '../Top';
import Footer from '../Footer';
import { Box, Button, Slide, Stack, useScrollTrigger } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';
import { userVar } from '../../../apollo/store';
import { useReactiveVar } from '@apollo/client';
import { getJwtToken, updateUserInfo } from '../../auth';
import Chat from '../Chat';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import AiChatWidget from '../AiChatWidget';

const withLayoutMain = (Component: any) => {
	return (props: any) => {
		const device = useDeviceDetect();
		const user = useReactiveVar(userVar);
		const router = useRouter();

		interface Props {
			window?: () => Window;
			children?: React.ReactElement<unknown>;
		}

		function HideOnScroll(props: Props) {
			const { children, window } = props;
			const trigger = useScrollTrigger({
				target: window ? window() : undefined,
			});

			return (
				<Slide appear={false} direction="down" in={!trigger}>
					{children ?? <div />}
				</Slide>
			);
		}

		/** LIFECYCLES **/
		useEffect(() => {
			const jwt = getJwtToken();
			if (jwt) updateUserInfo(jwt);
		}, []);

		/** HANDLERS **/
		const pushHandler = async () => {
			await router.push({ pathname: '/books' });
		};

		const browseCategoriesHandler = async () => {
			await router.push({ pathname: '/books' });
		};

		if (device == 'mobile') {
			return (
				<>
					<Head>
						<title>Bookle</title>
						<meta name={'title'} content={`Bookle`} />
					</Head>
					<Stack id="mobile-wrap">
						<Stack id={'top'}>
							<Top />
						</Stack>

						<Stack id={'main'}>
							<Component {...props} />
						</Stack>

						<Stack id={'footer'}>
							<Footer />
						</Stack>
					</Stack>
				</>
			);
		} else {
			return (
				<>
					<Head>
						<title>Bookle</title>
						<meta name={'title'} content={`Bookle`} />
					</Head>
					<Stack id="pc-wrap">
						<Stack id={'top'}>
							<Top />
						</Stack>

						<Stack className={'header-main'}>
							{/* Decorative background elements */}
							<Box className="hero-orb hero-orb-1" />
							<Box className="hero-orb hero-orb-2" />
							<Box className="hero-orb hero-orb-3" />

							<Stack className={'container'}>
								<Stack className={'header-left'}>
									{/* Offer badge */}
									<Box className="hero-badge">
										<LocalOfferIcon className="badge-icon" />
										<span>Limited Time Offer</span>
									</Box>

									{/* Promo text */}
									<Typography className={'unique'} variant={'h3'}>
										Up To 30% Off
									</Typography>

									{/* Main heading */}
									<Typography className={'hero-title'} variant={'h1'}>
										Discover Your Next
									</Typography>
									<Typography className={'hero-title'} variant={'h1'}>
										Great <span className="gradient-text">Read</span>
									</Typography>

									{/* Description */}
									<Typography className={'hero-description'}>
										Explore our curated collection of bestsellers, new releases, and hidden gems at unbeatable prices.
									</Typography>

									{/* CTA buttons */}
									<Stack className="hero-cta" direction="row" spacing={2}>
										<Button
											className={'hero-button-primary'}
											onClick={pushHandler}
											variant={'contained'}
											endIcon={<ArrowForwardIcon />}
										>
											Shop Now
										</Button>
										<Button
											className={'hero-button-secondary'}
											onClick={browseCategoriesHandler}
											variant={'outlined'}
											startIcon={<MenuBookIcon />}
										>
											Browse Categories
										</Button>
									</Stack>

									{/* Trust stats */}
									<Stack className="hero-stats" direction="row">
										<Box className="stat-item">
											<AutoStoriesIcon className="stat-icon" />
											<Box className="stat-content">
												<span className="stat-number">10K+</span>
												<span className="stat-label">Books</span>
											</Box>
										</Box>
										<Box className="stat-divider" />
										<Box className="stat-item">
											<PeopleIcon className="stat-icon" />
											<Box className="stat-content">
												<span className="stat-number">5K+</span>
												<span className="stat-label">Happy Readers</span>
											</Box>
										</Box>
										<Box className="stat-divider" />
										<Box className="stat-item">
											<StarIcon className="stat-icon" />
											<Box className="stat-content">
												<span className="stat-number">4.9</span>
												<span className="stat-label">Rating</span>
											</Box>
										</Box>
									</Stack>
								</Stack>

								<Stack className={'header-right'}>
									<Box className="hero-image-wrapper">
										<img src="/img/hero/hero-img-1-1.png" alt="Featured books collection" />
										<Box className="hero-image-glow" />
									</Box>
								</Stack>
							</Stack>
						</Stack>

						<Stack id={'main'}>
							<Component {...props} />
						</Stack>

						<AiChatWidget />

						<Chat />

						<Stack id={'footer'}>
							<Footer />
						</Stack>
					</Stack>
				</>
			);
		}
	};
};

export default withLayoutMain;
