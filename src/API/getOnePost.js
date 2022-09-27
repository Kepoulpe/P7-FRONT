

export default async function getOnePostAPI(postId) {

    const jwt = localStorage.getItem("jwt");

    try {
        const response = await fetch(`http://localhost:3001/api/posts/${postId}`, {
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