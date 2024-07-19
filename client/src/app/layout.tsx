import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import TopNav from '../../components/nav/TopNav';
import Sidebar from '../../components/nav/Sidebar';
import GlobalStyles from '../../styles/globalStyles';
import { MainContainer, StyledBody } from '../../styles/RootStyles';

const lexend = Lexend({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | YourBank',
    default: 'Welcome to YourBank ',
  },
  description: 'The best option for your financial safety',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GlobalStyles />
      <StyledBody className={lexend?.className}>
        <TopNav />
        <Sidebar />

        <MainContainer>{children}</MainContainer>
      </StyledBody>
    </html>
  );
}
