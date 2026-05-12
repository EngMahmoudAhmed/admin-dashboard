import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/ProductsApi';
// import { fetchProducts } from '../api/Products';

export const useAdminProducts = () => {
    return useQuery({
        queryKey: ['products', 'admin'],
        queryFn: fetchProducts,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
    });
};
