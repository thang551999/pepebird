import ListImage from '../HomePage/ListImage';

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

const tokennomicsText = [
  'No taxes, contract renouncement, and audit',
  'Airdrop: 2%',
  'Marketing: 2%',
  'Ecosystem: 6.9%',
  'Presale and liquidity: 81.1%',
  'Burn: 8%',
];
const SOCIAL = ['Contract: ', 'Telegram: ', 'Annoucement: ', 'Twitter: ', 'Website: ', 'Contact: '];

const SOCIALINK = [
  'https://bscscan.com/token/0x3e05F5ca50e6472614Da4e3EAb1cFC77163A1961',
  'https://t.me/bluebirdpepeofficial',
  'https://t.me/bluebirdpepeannoucement',
  'https://twitter.com/BlueBirdPepe',
  'https://www.bluebirdpepe.com/',
  'bluebirdpepeofficial@gmail.com',
];

const WhitePaperPage = () => {
  return (
    <>
      <header>
        <span>BLUE BIRD PEPE</span>
        WHITEPAPER
      </header>

      <div className='section-description'>
        <h2>I. INTRODUCTION</h2>

        <p>
          Blue Bird Pepe (BBPEPE) represents the fusion of the legendary Pepe meme and the symbol of free speech and fun
          on Twitter. However, BBPEPE is not just another memecoin; it incorporates utility within the meme itself. With
          a team of experienced individuals, BBPEPE aims to achieve the seemingly impossible.
        </p>
      </div>

      <div className='section-description'>
        <h2>II. RENT TO EARN</h2>

        <p>
          BBPEPE introduces its most promising feature: Rent-To-Earn (RTE). Token holders can own billboards on our
          platform in the form of NFTs and rent them out to individuals seeking to advertise. Profits from these rentals
          will be shared between NFT holders and the platform, based on a predetermined percentage. Engaging mini-games
          will be introduced to encourage participation among BBPEPE token holders. Our long-term vision involves
          establishing a centralized platform where NFTs and token holders can earn from multiple income sources.
        </p>
      </div>

      <ListImage />

      <div className='section-description' style={{ color: 'white' }}>
        <h2>III. ROADMAP</h2>
        {RoadMapUpdateData.map((e, i) => (
          <div style={{ marginTop: 16 }} key={i}>
            <h3> Phase {i + 1}:</h3>
            <ul style={{ listStyle: 'inherit', paddingLeft: 15 }}>
              {e.map((item, index) => (
                <li style={{ marginBlock: 8 }} key={index}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className='section-description' style={{ color: 'white' }}>
        <h2>III. TOKENOMICS</h2>
        <div style={{ marginTop: 16 }}>
          <ul style={{ listStyle: 'inherit', paddingLeft: 15 }}>
            {tokennomicsText.map((item, index) => (
              <li style={{ marginBlock: 8 }} key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='section-description' style={{ marginBottom: 134, color: 'white' }}>
        <h2>IV. SOCIAL NETWORK</h2>
        <div style={{ marginTop: 16 }}>
          <ul style={{ listStyle: 'inherit', paddingLeft: 15 }}>
            {SOCIAL.map((item, index) => (
              <li style={{ marginBlock: 8 }} key={index}>
                {item}
                <a href={SOCIALINK[index]} style={{ color: 'white' }} target='_blank' rel='noreferrer'>
                  <ins>{SOCIALINK[index]}</ins>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default WhitePaperPage;
