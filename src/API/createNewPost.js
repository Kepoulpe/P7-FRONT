
/**
 * @param {string} userId id of the user whe create the post
 * @param {string} content text content for the post
 * @param {File} image image file attach to the post
 * @returns 
 */
 export default async function createNewPost (content, image) {
    try { 
        let response= [];
        // make the API call with image not empty
        if (image != "unedefined") {
            const response = await fetch('http://localhost:3001/api/auth/posts', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content: content,
                    imageUrl: image,
                })
            });
        } else {
            const response = await fetch('http://localhost:3001/api/auth/posts', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content: content,
                })
            });
        }
       
        console.log(response.json());
        return response.json();
    } catch (error) {
        console.error(error);
    }
};