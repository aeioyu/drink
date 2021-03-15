import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  sideBtn?: ReactNode;
}

const PageHeaderContainer = styled.div`
  display: flex;
  line-height: 24px;

  > * {
    margin: 0 16px 32px 0;
  }
`;

const PageHeader: React.FC<Props> = ({ title, sideBtn }) => {
  return (
    <PageHeaderContainer>
      <h1 style={{ fontSize: 24 }}>{title}</h1>
      {sideBtn && sideBtn}
    </PageHeaderContainer>
  );
};

export default PageHeader;
