'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { ComponentProps } from 'react';

type Props = ComponentProps<typeof Link>;

export default function LocalizedLink({ href, ...rest }: Props) {
  const locale = useLocale();

  const localizedHref =
    typeof href === 'string'
      ? `/${locale}${href.startsWith('/') ? href : `/${href}`}`
      : href;

  return <Link href={localizedHref} {...rest} />;
}