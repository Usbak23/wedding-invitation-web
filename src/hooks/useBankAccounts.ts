import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bankAccountService, type CreateBankAccountPayload } from '@/services/bankAccount.service';
import toast from 'react-hot-toast';

export function useBankAccounts(invitationId: string) {
  return useQuery({
    queryKey: ['bank-accounts', invitationId],
    queryFn: () => bankAccountService.getByInvitation(invitationId),
    enabled: !!invitationId,
  });
}

export function useCreateBankAccount(invitationId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateBankAccountPayload) => bankAccountService.create(invitationId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['bank-accounts', invitationId] });
      toast.success('Rekening berhasil ditambahkan!');
    },
    onError: () => toast.error('Gagal menambahkan rekening.'),
  });
}

export function useDeleteBankAccount(invitationId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => bankAccountService.delete(invitationId, id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['bank-accounts', invitationId] });
      toast.success('Rekening dihapus.');
    },
    onError: () => toast.error('Gagal menghapus rekening.'),
  });
}
