document.addEventListener("DOMContentLoaded", function() {
  const slides = document.querySelectorAll('.slides img');
  let currentSlide = 0;

  function showSlide(n) {
    slides.forEach((slide) => {
      slide.style.display = 'none';
    });
    slides[n].style.display = 'block';
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // Initial call to display the first slide
  showSlide(currentSlide);

  // Automatically change slides every 2 seconds
  setInterval(nextSlide, 2000);
});
function searchTeam() {
  const userInput = document.getElementById('teamSearchInput').value.toUpperCase(); // Get the entered input

  const teamDetailURL = 'team_detail.html'; // Replace with the team detail page URL
  const playerDetailURL = 'player_detail.html'; // Replace with the player detail page URL

  const teamFound = teamsData.find(team => team.teamCode === userInput || team.teamName.toUpperCase() === userInput);
  const playerFound = playersData.find(player => player.playerName.toUpperCase() === userInput);

  if (teamFound) {
      window.location.href = `${teamDetailURL}?teamCode=${teamFound.teamCode}`;
  } else if (playerFound) {
      window.location.href = `${playerDetailURL}?playerId=${playerFound.id}`;
  } else {
      alert('Team or player not found');
  }
}


// Assuming you have the teamsData constant with team information as previously defined
document.addEventListener('DOMContentLoaded', function() {
  // const teamsData = [/* your team data */];
  const teamCardsContainer = document.querySelector('.team-cards');
  let existingTeams = JSON.parse(localStorage.getItem('teamsData')) || [];
  
  teamsData=teamsData.concat(existingTeams);

  // Clear existing content within the team-cards container
  teamCardsContainer.innerHTML = '';

  teamsData.forEach(team => {
    const teamCardLink = document.createElement('a');
    teamCardLink.setAttribute('href', `team_detail.html?teamCode=${team.teamCode}`);
    teamCardLink.classList.add('team-card-link');

    const teamCard = document.createElement('div');
    teamCard.classList.add('team-card');

    const teamInfo = document.createElement('div');
    teamInfo.classList.add('team-info');

    const teamName = document.createElement('h2');
    teamName.classList.add('team-name');
    teamName.textContent = team.teamName;

    const additionalInfo = document.createElement('div');
    additionalInfo.classList.add('additional-info');

    const championships = document.createElement('p');
    championships.classList.add('championships');
    championships.textContent = `Championships Won: ${team.wonCount}`;
    console.log(team.wonCount);


    const playerCount = document.createElement('p');
    playerCount.classList.add('player-count');
    playerCount.textContent = `Players: ${team.playerCount}`;

    additionalInfo.appendChild(championships);
    additionalInfo.appendChild(playerCount);

    teamInfo.appendChild(teamName);
    teamInfo.appendChild(additionalInfo);

    teamCard.appendChild(teamInfo);

    const teamLogo = document.createElement('div');
    teamLogo.classList.add('team-logo');
    teamLogo.style.backgroundImage = `url('assets/${team.teamCode}_logo.png')`; // Assuming your image names correspond to team codes

    // You can add logic here to display the team logo, like adding an image element

    teamCard.appendChild(teamLogo);

    teamCardLink.appendChild(teamCard);
    teamCardsContainer.appendChild(teamCardLink);
  });
});

