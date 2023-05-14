import Image from 'next/legacy/image';

import AboutSection from './About';
import HomePageBanner from './Banner';
import HowToBuySection from './HowToBuy';
import NoticeSection from './Notice';
import RoadMapSection from './Roadmap';
import TokenomicsSection from './Tokenomics';

const HomePage = () => {
  return (
    <>
      <HomePageBanner />

      <AboutSection />

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
