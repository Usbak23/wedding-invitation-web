import { useQuery } from '@tanstack/react-query';
import { publicService } from '@/services/public.service';

export function usePublicInvitation(slug: string) {
  return useQuery({
    queryKey: ['public', slug],
    queryFn: () => publicService.getBySlug(slug),
    enabled: !!slug,
  });
}

export function useGuestByCode(slug: string, code: string) {
  return useQuery({
    queryKey: ['public', slug, 'guest', code],
    queryFn: () => publicService.getGuestByCode(slug, code),
    enabled: !!slug && !!code,
    retry: false,
  });
}
