import { useQuery } from '@tanstack/react-query';
import { fetchPublishedProducts } from '../api/Products';

export const useProducts = () => {
    return useQuery({
        queryKey: ['products', 'public'],
        queryFn: fetchPublishedProducts,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
        refetchOnMount: false,
    });
};