import React, { useState } from 'react';
import Link from 'next/link';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Box, Stack, Typography } from '@mui/material';
import CommunityCard from './CommunityCard';
import { BoardArticle } from '../../types/board-article/board-article';
import { GET_BOARD_ARTICLES } from '../../../apollo/user/query';
import { useQuery } from '@apollo/client';
import { T } from '../../types/common';
import { BoardArticleCategory } from '../../enums/board-article.enum';

const CommunityBoards = () => {
	const device = useDeviceDetect();
	const [searchCommunity, setSearchCommunity] = useState({
		page: 1,
		sort: 'articleViews',
		direction: 'DESC',
	});
	const [newsArticles, setNewsArticles] = useState<BoardArticle[]>([]);
	const [freeArticles, setFreeArticles] = useState<BoardArticle[]>([]);

	/** APOLLO REQUESTS **/
	const {
		loading: getNewsArticlesLoading,
		data: getNewsArticlesData,
		error: getNewsArticlesError,
		refetch: getNewsArticlesRefetch,		
	} = useQuery(GET_BOARD_ARTICLES,{
		fetchPolicy: "network-only",
		variables: {input: {...searchCommunity, limit: 6, search: {articleCategory: BoardArticleCategory.NEWS}}},
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setNewsArticles(data?.getBoardArticles?.list);
		}
	});

	const {
		loading: getFreeArticlesLoading,
		data: getFreeArticlesData,
		error: getFreeArticlesError,
		refetch: getFreeArticlesRefetch,		
	} = useQuery(GET_BOARD_ARTICLES,{
		fetchPolicy: "network-only",
		variables: {input: {...searchCommunity, limit: 6, search: {articleCategory: BoardArticleCategory.FREE}}},
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setFreeArticles(data?.getBoardArticles?.list);
		}
	});



	if (device === 'mobile') {
		return <div>COMMUNITY BOARDS (MOBILE)</div>;
	} else {
		return (
			<Stack className={'community-board'}>
				<Stack className={'container'}>
					<Stack className={'title'}>
						<Typography className={'left'} variant={'h1'}>COMMUNITY BOARD HIGHLIGHTS</Typography>
						<Box component={'div'} className={'right'}>
							<div className={'more-box'}>
								<span>See All Blogs</span>
								<img src="/img/icons/rightup.svg" alt="" />
							</div>
						</Box>
					</Stack>
					<Stack className="community-main">
						{[1,2,3,4,5].map((ele, index) => {
							console.log("index: ", typeof `${index}`);
							return(
								<CommunityCard key={`${ele}`}  />
							);
						})}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default CommunityBoards;
