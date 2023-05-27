import Image from 'next/legacy/image';

import { Tabs, TabsProps } from 'antd';

import { GridImage1, GridImage2 } from './GridImage';

// Update later
const items: TabsProps['items'] = [
  {
    key: 'news',
    label: 'News',
    children: <GridImage1 />,
  },
  {
    key: 'blockchain',
    label: 'Blockchain',
    children: <GridImage2 />,
  },
  {
    key: 'metaverse',
    label: 'Metaverse',
    children: <GridImage1 />,
  },
  {
    key: 'gamefi',
    label: 'Gamefi',
    children: <GridImage2 />,
  },
  {
    key: 'meme',
    label: 'Meme',
    children: <GridImage1 />,
  },
  {
    key: 'hot',
    label: 'Hot 🔥',
    children: <GridImage2 />,
  },
];

const ListImage = () => {
  const onChange = (key: string) => console.log(key);

  return (
    <div className='list-image'>
      <div className='container'>
        <div className='list-image__header'>
          <h3>RENT-TO-EARN (RTE) WITH BBPEPE!</h3>

          <span>Secure your exclusive NFT billboard and maximize your income through renting it out!</span>
        </div>
        <div className='list-image__tab'>
          <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
        </div>
      </div>

      <div className='fake-bg'>
        <Image
          src='/homepage/ListImage/fake-images-list.webp'
          alt='Background image'
          quality={100}
          width={375}
          height={513}
        />
      </div>

      <div className='nft-billboard'>Get your NFT billboard</div>
    </div>
  );
};

export default ListImage;
