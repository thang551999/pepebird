import { FC } from 'react';

import classNames from 'classnames';

import PointIcon from 'resources/svg/Homepage/PointIcon';

const RoadMapData = [
  {
    isTop: false,
    text: 'Launch',
    number: 1,
  },
  {
    isTop: true,
    text: 'List on Coinmarketcap and Coingecko',
    number: 2,
  },
  {
    isTop: false,
    text: 'Expand number of holders',
    number: 3,
  },
  {
    isTop: true,
    text: 'Trending on dextool and twitter.',
    number: 4,
  },
  {
    isTop: false,
    text: 'Get listed on CEXs.',
    number: 5,
  },
  {
    isTop: true,
    text: `Have Twitter's logo replaced with Blue Bird Pepe for just only 24h :)`,
    number: 6,
  },
  {
    isTop: false,
    text: 'Mini games, Nfts',
    number: 7,
  },
  {
    isTop: true,
    text: 'And many more surprises on the go.',
    number: 8,
  },
];

const RoadMapUpdateData = [
  [
    'Formation of the team',
    'Creation of a website and social network presence',
    'Fair launch on Pinksale',
    'Demo of the Rent-To-Earn platform',
    'Listing on CMC, CG, DEXTOOLS',
    'Marketing efforts',
  ],
  [
    'Update of the Whitepaper to version 2',
    'Listing on a CEX (Centralized Exchange)',
    'Commencement of RTE development',
    'Targeted marketing campaigns in various markets',
    'Introduction of stage 1 of the RTE program',
  ],
  [
    'Wide-scale application of the platform',
    'Introduction of stage 2 of the RTE program',
    'Introduction of mini-games and NFTs',
    'Roadmap update',
  ],
];

const RoadMapSection: FC = () => {
  return (
    <div className='roadmap-wrapper' id='roadmap'>
      <h2>Roadmap</h2>
      <h3>Rough expectation:</h3>

      {/* <section className='ps-timeline-sec'>
      <div className='container'>
          <ol className='ps-timeline'>
            {RoadMapData.map((item) => (
              <li key={item.number}>
                <div className={classNames(item.isTop ? 'ps-top' : 'ps-bot')}>{item.text}</div>
                <span className={classNames(item.isTop ? 'ps-sp-top' : 'ps-sp-bot')} />
                <span className={classNames(!item.isTop ? 'number-top' : 'number-bottom')}>{item.number}</span>
                <div className='point-wrap'>
                  <PointIcon />
                </div>
              </li>
            ))}
          </ol>
        </div> 
      </section> */}

      <div className='roadmap-wrapper__box'>
        {RoadMapUpdateData.map((items, idx) => (
          <div key={idx} className='box'>
            <h3>phase {idx}</h3>
            <ul>
              {items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadMapSection;
