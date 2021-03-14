import React from 'react';
import styled from 'styled-components';

const AppBackgroundStyled = styled.div`
  background: url('/images/app-bg-opt.jpg') center bottom repeat-x;
  background-size: contain;
  filter: ${({ blur }) => `blur(${blur}px)`};
  -webkit-filter: ${({ blur }) => `blur(${blur}px)`};
  opacity: ${({ opacity }) => opacity};
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: -1;
  transition: all 0.3s;
`;

interface Props {
  blur?: number;
  opacity?: number;
}

const AppBackground: React.FC<Props> = ({ blur = 0, opacity = 1, ...rest }) => {
  return <AppBackgroundStyled {...rest} blur={blur} opacity={opacity} />;
};

export default AppBackground;
