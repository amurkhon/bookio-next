import { useEffect, useRef, useState, RefObject } from 'react';

interface UseScrollAnimationOptions {
	threshold?: number;
	rootMargin?: string;
	triggerOnce?: boolean;
}

/**
 * Custom hook for scroll-triggered animations using IntersectionObserver.
 * Returns a ref to attach to the element and a boolean indicating visibility.
 *
 * Usage:
 *   const [ref, isVisible] = useScrollAnimation();
 *   <div ref={ref} className={isVisible ? 'animate-in' : ''}>
 */
const useScrollAnimation = <T extends HTMLElement = HTMLDivElement>(
	options: UseScrollAnimationOptions = {}
): [RefObject<T>, boolean] => {
	const { threshold = 0.15, rootMargin = '0px 0px -60px 0px', triggerOnce = true } = options;
	const ref = useRef<T>(null!);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					if (triggerOnce) {
						observer.unobserve(element);
					}
				} else if (!triggerOnce) {
					setIsVisible(false);
				}
			},
			{ threshold, rootMargin }
		);

		observer.observe(element);

		return () => {
			observer.unobserve(element);
		};
	}, [threshold, rootMargin, triggerOnce]);

	return [ref, isVisible];
};

export default useScrollAnimation;
