import api from '@/lib/axios';
import type { BankAccount, ApiResponse } from '@/types';

export interface CreateBankAccountPayload {
  bank_name: string;
  account_name: string;
  account_number: string;
  logo_url?: string;
}

export const bankAccountService = {
  getByInvitation: (invitationId: string) =>
    api.get<ApiResponse<BankAccount[]>>(`/invitations/${invitationId}/bank-accounts`).then((r) => r.data.data),
  create: (invitationId: string, payload: CreateBankAccountPayload) =>
    api.post<ApiResponse<BankAccount>>(`/invitations/${invitationId}/bank-accounts`, payload).then((r) => r.data.data),
  delete: (invitationId: string, id: string) =>
    api.delete(`/invitations/${invitationId}/bank-accounts/${id}`),
};
