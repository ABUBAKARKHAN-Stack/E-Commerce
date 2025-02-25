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