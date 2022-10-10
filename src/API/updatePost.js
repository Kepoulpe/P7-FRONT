const jwt = localStorage.getItem('jwt')
/** Update without image
 * @param {string} postId id of the post liked or dislked by the user
 * @param {string} content content edited by the user
 * @returns 
 */
 async function updatePostNoImage (postId,content) {
    try {
        // make the API call
        const APIcall = await fetch(`http://localhost:3001/api/posts/${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwt,
            },
            body: JSON.stringify({
                content: content
            })
        });
        const response = await APIcall.json();
        return response
    } catch (error) {
        console.error(error);
    }
};

/** Update with image
 * @param {formData} formData get from the update form if their is picture to update
 * @param {string} postId content edited by the user
 * @returns 
 */
async function updatePostWithImage (postId,formData) {
    try {
        // make the API call
        const APICall = await fetch(`http://localhost:3001/api/posts/${postId}`, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + jwt,
            },
            body: formData
        });
        const response = await APICall.json();
        return response
    } catch (error) {
        console.error(error);
    }
};
// export default async function createNewPostAPI(formData) {
//     try {
//         const jwt = localStorage.getItem('jwt');
//         // make the API call 
//         const APICall = await fetch('http://localhost:3001/api/posts', {
//             method: "POST",
//             headers: {
//                 "Authorization": "Bearer " + jwt,
//             },
//             body: formData
//         })
//         const response = await APICall.json();
//         return response;

//     } catch (error) {
//         console.error(error);
//     }
// };
export  {updatePostNoImage, updatePostWithImage};
