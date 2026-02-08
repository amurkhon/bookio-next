import React from 'react';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { Box } from '@mui/material';

interface ScrollRevealProps {
	children: React.ReactNode;
	className?: string;
	component?: React.ElementType;
	threshold?: number;
	rootMargin?: string;
}

/**
 * Wrapper that reveals children with a scroll-triggered animation.
 * Uses useScrollAnimation; content is visible by default with a slight offset,
 * then animates to final position when in viewport.
 */
const ScrollReveal: React.FC<ScrollRevealProps> = ({
	children,
	className = '',
	component = 'div',
	threshold = 0.1,
	rootMargin = '0px 0px -40px 0px',
}) => {
	const [ref, isVisible] = useScrollAnimation({ threshold, rootMargin });
	const combinedClass = `scroll-reveal ${isVisible ? 'animate-in' : ''} ${className}`.trim();

	return (
		<Box component={component} ref={ref} className={combinedClass}>
			{children}
		</Box>
	);
};

export default ScrollReveal;
