const formattedCategory = (c: string) => {
    let category = c
        .split("-")
        .map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(" ");
    return category
}

export {
    formattedCategory
}