import React from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Box, Stack, Typography, Chip } from '@mui/material';
import Moment from 'react-moment';
import { BoardArticle } from '../../types/board-article/board-article';
import { useRouter } from 'next/router';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

interface CommunityCardProps {
	article: BoardArticle;
}

const CommunityCard = (props: CommunityCardProps) => {
	const { article } = props;
	const router = useRouter();
	const device = useDeviceDetect();
	const articleImage = article?.articleImage
		? `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/${article?.articleImage}`
		: '/img/event.svg';

	/* Handlers */
	const pushDetailHandler = async () => {
		await router.push({
			pathname: '/community/detail',
			query: { articleCategory: article?.articleCategory, id: article?._id }
		});
	};

	if (device === 'mobile') {
		return (
			<Box className="community-card-modern mobile" onClick={pushDetailHandler}>
				<Box className="card-image">
					<img src={articleImage} alt={article?.articleTitle} />
					<Box className="image-overlay" />
					<Chip 
						label={article?.articleCategory || 'Article'} 
						size="small"
						className="category-chip"
					/>
				</Box>
				<Stack className="card-content">
					<Box className="meta-row">
						<Box className="meta-item">
							<PersonOutlineIcon />
							<span>{article?.memberData?.memberNick || 'Anonymous'}</span>
						</Box>
						<Box className="meta-item">
							<ChatBubbleOutlineIcon />
							<span>{article?.articleComments || 0}</span>
						</Box>
					</Box>
					<Typography variant="h6" className="card-title">
						{article?.articleTitle}
					</Typography>
					<Typography className="card-excerpt">
						{article?.articleContent?.length > 80 
							? `${article?.articleContent.slice(0, 80)}...` 
							: article?.articleContent
						}
					</Typography>
					<Box className="card-footer">
						<Box className="date">
							<CalendarTodayIcon />
							<Moment format="MMM DD, YYYY">{article?.createdAt}</Moment>
						</Box>
						<Box className="read-more">
							<span>Read More</span>
							<ArrowForwardIcon />
						</Box>
					</Box>
				</Stack>
			</Box>
		);
	}

	return (
		<Box className="community-card-modern" onClick={pushDetailHandler}>
			<Box className="card-image">
				<img src={articleImage} alt={article?.articleTitle} />
				<Box className="image-overlay" />
			</Box>
			<Stack className="card-content">
				<Box className="meta-row">
					<Chip 
						label={article?.articleCategory || 'Article'} 
						size="small"
						className="category-chip"
					/>
					<Box className="date">
						<CalendarTodayIcon />
						<Moment format="MMM DD">{article?.createdAt}</Moment>
					</Box>
				</Box>
				<Typography variant="subtitle1" className="card-title">
					{article?.articleTitle}
				</Typography>
				<Box className="card-footer">
					<Box className="author">
						<PersonOutlineIcon />
						<span>{article?.memberData?.memberNick || 'Anonymous'}</span>
					</Box>
					<ArrowForwardIcon className="arrow-icon" />
				</Box>
			</Stack>
		</Box>
	);
};

export default CommunityCard;
