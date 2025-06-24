/**
 * Get CSRF token from cookies (Django Default).
 * @returns {string} CSRF token
 */
export function getCSRFToken(){
    const csrfCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1]
    return csrfCookie || ''
}

/**
 * Sends the player's score to the database via a POST request.
 * @param {string} level - Current game level 
 * @param {number} score - Player's score for the level.
 */
export function postScore(level, score){
    fetch("/game/api/save-score", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCSRFToken(),
        },
        body: JSON.stringify({ level, score }),
    })
    .then(res => res.json())
    .then(data => console.log("Score saved:", data))
    .catch(err => console.log("Error saving score:", err))
}