const jwt = localStorage.getItem('jwt')
/** Update without image
 * @param {string} postId id of the post liked or dislked by the user
 * @returns 
 */
 export default async function deleteOnePostAPI (postId) {
    try {
        // make the API call
        const APIcall = await fetch(`http://localhost:3001/api/posts/${postId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwt,
            },
        });
        const response = await APIcall.json();
        return response
    } catch (error) {
        console.error(error);
    }
};