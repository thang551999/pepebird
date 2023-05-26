import Image from 'next/legacy/image';

import AboutSection from './About';
import HomePageBanner from './Banner';
import BlueBirdQuoteSection from './BlueBirdQuote';
import ClaimBBPEPESection from './ClaimBBPEPE';
import HowToBuySection from './HowToBuy';
import ListImage from './ListImage';
import NoticeSection from './Notice';
import RoadMapSection from './Roadmap';
import TokenomicsSection from './Tokenomics';

const HomePage = () => {
  return (
    <>
      <HomePageBanner />

      <BlueBirdQuoteSection />

      <ListImage />

      <AboutSection />

      <ClaimBBPEPESection />

      <HowToBuySection />

      <TokenomicsSection />

      <RoadMapSection />

      <NoticeSection />

      <div className='background'>
        <Image alt='nft-image' src='/homepage/background-homepage.png' layout='fill' />
      </div>
    </>
  );
};

export default HomePage;
