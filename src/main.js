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
      <button class="deleteBtn px-4 aspect-square rounded-full bg-red-300 border-none text-white hover:bg-red-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-500 ease-in-out">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
	        <path d="M0 0h24v24H0z" fill="none" />
	        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
		        <path stroke-dasharray="24" d="M12 20h5c0.5 0 1 -0.5 1 -1v-14M12 20h-5c-0.5 0 -1 -0.5 -1 -1v-14">
			        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="24;0" />
		        </path>
		        <path stroke-dasharray="18" stroke-dashoffset="18" d="M4 5h16">
			        <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.3s" to="0" />
		        </path>
		        <path stroke-dasharray="10" stroke-dashoffset="10" d="M10 4h4M10 9v7M14 9v7">
			        <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s" to="0" />
		        </path>
	        </g>
        </svg>

      </button>
    `;
    userCard.className = "js-data-card border border-gray-300 rounded-lg shadow-md py-8 px-5";
    userCard.dataset.id = user.id;
    allUserData.append(userCard);
  });
}

async function fetchUsers() {
  loading.style.display = "block";

  try{
    const response = await fetch(url);
    masterList = await response.json(); // Where the json file was assigned to masterList.
    renderUsers(masterList);
  } catch {
    allUserData.append(`Failed to Load`);
  } finally {
    loading.style.display = "none";
  };
}

allUserData.addEventListener("click", (e) => {  //for deletion
  if (e.target.classList.contains('deleteBtn')) { // If the list of classes associated with the target element contains the class 'deleteBtn'...execute.
    const cardContainer = e.target.closest('.js-data-card'); // This gets the element closest to the valid target element with the class 'js-data-card'.
    const userToDelete = Number(cardContainer.dataset.id); // converts the id grabbed from the json file to a number.

    masterList = masterList.filter((user)=>{
      return user.id !== userToDelete;
    })
    renderUsers(masterList);
  }
});

fetchUsers();