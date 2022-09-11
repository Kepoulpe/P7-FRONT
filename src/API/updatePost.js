const jwt = localStorage.getItem('jwt')
/** Update without image
 * @param {string} postId id of the post liked or dislked by the user
 * @param {string} content content edited by the user
 * @param {number} like value for like dislike logic can be 1, -1 or 0
 * @returns 
 */
 export default async function updatePostNoImage (postId,content) {
    try {
        // make the API call
        const response = await fetch(`http://localhost:3001/api/posts/${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwt,
            },
            body: JSON.stringify({
                content: content
            })
        });
        return response.json();
    } catch (error) {
        console.error(error);
    }
};

/** Update with image
 * @param {string} postId id of the post liked or dislked by the user
 * @param {string} content content edited by the user
 * @param {number} like value for like dislike logic can be 1, -1 or 0
 * @returns 
 */
 export default async function updatePostWithImage (postId,formData) {
    try {
        // make the API call
        const response = await fetch(`http://localhost:3001/api/posts/${postId}`, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + jwt,
            },
            body: formData
        });
        return response.json();
    } catch (error) {
        console.error(error);
    }
};
