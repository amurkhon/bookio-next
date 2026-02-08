import { Box, Button, Stack, Typography, Skeleton } from "@mui/material";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import TopCategoryPropertyCard from "./TopCategoryCard";
import { useQuery } from "@apollo/client";
import { GET_PROPERTIES } from "../../../apollo/user/query";
import { useCallback, useState } from "react";
import { Property } from "../../types/property/property";
import { T } from "../../types/common";
import { PropertiesInquiry } from "../../types/property/property.input";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import 'swiper/css';
import 'swiper/css/pagination';

interface TopCategoryBooks {
    initialInput: PropertiesInquiry;
}

const categories = [
    { value: 'ROMANCE', label: 'Romance', image: '/img/categoris/catigori-1-1.png' },
    { value: 'BUSINESS', label: 'Business', image: '/img/categoris/catigori-1-2.png' },
    { value: 'FICTION', label: 'Fiction', image: '/img/categoris/catigori-1-3.png' },
    { value: 'SCIENCE', label: 'Science', image: '/img/categoris/catigori-1-4.png' },
    { value: 'TECHNOLOGY', label: 'Technology', image: '/img/categoris/catigori-1-5.png' },
    { value: 'NATURE', label: 'Nature', image: '/img/categoris/catigori-1-6.png' },
];

const TopCategories = (props: TopCategoryBooks) => {
    const { initialInput } = props;
    const device = useDeviceDetect();
    const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.1 });
    const [activeCategory, setActiveCategory] = useState<string>('');
    const [topCategoryBooks, setTopCategoryBooks] = useState<Property[]>([]);
    const [searchFilter, setSearchFilter] = useState<PropertiesInquiry>(initialInput);

    /* Apollo request */
    const {
        loading: getPropertiesLoading,
        data: getPropertiesData,
        error: getPropertiesError,
        refetch: getPropertiesRefetch,
    } = useQuery(GET_PROPERTIES, {
        fetchPolicy: "cache-and-network",
        variables: { input: searchFilter },
        notifyOnNetworkStatusChange: true,
        onCompleted: (data: T) => {
            setTopCategoryBooks(data?.getProperties?.list);
        }
    });

    /* HANDLERS */
    const changePropertyInqueryHandler = useCallback((category: string) => {
        if (!category) return;
        setActiveCategory(category);
        setSearchFilter((prev: any) => ({
            ...prev,
            page: 1,
            search: {
                ...(prev.search ?? {}),
                propertyCategory: [category],
            },
        }));
    }, []);

    // Loading skeleton for cards
    const LoadingSkeleton = () => (
        <Stack className="properties" sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} variant="rectangular" width={300} height={200} sx={{ borderRadius: 2 }} />
            ))}
        </Stack>
    );

    if (device === 'mobile') {
        return (
            <Stack ref={sectionRef} className={`top-categories-modern mobile ${isVisible ? 'animate-in' : ''}`}>
                <Stack className="container">
                    {/* Header */}
                    <Stack className="section-header">
                        <Typography variant="h5" className="section-title">
                            Top Categories
                        </Typography>
                        <Box className="see-all-link" onClick={() => window.location.href = '/books'}>
                            <span>View All</span>
                            <ArrowForwardIcon />
                        </Box>
                    </Stack>

                    {/* Category Filter Swiper */}
                    <Swiper
                        className="category-swiper"
                        slidesPerView="auto"
                        spaceBetween={12}
                        freeMode={true}
                    >
                        {categories.map((cat) => (
                            <SwiperSlide key={cat.value} style={{ width: 'auto' }}>
                                <Box
                                    className={`category-chip ${activeCategory === cat.value ? 'active' : ''}`}
                                    onClick={() => changePropertyInqueryHandler(cat.value)}
                                >
                                    <img src={cat.image} alt={cat.label} />
                                    <span>{cat.label}</span>
                                </Box>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Books Grid */}
                    {getPropertiesLoading ? (
                        <Stack direction="row" flexWrap="wrap" gap={2} justifyContent="center" sx={{ mt: 3 }}>
                            {[1, 2, 3, 4].map((i) => (
                                <Skeleton key={i} variant="rectangular" width="45%" height={180} sx={{ borderRadius: 2 }} />
                            ))}
                        </Stack>
                    ) : (
                        <Stack className="books-grid">
                            {topCategoryBooks?.slice(0, 6).map((property: Property) => (
                                <TopCategoryPropertyCard key={property?._id} property={property} />
                            ))}
                        </Stack>
                    )}

                    <Button 
                        className="view-more-btn" 
                        variant="outlined" 
                        href="/books"
                        endIcon={<ArrowForwardIcon />}
                    >
                        View More Books
                    </Button>
                </Stack>
            </Stack>
        );
    }

    return (
        <Stack ref={sectionRef} className={`top-categories ${isVisible ? 'animate-in' : ''}`}>
            <Stack className="container">
                <Stack className="info-box">
                    Top Categories
                </Stack>
                <Stack className="filter-box">
                    {categories.map((cat) => (
                        <Button
                            key={cat.value}
                            className={`filter-item ${activeCategory === cat.value ? 'active' : ''}`}
                            value={cat.value}
                            onClick={() => changePropertyInqueryHandler(cat.value)}
                        >
                            <img src={cat.image} alt={cat.label} />
                            <Box className="item-title">{cat.label}</Box>
                        </Button>
                    ))}
                </Stack>
                <Stack className="properties">
                    {getPropertiesLoading ? (
                        <LoadingSkeleton />
                    ) : (
                        topCategoryBooks?.map((property: Property) => (
                            <TopCategoryPropertyCard key={property?._id} property={property} />
                        ))
                    )}
                </Stack>
                <Button className="main-button" variant="outlined" href="/books">
                    View More
                </Button>
            </Stack>
        </Stack>
    );
};

TopCategories.defaultProps = {
    initialInput: {
        page: 1,
        limit: 9,
        sort: 'createdAt',
        direction: 'DESC',
        search: {},
    },
};

export default TopCategories;
