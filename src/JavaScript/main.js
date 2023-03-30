function showLoading() {
  const div = document.createElement('div')
  div.classList.add('loading')

  const label = document.createElement('label')
  label.innerText = 'Carregando...'

  div.appendChild(label)

  document.body.appendChild(div)
}

showLoading()

window.onload = function () {
  hideLoading()
}

function hideLoading() {
  const loading = document.getElementsByClassName('loading')
  if (loading.length) {
    loading[0].remove()
  }
}

/* User infos */
async function getGitHubProfileInfos() {
  const url = `https://api.github.com/users/carloscunha611`

  const response = await fetch(url)
  const data = await response.json()

  userImage.src = data.avatar_url
  userBio.textContent = data.bio
  userImageMobile.src = data.avatar_url
}

getGitHubProfileInfos()

/* Form e-mail */
class FormSubmit {
  constructor(settings) {
    this.settings = settings
    this.form = document.querySelector(settings.form)
    this.formButton = document.querySelector(settings.button)
    if (this.form) {
      this.url = this.form.getAttribute('action')
    }
    this.sendForm = this.sendForm.bind(this)
  }

  displaySuccess() {
    this.form.innerHTML = this.settings.success
  }

  displayError() {
    this.form.innerHTML = this.settings.error
  }

  getFormObject() {
    const formObject = {}
    const fields = this.form.querySelectorAll('[name]')
    fields.forEach(field => {
      formObject[field.getAttribute('name')] = field.value
    })
    return formObject
  }

  onSubmission(event) {
    event.preventDefault()
    event.target.disabled = true
    event.target.innerText = 'Enviando...'
  }

  async sendForm(event) {
    try {
      this.onSubmission(event)
      await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(this.getFormObject())
      })
      this.displaySuccess()
    } catch (error) {
      this.displayError()
      throw new Error(error)
    }
  }

  init() {
    if (this.form) this.formButton.addEventListener('click', this.sendForm)
    return this
  }
}

const formComplete = `
<label for="name">Nome</label>
<input
  required
  id="name"
  type="text"
  name="name"
  autocomplete="off"
  placeholder="Digite seu nome aqui."
/>

<label for="email">E-mail</label>
<input
  required
  id="email"
  type="email"
  name="email"
  autocomplete="off"
  placeholder="Digite seu e-mail para contato."
/>

<label for="mensage">Mensagem</label>
<textarea
  required
  id="mensage"
  name="mensage"
  placeholder="Digite sua mensagem aqui."
></textarea>
<button class="contact button-contact" type="submit" data-button>
  Enviar
</button>
<input type="hidden" name="_captcha" value="false" />`

const formSubmit = new FormSubmit({
  form: '[data-form]',
  button: '[data-button]',
  success: `<h1 class='success' data-aos="fade-down">Mensagem enviada com <span class= 'success_'>sucesso</span>!</h1>
  ${formComplete}
  `,
  error: `"<h1 class='error' data-aos="fade-down">Não foi possível enviar sua mensagem.</h1>
  ${formComplete}
  `
})
formSubmit.init()

/* MENU */
const menuClose = e => {
  const menuButton = document.getElementById('menubutton')
  const aside = document.getElementById('aside')
  menuButton.classList.toggle('close')
  aside.classList.toggle('navBar-close')
}

const aside = document.getElementById('aside')
const navHeight = aside.offsetHeight

const changeMenuWhenScroll = () => {
  if (window.scrollY >= navHeight) {
    aside.classList.add('scroll')
  } else {
    aside.classList.remove('scroll')
  }
}

const sections = document.querySelectorAll('main section[id]')

const activeMenuSection = () => {
  const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4

  for (const section of sections) {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute('id')

    const checkpointStart = checkpoint >= sectionTop
    const checkpointEnd = checkpoint <= sectionTop + sectionHeight

    const menuItem = document.querySelector(
      `nav div.buttons ul li a[href*="${sectionId}"]`
    )
    menuItem.classList.toggle('active', checkpointStart && checkpointEnd)
  }
}

window.addEventListener('scroll', () => {
  activeMenuSection()
  changeMenuWhenScroll()
})

/* website imagens */
function trocarImagemPorGif(imagem, imagemUrl, gifUrl) {
  imagem.addEventListener('mouseover', function () {
    imagem.setAttribute('src', gifUrl)
  })
  imagem.addEventListener('mouseout', function () {
    imagem.setAttribute('src', imagemUrl)
  })
}

var websiteImage1 = document.getElementById('websiteImage1')
trocarImagemPorGif(
  websiteImage1,
  './src/assets/icons/ihuul-bg1.png',
  './src/assets/icons/gifs/ihuul-gif.gif'
)
var websiteImage2 = document.getElementById('websiteImage2')
trocarImagemPorGif(
  websiteImage2,
  './src/assets/icons/halo-bg1.png',
  './src/assets/icons/gifs/halo-gif.gif'
)
var websiteImage3 = document.getElementById('websiteImage3')
trocarImagemPorGif(
  websiteImage3,
  './src/assets/icons/bs-bg1.png',
  './src/assets/icons/gifs/bs-gif.gif'
)
var websiteImage4 = document.getElementById('websiteImage4')
trocarImagemPorGif(
  websiteImage4,
  './src/assets/icons/projectFalcon-bg1.png',
  './src/assets/icons/gifs/projectFalcon-gif.gif'
)
var websiteImage5 = document.getElementById('websiteImage5')
trocarImagemPorGif(
  websiteImage5,
  './src/assets/icons/myTrovoSpace-bg1.png',
  './src/assets/icons/gifs/myTrovoSpace-gif.gif'
)
var websiteImage6 = document.getElementById('websiteImage6')
trocarImagemPorGif(
  websiteImage6,
  './src/assets/icons/foxFoxGo-bg1.png',
  './src/assets/icons/gifs/foxFoxGo-gif.gif'
)
var websiteImage7 = document.getElementById('websiteImage7')
trocarImagemPorGif(
  websiteImage7,
  './src/assets/icons/vaultCard-bg1.png',
  './src/assets/icons/gifs/vaultCard-gif.gif'
)
var websiteImage8 = document.getElementById('websiteImage8')
trocarImagemPorGif(
  websiteImage8,
  './src/assets/icons/habits-bg1.png',
  './src/assets/icons/gifs/habits-gif.gif'
)
