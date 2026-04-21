'use client';
import { use, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePublicInvitation, useGuestByCode } from '@/hooks/usePublicInvitation';
import { useRSVPs } from '@/hooks/useRSVP';
import { Skeleton } from '@/components/ui/Skeleton';
import MusicPlayer from '@/components/public/MusicPlayer';
import OpeningScreen from '@/components/public/OpeningScreen';
import TemplateEmerald from '@/components/public/templates/TemplateEmerald';
import TemplateMidnightGold from '@/components/public/templates/TemplateMidnightGold';
import TemplateSageGarden from '@/components/public/templates/TemplateSageGarden';

export default function PublicInvitationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const searchParams = useSearchParams();
  const code = searchParams.get('code') ?? '';

  const [opened, setOpened] = useState(false);
  const [hidden, setHidden] = useState(false);

  const handleOpen = () => {
    setOpened(true);
    setTimeout(() => {
      setHidden(true);
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }, 600);
  };

  const { data: invitation, isLoading, isError } = usePublicInvitation(slug);
  const { data: guestData, isLoading: guestLoading, isError: guestError } = useGuestByCode(slug, code);
  const { data: rsvps } = useRSVPs(invitation?.id ?? '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <Skeleton className="h-screen w-full rounded-none" />
      </div>
    );
  }

  if (isError || !invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <p className="text-7xl mb-6">💔</p>
          <h1 className="font-serif text-3xl text-gray-900 mb-2">Undangan tidak ditemukan</h1>
          <p className="text-gray-500">Link undangan mungkin sudah tidak aktif.</p>
        </div>
      </div>
    );
  }

  const templateProps = {
    invitation,
    guestData,
    guestLoading,
    guestError,
    rsvps,
    slug,
    code,
  };

  const renderTemplate = () => {
    switch (invitation.template) {
      case 'midnight-gold': return <TemplateMidnightGold {...templateProps} />;
      case 'sage-garden':   return <TemplateSageGarden {...templateProps} />;
      default:              return <TemplateEmerald {...templateProps} />;
    }
  };

  return (
    <>
      {/* Opening screen dengan fade out transition */}
      {!hidden && (
        <OpeningScreen
          groomName={invitation.groom_name}
          brideName={invitation.bride_name}
          guestName={guestData?.guest.name}
          template={invitation.template}
          onOpen={handleOpen}
          closing={opened}
        />
      )}

      {/* Music mulai setelah opened */}
      {opened && invitation.music_url && <MusicPlayer url={invitation.music_url} />}

      {/* Konten undangan */}
      {renderTemplate()}
    </>
  );
}
