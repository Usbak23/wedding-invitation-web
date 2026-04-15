import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '@/services/admin.service';

export function useAdminDashboard() {
  return useQuery({ queryKey: ['admin', 'dashboard'], queryFn: adminService.getDashboard });
}

export function useAdminUsers() {
  return useQuery({ queryKey: ['admin', 'users'], queryFn: adminService.getUsers });
}

export function useAdminInvitations() {
  return useQuery({ queryKey: ['admin', 'invitations'], queryFn: adminService.getInvitations });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.deleteUser(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'users'] }),
  });
}
