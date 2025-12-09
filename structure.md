# File Tree: client-library

**Generated:** 12/9/2025, 9:18:57 PM
**Root Path:** `/Users/dangtienhung/Documents/qltv/client-library`

```
├── 📁 prompts
│   ├── 📁 ai
│   │   ├── 📄 fix-ui-view-all-doc.mdc
│   │   └── 📄 refactor-sidebar.mdc
│   └── 📁 users
│       ├── 📄 fix-ui-view-all-doc.mdc
│       ├── 📄 refactor-sidebar.mdc
│       └── 📄 refactor-structure.mdc
├── 📁 public
│   └── 🖼️ vite.svg
├── 📁 src
│   ├── 📁 apis
│   │   ├── 📄 auth.api.ts
│   │   ├── 📄 book-category.api.ts
│   │   ├── 📄 book.api.ts
│   │   ├── 📄 ebook.api.ts
│   │   ├── 📄 physical-copies.api.ts
│   │   ├── 📄 reader.api.ts
│   │   └── 📄 user.api.ts
│   ├── 📁 assets
│   │   └── 🖼️ react.svg
│   ├── 📁 components
│   │   ├── 📁 ui
│   │   │   ├── 📄 badge.tsx
│   │   │   ├── 📄 breadcrumb.tsx
│   │   │   ├── 📄 button.tsx
│   │   │   ├── 📄 card.tsx
│   │   │   ├── 📄 dropdown-menu.tsx
│   │   │   ├── 📄 form.tsx
│   │   │   ├── 📄 input.tsx
│   │   │   ├── 📄 label.tsx
│   │   │   ├── 📄 pagination.tsx
│   │   │   ├── 📄 sonner.tsx
│   │   │   └── 📄 switch.tsx
│   │   ├── 📄 PrivateRouter.tsx
│   │   ├── 📄 PublicRouter.tsx
│   │   ├── 📄 header.tsx
│   │   ├── 📄 pagination-wrapper.tsx
│   │   └── 📄 search-bar.tsx
│   ├── 📁 configs
│   │   └── 📄 instance.ts
│   ├── 📁 contexts
│   │   └── 📄 auth-context.context.tsx
│   ├── 📁 hooks
│   │   ├── 📁 auth
│   │   │   ├── 📄 useChangePassword.tsx
│   │   │   ├── 📄 useForgotPassword.tsx
│   │   │   ├── 📄 useLogin.tsx
│   │   │   └── 📄 useResetPassword.tsx
│   │   ├── 📁 authors
│   │   │   ├── 📄 useGetAuthors.ts
│   │   │   └── 📄 useSearchAuthor.ts
│   │   ├── 📁 book-categories
│   │   │   ├── 📄 useGetBookCategories.ts
│   │   │   └── 📄 useSearchBookCategory.ts
│   │   ├── 📁 books
│   │   │   └── 📄 useGetBooks.ts
│   │   ├── 📁 ebooks
│   │   │   └── 📄 use-ebooks.ts
│   │   ├── 📁 physical-copies
│   │   │   └── 📄 use-physical-copies.ts
│   │   ├── 📁 reader
│   │   │   ├── 📄 useGetReaderByUserId.ts
│   │   │   └── 📄 useUpdateReaderById.ts
│   │   ├── 📁 user
│   │   │   ├── 📄 useCreateReaderForUser.tsx
│   │   │   ├── 📄 useGetInfoCurUser.tsx
│   │   │   ├── 📄 useRegisterUser.tsx
│   │   │   └── 📄 useUpdateUserInfo.tsx
│   │   ├── 📄 useQueryParam.ts
│   │   └── 📄 useSearch.ts
│   ├── 📁 layouts
│   │   └── 📄 RootLayout.tsx
│   ├── 📁 lib
│   │   ├── 📄 utils.ts
│   │   └── 📄 validate.ts
│   ├── 📁 pages
│   │   ├── 📁 authentication
│   │   │   ├── 📁 change-password
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 forgot-password
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 login
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 register
│   │   │   │   └── 📄 page.tsx
│   │   │   └── 📁 reset-password
│   │   │       └── 📄 page.tsx
│   │   ├── 📁 document
│   │   │   ├── 📁 components
│   │   │   │   ├── 📄 BookCard.tsx
│   │   │   │   ├── 📄 BookDetailPage.tsx
│   │   │   │   └── 📄 BookSection.tsx
│   │   │   ├── 📁 view-all-doc
│   │   │   │   ├── 📁 components
│   │   │   │   │   ├── 📄 BooksGrid.tsx
│   │   │   │   │   ├── 📄 CategorySidebar.tsx
│   │   │   │   │   ├── 📄 DocumentBreadcrumb.tsx
│   │   │   │   │   └── 📄 DocumentSearchBar.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 home
│   │   │   └── 📄 home.tsx
│   │   └── 📁 user-info
│   │       ├── 📁 components
│   │       │   └── 📄 detail-info.tsx
│   │       └── 📄 page.tsx
│   ├── 📁 stores
│   │   └── 📄 auth.store.ts
│   ├── 📁 types
│   │   ├── 📄 auth.type.ts
│   │   ├── 📄 author.type copy.ts
│   │   ├── 📄 author.type.ts
│   │   ├── 📄 book-category.type.ts
│   │   ├── 📄 book.type.ts
│   │   ├── 📄 common.type.ts
│   │   ├── 📄 ebook.type.ts
│   │   ├── 📄 location.type.ts
│   │   ├── 📄 physical-copies.type.ts
│   │   ├── 📄 publisher.type.ts
│   │   ├── 📄 reader.type.ts
│   │   └── 📄 user.type.ts
│   ├── 🎨 App.css
│   ├── 📄 App.tsx
│   ├── 🎨 index.css
│   ├── 📄 main.tsx
│   ├── 📄 routes.tsx
│   └── 📄 vite-env.d.ts
├── ⚙️ .editorconfig
├── ⚙️ .gitignore
├── ⚙️ .prettierignore
├── ⚙️ .prettierrc
├── ⚙️ components.json
├── 📄 eslint.config.js
├── 🌐 index.html
├── 📝 note.md
├── ⚙️ package-lock.json
├── ⚙️ package.json
├── 📝 structure.md
├── 📄 tailwind.config.js
├── ⚙️ tsconfig.app.json
├── ⚙️ tsconfig.json
├── ⚙️ tsconfig.node.json
└── 📄 vite.config.ts
```

---

_Generated by FileTree Pro Extension_
