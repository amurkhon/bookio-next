import { Box, Button, Stack } from "@mui/material";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import TrendPropertyCard from "./TrendPropertyCard";
import TopCategoryPropertyCard from "./TopCategoryCard";



const TopCategories = () => {
    const device = useDeviceDetect();
    
    if(device === 'mobile') {
        return(
            <Stack className={'top-categories'}>
                <Stack className={'container'}>
                    <Stack className={'info-box'}>
                        Top Categories
                    </Stack>
                    <Stack>
                        Cards
                    </Stack>
                </Stack>
            </Stack>
        );
    } else {
        return(
            <Stack className={'top-categories'}>
                <Stack className={'container'}>
                    <Stack className={"info-box"}>
                        Top Categories
                    </Stack>
                    <Stack className={'filter-box'}>
                        <Stack className={'filter-item'}>
                            <img src="/img/categoris/catigori-1-1.png" alt="" />
                            <Box className={'item-title'}>Romance</Box>
                        </Stack>
                        <Stack className={'filter-item'}>
                            <img src="/img/categoris/catigori-1-2.png" alt="" />
                            <Box className={'item-title'}>Thriller</Box>
                        </Stack>
                        <Stack className={'filter-item'}>
                            <img src="/img/categoris/catigori-1-3.png" alt="" />
                            <Box className={'item-title'}>Fantasy</Box>
                        </Stack>
                        <Stack className={'filter-item'}>
                            <img src="/img/categoris/catigori-1-4.png" alt="" />
                            <Box className={'item-title'}>Science Fiction</Box>
                        </Stack>
                        <Stack className={'filter-item'}>
                            <img src="/img/categoris/catigori-1-5.png" alt="" />
                            <Box className={'item-title'}>Science</Box>
                        </Stack>
                        <Stack className={'filter-item'}>
                            <img src="/img/categoris/catigori-1-6.png" alt="" />
                            <Box className={'item-title'}>Adventure</Box>
                        </Stack>
                    </Stack>
                    <Stack className={'properties'}>
                        {[1,2,3,4,5].map(() => {
                            return (
                                <TopCategoryPropertyCard />
                            );
                        })}
                    </Stack>
                    <Button className={'main-button'} variant={'outlined'}>View More</Button>
                </Stack>
            </Stack>
        );
    }
}

export default TopCategories;