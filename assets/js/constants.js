// data structure
export const rawHeaders = {
    loans: [
      {text: "عنوان", align: "right", value: 'advert.title'},
      {text: "قیمت", value: "price", align: "left"},
      {text: "مقدار وام", value: "amount", align: "left"},
      {text: "وضعیت", align: "right", sortable: false},
      {text: "عملیات", align: "left", value: 'loanTypeId', width: '140px', sortable: false}
    ],
    loanRequests: [
      {text: "عنوان", value: "title", align: "right"},
      {text: "مقدار وام", value: "amount", align: "left"},
      {text: "وضعیت", align: "right", sortable: false},
      {text: "عملیات", sortable: false, align: "left"}
    ],
    finances: [
      {text: "عنوان", align: "right", value: 'advert.title'},
      {text: "حداکثر سرمایه", value: "maxAmount", align: "left"},
      {text: "وضعیت", align: "right", sortable: false},
      {text: "عملیات", align: "left", value: 'loanTypeId', width: '140px', sortable: false}
    ],
    financeRequests: [
      {text: "عنوان", align: "right", value: 'advert.title'},
      {text: " سرمایه ی درخواستی", value: "amount", align: "left"},
      {text: "شغل", align: "right", value: 'job'},
      {text: "وضعیت", align: "right", sortable: false},
      {text: "عملیات", align: "left", value: 'loanTypeId', width: '140px', sortable: false}
    ],
    coSigners: [
      {text: "عنوان", align: "right", value: 'advert.title'},
      {text: "نوع ضمانت", value: "type", align: "left"},
      {text: "نوع ضامن", value: "guaranteeTypes", align: "left"},
      {text: "وضعیت", align: "right", sortable: false},
      {text: "عملیات", align: "left", value: 'loanTypeId', width: '140px', sortable: false}
    ],
    coSignerRequests: [
      {text: "عنوان", align: "right", value: 'advert.title'},
      {text: "نوع ضمانت", value: "type", align: "left"},
      {text: "نوع ضامن", value: "guaranteeTypes", align: "left"},
      {text: "سود", align: "right", value: 'interestRate'},
      {text: "بانک", align: "right", value: 'bank'},
      {text: "وضعیت", align: "right", sortable: false},
      {text: "عملیات", align: "left", value: 'loanTypeId', width: '140px', sortable: false}
    ],
  },
  adminRawHeaders = {
    loans: [
      {text: "شناسه", align: "right", value: 'id'},
      {text: "ثبت شده توسط", align: "right", value: 'advert.user.id'},
      {text: "عنوان", align: "right", value: 'advert.title'},
      {text: "توضیحات", align: "right", value: 'advert.text'},
      {text: "قیمت", value: "price", align: "left"},
      {text: "مقدار وام", value: "amount", align: "left"},
      {text: "عملیات", align: "left", value: 'loanTypeId', width: '140px', sortable: false}
    ],
    loanRequests: [
      {text: "شناسه", align: "right", value: 'id'},
      {text: "ثبت شده توسط", align: "right", value: 'advert.user.id'},
      {text: "عنوان", value: "title", align: "right"},
      {text: "توضیحات", value: "description", align: "right"},
      {text: "مقدار وام", value: "amount", align: "left"},
      {text: "عملیات", sortable: false, align: "left"}
    ],
    finances: [
      {text: "شناسه", align: "right", value: 'id'},
      {text: "ثبت شده توسط", align: "right", value: 'advert.user.id'},
      {text: "عنوان", align: "right", value: 'advert.title'},
      {text: "حداکثر سرمایه", value: "maxAmount", align: "left"},
      {text: "توضیحات", align: "right", value: 'advert.text'},
      {text: "عملیات", align: "left", value: 'loanTypeId', width: '140px', sortable: false}
    ],
    coSigners: [
      {text: "شناسه", align: "right", value: 'id'},
      {text: "ثبت شده توسط", align: "right", value: 'advert.user.id'},
      {text: "عنوان", align: "right", value: 'advert.title'},
      {text: "نوع ضمانت", value: "type", align: "left"},
      {text: "نوع ضامن", value: "guaranteeTypes", align: "left"},
      {text: "توضیحات", align: "right", value: 'advert.text'},
      {text: "عملیات", align: "left", value: 'loanTypeId', width: '140px', sortable: false}
    ],
  },
  advertAliases = {
    "loan-requests": {
      type: "loanRequests",
      advertType: "loanRequest",
      alias: "loan-requests",
      title: "درخواست وام"
    },
    loans: {type: "loans", advertType: "loan", alias: "loans", title: "وام"},
    finances: {type: "finances", advertType: "finance", alias: "finances", title: "سرمایه گذاری"},
    "finance-requests": {
      type: "financeRequests",
      advertType: "financeRequest",
      title: "درخواست سرمایه گذاری"
    },
    "co-signers": {type: "coSigners", advertType: "coSigner", alias: "co-signers", title: "ضامن"},
    "co-signer-requests": {
      type: "coSignerRequests",
      advertType: "coSignerRequest",
      alias: "co-signer-requests",
      title: "درخواست ضامن"
    }
  },
  filtersByField = {
    loans: {
      amount: [0, 100000, 100000000, 500000000],
      city: true,
      loanTypes: true,
      guaranteeTypes: true,
      paybackTime: [1, 4, 12, 24, 36, 48],
    }, loanRequests: {
      amount: [0, 100000, 100000000, 500000000],
      city: true,
      paybackTime: [1, 4, 12, 24, 36, 48],
      guaranteeTypes: true,
    }, coSigners: {
      guaranteeTypes: true,
      type: true
    }, coSignerRequests: {
      guaranteeTypes: true,

    }, finances: {
      maxAmount: [100000, 10000000, 1000000000]
    }, financeRequests: {
      amount: [0, 100000, 100000000, 500000000],
    }
  },
  fieldByType = {
    loans: {
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
          name: 'guaranteeTypes',
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
      edit: [
        {
          name: 'title',
          title: 'عنوان',
          path: 'advert.title'
        }, {
          name: 'city',
          title: 'شهر',
          path: 'advert.cityId'
        }, {
          name: 'text',
          title: 'توضیح آگهی',
          path: 'advert.text'
        }, {
          name: 'mobile',
          title: 'موبایل',
          path: 'advert.mobile'
        }, {
          name: 'image',
          title: 'تصویر آگهی',
          path: 'advert.image'
        }, {
          name: 'guaranteeTypes',
          title: 'نوع ضمانت',
          path: 'guaranteeTypes' // ?
        }, {
          name: 'amount',
          title: 'مقدار وام',
          path: 'amount'
        }, {
          name: 'price',
          title: 'مبلغ وام',
          path: 'price'
        }, {
          name: 'paybackTime',
          title: 'مدت بازپرداخت',
          path: 'paybackTime'
        }, {
          name: 'loanType',
          title: 'نوع وام',
          path: 'loanTypeId'
        },
      ],
    },
    loanRequests: {
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
          name: 'guaranteeTypes',
          title: 'نوع ضمانت'
        }, {
          name: 'amount',
          title: 'مقدار وام'
        }, {
          name: 'paybackTime',
          title: 'مدت بازپرداخت'
        }
      ],
      edit: [
        {
          name: 'title',
          title: 'عنوان',
          path: 'advert.title'
        }, {
          name: 'city',
          title: 'شهر',
          path: 'advert.cityId'
        }, {
          name: 'text',
          title: 'توضیح آگهی',
          path: 'advert.text'
        }, {
          name: 'mobile',
          title: 'موبایل',
          path: 'advert.mobile'
        }, {
          name: 'image',
          title: 'تصویر آگهی',
          path: 'advert.image'
        }, {
          name: 'guaranteeTypes',
          title: 'نوع ضمانت',
          path: 'guaranteeTypes' // ?
        }, {
          name: 'amount',
          title: 'مقدار وام',
          path: 'amount'
        }, {
          name: 'paybackTime',
          title: 'مدت بازپرداخت',
          path: 'paybackTime'
        },
      ],
    },
    finances: {
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
          name: 'maxAmount',
          title: 'سقف پرداخت سرمایه'
        },
      ],
      edit: [
        {
          name: 'title',
          title: 'عنوان',
          path: 'advert.title'
        }, {
          name: 'city',
          title: 'شهر',
          path: 'advert.cityId'
        }, {
          name: 'text',
          title: 'توضیح آگهی',
          path: 'advert.text'
        }, {
          name: 'mobile',
          title: 'موبایل',
          path: 'advert.mobile'
        }, {
          name: 'image',
          title: 'تصویر آگهی',
          path: 'advert.image'
        }, {
          name: 'maxAmount',
          title: 'حداکثر سرمایه',
          path: 'maxAmount'
        },
      ],
    },
    financeRequests: {
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
          name: 'job',
          title: 'شغل'
        }, {
          name: 'amount',
          title: 'مقدار سرمایه درخواستی'
        },
      ],
      edit: [
        {
          name: 'title',
          title: 'عنوان',
          path: 'advert.title'
        }, {
          name: 'city',
          title: 'شهر',
          path: 'advert.cityId'
        }, {
          name: 'text',
          title: 'توضیح آگهی',
          path: 'advert.text'
        }, {
          name: 'mobile',
          title: 'موبایل',
          path: 'advert.mobile'
        }, {
          name: 'image',
          title: 'تصویر آگهی',
          path: 'advert.image'
        }, {
          name: 'job',
          title: 'شغل',
          path: 'job'
        }, {
          name: 'amount',
          title: 'مقدار سرمایه درخواستی',
          path: 'amount'
        },
      ],
    },
    coSigners: {
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
          name: 'guaranteeTypes',
          title: 'نوع ضامن'
        }, {
          name: 'type',
          title: 'نوع ضمانت'
        },
      ],
      edit: [
        {
          name: 'title',
          title: 'عنوان',
          path: 'advert.title'
        }, {
          name: 'city',
          title: 'شهر',
          path: 'advert.cityId'
        }, {
          name: 'text',
          title: 'توضیح آگهی',
          path: 'advert.text'
        }, {
          name: 'mobile',
          title: 'موبایل',
          path: 'advert.mobile'
        }, {
          name: 'image',
          title: 'تصویر آگهی',
          path: 'advert.image'
        }, {
          name: 'guaranteeTypes',
          title: 'نوع ضامن',
          path: 'guaranteeTypes'
        }, {
          name: 'type',
          title: 'نوع ضمانت',
          path: 'type'
        },
      ],
    },
    coSignerRequests: {
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
          name: 'guaranteeTypes',
          title: 'نوع ضامن'
        }, {
          name: 'type',
          title: 'نوع ضمانت'
        }, {
          name: 'interestRate',
          title: 'سود'
        }, {
          name: 'bank',
          title: 'بانک'
        },
      ],
      edit: [
        {
          name: 'title',
          title: 'عنوان',
          path: 'advert.title'
        }, {
          name: 'city',
          title: 'شهر',
          path: 'advert.cityId'
        }, {
          name: 'text',
          title: 'توضیح آگهی',
          path: 'advert.text'
        }, {
          name: 'mobile',
          title: 'موبایل',
          path: 'advert.mobile'
        }, {
          name: 'image',
          title: 'تصویر آگهی',
          path: 'advert.image'
        }, {
          name: 'guaranteeTypes',
          title: 'نوع ضامن',
          path: 'guaranteeTypes'
        }, {
          name: 'type',
          title: 'نوع ضمانت',
          path: 'type'
        }, {
          name: 'interestRate',
          title: 'سود',
          path: 'interestRate'
        },
        {
          name: 'bank',
          title: 'بانک',
          path: 'bank'
        },
      ],
    }
  },
  advertTypes = {
    loanRequests: {
      type: "loanRequests",
      advertType: "loanRequest",
      alias: "loan-requests",
      title: "درخواست وام"
    },
    loans: {
      type: "loans",
      advertType: "loan",
      alias: "loans",
      title: "وام"
    },
    finances: {
      type: "finances",
      advertType: "finance",
      alias: "finances",
      title: "سرمایه گذاری"
    },
    financeRequests: {
      type: "financeRequests",
      advertType: "financeRequest",
      alias: "finance-requests",
      title: "درخواست سرمایه گذاری"
    },
    coSigners: {
      type: "coSigners",
      advertType: "coSigner",
      alias: "co-signers",
      title: "ضامن"
    },
    coSignerRequests: {
      type: "coSignerRequests",
      advertType: "coSignerRequest",
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
    site: ['closedSiteText', 'isSiteOpen', 'siteTitle', 'siteDescription', 'siteLogo', 'siteFavIcon', 'footerText'],
    adverts: ['noticeOnAdvertShow', 'noticeBeforeCreateAdvert', 'isImageAllowed'],
    frontpage: ['whatWeDoClip', 'whatWeDo', 'onMedia', 'whyUs', 'whatWeDo', 'noticeBeforeCreateAdvert', 'isImageAllowed', 'headerBgUrl', 'headerText', 'subHeaderText'],
    pages: ['premiumText', 'panelPremiumText', 'addAdvertHelpText', 'aboutUsText', 'contactUsTable', 'contactUsText', 'rulesText', 'contactUsSuggestionText', 'educationText']
  }
