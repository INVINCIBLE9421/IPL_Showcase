document.addEventListener('DOMContentLoaded', function() {
    const addPlayerForm = document.getElementById('addPlayerForm');
    const playerCardsContainer = document.querySelector('.team-details-players-grid');

    addPlayerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(addPlayerForm);
        const playerData = {};

        for (const [key, value] of formData.entries()) {
            if (key === 'isPlaying') {
                // Convert value to boolean based on 'isPlaying' selection
                playerData['isPlaying'] = value === 'Playing';
            } else {
                playerData[key] = value;
            }
        }
        let existingPlayers = JSON.parse(localStorage.getItem('playersData')) || [];


        const newPlayerId = existingPlayers.length + 6; // Incrementing the ID based on existing data
        playerData['id'] = newPlayerId;

        // Get team code and assign it to the 'from' property
        const teamCode = formData.get('from');
        playerData['from'] = teamCode;

        // Push the new player data into the existing players array
        existingPlayers.push(playerData);

        // Update local storage with the modified data
        localStorage.setItem('playersData', JSON.stringify(existingPlayers));

        // Call function to update player cards with new data
        updatePlayerCard(playerData);
        window.location.href = 'team_detail.html?teamCode=' + teamCode;

        // // Store playerData in local storage
        // localStorage.setItem('newPlayerData', JSON.stringify(playerData));

        // // Call function to update player card with new data
        // updatePlayerCard(playerData);

        // window.location.href = 'index.html'; // Replace with your homepage URL
    });

    function updatePlayerCard(data) {
        const playerCard = document.createElement('div');
        playerCard.classList.add('player-card');

        const playerInfo = document.createElement('div');
        playerInfo.classList.add('player-info');

        const playerName = document.createElement('h3');
        playerName.classList.add('player-name');
        playerName.textContent = data.playerName;

        const team = document.createElement('p');
        team.textContent = `Team: ${data.team}`;

        const price = document.createElement('p');
        price.textContent = `Price: ${data.price}`;

        const playingStatus = document.createElement('p');
        playingStatus.textContent = `Playing Status: ${data.playingStatus}`;

        const role = document.createElement('p');
        role.textContent = `Role: ${data.role}`;

        playerInfo.appendChild(playerName);
        playerInfo.appendChild(team);
        playerInfo.appendChild(price);
        playerInfo.appendChild(playingStatus);
        playerInfo.appendChild(role);

        playerCard.appendChild(playerInfo);

        playerCardsContainer.appendChild(playerCard);
    }
});
