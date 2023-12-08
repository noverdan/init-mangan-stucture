
export default function getPaymentLink(param) {

    const API_URL = import.meta.env.VITE_PAYMENT_API
    const SECRET = import.meta.env.VITE_SECRET_PAYMENT
    const encodeSecret = btoa(SECRET)
    const paramString = JSON.stringify(param)
    async function postData() {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                'Accept': "application/json",
                'Content-Type': 'application/json',
                'Authorization': `Basic ${encodeSecret}`
            },
            body: paramString
        })
        return await response.json();
    }
    return postData()
}