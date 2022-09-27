

export default async function getOneUserAPI() {
    try {
        const userId = localStorage.getItem("userId");
        const jwt = localStorage.getItem("jwt");
        const response = await fetch(`http://localhost:3001/api/auth/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + jwt
            },
        });
        const res = await response.json();
        return res;
    } catch (error) {
        console.log(error);
    }
}