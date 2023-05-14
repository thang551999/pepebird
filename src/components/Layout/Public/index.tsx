import type { FC, PropsWithChildren } from 'react';

import { Layout as LayoutContainer } from 'antd';
import classNames from 'classnames';

import AppContent from 'components/AppContent';
import AppFooter from 'components/AppFooter';
import AppHeader from 'components/AppHeader';
import AppSeo, { LinkTag } from 'components/AppSeo';

const AppLayout: FC<
  PropsWithChildren<{
    title?: string;
    className?: string;
    notShowFooter?: boolean;
    notShowHeader?: boolean;
    socialImageUrl?: string;
    metaDescription?: string;
    faviconImageUrl?: string;
    additionalLinkTags?: LinkTag[];
  }>
> = ({ children, title = '', className, socialImageUrl, faviconImageUrl, metaDescription, additionalLinkTags }) => (
  <>
    <AppSeo
      title={title}
      socialImageUrl={socialImageUrl}
      faviconImageUrl={faviconImageUrl}
      metaDescription={metaDescription}
      additionalLinkTags={additionalLinkTags}
    />
    <LayoutContainer className={classNames('layout-container', className)}>
      <LayoutContainer>
        <AppHeader />
        <AppContent>{children}</AppContent>
        <AppFooter />
      </LayoutContainer>
    </LayoutContainer>
  </>
);

export default AppLayout;
