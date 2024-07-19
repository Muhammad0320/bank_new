import { MdOutlineAccountBalance } from 'react-icons/md';
import { TbReportAnalytics } from 'react-icons/tb';
import { LuLayoutDashboard } from 'react-icons/lu';
import { CiCreditCard2 } from 'react-icons/ci';
import { GrTransaction } from 'react-icons/gr';

export const navData: {
  href: string;
  content: string;
  icon: typeof LuLayoutDashboard;
}[] = [
  {
    href: '/',
    content: 'Dashboard',
    icon: LuLayoutDashboard,
  },

  {
    href: '/transactions',
    content: 'Transaction',
    icon: GrTransaction,
  },

  {
    href: '/reports',
    content: 'Report',
    icon: TbReportAnalytics,
  },

  {
    href: '/cards',
    content: 'Cards',
    icon: CiCreditCard2,
  },

  {
    href: '/account',
    content: 'Account',
    icon: MdOutlineAccountBalance,
  },
];

