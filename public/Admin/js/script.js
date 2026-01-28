// Handle Event All, Active, Inactive (Fill)
const statusButtons = document.querySelectorAll("[data-status]")
if(statusButtons.length > 0) {
  statusButtons.forEach(item => {
    item.addEventListener('click', (e) => {
      const statusChoose = e.target.dataset.status
      const url = new URL(window.location.href)
      if(statusChoose) {
        url.searchParams.set('status', statusChoose)
      }
      else url.searchParams.delete('status')
      window.location.href = url.href
    })
  })
} 
// End Event

// Handle Even Search Product
const formSearch = document.querySelector("#form-search")
if(formSearch) {
  formSearch.addEventListener("submit", (e) => {
    const url = new URL(window.location.href)
    const searchKeyword = e.target.elements.keyword.value
    if(searchKeyword) {
      url.searchParams.set("keyword", searchKeyword)
    } else {
      url.searchParams.delete("keyword")
    }
    window.location.href = url.href
  })
}
// End Event

// Hanle Event Pavigation
const buttonPavigation = document.querySelectorAll("[data-numberpage]")
if(buttonPavigation) {
  buttonPavigation.forEach(item => {
    item.addEventListener('click',  (e) => {
      const numberPage = e.target.dataset.numberpage
      const url = new URL(window.location.href)
      if(numberPage) {
        url.searchParams.set("page", numberPage)
      } else {
        url.searchParams.delete("page")
      }
      window.location.href = url.href
    })
  })
}
// End Event

// Handle Event Change Status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]")
if(buttonChangeStatus) {
  const formChangeStatus = document.querySelector("#form-change-status")
  const path = formChangeStatus?.getAttribute("data-path")
  buttonChangeStatus.forEach(item => {
    item.addEventListener('click', () => {
      const statusCurrent = item.getAttribute("data-status")
      const id = item.getAttribute("data-id")
      let statusChange = statusCurrent == "active" ? "inactive" : "active"

      const action = path + `/${statusChange}/${id}?_method=PATCH`
      formChangeStatus.action = action
      formChangeStatus.submit();
    })
  })
}
// End Event

// Handle Check Box Multi
const checkboxMulti = document.querySelector("[checkbox-multi]")
if(checkboxMulti) {
  // Handle For CheckAll
  const inputCheckAll = checkboxMulti.querySelector("input[name=checkall]")
  const inputCheckIds = checkboxMulti.querySelectorAll("input[name=id]")
  inputCheckAll.addEventListener('click', () => {
    if(inputCheckAll.checked) {
      inputCheckIds.forEach(inputCheckId => {
        inputCheckId.checked = true
      })
    } else {
      inputCheckIds.forEach(inputCheckId => {
        inputCheckId.checked = false
      })
    }
  })
  // Handle For Check Respectively
  inputCheckIds.forEach(inputCheckId => {
    inputCheckId.addEventListener('click', () => {
      const countCheckIds = checkboxMulti.querySelectorAll("input[name=id]:checked").length
      if(countCheckIds == inputCheckIds.length) {
        inputCheckAll.checked = true
      } else {
        inputCheckAll.checked = false
      }
    })
  })
  // Handle Submit Check Box
  const formChangeMulti = document.querySelector("[form-change-multi]")
  formChangeMulti.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputChecked = checkboxMulti.querySelectorAll("input[name=id]:checked")
    const typeChange = formChangeMulti.querySelector("select[name=type]").value
    if(inputChecked.length > 0) {
      let ids = []
      inputChecked.forEach(item => {
        if(typeChange == "position") {
          // const valuePosition = item.closest("tr").getAttribute("input[name=position]")
          const valuePosition = item.closest("tr").querySelector("input[name=position]").value
          ids.push(`${item.value}-${valuePosition}`)
        } else {
          ids.push(item.value)
        }
      })
      const inputIds = formChangeMulti.querySelector("input[name=ids]")
      inputIds.value = ids.join(', ')
      formChangeMulti.submit()
    }
  })
}
// End

// Handle Delete Product
const buttonDeletes = document.querySelectorAll("[button-delete]")
if(buttonDeletes.length > 0) {
  const formDelete = document.querySelector("#form-delete")
  buttonDeletes.forEach(buttonDelete => {
    buttonDelete.addEventListener('click', () => {
      const id = buttonDelete.getAttribute("data-id")
      const path = formDelete.getAttribute("data-path")
      const action = `${path}/${id}?_method=DELETE`
      formDelete.action = action
      formDelete.submit()
    })
  })
}
// End

// Handle Show Alert
const showAlert = document.querySelector("[show-alert]")
if(showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"))
  setTimeout(() => {
    showAlert.classList.add('d-none')
  }, time)
}
// End

// Handle Upload Image Preview
const uploadImageContainers = document.querySelector("[upload-image]")
if(uploadImageContainers) {
  const input = uploadImageContainers.querySelector("[upload-image-input]")
  const preview = uploadImageContainers.querySelector("[upload-image-preview]")
  input.addEventListener('change', (e) => {
    const file = e.target.files[0]
    if(file) preview.src = URL.createObjectURL(file)
  })
}
// End
