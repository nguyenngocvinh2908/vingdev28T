module.exports = (statusQuery) => {
  const fills = [
    {
      name: "All",
      status: "",
      class: "" 
    },
    {
      name: "Active",
      status: "active",
      class: ""
    },
    {
      name: "Inactive",
      status: "inactive",
      class: ""
    }
  ]
  if(statusQuery) {
    const indexChooseStatus = fills.findIndex(item => item.status == statusQuery)
    fills[indexChooseStatus].class = "btn-choose"
  } else {
    const indexChooseStatus = fills.findIndex(item => item.status == "")
    fills[indexChooseStatus].class = "btn-choose"
  }
  return fills
}