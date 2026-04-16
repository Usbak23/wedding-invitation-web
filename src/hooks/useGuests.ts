import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { guestService } from '@/services/guest.service';
import toast from 'react-hot-toast';

export function useGuests(invitationId: string, page = 1) {
  return useQuery({
    queryKey: ['guests', invitationId, page],
    queryFn: () => guestService.getByInvitation(invitationId, page),
    enabled: !!invitationId,
  });
}

export function useCreateGuest(invitationId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { name: string; phone?: string }) => guestService.create(invitationId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['guests', invitationId] });
      toast.success('Tamu berhasil ditambahkan!');
    },
    onError: () => toast.error('Gagal menambahkan tamu.'),
  });
}
