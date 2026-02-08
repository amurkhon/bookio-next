import React from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Stack, Box, Typography, IconButton, Button } from '@mui/material';
import Link from 'next/link';
import { NEXT_PUBLIC_REACT_APP_API_URL } from '../../config';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ArticleIcon from '@mui/icons-material/Article';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PlaceIcon from '@mui/icons-material/Place';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';
import { Member } from '../../types/member/member';

interface AgentCardProps {
	author: Member;
	likePropertyHandler: (user: any, id: string) => void;
}

const formatDate = (date: Date | string | undefined) => {
	if (!date) return '';
	const d = typeof date === 'string' ? new Date(date) : date;
	return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const AgentCard = (props: AgentCardProps) => {
	const { author, likePropertyHandler } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const router = useRouter();
	const imagePath: string = author?.memberImage
		? `${NEXT_PUBLIC_REACT_APP_API_URL}/${author?.memberImage}`
		: '/img/profile/defaultUser.svg';

	const displayName = author?.memberFullName ?? author?.memberNick ?? 'Author';
	const isLiked = author?.meLiked?.[0]?.myFavorite ?? false;

	const pushDetailHandler = (memberId: string) => {
		router.push({ pathname: '/author/detail', query: { authorId: memberId } });
	};

	if (device === 'mobile') {
		return (
			<Stack className="agent-card agent-card--mobile">
				<Box className="agent-card__cover" onClick={() => pushDetailHandler(author?._id)}>
					<img src={imagePath} alt={displayName} />
				</Box>
				<Stack className="agent-card__body">
					<Typography className="agent-card__name" variant="h3" component="h3">
						{displayName}
					</Typography>
					{author?.memberDesc && (
						<Typography className="agent-card__desc" variant="body2">
							{author.memberDesc}
						</Typography>
					)}
					<Stack className="agent-card__stats" direction="row" flexWrap="wrap" gap={1}>
						<Stack direction="row" alignItems="center" gap={0.5}>
							<MenuBookIcon fontSize="small" />
							<span>{author?.memberProperties ?? 0}</span>
						</Stack>
						<Stack direction="row" alignItems="center" gap={0.5}>
							<RemoveRedEyeIcon fontSize="small" />
							<span>{author?.memberViews ?? 0}</span>
						</Stack>
						<Stack direction="row" alignItems="center" gap={0.5}>
							{isLiked ? <FavoriteIcon color="primary" fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
							<span>{author?.memberLikes ?? 0}</span>
						</Stack>
					</Stack>
					<Button
						className="agent-card__cta"
						variant="contained"
						size="small"
						onClick={() => pushDetailHandler(author?._id)}
					>
						View profile
					</Button>
				</Stack>
			</Stack>
		);
	}

	return (
		<Stack className="agent-card">
			<Box className="agent-card__cover" onClick={() => pushDetailHandler(author?._id)}>
				<img src={imagePath} alt={displayName} />
			</Box>
			<Stack className="agent-card__body">
				<Link
					href={{ pathname: '/author/detail', query: { authorId: author?._id } }}
					className="agent-card__name-link"
				>
					<Typography className="agent-card__name" variant="h3" component="h3">
						{displayName}
					</Typography>
				</Link>
				{author?.memberDesc && (
					<Typography className="agent-card__desc" variant="body2">
						{author.memberDesc}
					</Typography>
				)}
				{author?.memberAddress && (
					<Stack className="agent-card__address" direction="row" alignItems="center" gap={0.5}>
						<PlaceIcon sx={{ fontSize: 16 }} />
						<Typography variant="caption">{author.memberAddress}</Typography>
					</Stack>
				)}
				<Stack className="agent-card__stats" direction="row" flexWrap="wrap" gap={2}>
					<Stack className="agent-card__stat" direction="row" alignItems="center" gap={0.5}>
						<MenuBookIcon fontSize="small" />
						<Typography variant="body2">{author?.memberProperties ?? 0} books</Typography>
					</Stack>
					<Stack className="agent-card__stat" direction="row" alignItems="center" gap={0.5}>
						<ArticleIcon fontSize="small" />
						<Typography variant="body2">{author?.memberArticles ?? 0} articles</Typography>
					</Stack>
					<Stack className="agent-card__stat" direction="row" alignItems="center" gap={0.5}>
						<PeopleIcon fontSize="small" />
						<Typography variant="body2">{author?.memberFollowers ?? 0} followers</Typography>
					</Stack>
					<Stack className="agent-card__stat" direction="row" alignItems="center" gap={0.5}>
						<PersonAddIcon fontSize="small" />
						<Typography variant="body2">{author?.memberFollowings ?? 0} following</Typography>
					</Stack>
				</Stack>
				<Stack className="agent-card__engagement" direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1}>
					<Stack direction="row" alignItems="center" gap={0.5}>
						<IconButton size="small" color="default" sx={{ cursor: 'default' }}>
							<RemoveRedEyeIcon fontSize="small" />
						</IconButton>
						<Typography variant="body2" color="text.secondary">{author?.memberViews ?? 0}</Typography>
						<IconButton
							size="small"
							color="default"
							onClick={(e) => {
								e.preventDefault();
								likePropertyHandler(user, author?._id);
							}}
							sx={{ '&:hover': { color: 'primary.main' } }}
						>
							{isLiked ? <FavoriteIcon color="primary" fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
						</IconButton>
						<Typography variant="body2" color="text.secondary">{author?.memberLikes ?? 0}</Typography>
					</Stack>
					{author?.createdAt && (
						<Stack direction="row" alignItems="center" gap={0.5}>
							<CalendarMonthIcon sx={{ fontSize: 14 }} />
							<Typography variant="caption" color="text.secondary">Joined {formatDate(author.createdAt)}</Typography>
						</Stack>
					)}
				</Stack>
				<Button
					className="agent-card__cta"
					variant="outlined"
					size="small"
					fullWidth
					onClick={() => pushDetailHandler(author?._id)}
				>
					View profile
				</Button>
			</Stack>
		</Stack>
	);
};

export default AgentCard;
