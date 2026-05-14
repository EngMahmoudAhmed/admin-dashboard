import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateProduct } from "../api/ProductsApi";

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};