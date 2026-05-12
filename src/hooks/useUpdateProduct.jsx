import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateProduct } from "../api/Productsapi";

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
    // {
    //     console.log("sending", {
    //         id: product.id,
    //         formData
    //     });
    // }
};