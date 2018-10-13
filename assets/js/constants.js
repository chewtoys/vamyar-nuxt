// data structure
export const rawHeaders = {
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
  filedByType = {
    loan: {
      create: [
        {
          name: 'title',
          title: 'عنوان'
        }, {
          name: 'city',
          title: 'شهر'
        }, {
          name: 'text',
          title: 'توضیح آگهی'
        }, {
          name: 'mobile',
          title: 'موبایل'
        }, {
          name: 'image',
          title: 'تصویر آگهی'
        }, {
          name: 'guaranteeType',
          title: 'نوع ضمانت'
        }, {
          name: 'amount',
          title: 'مقدار وام'
        }, {
          name: 'price',
          title: 'مبلغ وام'
        }, {
          name: 'paybackTime',
          title: 'مدت بازپرداخت'
        }, {
          name: 'loanType',
          title: 'نوع وام'
        },
      ],
    },
    loanRequest: {
      create: [
        {
          name: 'title',
          title: 'عنوان'
        }, {
          name: 'city',
          title: 'شهر'
        }, {
          name: 'text',
          title: 'توضیح آگهی'
        }, {
          name: 'mobile',
          title: 'موبایل'
        }, {
          name: 'image',
          title: 'تصویر آگهی'
        }, {
          name: 'guaranteeType',
          title: 'نوع ضمانت'
        }, {
          name: 'amount',
          title: 'مقدار وام'
        }, {
          name: 'price',
          title: 'مبلغ وام'
        }, {
          name: 'paybackTime',
          title: 'مدت بازپرداخت'
        }, {
          name: 'loanType',
          title: 'نوع وام'
        },
      ],
    },
    finance: {
      create: [
        {
          name: 'title',
          title: 'عنوان'
        }, {
          name: 'city',
          title: 'شهر'
        }, {
          name: 'text',
          title: 'توضیح آگهی'
        }, {
          name: 'mobile',
          title: 'موبایل'
        }, {
          name: 'image',
          title: 'تصویر آگهی'
        }, {
          name: 'guaranteeType',
          title: 'نوع ضمانت'
        }, {
          name: 'amount',
          title: 'مقدار وام'
        }, {
          name: 'price',
          title: 'مبلغ وام'
        }, {
          name: 'paybackTime',
          title: 'مدت بازپرداخت'
        }, {
          name: 'loanType',
          title: 'نوع وام'
        },
      ],
    },
    financeRequest: {
      create: [
        {
          name: 'title',
          title: 'عنوان'
        }, {
          name: 'city',
          title: 'شهر'
        }, {
          name: 'text',
          title: 'توضیح آگهی'
        }, {
          name: 'mobile',
          title: 'موبایل'
        }, {
          name: 'image',
          title: 'تصویر آگهی'
        }, {
          name: 'guaranteeType',
          title: 'نوع ضمانت'
        }, {
          name: 'amount',
          title: 'مقدار وام'
        }, {
          name: 'price',
          title: 'مبلغ وام'
        }, {
          name: 'paybackTime',
          title: 'مدت بازپرداخت'
        }, {
          name: 'loanType',
          title: 'نوع وام'
        },
      ],
    },
    coSigner: {
      create: [
        {
          name: 'title',
          title: 'عنوان'
        }, {
          name: 'city',
          title: 'شهر'
        }, {
          name: 'text',
          title: 'توضیح آگهی'
        }, {
          name: 'mobile',
          title: 'موبایل'
        }, {
          name: 'image',
          title: 'تصویر آگهی'
        }, {
          name: 'guaranteeType',
          title: 'نوع ضمانت'
        }, {
          name: 'amount',
          title: 'مقدار وام'
        }, {
          name: 'price',
          title: 'مبلغ وام'
        }, {
          name: 'paybackTime',
          title: 'مدت بازپرداخت'
        }, {
          name: 'loanType',
          title: 'نوع وام'
        },
      ],
    },
    coSignerRequest: {
      create: [
        {
          name: 'title',
          title: 'عنوان'
        }, {
          name: 'city',
          title: 'شهر'
        }, {
          name: 'text',
          title: 'توضیح آگهی'
        }, {
          name: 'mobile',
          title: 'موبایل'
        }, {
          name: 'image',
          title: 'تصویر آگهی'
        }, {
          name: 'guaranteeType',
          title: 'نوع ضمانت'
        }, {
          name: 'amount',
          title: 'مقدار وام'
        }, {
          name: 'price',
          title: 'مبلغ وام'
        }, {
          name: 'paybackTime',
          title: 'مدت بازپرداخت'
        }, {
          name: 'loanType',
          title: 'نوع وام'
        },
      ],
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
  }, AdminMenu = {
    tickets: [
      {title: "کل تیکت های ثبت شده", icon: "inbox", link: "/admin/tickets"}
    ],
    accounts: [
      {title: "کل کاربران", icon: "inbox", link: "/admin/users"},
      {title: "ایجاد کاربر جدید", icon: "inbox", link: "/admin/users/create"},
      {title: "کل مدیران", icon: "inbox", link: "/admin/admins"},
      {title: "مدیر جدید", icon: "build", link: "/admin/admins/create"},
      {title: "خروج", icon: "exit_to_app", link: "/admin/logout"}
    ],
    settings: [
      {
        title: "تنظیمات عمومی سایت",
        icon: "keyboard_arrow_left",
        link: "/admin/settings/general"
      },
      {
        title: "صفحات سایت",
        icon: "keyboard_arrow_left",
        link: "/admin/settings/pages"
      },
      {
        title: "انواع وام",
        icon: "keyboard_arrow_left",
        link: "/admin/settings/pages"
      },
      {
        title: "انواع ضامن",
        icon: "keyboard_arrow_left",
        link: "/admin/settings/pages"
      },
      {
        title: "تنظیمات وام",
        icon: "keyboard_arrow_left",
        link: "/admin/settings/pages"
      },
      {
        title: "لیست شهر ها",
        icon: "keyboard_arrow_left",
        link: "/admin/settings/pages"
      },
      {
        title: "تماس با ما",
        icon: "keyboard_arrow_left",
        link: "/admin/settings/contacts"
      },
      {
        title: "آموزش ها",
        icon: "keyboard_arrow_left",
        link: "/admin/teaches"
      }
    ]
  },
  GENERAL_SETTINGS = {
    site: ['closedSiteText', 'isSiteOpen', 'siteTitle', 'siteDescription', 'siteLogo', 'siteFavIcon', 'footerText', 'headerText', 'subHeaderText'],
    adverts: ['noticeOnAdvertShow', 'noticeBeforeCreateAdvert', 'isImageAllowed'],
    pages: ['aboutUsText', 'contactUsText', 'educationText']
  }
