import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Property } from '../../types/property/property';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';

import Rating from '@mui/material/Rating';
import Box from '@mui/joy/Box';


const property = {
		_id: "bwfdg436frg4538888888888888879",
		propertyStatus: "ACTIVE",
		propertyCategory: "Fiction",
		propertyTitle: "Cold Island",
		propertyAuthor: "Amurkhon Akramjonov",
		propertyPrice: 17,
		propertyPages: 239,
		isbn: "978-1662530388",
		propertyViews: 0,
		propertyLikes: 0,
		propertyComments: 0,
		propertyRank: 0,
		propertyDownloads: 0,
		propertyLanguages: [
			"Eng",
			"Kor"
		],
		propertyImages: [],
		propertyFile: "",
		propertyAudio: "",
		memberId: {
			$oid: "68be50c5cd93b2dc035b1434"
		},
		publicationDate: {
			$date: "2025-09-01T00:00:00.000Z"
		},
		createdAt: {
			$date: "2025-09-10T06:12:06.508Z"
		},
		updatedAt: {
			date: "2025-09-10T07:30:35.064Z"
		},
	}

interface PopularPropertyCardProps {
	property: Property;
}

const PopularPropertyCard = () => {
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/

	const pushDetailHandler = async (propertyId: string) => {
		await router.push({pathname: '/property/detail', query: {id: propertyId}});
	};

	if (device === 'mobile') {
			return (
				<Stack className="trend-card-box" key={property._id}>
					
				</Stack>
			);
		} else {
			return (
				<Stack className={'popular-card-box'}>
					<Box className={'image-box'}>
						<img src="/img/property/brand-img1.png" alt="" />
					</Box>
					<Stack className={'info-box'}>
						<Rating
							sx={{color: 'white'}}
							name="simple-uncontrolled"
							onChange={(event, newValue) => {
							console.log(newValue);
							}}
							defaultValue={2}
						/>
						<Typography className={'info-item'} variant={'h3'}>
							Get 20% Off
						</Typography>
						<Typography className={'info-item'} variant={'h2'}>
							In Since Friction Books Categories
						</Typography>
						<Typography className={'info-item'}>
							Only From $85.00
						</Typography>
						<Button className={'button'} variant={'outlined'} sx={{mt: '20px', width: "200px", fontSize:"20px",}}>Shop now</Button>
					</Stack>
				</Stack>
			);
		}
};

export default PopularPropertyCard;
