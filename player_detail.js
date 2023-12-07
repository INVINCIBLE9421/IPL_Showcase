
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const playerId = urlParams.get('playerId');

    const playerDetailContainer = document.querySelector('.player-detail');

    const playerDetails = playersData.find(player => player.id.toString() === playerId);

    if (playerDetails) {
        const playerImg = document.createElement('img');
        const playerImgSrc = `assets/${playerDetails.playerName.toLowerCase().replace(' ', '-')}.jpg`;
        playerImg.setAttribute('src', playerImgSrc);
        playerImg.setAttribute('alt', 'Player Photo');
        playerImg.onerror = function() {
            // If player image is not available, set a default image
            this.onerror = null;
            this.src = 'assets/blank-profile-picture.png';
        };
        playerDetailContainer.appendChild(playerImg);

        const playerInfoTable = document.createElement('table');
        playerInfoTable.classList.add('player-info');

        const playerInfoRows = [
            { label: 'Full Name', value: playerDetails.playerName },
            { label: 'Team', value: playerDetails.from },
            { label: 'Price', value: playerDetails.price },
            { label: 'Playing Status', value: playerDetails.isPlaying ? 'Playing' : 'On-bench' },
            { label: 'Role', value: playerDetails.description },
            // Add more rows for additional player details if needed
        ];

        playerInfoRows.forEach(info => {
            const row = document.createElement('tr');
            const labelCell = document.createElement('td');
            labelCell.textContent = info.label;
            const separatorCell = document.createElement('td');
            separatorCell.textContent = ':';
            const valueCell = document.createElement('td');
            valueCell.textContent = info.value;

            row.appendChild(labelCell);
            row.appendChild(separatorCell);
            row.appendChild(valueCell);

            playerInfoTable.appendChild(row);
        });

        playerDetailContainer.appendChild(playerInfoTable);
    } else {
        // Handle player not found
        console.log('Player not found');
    }
});
