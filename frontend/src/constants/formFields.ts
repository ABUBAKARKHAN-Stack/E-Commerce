export const signUpFields = [
    {
        label: "Username",
        name: "username",
        type: "text",
        placeholder: "Example123",
    },
    {
        label: "Email",
        name: "email",
        type: "email",
        placeholder: "example@example.com",
    },
    {
        label: "Phone",
        name: "phone",
        type: "text",
        placeholder: "0XXXXXXXXXX",
    },
    {
        label: "Password",
        name: "password",
        type: "password",
        placeholder: "********",
    },
] as const;

export const signInFields = [
    {
        label: "Email",
        name: "email",
        type: "email",
        placeholder: "example@example.com",
    },
    {
        label: "Password",
        name: "password",
        type: "password",
        placeholder: "********",
    },
] as const;



export const productFields = [
    {
        label: "Name",
        name: "name",
        type: "text",
        placeholder: "Enter Product Name"
    },
    {
        label: "Description",
        name: "description",
        type: "text",
        placeholder: "Enter Product Description"
    },
    {
        label: "Price",
        name: "price",
        type: "number",
        placeholder: "Enter Product Price"
    },
    {
        label: "Quantity",
        name: "quantity",
        type: "number",
        placeholder: "Enter Product Quantity"
    },
    {
        label: "Category",
        name: "category",
        type: "text",
        placeholder: "Enter Product Category"
    },
    {
        label: "Thumbnails",
        name: "thumbnails",
        placeholder: "",
        type: "file",
    },
] as const;