import Countdown from 'react-countdown';

import { Button, Progress, Space } from 'antd';

import ConnectWalletButton from 'components/ConnectWalletButton';

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

const Completionist = () => <span>You are good to go!</span>;

const renderCountdown = ({ day, hours, minutes, seconds, completed }: any) => {
  console.log(day, hours, minutes, seconds, completed)
  if (completed) {
    return <Completionist />;
  } else {
    return (
      <div className='countdown-wrapper'>
        <Space>
          {day || 0}
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
      <Progress percent={50} showInfo={false} />
      <div className='claim-wrapper__countdown'>
        <Countdown date={'2023-05-19T01:02:03'} renderer={renderCountdown} />,
      </div>

      <ConnectWalletButton className='claim-wrapper__register-btn' text='Connect your wallet to register' />
    </div>
  );
};

export default ClaimBBPEPESection;
