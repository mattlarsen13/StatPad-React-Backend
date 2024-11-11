document.getElementById('getPlayers').addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('/api/players');
        const players = await response.json();
        displayJSON(players);
    } catch (error) {
        console.error('Error fetching players:', error);
    }
});

function displayJSON(data) {
    const playerDisplay = document.getElementById('playerDisplay');
    const pre = document.createElement('pre');
    pre.textContent = JSON.stringify(data, null, 4); 
    playerDisplay.innerHTML = ''; 
    playerDisplay.appendChild(pre);
}