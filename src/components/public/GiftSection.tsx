'use client';
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import type { BankAccount } from '@/types';

// Logo dari CDN Simple Icons (https://simpleicons.org) & brand CDN
const BANK_LOGOS: Record<string, { src: string; bg: string }> = {
  bca:      { src: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg', bg: '#005BAC' },
  mandiri:  { src: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg', bg: '#003087' },
  bni:      { src: 'https://upload.wikimedia.org/wikipedia/commons/5/55/BNI_logo.svg', bg: '#F37021' },
  bri:      { src: 'https://upload.wikimedia.org/wikipedia/commons/6/68/BANK_BRI_logo.svg', bg: '#003087' },
  bsi:      { src: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Bank_Syariah_Indonesia.svg', bg: '#00703C' },
  cimb:     { src: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/CIMB_Niaga_logo.svg', bg: '#C8102E' },
  danamon:  { src: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Bank_Danamon_logo.svg', bg: '#E31837' },
  permata:  { src: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/PermataBank_logo.svg', bg: '#E31837' },
  gopay:    { src: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg', bg: '#00AED6' },
  ovo:      { src: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Logo_ovo_purple.svg', bg: '#4C3494' },
  dana:     { src: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg', bg: '#118EEA' },
  shopeepay:{ src: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg', bg: '#EE4D2D' },
  linkaja:  { src: 'https://upload.wikimedia.org/wikipedia/commons/8/85/LinkAja.svg', bg: '#E82529' },
};

function getBankLogo(bankName: string) {
  const key = bankName.toLowerCase().replace(/[\s\-_.]/g, '');
  for (const [k, v] of Object.entries(BANK_LOGOS)) {
    if (key.includes(k)) return v;
  }
  return null;
}

function CopyButton({ text, theme }: { text: string; theme: 'dark' | 'light' }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-all shrink-0"
      style={{
        background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(128,128,128,0.1)',
        color: copied ? '#22c55e' : theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#78716c',
      }}
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? 'Tersalin' : 'Salin'}
    </button>
  );
}

interface GiftSectionProps {
  bankAccounts: BankAccount[];
  theme?: 'dark' | 'light';
  accentColor?: string;
}

export default function GiftSection({ bankAccounts, theme = 'light', accentColor = '#f43f5e' }: GiftSectionProps) {
  if (!bankAccounts || bankAccounts.length === 0) return null;

  const isDark = theme === 'dark';
  const sorted = [...bankAccounts].sort((a, b) => a.order_index - b.order_index);

  return (
    <section
      className="py-16 px-6"
      style={{ background: isDark ? 'rgba(255,255,255,0.02)' : '#fff' }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs tracking-widest uppercase mb-2" style={{ color: accentColor, opacity: 0.7 }}>
            Hadiah
          </p>
          <h2
            className="text-3xl font-bold"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: isDark ? '#fff' : '#1c1917' }}
          >
            Wedding Gift
          </h2>
          <div className="w-16 h-0.5 mx-auto mt-3" style={{ background: accentColor, opacity: 0.4 }} />
          <p className="text-sm mt-4 max-w-sm mx-auto leading-relaxed" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#78716c' }}>
            Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sorted.map((account) => {
            const mapped = getBankLogo(account.bank_name);
            const logoSrc = account.logo_url || mapped?.src;

            return (
              <div
                key={account.id}
                className="rounded-2xl border p-5"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.05)' : '#fafaf9',
                  borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#e7e5e4',
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  {logoSrc ? (
                    <div
                      className="h-9 px-3 rounded-xl flex items-center justify-center"
                      style={{ background: mapped?.bg ?? '#f5f5f4', minWidth: 64 }}
                    >
                      <img
                        src={logoSrc}
                        alt={account.bank_name}
                        className="h-5 w-auto object-contain"
                        style={{ filter: 'brightness(0) invert(1)' }}
                      />
                    </div>
                  ) : (
                    <div
                      className="h-9 px-3 rounded-xl flex items-center justify-center text-xs font-bold"
                      style={{ background: `${accentColor}20`, color: accentColor }}
                    >
                      {account.bank_name}
                    </div>
                  )}
                  <span
                    className="text-sm font-semibold"
                    style={{ color: isDark ? '#fff' : '#1c1917' }}
                  >
                    {account.bank_name}
                  </span>
                </div>

                <p className="text-xs mb-1" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : '#a8a29e' }}>
                  {account.account_name}
                </p>

                <div className="flex items-center justify-between gap-2">
                  <p className="text-lg font-bold tracking-wider" style={{ color: isDark ? '#fff' : '#1c1917' }}>
                    {account.account_number}
                  </p>
                  <CopyButton text={account.account_number} theme={theme} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
