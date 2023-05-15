import { FC, useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { useRouter } from 'next/router';

import { Button, Progress, Space } from 'antd';
import { Grid } from 'antd';
import { useWeb3React } from '@web3-react/core';
import { Contract } from 'ethers';
import useConnectWallet from 'hook/useConnectWallet';

import PepeBrid from '../../../../abi/PepeBrid.json';
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

const Completionist = () => <span>You are good to go!</span>;

const renderCountdown = ({ day, hours, minutes, seconds, completed }: any) => {
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
const { useBreakpoint } = Grid;

const ClaimBBPEPESection = () => {

  const screens = useBreakpoint();
  const total = 8413;
  const CONTRACT_ADDRESS = '0x094De877F7e51Ee52Fa7D34B37FDb193e7c07158';
  const [contract, setContract] = useState<any>();
  const { active, account, library } = useWeb3React();

  const connectInjected = useConnectWallet();
  const [installedMetamask, setInstalledMetamask] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // if (typeof window.ethereum !== 'undefined') {
    //   setInstalledMetamask(true);
    // }
  }, []);

  const connectWallet = async () => {
    // if (screens?.xs && !window.ethereum) {
    //   router.push('https://metamask.app.link/dapp/land.futurecity.me/');
    // } else {
      const callback = () => {
      //  dispatch(setConnectingMetamask(false));
      };
      if (installedMetamask) {
        	//dispatch(setConnectingMetamask(true));
        //	await sleep(400);
        connectInjected(callback);
      } else {
       // dispatch(setShowInstallMetamask(true));
   //   }
    }
  };

  const register = async () => {
    if (account) {
      const checkUser = await getCheckAdress();
      if (checkUser) {
        contract.register();
      }
    } else {
      connectWallet();
    }
  };

  useEffect(() => {
    if (active) {
      const signer = library.getSigner(account);
      const contractInstance = new Contract(CONTRACT_ADDRESS, PepeBrid, signer);
      setContract(contractInstance);
    }
  }, [active, account, library]);

  const getCheckAdress = async () => {
    const checkAddress = await contract.getCheckAdress(account);
    console.log(checkAddress);
    return checkAddress;
  };

  return (
    <div className='claim-wrapper'>
      <Button className='claim-wrapper__button'>You can claim BBPEPE Now!</Button>

      <p className='claim-wrapper__data'>
        A total of 8,413,800,000,000 (2% total supply) $BBPEPE tokens are now available to be claimed by holders of
        <br />
        BNBFLOKIAI - Early Adopters (BFLOKIAI), BlessedGiftBox (BGB),
        <br />
        Playbux Early Bird Quest (PBN) , PVU PLANT (PVU PLANT) , AND $POV, $CAPO token holder.
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
        <Countdown date={deadline} renderer={renderCountdown} />,
      </div>

      <Button
        className='claim-wrapper__register-btn'
        onClick={() => {
          register();
        }}
      >
        Connect your wallet to register
      </Button>
    </div>
  );
};

export default ClaimBBPEPESection;
