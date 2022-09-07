
/**
 * @param {string} userId id of the user whe create the post
 * @param {string} content text content for the post
 * @param {File} image image file attach to the post
 * @returns 
 */
export default async function createNewPost(content, image) {
    try {
        const jwt = localStorage.getItem('jwt');
        const userId = localStorage.getItem('userId')
        // make the API call with image not empty
        if (image.length > 0) {
            const APICall = await fetch('http://localhost:3001/api/posts', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + jwt
                },
                body: JSON.stringify({
                    userId: userId,
                    content: content,
                    imageUrl: image,
                })
            })
            const response = await APICall.json();
            return response;
        } else {
            const APICall = await fetch('http://localhost:3001/api/posts', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + jwt
                },
                body: JSON.stringify({
                    userId: userId,
                    content: content
                })
            })
            const response = await APICall.json();
            return response;
        }


    } catch (error) {
        console.error(error);
    }
};