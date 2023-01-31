/* User infos */
async function getGitHubProfileInfos() {
  const url = `https://api.github.com/users/carloscunha611`

  fetch(url)
    .then(response => response.json())
    .then(data => {
      userImage.src = data.avatar_url
      /* userName.textContent = data.name */
      userBio.textContent = data.bio
      userImageMobile.src = data.avatar_url
    })
}

getGitHubProfileInfos()

/* Menu */
const menuClose = e => {
  document.getElementById('menubutton').classList.toggle('close')
  document.getElementById('aside').classList.toggle('navBar-close')
}

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
              <input id="name" type="text" name="name" required />

              <label for="email">E-mail</label>
              <input id="email" type="email" name="email" required />

              <label for="mensage">Mensagem</label>
              <textarea id="mensage" name="mensage"></textarea>

              <input type="hidden" name="_captcha" value="false" />
              
              <button class="button-contact" type="submit" data-button>Enviar</button>`

const formSubmit = new FormSubmit({
  form: '[data-form]',
  button: '[data-button]',
  success: `<h1 class='success'>Mensagem enviada com sucesso!</h1>
  ${formComplete}
  `,
  error: `"<h1 class='error'>Não foi possível enviar sua mensagem.</h1>
  ${formComplete}
  `
})
formSubmit.init()
