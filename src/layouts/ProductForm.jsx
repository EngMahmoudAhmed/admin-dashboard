import { useForm } from "react-hook-form";

const ProductForm = ({ onSubmit, defaultValues = {}, isEdit }) => {
    const { handleSubmit, register, reset, formState: { errors } } = useForm({ defaultValues });

    const submitHandler = (data) => {
        onSubmit(data);
        reset();
    };

    return (
        <div className="bg-whit shadow-lg rounded-2xl p-6 max-w-xl mx-auto border">
            <h2 className="text-xl font-semibold mb-6">
                {isEdit ? "Update Product" : "Add New Product"}
            </h2>

            <form
                onSubmit={handleSubmit(submitHandler)}
                className="space-y-5"
            >
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Product Title
                    </label>
                    <input
                        type="text"
                        {...register("title", { required: "title is required" })}
                        placeholder="Enter product title"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                    <p className="text-red-500 text-sm mt-1">
                        {errors.title?.message}
                    </p>
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Product Category
                    </label>
                    <input
                        type="text"
                        {...register("category", { required: "Product Category is required" })}
                        placeholder="Enter product category"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                    <p className="text-red-500 text-sm mt-1">
                        {errors.category?.message}
                    </p>
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Product Price
                    </label>
                    <input
                        type="number"
                        {...register("price", { required: "Price is required" })}
                        placeholder="Enter price"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                    <p className="text-red-500 text-sm mt-1">
                        {errors.price?.message}
                    </p>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Product Description
                    </label>
                    <input
                        type="text"
                        {...register("description", { required: "description is required" })}
                        placeholder="Enter description"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                    <p className="text-red-500 text-sm mt-1">
                        {errors.description?.message}
                    </p>
                </div>

                {/* Image */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Image URL
                    </label>
                    <input
                        {...register("image")}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                </div>

                {/* rating */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        rating
                    </label>
                    <input
                        {...register("rating")}
                        placeholder="3/5"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                </div>

                {/* Published */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        {...register("is_published")}
                        className="w-4 h-4 accent-rose-600 cursor-pointer"
                    />
                    <label className="text-sm">
                        Published
                    </label>
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="w-full py-2 cursor-pointer rounded-lg bg-rose-600 text-white font-medium hover:bg-rose-700 transition duration-200"
                >
                    {isEdit ? "Update Product" : "Add Product"}
                </button>
            </form>
        </div>
    );
};

export default ProductForm;

























// import { useForm } from "react-hook-form"


// const ProductForm = ({ onSubmit, defaultValues = {}, isEdit }) => {

//     const { handleSubmit, register, reset } = useForm({ defaultValues })

//     const submitHandler = (data) => {
//         onSubmit(data);
//         reset();
//     }

//     return (
//         <form onSubmit={handleSubmit(submitHandler)}>
//             <input type="text" {...register("title")} placeholder="Title" />
//             <input {...register("price")} placeholder="Price" type="number" />
//             <input {...register("image")} placeholder="Image URL" />

//             <label>
//                 <input type="checkbox" {...register("is_published")} />
//                 Published
//             </label>

//             <button type="submit"
//                 className="px-4 m-auto py-2 cursor-pointer bg-rose-600 text-white rounded-lg text-sm hover:bg-rose-900 transition"
//             >
//                 {isEdit ? "Update" : "Add"} Product
//             </button>
//         </form>
//     )
// }

// export default ProductForm
