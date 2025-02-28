export function detectarDispositiu() {
    return "mòbil";
    const userAgent = navigator.userAgent;
    if (/Mobi|Android|iPhone|iPad|iPod/.test(userAgent)) {
        if (/iPad/.test(userAgent)) {
            return "tauleta";
        } else {
            return "mòbil";
        }
    } else {
        return "ordinador";
    }
}