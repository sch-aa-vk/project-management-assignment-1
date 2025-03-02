import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';

const { Content } = Layout;

interface ContentWrapperProps {
  justifyContent?: string;
  alignItems?: string;
  width?: string;
  height?: string;
  padding?: string;
  wrap?: string;
  gap?: string;
  children: React.ReactNode;
}

const StyledContent = styled(Content)<ContentWrapperProps>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || 'center'};
  align-items: ${({ alignItems }) => alignItems || 'center'};
  width: ${({ width }) => width || '100%'};
  max-width: 1280px;
  height: ${({ height }) => height || '100%'};
  margin: 0 auto;
  padding: ${({ padding }) => padding || '0 1rem'};
  flex-wrap: ${({ wrap }) => wrap || 'no-wrap'};
  gap: ${({ gap }) => gap || '1rem'};
`;

export const ContentWrapper: React.FC<ContentWrapperProps> = ({
  justifyContent,
  alignItems,
  width,
  height,
  padding,
  wrap,
  gap,
  children,
}) => {
  return (
    <StyledContent
      justifyContent={justifyContent}
      alignItems={alignItems}
      width={width}
      height={height}
      padding={padding}
      gap={gap}
      wrap={wrap}
    >
      {children}
    </StyledContent>
  );
};
