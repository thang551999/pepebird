import Image from 'next/legacy/image';

import { Carousel } from 'antd';

import NextIcon from 'resources/svg/NextIcon';
import PreviousIcon from 'resources/svg/PreviousIcon';

export const listImages = [
  '/homepage/ListImage/1.webp',
  '/homepage/ListImage/2.webp',
  '/homepage/ListImage/3.webp',
  '/homepage/ListImage/4.webp',
  '/homepage/ListImage/5.webp',
  '/homepage/ListImage/6.webp',
  '/homepage/ListImage/7.webp',
  '/homepage/ListImage/8.webp',
  '/homepage/ListImage/9.webp',
  '/homepage/ListImage/10.webp',
  '/homepage/ListImage/11.webp',
  '/homepage/ListImage/12.webp',
  '/homepage/ListImage/13.webp',
  '/homepage/ListImage/14.webp',
  '/homepage/ListImage/15.webp',
  '/homepage/ListImage/16.webp',
];

// Delete later
export const listImagesExample2 = [
  '/homepage/ListImage/1.webp',
  '/homepage/ListImage/8.webp',
  '/homepage/ListImage/14.webp',
  '/homepage/ListImage/15.webp',
  '/homepage/ListImage/6.webp',
  '/homepage/ListImage/16.webp',
  '/homepage/ListImage/5.webp',
  '/homepage/ListImage/2.webp',
  '/homepage/ListImage/3.webp',
  '/homepage/ListImage/10.webp',
  '/homepage/ListImage/11.webp',
  '/homepage/ListImage/4.webp',
  '/homepage/ListImage/13.webp',
  '/homepage/ListImage/7.webp',
  '/homepage/ListImage/9.webp',
  '/homepage/ListImage/12.webp',
];

const settings = {
  nextArrow: <NextIcon />,
  prevArrow: <PreviousIcon />,
};

export const GridImage1 = () => {
  return (
    <>
      <Carousel arrows {...settings} autoplaySpeed={3000}>
        <div className='grid-image'>
          {listImages.map((images: any, index: number) => (
            <div className={`image-wrapper image-${index + 1}`} key={index}>
              <Image src={images} key={index} alt={`Image ${index + 1}`} layout='fill' objectFit='fill' quality={100} />
            </div>
          ))}
        </div>
        <div className='grid-image'>
          {listImagesExample2.map((images: any, index: number) => (
            <div className={`image-wrapper image-${index + 1}`} key={index}>
              <Image src={images} key={index} alt={`Image ${index + 1}`} layout='fill' objectFit='fill' quality={100} />
            </div>
          ))}
        </div>
        <div className='grid-image'>
          {listImagesExample2.map((images: any, index: number) => (
            <div className={`image-wrapper image-${index + 1}`} key={index}>
              <Image src={images} key={index} alt={`Image ${index + 1}`} layout='fill' objectFit='fill' quality={100} />
            </div>
          ))}
        </div>
      </Carousel>
    </>
  );
};

export const GridImage2 = () => {
  return (
    <>
      <Carousel arrows {...settings}>
        <div className='grid-image'>
          {listImagesExample2.map((images: any, index: number) => (
            <div className={`image-wrapper image-${index + 1}`} key={index}>
              <Image src={images} key={index} alt={`Image ${index + 1}`} layout='fill' objectFit='fill' quality={100} />
            </div>
          ))}
        </div>
        <div className='grid-image'>
          {listImages.map((images: any, index: number) => (
            <div className={`image-wrapper image-${index + 1}`} key={index}>
              <Image src={images} key={index} alt={`Image ${index + 1}`} layout='fill' objectFit='fill' quality={100} />
            </div>
          ))}
        </div>
      </Carousel>
    </>
  );
};
