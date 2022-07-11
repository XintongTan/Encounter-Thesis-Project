const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll('.nav__link')
const benchPhoto = document.getElementById('searchBenches')
const loadImage = document.getElementById('reloadImage')

navToggle.addEventListener("click", () => {
    document.body.classList.toggle('nav-open')

})

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    })
})


async function getBenchPhoto() {
    const res = await fetch(`https://api.unsplash.com/search/photos?per_page=60&query=park-bench&orientation=portrait&client_id=kJ22txUQmjD8-pocD98MbPeUKx0SFXqDOOY7SqnQ6Jk`)
    if (!res.ok) {
        const message = `An error has occured: ${response.status}`
        throw new Error(message);
    }
    const data = await res.json()

    return data.results
}


getBenchPhoto()
    .catch(error => error.message)
    .then(data => {
        console.log(data)
        getPhotoHtml(data)
        loadImage.addEventListener("click", ()=>getPhotoHtml(data))
    })

function getPhotoHtml(arr) {
    const newArr = getMultipleRandom(arr, 5)
    const photoHTML = newArr.map(photo => {
        return `<div class="bench">
                    <img src=${photo.urls.small}/>
                    </div>
                    `
    }).join('')
    benchPhoto.innerHTML = photoHTML;
}


function getMultipleRandom(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

    


