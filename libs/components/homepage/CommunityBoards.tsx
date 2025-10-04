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
import { useRouter } from 'next/router';

const CommunityBoards = () => {
	const device = useDeviceDetect();
	const router = useRouter();
	const [searchCommunity, setSearchCommunity] = useState({
		page: 1,
		sort: 'articleViews',
		direction: 'DESC',
	});
	const [articles, setArticles] = useState<BoardArticle[]>([]);

	/** APOLLO REQUESTS **/
	const {
		loading: getNewsArticlesLoading,
		data: getNewsArticlesData,
		error: getNewsArticlesError,
		refetch: getNewsArticlesRefetch,		
	} = useQuery(GET_BOARD_ARTICLES,{
		fetchPolicy: "network-only",
		variables: {input: {...searchCommunity, limit: 5, search: {}}},
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setArticles(data?.getBoardArticles?.list);
		}
	});

	/* Handlers */
	const pushDetailHandler = async () => {
        await router.push({pathname: '/community'});
    };


	if (device === 'mobile') {
		return <div>COMMUNITY BOARDS (MOBILE)</div>;
	} else {
		return (
			<Stack className={'community-board'}>
				<Stack className={'container'}>
					<Stack className={'title'}>
						<Box className={'info-box left'}>
							<span>Community Board Hightlights</span>
						</Box>
						<Box component={'div'} className={'right'}>
							<div className={'more-box'} onClick={pushDetailHandler}>
								<span>See All Blogs</span>
								<img src="/img/icons/rightup.svg" alt="" />
							</div>
						</Box>
					</Stack>
					<Stack className="community-main">
						{articles.map((article: BoardArticle, index) => {
							return(
								<Box sx={{width: index < 2 ? '40%' : '32%'}}>
									<CommunityCard key={article?._id} article={article} />
								</Box>
							);
						})}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default CommunityBoards;
