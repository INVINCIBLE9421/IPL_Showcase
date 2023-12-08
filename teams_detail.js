document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const teamCode = urlParams.get('teamCode');

    const teamDetails = teamsData.find(team => team.teamCode === teamCode);

    if (teamDetails) {
        document.getElementById('teamName').textContent = teamDetails.teamName;
        document.querySelector('.team-details-info img').setAttribute('src', `assets/${teamDetails.teamCode}_logo.png`);

        // Set other team details dynamically here using the teamDetails object
        // For instance:
        document.querySelector('.team-stats span:nth-child(2)').textContent = teamDetails.playerCount;
        document.querySelector('.stat:nth-child(2) span:nth-child(2)').textContent = teamDetails.topBatsman;
        document.querySelector('.stat:nth-child(3) span:nth-child(2)').textContent = teamDetails.topBowler;
        document.querySelector('.stat:nth-child(4) span:nth-child(2)').textContent = teamDetails.wonCount;

        let newPlayers=JSON.parse(localStorage.getItem('playersData'))||[];

        playersData=playersData.concat(newPlayers);
    } else {
        // Handle team not found
        console.log('Team not found');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const teamCode = urlParams.get('teamCode');

    const playersGrid = document.querySelector('.team-details-players-grid');

    const playersInTeam = playersData.filter(player => player.from === teamCode);

    playersInTeam.forEach(player => {
        const playerCardLink = document.createElement('a');
        playerCardLink.setAttribute('href', `player_detail.html?playerId=${player.id}`);
        playerCardLink.classList.add('player-card-link');
        playerCardLink.style.textDecoration = 'none'; // Remove text decoration

        const playerCard = document.createElement('div');
        playerCard.classList.add('player-card');

        const playerName = document.createElement('h2'); // Increase size to heading level
        playerName.textContent = player.playerName;

        const teamName = document.createElement('p');
        teamName.textContent = `Team: ${teamCode}`;

        const playerPrice = document.createElement('p');
        playerPrice.textContent = `Price: ${player.price}`;

        const playingStatus = document.createElement('p');
        playingStatus.textContent = `Playing Status: ${player.isPlaying ? 'Playing' : 'On-bench'}`;

        const playerRole = document.createElement('p');
        playerRole.textContent = `Role: ${player.description}`;

        playerCard.appendChild(playerName);
        playerCard.appendChild(teamName);
        playerCard.appendChild(playerPrice);
        playerCard.appendChild(playingStatus);
        playerCard.appendChild(playerRole);

        playerCardLink.appendChild(playerCard);
        playersGrid.appendChild(playerCardLink);
    });
});

