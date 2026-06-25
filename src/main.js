
const url = 'https://jsonplaceholder.typicode.com/users';
const loading = document.getElementById('loading');
const allUserData = document.getElementById("allUserId");

async function fetchUsers() {
  loading.style.display = "block";

  try {
    const users = await fetch(url);
    const results = await users.json();

    results.forEach((userData)=>{
      let newUser = document.createElement('div');
      newUser.className = "p-5 rounded-lg border border-gray-100 shadow-lg shadow-gray-300";
      newUser.innerHTML = `
        <h2 class="text-xl text-gray-900 font-bold">${userData.name}</h2>
        <p class="text-md text-gray-600 mt-3 ">${userData.email}</p>
      `;
      allUserData.append(newUser);
    });
  } catch {
    let error = document.createElement('div');
    error.textContent = 'Failed to load';
    allUserData.append(error);
  } finally {
    loading.style.display = "none";
  };
};

fetchUsers();