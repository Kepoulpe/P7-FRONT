
/**
 * @param {string} userId id of the user whe create the post
 * @param {string} content text content for the post
 * @param {File} image image file attach to the post
 * @returns 
 */
export default async function createNewPostAPI(formData) {
    try {
        const jwt = localStorage.getItem('jwt');
        // make the API call 
        const APICall = await fetch('http://localhost:3001/api/posts', {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + jwt,
            },
            body: formData
        })
        const response = await APICall.json();
        return response;

    } catch (error) {
        console.error(error);
    }
};