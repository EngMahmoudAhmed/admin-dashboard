import { useState, useEffect } from "react";
// import ProductForm from "../component/layouts/ProductForm";
// import ProductTable from "../component/layouts/ProductTable";
import { useAdminProducts } from "../hooks/useAdminProducts";
import { useUpdateProduct } from "../hooks/useUpdateProduct"
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { useAddProduct } from "../hooks/useAddProduct"
import ProductForm from "../layouts/ProductForm";
import ProductTable from "../layouts/ProductTable";
// import { motion } from "framer-motion";
// import ProductSkeleton from "./ProductSkeleton";

const Dashboard = () => {
    const { data: products, isLoading, isError, error } = useAdminProducts();
    const deleteMutation = useDeleteProduct();
    const updateMutation = useUpdateProduct();
    const addMutation = useAddProduct();

    const [editingProduct, setEditingProduct] = useState(null)

    const handleAdd = (data) => {
        addMutation.mutate(data);
    };

    const handleUpdate = (data) => {
        updateMutation.mutate({
            id: editingProduct.id,
            updatedData: data,
        })
        setEditingProduct(null)
    }

    const handleDelete = (id) => {
        deleteMutation.mutate(id)
    }

    return (
        <>
            <h1 className="text-4xl text-center font-bold m-auto mb-10 p-buttom border-b-blue-700 py-16">
                Dashboard
            </h1>


            <ProductForm
                onSubmit={editingProduct ? handleUpdate : handleAdd}
                defaultValues={editingProduct || {}}
                isEdit={!!editingProduct}
            />

            <ProductTable
                products={products}
                onEdit={setEditingProduct}
                onDelete={handleDelete}
            />
        </>
    )

}

export default Dashboard;