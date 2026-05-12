import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProduct } from '../api/ProductsApi';
// import { addProduct } from '../api/Products';

export const useAddProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['products']});
        },
    });
};