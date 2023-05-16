import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';

import { Button, Progress, Space } from 'antd';
import { Contract, ethers } from 'ethers';

import ConnectWalletButton from 'components/ConnectWalletButton';
import { CONTRACT_ADDRESS } from 'connectors/constants';

import PepeBirdABI from '../../../../abi/PepeBirdABI.json';
const deadline = 1684851330487;

const Completionist = () => <span>You are good to go!</span>;

const renderCountdown = ({ days, hours, minutes, seconds, completed }: any) => {
  if (completed) {
    return <Completionist />;
  } else {
    return (
      <div className='countdown-wrapper'>
        <Space>
          {days || 0}
          <p>Days</p>
        </Space>
        <Space>
          {hours || 0}
          <p>Hours</p>
        </Space>
        <Space>
          {minutes || 0}
          <p>Minutes</p>
        </Space>
        <Space>
          {seconds || 0}
          <p>Second</p>
        </Space>
      </div>
    );
  }
};

const ClaimBBPEPESection = () => {
  const total = 8413;
  const [pre, setPre] = useState(0);
  const getPre = async () => {
    const httpProvider = new ethers.providers.JsonRpcProvider(
      'https://old-fittest-cherry.bsc.quiknode.pro/fe7c392aa648e17f109862086576beb259ac5049/',
    );

    const contract = new Contract(CONTRACT_ADDRESS, PepeBirdABI, httpProvider);
    const numberAddress = await contract.numberAddress();
    setPre(numberAddress.toNumber() / 8413);
  };
  useEffect(() => {
    getPre();
  });

  return (
    <div className='claim-wrapper'>
      <Button className='claim-wrapper__button'>You can claim BBPEPE Now!</Button>
      <p className='claim-wrapper__data'>
        A total of 8,413,800,000,000 (2% total supply) $BBPEPE tokens are now available to be claimed by holders of
        <br />
        BlessedGiftBox (BGB),Playbux Early Bird Quest (PBN) , PVU PLANT (PVU PLANT) , AND $POV, $CAPO token holder.
        <br />
        $BBPEPE tokens that are not claimed within 7 days will be burned.
        <br /> <br />
        First come first served. 8413 addresses that registered first will be airdrop $BBPEPE tokens 7 days after
        launched.
      </p>
      <div className='claim-wrapper__total'>
        <p>Register</p>
        <p>{total} wallet</p>
      </div>
      <Progress percent={pre} showInfo={false} />
      <div className='claim-wrapper__countdown'>
        <Countdown date={deadline} renderer={renderCountdown} />,
      </div>

      <ConnectWalletButton className='claim-wrapper__register-btn' text='Connect your wallet to register' />
    </div>
  );
};

export default ClaimBBPEPESection;
