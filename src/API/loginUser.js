
/**
 * @param {string} email email of the user
 * @param {string} password password of the user it should contain at least 8 characters and include letters, numbers and symbols
 * @returns 
 */
 export default async function loginUser(email, password,) {
    try {
        // make the API call
        const APICall = await fetch('http://localhost:3001/api/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        const response = await APICall.json();
        return response;
    } catch (error) {
        console.error(error);
        return;
    }
};