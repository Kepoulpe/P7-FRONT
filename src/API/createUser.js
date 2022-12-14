
/**
 * @param {string} email email of the user
 * @param {string} userName user name of the user
 * @param {string} password password of the user it should contain at least 8 characters and include letters, numbers and symbols
 * @returns 
 */
 export default async function createUser (userName,email, password) {
    try {
        // make the API call
        const response = await fetch('http://localhost:3001/api/auth/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userName: userName,
                email: email,
                password: password
            })
        });
        return response.json();
    } catch (error) {
        console.error(error);
    }
};
