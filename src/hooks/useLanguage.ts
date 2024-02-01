import { useAppSelector } from '../redux/hooks';
import { getCurrentLanguage } from '../redux/reducers/AuthSlice';
import { English, Ukrainian } from '../translations';

export const useLanguage = () => {
  const lang = useAppSelector(getCurrentLanguage);

  return lang === 'en' ? English : Ukrainian;
};
