// import { useAdminProducts } from "../../hooks/useAdminProducts"
// import ProductSkeleton from "../../pages/ProductSkeleton"
import { motion } from "framer-motion"
import { useAdminProducts } from "../hooks/useAdminProducts"
import ProductSkeleton from "../pages/ProductSkeleton"


const ProductTable = ({ products, onDelete, onEdit }) => {
    const { isLoading } = useAdminProducts()
    return (
        <>
            <div className="grid max-w-7xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 py-16">
                {
                    isLoading
                        ? Array.from({ length: 10 }).map((_, i) => (
                            <ProductSkeleton key={i} />
                        )) :
                        products.map((product) => (
                            <div key={product.id}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 1, delay: 0.3 }}
                                    className=" hover:shadow-gray-700 rounded-2xl shadow-xl transition overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="h-48 w-full object-cover"
                                    />

                                    <div className="p-4 m">
                                        <span className="text-xs text-blue-600 font-medium uppercase">
                                            {product.category}
                                        </span>

                                        <h2 className="font-semibold text-lg mt-1 truncate">{product.title}</h2>

                                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                                            {product.description}
                                        </p>

                                        <div className="flex justify-between items-center mt-4">
                                            <span className="font-bold">${product.price}</span>
                                            <span className="text-sm">⭐ {product.rating}</span>
                                        </div>
                                        <div className="flex items-center justify-between py-8">
                                            <button onClick={() => onEdit(product)}
                                                className="px-4 m-auto py-2 cursor-pointer bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-900 transition"
                                            >Edit</button>
                                            <button onClick={() => onDelete(product.id)}
                                                className="px-4 m-auto py-2 cursor-pointer bg-rose-600 text-white rounded-lg text-sm hover:bg-rose-900 transition"
                                            >Delete</button>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ))
                }
            </div >
        </>
    )
}

export default ProductTable
