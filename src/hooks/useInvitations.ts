import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { invitationService, type InvitationPayload } from '@/services/invitation.service';

export const INVITATION_KEYS = {
  all: ['invitations'] as const,
  detail: (id: string) => ['invitations', id] as const,
};

export function useInvitations() {
  return useQuery({ queryKey: INVITATION_KEYS.all, queryFn: invitationService.getAll });
}

export function useInvitation(id: string) {
  return useQuery({ queryKey: INVITATION_KEYS.detail(id), queryFn: () => invitationService.getById(id) });
}

export function useCreateInvitation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: InvitationPayload) => invitationService.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: INVITATION_KEYS.all }),
  });
}

export function useUpdateInvitation(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<InvitationPayload>) => invitationService.update(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: INVITATION_KEYS.all });
      qc.invalidateQueries({ queryKey: INVITATION_KEYS.detail(id) });
    },
  });
}

export function useDeleteInvitation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => invitationService.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: INVITATION_KEYS.all }),
  });
}

export function usePublishInvitation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => invitationService.publish(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: INVITATION_KEYS.all }),
  });
}
