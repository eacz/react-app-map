import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.div`
  background-color: ${p => p.theme.backgroundColor};
  color: ${p => p.theme.fontColor};
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ErrorPage = () => {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <h1>{t('places.geolocationDenied')}</h1>
      <p>{t('places.askForGeolocation')}</p>
    </Wrapper>
  )
}

export default ErrorPage
