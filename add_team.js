document.addEventListener('DOMContentLoaded', function() {
    const addTeamForm = document.getElementById('addTeamForm');
    const teamCardsContainer = document.querySelector('.team-cards');

    addTeamForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(addTeamForm);
        const teamData = {};

        for (const [key, value] of formData.entries()) {
            teamData[key] = key === 'teamCode' ? value.toUpperCase().replace(/\s/g, '') : value;
        }

        let existingTeams = JSON.parse(localStorage.getItem('teamsData')) || [];
        
            existingTeams.push(teamData); // Add the new team only if it doesn't exist

            localStorage.setItem('teamsData', JSON.stringify(existingTeams)); // Update local storage

            updateTeamCard(teamData); // Render the new team card

            addTeamForm.reset(); // Reset the form after submission
            window.location.href = './index.html'; // Redirect to index.html
        
    });

    function updateTeamCard(data) {
        const teamCard = document.createElement('div');
        teamCard.classList.add('team-card');

        const teamInfo = document.createElement('div');
        teamInfo.classList.add('team-info');

        const teamName = document.createElement('h2');
        teamName.classList.add('team-name');
        teamName.textContent = data.teamName;

        const additionalInfo = document.createElement('div');
        additionalInfo.classList.add('additional-info');

        const championships = document.createElement('p');
        championships.classList.add('championships');
        championships.textContent = `Championships Won: ${data.wonCount}`;
        
        const playerCount = document.createElement('p');
        playerCount.classList.add('player-count');
        playerCount.textContent = `Players: ${data.playerCount}`;

        additionalInfo.appendChild(championships);
        additionalInfo.appendChild(playerCount);

        teamInfo.appendChild(teamName);
        teamInfo.appendChild(additionalInfo);

        teamCard.appendChild(teamInfo);
        const teamLogo = document.createElement('img');
        teamLogo.classList.add('team-logo');
        teamLogo.src = data.teamLogo ? URL.createObjectURL(data.teamLogo) : 'assets/blank-profile-picture.png';
        teamLogo.alt = 'Team Logo';
        teamCard.appendChild(teamLogo);

        // Add the new team card to the team cards container
        teamCardsContainer.appendChild(teamCard);
    }
});
