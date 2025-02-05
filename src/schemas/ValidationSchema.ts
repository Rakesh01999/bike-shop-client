import { z } from 'zod';

const carValidationSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    brand: z.string().min(1, 'Brand is required'),
    model: z.string().min(1, 'Model is required'),
    year: z.string().min(1, "year is required"),
    price: z.string().min(1, 'Price is required'),
    category: z.string().min(1, 'Category is required'),
    // image: z.string()
    //     .url('Please enter a valid image URL')
    //     .refine(val => !!val, {
    //         message: 'Image URL is required',
    //     })
    //     .default("")
    //     .optional(),
    image:z.string().optional(),
    description: z.string().min(1, 'Description is required'),
    quantity: z.string().min(1, 'Quantity must be at least 1'),
});

export default carValidationSchema;

