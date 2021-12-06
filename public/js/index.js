// document.querySelector(".modal button").addEventListener("click", (e)=>{
//     e.target.parentElement.classList.toggle("hidden");
// });

// document.querySelector(".order").addEventListener("click", ()=>{
//     document.querySelector(".modal").classList.toggle("hidden");
// });
const signIn = document.querySelector('.signin')
const token = document.cookie.split('=')[1]

if(token) {
    signIn.classList.remove('signin')
    signIn.classList.add('signout')
    signIn.firstChild.remove()
    signIn.innerHTML = '<a href="/auth/logout">Sign out</a>'
}

if(window.location.href == 'http://localhost:8080/cabinet') {
    const deleteBtn = document.querySelector('.delete')
    deleteBtn.addEventListener('dblclick', () => {
        fetch('http://localhost:8080/deleteUser', {method: 'DELETE'}).then(() => {
            window.location.href = '/'
        })
    })
}

