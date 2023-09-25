// Global
import { Box, BoxProps, VisuallyHidden } from '@chakra-ui/react';
import { useIsomorphicLayoutEffect } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';

type LayoutProps = BoxProps & {
  title: string;
  description?: string;
  openGraphImage?: string;
  preview?: boolean;
  children: React.ReactNode | React.ReactNode[];
};

const Layout = ({ title, description = '', openGraphImage, children, ...rest }: LayoutProps): JSX.Element => {
  const publicUrl = process.env.NEXT_PUBLIC_PUBLIC_URL ? process.env.NEXT_PUBLIC_PUBLIC_URL : '';
  const router = useRouter();
  const { asPath } = router;
  const path = asPath.split(/[?#]/)[0];
  const mainContentRef = useRef<HTMLAnchorElement>(null);

  // Set focus on the contain <main> element on route changes.
  useIsomorphicLayoutEffect(() => {
    let isMounted = false;

    router.events.on('routeChangeComplete', () => {
      // if (!isMounted) {
      //   mainContentRef?.current?.focus();
      // }
    });

    return () => {
      isMounted = true;
    };
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href={`/favicon.png`} />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#EB1F1F" />
        <meta name="msapplication-TileColor" content="#EB1F1F"></meta>
        {/*
          Necessary Meta tags, including Social tags.
          It's OK if they're empty, same as not printing them.
        */}
        <meta name="description" content={description} />
        <meta property="og:site_name" content="Sitecore Developer Portal" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${publicUrl}${path}`} />
        <meta property="og:image" content={openGraphImage ? `${publicUrl}${openGraphImage}` : `${publicUrl}/api/og?title=${title}&subtitle=${description}`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Box as="main" style={{ paddingTop: 122, minHeight: 'calc(100vh - 236px)' }} {...rest}>
        <VisuallyHidden>
          <a href="#main-content" ref={mainContentRef}>
            Skip to main content
          </a>
        </VisuallyHidden>
        {/* a11y announcement for route changes. */}
        <VisuallyHidden aria-live="polite" aria-atomic="true">{`The ${title} page has loaded.`}</VisuallyHidden>
        {children}
      </Box>
    </>
  );
};

export default Layout;
