import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import CommentIcon from '@mui/icons-material/Comment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Star from '@mui/icons-material/Star';
import { Button, CssVarsProvider } from '@mui/joy';
import { Property } from '../../types/property/property';

type RentalCardProps = {
  product: Property;
  category: React.ReactNode;
  image: string;
  liked?: boolean;
  rareFind?: boolean;
  title: React.ReactNode;
  price: number;
};

export default function ColumnPropertyCard() {
  // const { category, title, rareFind = false, liked = false, image, price, product } = props;
  const [isLiked, setIsLiked] = React.useState(true);
  return (
    <CssVarsProvider>
      <Card
        className={'horizontal-card'}
        variant="outlined"
        orientation="horizontal"
        sx={{
          width: "100%",
          marginTop: "10px",
          bgcolor: 'neutral.softBg',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          '&:hover': {
            boxShadow: 'lg',
            borderColor: 'var(--joy-palette-neutral-outlinedDisabledBorder)',
          },
        }}
      >
        <CardOverflow
          className={'cardoverflow'}
          sx={{
            mr: { xs: 'var(--CardOverflow-offset)', sm: 0 },
            mb: { xs: 0, sm: 'var(--CardOverflow-offset)' },
            '--AspectRatio-radius': {
              xs: 'calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0',
              sm: 'calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0 calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px))',
            },
          }}
        >
          <img alt="" src={'/img/property/under-sky.webp'} />
            <Stack
              direction="row"
              sx={{
                alignItems: 'center',
                position: 'absolute',
                top: 0,
                width: '100%',
                p: 1,
              }}
            >
              {true && (
                <Chip
                  sx={{position: 'absolute', top: '25px'}}
                  variant="soft"
                  color="success"
                  startDecorator={<WorkspacePremiumRoundedIcon />}
                  size="md"
                >
                  Top
                </Chip>
              )}
            </Stack>
        </CardOverflow>
        <CardContent>
          <Stack
            spacing={1}
            direction="row"
            sx={{ justifyContent: 'flex', alignItems: 'flex-start' }}
          >
            <div style={{flexGrow: '4'}}>
              <Typography level="title-md">
                <Link
                  overlay
                  underline="none"
                  href="#interactive-card"
                  sx={{ color: 'text.primary' }}
                >
                  Title
                </Link>
              </Typography>
              <Typography level="body-sm">Category</Typography>
            </div>
            <IconButton
              variant="plain"
              size="sm"
              color={isLiked ? 'danger' : 'neutral'}
              onClick={() => setIsLiked((prev) => !prev)}
              sx={{ borderRadius: '50%', marginright: '5px' }}
            >
              <FavoriteRoundedIcon />
            </IconButton>
            <IconButton
              variant="plain"
              size="sm"
              sx={{ borderRadius: '50%' }}
            >
              <VisibilityIcon />
            </IconButton>
            <IconButton
              variant="plain"
              size="sm"
              sx={{ borderRadius: '50%' }}
            >
              <CommentIcon />
            </IconButton>
          </Stack>
          <Stack
            spacing="0.25rem 1rem"
            direction="row"
            useFlexGap
            sx={{ flexWrap: 'wrap', my: 0.25 }}
          >
            <Typography level="body-xs" >
              by Amurkhon (Author)
            </Typography>
          </Stack>
          <Stack>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Quo distinctio eveniet, esse nemo labore cupiditate explicabo, ratione a, 
              asperiores ducimus pariatur vitae animi repellendus. 
              Temporibus soluta eaque dolor sapiente ullam!
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ slefAlign: 'flex-end' }}>
            <Typography
              level="title-sm"
              startDecorator={
                <React.Fragment>
                  <Star sx={{ color: 'warning.400' }} />
                  <Star sx={{ color: 'warning.400' }} />
                  <Star sx={{ color: 'warning.400' }} />
                  <Star sx={{ color: 'warning.400' }} />
                  <Star sx={{ color: 'warning.200' }} />
                </React.Fragment>
              }
              sx={{ display: 'flex', gap: 1 }}
            >
              4.0
            </Typography>
            <Typography level="title-lg" sx={{ flexGrow: 1, textAlign: 'right' }}>
              <strong>$20</strong> 
              <Typography level="body-md">
                <Button 
                  variant='outlined' 
                  color='success' 
                  style={{marginLeft: "10px"}}
                >
                  Add to card
                </Button>
              </Typography>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </CssVarsProvider>
  );
}