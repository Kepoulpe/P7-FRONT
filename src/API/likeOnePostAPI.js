
/**
 * @param {string} postId id of the post liked or dislked by the user
 * @param {string} userId current userId logged in
 * @param {number} like value for like dislike logic can be 1, -1 or 0
 * @returns 
 */
 export default async function like (postId) {
    try {
        const userId = localStorage.getItem("userId");
        const jwt = localStorage.getItem("jwt");
        // make the API call
        const response = await fetch(`http://localhost:3001/api/posts/${postId}/like`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + jwt
            },
            body: JSON.stringify({
                userId: userId,
                like: 1
            })
        });
        return response.json();
    } catch (error) {
        console.error(error);
    }
};

