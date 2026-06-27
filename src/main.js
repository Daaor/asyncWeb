const url = 'https://jsonplaceholder.typicode.com/users';
const loading = document.getElementById('loading');
const allUserData = document.getElementById("allUserId");
const searchBar = document.getElementById('search');
let masterList = [];

searchBar.addEventListener("input", (e) => {
  const searchValue = e.target.value.toLowerCase();
  const filtered = masterList.filter((user) => { //appends element that passes condition written in its arrow function
    return user.name.toLowerCase().includes(searchValue);
  });
  renderUsers(filtered);
});

function renderUsers(usersList){ // Handles creating of individual cards from the elements in the array passed as an argument
  allUserData.innerHTML = '';
  usersList.forEach((user) => {
    const userCard = document.createElement('div');
    userCard.innerHTML = `
      <h2 class="text-xl font-bold text-center">${user.name}</h2>
      <p class="text-lg text-center pt-5">${user.email}</p>
    `;
    userCard.className = "border border-gray-300 rounded-lg shadow-md py-8 px-5";
    allUserData.append(userCard);
  });
}

async function fetchUsers() {
  loading.style.display = "block";

  try{
    const response = await fetch(url);
    masterList = await response.json();
    renderUsers(masterList);
  } catch {
    allUserData.append(`Failed to Load`);
  } finally {
    loading.style.display = "none";
  }
}
fetchUsers();