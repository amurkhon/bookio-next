import React from 'react';
import { Stack, Box, Typography, Rating, Button } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Property } from '../../types/property/property';
import { NEXT_PUBLIC_REACT_APP_API_URL } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import StarIcon from '@mui/icons-material/Star';

interface TopPropertyCardProps {
    property: Property;
}

const TopCategoryPropertyCard = (props: TopPropertyCardProps) => {
    const { property } = props;
    const device = useDeviceDetect();
    const router = useRouter();
    const user = useReactiveVar(userVar);

    const imageSrc = property?.propertyImages && property.propertyImages.length > 0
        ? `${NEXT_PUBLIC_REACT_APP_API_URL}/${property.propertyImages[0]}`
        : "/img/default-image.png";

    /** HANDLERS **/
    const pushDetailHandler = async (propertyId: string) => {
        await router.push({ pathname: '/books/detail', query: { id: propertyId } });
    };

    if (device === 'mobile') {
        return (
            <Stack 
                className="category-book-card-mobile"
                onClick={() => pushDetailHandler(property?._id)}
            >
                <Box className="card-image">
                    <img src={imageSrc} alt={property?.propertyTitle} loading="lazy" />
                </Box>
                <Stack className="card-content">
                    <Typography className="book-title">
                        {property?.propertyTitle}
                    </Typography>
                    <Typography className="book-author">
                        {property?.propertyAuthor || 'Unknown Author'}
                    </Typography>
                    <Box className="book-price">
                        ${property?.propertyPrice || '0'}.00
                    </Box>
                </Stack>
            </Stack>
        );
    }

    return (
        <Stack className={'card-box'}>
            <Box className={'card-img'}>
                <img src={imageSrc} alt={property?.propertyTitle} />
            </Box>
            <Stack className={'card-info'}>
                <Rating
                    sx={{ color: 'orange' }}
                    name="simple-uncontrolled"
                    onChange={(event, newValue) => {
                        console.log(newValue);
                    }}
                    defaultValue={2}
                />
                <Typography className={'info-item'} variant={'h3'}>
                    {property?.propertyType?.charAt(0) + property?.propertyType?.slice(1).toLowerCase()}
                </Typography>
                <Typography className={'info-item'} variant={'h2'}>
                    {property?.propertyTitle}
                </Typography>
                <Typography className={'info-item'}>
                    Only From ${property?.propertyPrice}.00
                </Typography>
                <Button
                    className={'button'}
                    variant={'outlined'}
                    onClick={() => pushDetailHandler(property?._id)}
                >
                    Shop now
                </Button>
            </Stack>
        </Stack>
    );
};

export default TopCategoryPropertyCard;
