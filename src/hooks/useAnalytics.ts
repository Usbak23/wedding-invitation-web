import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '@/services/analytics.service';

export function useAnalytics(invitationId: string) {
  return useQuery({
    queryKey: ['analytics', invitationId],
    queryFn: () => analyticsService.getByInvitation(invitationId),
    enabled: !!invitationId,
  });
}
