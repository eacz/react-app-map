import { useTranslation } from "react-i18next"

const LoadingPlaces = () => {
  const { t } = useTranslation()
  return (
    <div className='alert alert-primary mt-2'>
      <h6>{t('loadingPlaces.h6')}</h6> 
      <p>{t('loadingPlaces.p')}</p>
    </div>
  )
}

export default LoadingPlaces
