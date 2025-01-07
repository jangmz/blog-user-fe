export function formatDateEU(stringDate) {
    if (!stringDate) {
        return ""
    }
    const date = new Date(stringDate)
    return `${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`
}