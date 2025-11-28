import React from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Stack } from '@mui/material';
import Image from "next/image";
import { Box, Container, Grid, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';

const Advertisement = () => {
	const device = useDeviceDetect();

	if (device == 'mobile') {
		return (
			<Box
				sx={{
					width: "100%",
					position: "relative",
					overflow: "hidden",
					backgroundImage:
					"url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80')",
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundAttachment: { xs: "scroll", md: "fixed" }, // ⭐ Mobile Fix
					color: "#fff",
					py: { xs: 10, md: 22 },
					px: { xs: 2, md: 10 },
				}}
				>
				<Container>
					{/* Overlay */}
					<Box
					sx={{
						position: "absolute",
						inset: 0,
						background:
						"linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.40))",
						zIndex: 1,
					}}
					/>

					{/* Content */}
					<Grid
					container
					spacing={4}
					alignItems="center"
					sx={{ position: "relative", zIndex: 2 }}
					>
					{/* Left Section */}
					<Grid item xs={12} md={6}>
						<Typography
						sx={{
							color: "#ffb580",
							fontWeight: 700,
							mb: 1,
							fontSize: { xs: 14, md: 16 },
						}}
						>
						PREMIUM BOOK DEALS
						</Typography>

						<Typography
						variant="h3"
						sx={{
							fontWeight: 900,
							lineHeight: 1.2,
							mb: 3,
							fontSize: { xs: 28, sm: 32, md: 40 }, // ⭐ Mobile Scaling
							textShadow: "0 2px 6px rgba(0,0,0,0.55)",
						}}
						>
						EXPLORE MODERN STORIES
						<br />
						WITH SMART READING
						</Typography>

						<Typography
						sx={{
							maxWidth: 520,
							opacity: 0.9,
							lineHeight: 1.7,
							fontSize: { xs: 14, md: 16 }, // ⭐ Mobile Text Scaling
						}}
						>
						Access curated reading experiences, trending titles, and top-rated
						authors. Elevate your reading lifestyle with premium insights and
						powerful search tools.
						</Typography>
					</Grid>

					{/* Right Section */}
					<Grid item xs={12} md={6}>
						{/* Item 1 */}
						<Box sx={{ display: "flex", alignItems: "flex-start", mb: 5 }}>
						<Box>
							<Typography
							variant="h6"
							sx={{ fontWeight: 700, fontSize: { xs: 16, md: 20 } }}
							>
							Expert Reviews & Insights
							</Typography>
							<Typography sx={{ opacity: 0.8, fontSize: { xs: 14, md: 16 } }}>
							Get high-quality book evaluations from trusted experts.
							</Typography>
						</Box>
						</Box>

						{/* Item 2 */}
						<Box sx={{ display: "flex", alignItems: "flex-start", mb: 5 }}>
						<Box>
							<Typography
							variant="h6"
							sx={{ fontWeight: 700, fontSize: { xs: 16, md: 20 } }}
							>
							Safe & Secure System
							</Typography>
							<Typography sx={{ opacity: 0.8, fontSize: { xs: 14, md: 16 } }}>
							Enjoy fast and protected book browsing and purchasing.
							</Typography>
						</Box>
						</Box>

						{/* Item 3 */}
						<Box sx={{ display: "flex", alignItems: "flex-start", mb: 0 }}>
						<Box>
							<Typography
							variant="h6"
							sx={{ fontWeight: 700, fontSize: { xs: 16, md: 20 } }}
							>
							Exclusive Member Discounts
							</Typography>
							<Typography sx={{ opacity: 0.8, fontSize: { xs: 14, md: 16 } }}>
							Unlock savings on selected premium books.
							</Typography>
						</Box>
						</Box>
					</Grid>
					</Grid>

					{/* Zig-Zag Bottom */}
					<Box
					sx={{
						width: "100%",
						height: { xs: 80, md: 140 }, // ⭐ Mobile height reduce
						backgroundColor: "#fff",
						clipPath: {
						xs: "polygon(0 60%, 0 100%, 100% 100%, 100% 45%, 70% 60%, 50% 45%, 30% 60%)",
						md: "polygon(0 60%, 0 100%, 100% 100%, 100% 35%, 75% 55%, 50% 35%, 25% 55%)",
						},
						position: "absolute",
						bottom: 0,
						left: 0,
						zIndex: 3,
					}}
					/>
				</Container>
				</Box>
		);
	} else {
		return (
			<Box
			sx={{
				width: "100%",
				position: "relative",
				overflow: "hidden",
				backgroundImage:
				"url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80')",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundAttachment: "fixed", // ⭐ Fixed Background
				color: "#fff",
				py: { xs: 12, md: 22 },
				px: { xs: 3, md: 10 },
			}}
			>
			 <Container>
				{/* Overlay */}
				<Box
					sx={{
					position: "absolute",
					inset: 0,
					background:
						"linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.40))",
					zIndex: 1,
					}}
				/>

				{/* Content */}
				<Grid
					container
					spacing={6}
					alignItems="center"
					sx={{ position: "relative", zIndex: 2 }}
				>
					{/* Left Section */}
					<Grid item xs={12} md={6}>
					<Typography
						sx={{ color: "#ffb580", fontWeight: 700, mb: 1, fontSize: 16 }}
					>
						PREMIUM BOOK DEALS
					</Typography>

					<Typography
						variant="h3"
						sx={{
						fontWeight: 900,
						lineHeight: 1.2,
						mb: 3,
						textShadow: "0 2px 6px rgba(0,0,0,0.55)",
						}}
					>
						EXPLORE MODERN STORIES
						<br />
						WITH SMART READING
					</Typography>

					<Typography sx={{ maxWidth: 520, opacity: 0.9, lineHeight: 1.7 }}>
						Access curated reading experiences, trending titles, and top-rated
						authors. Elevate your reading lifestyle with premium insights and
						powerful search tools.
					</Typography>
					</Grid>

					{/* Right Section with Icons */}
					<Grid item xs={12} md={6}>
					<Box sx={{ display: "flex", alignItems: "center", mb: 5 }}>
						<Box>
						<Typography variant="h6" sx={{ fontWeight: 700 }}>
							Expert Reviews & Insights
						</Typography>
						<Typography sx={{ opacity: 0.8 }}>
							Get high-quality book evaluations from trusted experts.
						</Typography>
						</Box>
					</Box>

					<Box sx={{ display: "flex", alignItems: "center", mb: 5 }}>
						<Box>
						<Typography variant="h6" sx={{ fontWeight: 700 }}>
							Safe & Secure System
						</Typography>
						<Typography sx={{ opacity: 0.8 }}>
							Enjoy fast and protected book browsing and purchasing.
						</Typography>
						</Box>
					</Box>

					<Box sx={{ display: "flex", alignItems: "center", mb: 5 }}>
						<Box>
						<Typography variant="h6" sx={{ fontWeight: 700 }}>
							Exclusive Member Discounts
						</Typography>
						<Typography sx={{ opacity: 0.8 }}>
							Unlock savings on selected premium books.
						</Typography>
						</Box>
					</Box>
					</Grid>
				</Grid>

				{/* Bottom Zig-Zag Shape (Option C) */}
				<Box
					sx={{
					width: "100%",
					height: 140,
					backgroundColor: "#fff",
					clipPath:
						"polygon(0 60%, 0 100%, 100% 100%, 100% 35%, 75% 55%, 50% 35%, 25% 55%)",
					position: "absolute",
					bottom: 0,
					left: 0,
					zIndex: 3,
					}}
				/>
			 </Container>
			</Box>
		);
	}
};

export default Advertisement;
