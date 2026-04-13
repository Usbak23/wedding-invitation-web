import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { rsvpService } from '@/services/rsvp.service';
import type { RSVPStatus } from '@/types';

export function useRSVPs(invitationId: string) {
  return useQuery({
    queryKey: ['rsvps', invitationId],
    queryFn: () => rsvpService.getByInvitation(invitationId),
    enabled: !!invitationId,
  });
}

export function useCreateRSVP() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { guest_id: string; invitation_id: string; status: RSVPStatus; message?: string; total_persons?: number }) =>
      rsvpService.create(payload),
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ['rsvps', vars.invitation_id] }),
  });
}
