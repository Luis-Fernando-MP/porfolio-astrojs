const parentContact = document.querySelector('section.contact')
const form = parentContact?.querySelector('form#formContact') as HTMLFormElement
const btn = parentContact?.querySelector('button[type="submit"]')

if (localStorage.getItem('temp')) {
  alert('Mensaje enviado')
  localStorage.removeItem('temp')
}

const validateContainer = parentContact?.querySelector(
  'div.contact-validate'
) as HTMLElement

btn?.addEventListener('click', () => {
  if (!(form instanceof HTMLFormElement)) return
  const validForm = validateForm()
  if (validForm === undefined) return
  form.submit()
})

function validateForm() {
  const formData = new FormData(form)
  validateContainer.innerHTML = ''

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
  const email = formData.get('email')?.toString() ?? ''
  const subject = formData.get('subject')?.toString() ?? ''
  const comments = formData.get('comments')?.toString() ?? ''

  const matchEmail = !email.match(emailRegex)
  const matchSubject = subject.length < 5
  const matchComments = comments.length < 10

  if (matchEmail) addError('Por favor, ingresa un correo electrónico válido.')
  if (matchSubject)
    addError('Por favor, ingresa un asunto con al menos 5 caracteres.')
  if (matchComments)
    addError('Por favor, ingresa un mensaje con al menos 10 caracteres.')

  const isInvalidate = matchEmail || matchComments || matchSubject
  if (isInvalidate) return form.classList.add('invalidate')
  form.classList.remove('invalidate')
  form.classList.add('valid')
  localStorage.setItem('temp', 'true')
  return isInvalidate
}

function addError(message: string) {
  const errorParagraph = document.createElement('p')
  errorParagraph.className = 'contact-validate__message'
  errorParagraph.textContent = message
  validateContainer.appendChild(errorParagraph)
}

form?.addEventListener('input', () => validateForm())
