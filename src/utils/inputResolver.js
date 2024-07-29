export function convertEmail(email) {
    return email.replace(/\./g, '').replace(/@/g, '');
}
