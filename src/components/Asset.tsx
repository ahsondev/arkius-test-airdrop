import { Link } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

interface IProps {
  data: IAsset
}

const Asset = (props: IProps) => {
  const {data} = props;

  return (
    <AssetComponent>
      <ImageWrapper>
        <img src={data.image} alt="Asset" />
      </ImageWrapper>
      <ContentWrapper>
        <div className='header'>
          <h3>{data.name}</h3>
        </div>
      </ContentWrapper>
    </AssetComponent>
  );
};

export default Asset;

const AssetComponent = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 0.8;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s;
  box-shadow: 2px 2px 10px 1px #0088ff66;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ImageWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ContentWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #0266 5%, transparent, #0266 95%);
  color: #fff;
  transition: all 0.3s;

  &:hover {
    background: linear-gradient(180deg, #0268 5%, transparent, #0268 95%);
  }

  h3 {
    margin: 0;
    padding: 0;
    font-size: 24px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .quantity {
    margin: auto 0 0 0;
  }
`;
