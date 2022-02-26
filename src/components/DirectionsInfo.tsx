import { useContext } from 'react';
import styled from 'styled-components';
import { MapContext } from '../context';

const Wrapper = styled.div`
  position: fixed;
  z-index: 999;
  bottom: 20px;
  right: 10px;
  padding: .5rem;
  border-radius: 5px;
  background-color: ${p => p.theme.backgroundColor};
  color: ${p => p.theme.fontColor};

  p {
    margin: 0;
  }
`

const DirectionsInfo = () => {
  const { directionInfo } = useContext(MapContext)
  
  if(!directionInfo) return <></>

  return (
    <Wrapper>
      <p>{directionInfo.kms} kms</p>
      <p>{directionInfo.minutes} minutes</p>
    </Wrapper>
  )
}

export default DirectionsInfo
