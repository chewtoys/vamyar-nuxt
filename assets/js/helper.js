const Helper = {
  // useful methods
  getTypes: function (name = null) {
    let types = advertTypes
    if (name && types[name]) {
      return types[name]
    } else {
      return types
    }
  },
  getBreadcrumb: function (title) {
    return title
  },
  getPageTitle: function (title) {
    return "آگهی‌های " + title
  },
  getTypeByAlias: function (alias = null) {
    let types = advertAliases
    if (alias && types[alias]) {
      return types[alias]
    } else {
      return types
    }
  },
  getAdvertLink: function (item) {
    let type = this.getTypes(item.advertableType)
    if (type && type.alias) {
      return "/categories/" + type.alias + "/show/" + item.advertableId
    } else {
      return "#type-not-found"
    }
  },
  getAdvertType: function (item) {
    let type = this.getTypes(item.advertableType)
    if (type.title) {
      return type.title
    } else {
      return "بدون نوع"
    }
  },
  limitStr(text = "", limit = 30, end = " ...") {
    return text.slice(0, limit) + end
  },
  priceFormat(price = null) {
    price = price * 1 // convert to number;
    if (price > 0) return price.toLocaleString("fa-IR") + " ریال"
    return "تعیین نشده"
  },
  getRawHeaders(type) {
    return rawHeaders && rawHeaders[type] ? rawHeaders[type] : []
  }
}

// data structure
const rawHeaders = {
    loan: [
      {
        text: "شناسه",
        align: "right",
        sortable: true,
        value: "id"
      },
      {text: "عنوان", value: "title", align: "right"},
      {text: "توضیحات", value: "description", align: "right"},
      {text: "قیمت", value: "price", align: "left"},
      {text: "مقدار وام", value: "amount", align: "left"},
      {text: "عملیات", sortable: false, align: "left"}
    ],
    loanRequest: [
      {
        text: "شناسه",
        align: "right",
        sortable: true,
        value: "id"
      },
      {text: "عنوان", value: "title", align: "right"},
      {text: "توضیحات", value: "description", align: "right"},
      {text: "قیمت", value: "price", align: "left"},
      {text: "مقدار وام", value: "amount", align: "left"},
      {text: "عملیات", sortable: false, align: "left"}
    ]
  },
  advertAliases = {
    "loan-requests": {
      type: "loanRequest",
      alias: "loan-requests",
      title: "درخواست وام"
    },
    loans: {type: "loan", alias: "loans", title: "وام"},
    finances: {type: "finance", alias: "finances", title: "سرمایه گذاری"},
    "finance-requests": {
      type: "financeRequest",
      title: "درخواست سرمایه گذاری"
    },
    "co-signers": {type: "coSigner", alias: "co-signers", title: "ضامن"},
    "co-signer-requests": {
      type: "coSignerRequest",
      alias: "co-signer-requests",
      title: "درخواست ضامن"
    }
  },
  advertTypes = {
    loanRequest: {
      type: "loanRequest",
      alias: "loan-requests",
      title: "درخواست وام"
    },
    loan: {
      type: "loan",
      alias: "loans",
      title: "وام"
    },
    finance: {
      type: "finance",
      alias: "finances",
      title: "سرمایه گذاری"
    },
    financeRequest: {
      type: "financeRequest",
      alias: "finance-requests",
      title: "درخواست سرمایه گذاری"
    },
    coSigner: {
      type: "coSigner",
      alias: "co-signers",
      title: "ضامن"
    },
    coSignerRequest: {
      type: "coSignerRequest",
      alias: "co-signer-requests",
      title: "درخواست ضامن"
    }
  }

export default Helper
