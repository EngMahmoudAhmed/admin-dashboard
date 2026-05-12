import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteProduct } from "../api/ProductsApi";
// import { deleteProduct } from "../api/Products";

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['products']});
        },
    });
};