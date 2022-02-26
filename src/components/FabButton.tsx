import styled from 'styled-components'

interface Props {
  top?: number,
  bottom?: number,
  right?:number,
  left?: number,
}

const FabButton = styled.button<Props>`
  position: fixed;
  z-index: 999;
  border: none;
  top: ${p => p.top}px;
  bottom: ${p => p.bottom}px;
  right: ${p => p.right}px;
  left: ${p => p.left}px;
  background-color: ${(p) => p.theme.backgroundColor};
  color: ${(p) => p.theme.fontColor};
  padding: 0.3rem 0.6rem;
  cursor: pointer;
  border-radius: 50%;
`

export default FabButton
