'use client';
import { useCreateInvitation } from '@/hooks/useInvitations';
import InvitationForm from '@/components/dashboard/InvitationForm';
import type { InvitationPayload } from '@/services/invitation.service';

export default function CreateInvitationPage() {
  const { mutateAsync, isPending } = useCreateInvitation();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Buat Undangan Baru</h1>
      <InvitationForm
        onSubmit={(payload: InvitationPayload) => mutateAsync(payload)}
        loading={isPending}
      />
    </div>
  );
}
