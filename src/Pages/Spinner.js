import styled from 'styled-components';

export default styled.span`
  vertical-align: middle;
  display: inline-block;

  border: 0.2em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  -webkit-animation: spinner-border .5s linear infinite;
  animation: spinner-border .5s linear infinite;

  @keyframes spinner-border {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  ${props => `
    width: 1.5rem;
    height: 1.5rem;
    border-width: 0.2rem;
  `}


  color: ${props => props.color};
`;
