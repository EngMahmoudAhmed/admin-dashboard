function ProductSkeleton() {
    return (
        <div className="bg-white rounded-2xl shadow overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200" />

            <div className="p-4 space-y-3">
                <div className="h-3 w-1/3 bg-gray-200 rounded" />
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                <div className="h-3 w-full bg-gray-200 rounded" />
                <div className="h-3 w-5/6 bg-gray-200 rounded" />

                <div className="flex justify-between items-center mt-4">
                    <div className="h-4 w-16 bg-gray-200 rounded" />
                    <div className="h-8 w-24 bg-gray-200 rounded-lg" />
                </div>
                <div className="flex items-center justify-center">
                    <div className="h-8 w-14 bg-gray-200 rounded-lg" />
                </div>
            </div>
        </div>
    );
}

export default ProductSkeleton
