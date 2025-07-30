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

export const addressFields = [
    {
        label: "Full Name",
        name: "fullName",
        type: "text",
        placeholder: "John Doe",
    },
    {
        label: "Address Line 1",
        name: "addressLine1",
        type: "text",
        placeholder: "123 Main Street",
    },
    {
        label: "Address Line 2",
        name: "addressLine2",
        type: "text",
        placeholder: "Apartment, suite, etc. (optional)",
    },
    {
        label: "City",
        name: "city",
        type: "text",
        placeholder: "Karachi",
    },
    {
        label: "State / Province",
        name: "state",
        type: "text",
        placeholder: "Sindh",
    },
    {
        label: "Country",
        name: "country",
        type: "text",
        placeholder: "Pakistan",
    },
    {
        label: "ZIP / Postal Code",
        name: "postalCode",
        type: "text",
        placeholder: "74000",
    },

] as const;

export const contactFields = [
    {
        label: "Name",
        name: "name",
        type: "text",
        placeholder: "Your full name",
    },
    {
        label: "Email Address",
        name: "email",
        type: "email",
        placeholder: "you@example.com",
    },
    {
        label: "Subject (Optional)",
        name: "subject",
        type: "text",
        placeholder: "What’s your message about?",
    },
    {
        label: "Message",
        name: "message",
        type: "text",
        placeholder: "Type your message here (min. 50 characters)",
    },
] as const;


export const updateProfileFields = [
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
        label: "Address",
        name: "address",
        type: "text",
        placeholder: "Street 1 XYZ"
    }
] as const