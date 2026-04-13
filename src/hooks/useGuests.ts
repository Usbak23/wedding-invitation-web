import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { guestService } from '@/services/guest.service';

export function useGuests(invitationId: string) {
  return useQuery({
    queryKey: ['guests', invitationId],
    queryFn: () => guestService.getByInvitation(invitationId),
    enabled: !!invitationId,
  });
}

export function useCreateGuest(invitationId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { name: string; phone?: string }) => guestService.create(invitationId, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['guests', invitationId] }),
  });
}
