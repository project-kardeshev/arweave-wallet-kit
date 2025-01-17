import { ChevronDownIcon, UserIcon } from '@iconicicons/react';
import { styled } from '@linaria/react';
import { HTMLProps } from 'react';

import { useAddress } from '../hooks/active_address';
import { useBalance } from '../hooks/balance';
import { useConnection } from '../hooks/connection';
import { useProfileModal } from '../hooks/profile';
import { DefaultTheme, withTheme } from '../theme';
import { formatAddress } from '../utils/arweave';
import { Button } from './Button';
import { Radius } from './Provider';

export function ConnectButton({
  accent,
  showBalance = true,
  showProfilePicture = true,
  onClick,
  profileModal: showProfileModal = true,
  ...props
}: HTMLProps<HTMLButtonElement> & Props) {
  // connection
  const { connected, connect, disconnect } = useConnection();

  // active address
  const address = useAddress();

  // balance
  const balance = useBalance();

  // profile modal
  const profileModal = useProfileModal();

  return (
    <Wrapper
      accent={accent}
      onClick={async (e) => {
        if (!connected) await connect();
        else if (showProfileModal) profileModal.setOpen(true);
        else await disconnect();

        if (onClick) return onClick(e);
      }}
      {...(props as any)}
    >
      {(connected && (
        <>
          {showBalance && (
            <Balance>
              {balance.toLocaleString(undefined, { maximumFractionDigits: 2 }) +
                ' AR'}
            </Balance>
          )}
          <ProfileSection showBalance={showBalance}>
            {showProfilePicture && (
              <AvatarPlaceholder>
                <AvatarIcon />
              </AvatarPlaceholder>
            )}

            {formatAddress(address || '', 5)}
            <ExpandIcon />
          </ProfileSection>
        </>
      )) || <ConnectText>Connect Wallet</ConnectText>}
    </Wrapper>
  );
}

const radius: Record<Radius, number> = {
  default: 18,
  minimal: 10,
  none: 0,
};

const Wrapper = withTheme(styled(Button)<{
  accent?: string;
  theme: DefaultTheme;
}>`
  border-radius: ${(props) => radius[props.theme.themeConfig.radius] + 'px'};
  text-transform: none;
  padding: 0.3rem;
  background-color: ${(props) => props.accent || `rgb(${props.theme.theme})`};
`);

const ConnectText = styled.span`
  line-height: 2.6rem;
  padding: 0 0.9rem;
`;

const ProfileSection = withTheme(styled.div<{
  showBalance?: boolean;
  theme: DefaultTheme;
}>`
  display: flex;
  align-items: center;
  background-color: rgb(
    ${(props) => (props.showBalance ? props.theme.background : 'transparent')},
    0.2
  );
  height: 2.6rem;
  border-radius: ${(props) =>
    radius[props.theme.themeConfig.radius] - 3 + 'px'};
  padding: 0 0.3rem 0 0.6rem;
  gap: 0.25rem;
`);

const Balance = styled.span`
  padding: 0 0.5rem;
`;

const ExpandIcon = styled(ChevronDownIcon)`
  font-size: 1.5rem !important;
`;

const avatarRadius: Record<Radius, string> = {
  default: '100%',
  minimal: '5px',
  none: '0px',
};

const AvatarIcon = styled(UserIcon)`
  font-size: 1rem !important;
  color: #fff;
`;

const AvatarPlaceholder = withTheme(styled.span<{ theme: DefaultTheme }>`
  position: relative;
  border-radius: ${(props) => avatarRadius[props.theme.themeConfig.radius]};
  width: 1.7rem;
  height: 1.7rem;
  margin-right: 0.4rem;
  background: linear-gradient(to right, #4776e6, #8e54e9);
  background-size: cover;

  ${AvatarIcon} {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`);

interface Props {
  accent?: string;
  showBalance?: boolean;
  showProfilePicture?: boolean;
  profileModal?: boolean;
}
