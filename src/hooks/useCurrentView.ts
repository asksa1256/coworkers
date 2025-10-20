import { BREAKPOINTS } from '@/constants';
import { useEffect, useState } from 'react';

const getBreakpoints = () => {
  const viewWidth = window.innerWidth;
  if (viewWidth <= BREAKPOINTS.tablet) return 'MOBILE'; // mobile 0 ~ 639
  if (viewWidth <= BREAKPOINTS.web) return 'TABLET'; // tablet 640 ~ 1279
  return 'WEB'; // web 1280 ~
};

export default function useCurrentView() {
  const [currentView, setCurrentView] = useState(getBreakpoints());

  const updateCurrentView = () => {
    setCurrentView(getBreakpoints());
  };

  useEffect(() => {
    window.addEventListener('resize', updateCurrentView);

    return () => {
      window.removeEventListener('resize', updateCurrentView);
    };
  }, []);

  return currentView;
}
