import supabase from "../lib/supabase";

export const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) throw error;
    return data;
};

export const fetchPublishedProducts = async () => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_published', true);

    if (error) throw error;
    return data;
};

export const addProduct = async (product) => {
    const { data, error } = await supabase.from('products').insert(product);
    if (error) throw error;
    return data;
};

export const updateProduct = async ({ id, updatedData }) => {
    const { data, error } = await supabase
        .from('products')
        .update(updatedData)
        .eq('id', id);

    if (error) throw error;
    return data;
};

export const deleteProduct = async (id) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
};

// export const deleteProduct = async (id) => {
//     const { data, error } = await supabase.from('products').delete().eq('id', id);
//     if (error) throw error;
// };