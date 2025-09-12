import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta name="robots" content="index,follow" />
				<link rel="icon" type="image/png" href="/img/favicon.png" />

				{/* SEO */}
				<meta name="keyword" content={'bookio, bookio.uz, interesting books, mern nestjs fullstack'} />
				<meta
					name={'description'}
					content={
						'Buy and sell properties anywhere anytime all over the world. Best Properties at Best prices on bookio.uz | ' +
						'Покупайте и продавайте недвижимость в любое время и в любой точке мира. Лучшая недвижимость по лучшим ценам на bookio.uz | ' +
						'전 세계 언제 어디서나 부동산을 사고 파세요. bookio.uz에서 최고의 가격으로 최고의 부동산을 구매하세요.'
					}
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
