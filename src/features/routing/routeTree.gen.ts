/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './../../routes/__root'
import { Route as WelcomeImport } from './../../routes/welcome'
import { Route as nonAuthenticatedImport } from './../../routes/__non-authenticated'
import { Route as authenticatedImport } from './../../routes/__authenticated'
import { Route as IndexImport } from './../../routes/index'
import { Route as nonAuthenticatedSignupImport } from './../../routes/__non-authenticated/signup'
import { Route as nonAuthenticatedResetPasswordImport } from './../../routes/__non-authenticated/reset-password'
import { Route as nonAuthenticatedLoginImport } from './../../routes/__non-authenticated/login'
import { Route as nonAuthenticatedConfirmEmailImport } from './../../routes/__non-authenticated/confirm-email'
import { Route as authenticatedCreateNewSeasonImport } from './../../routes/__authenticated/create-new-season'
import { Route as authenticatedScheduleIndexImport } from './../../routes/__authenticated/schedule/index'
import { Route as authenticatedScheduleSeasonIdImport } from './../../routes/__authenticated/schedule/$seasonId'

// Create/Update Routes

const WelcomeRoute = WelcomeImport.update({
  path: '/welcome',
  getParentRoute: () => rootRoute,
} as any)

const nonAuthenticatedRoute = nonAuthenticatedImport.update({
  id: '/__non-authenticated',
  getParentRoute: () => rootRoute,
} as any)

const authenticatedRoute = authenticatedImport.update({
  id: '/__authenticated',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const nonAuthenticatedSignupRoute = nonAuthenticatedSignupImport.update({
  path: '/signup',
  getParentRoute: () => nonAuthenticatedRoute,
} as any)

const nonAuthenticatedResetPasswordRoute =
  nonAuthenticatedResetPasswordImport.update({
    path: '/reset-password',
    getParentRoute: () => nonAuthenticatedRoute,
  } as any)

const nonAuthenticatedLoginRoute = nonAuthenticatedLoginImport.update({
  path: '/login',
  getParentRoute: () => nonAuthenticatedRoute,
} as any)

const nonAuthenticatedConfirmEmailRoute =
  nonAuthenticatedConfirmEmailImport.update({
    path: '/confirm-email',
    getParentRoute: () => nonAuthenticatedRoute,
  } as any)

const authenticatedCreateNewSeasonRoute =
  authenticatedCreateNewSeasonImport.update({
    path: '/create-new-season',
    getParentRoute: () => authenticatedRoute,
  } as any)

const authenticatedScheduleIndexRoute = authenticatedScheduleIndexImport.update(
  {
    path: '/schedule/',
    getParentRoute: () => authenticatedRoute,
  } as any,
)

const authenticatedScheduleSeasonIdRoute =
  authenticatedScheduleSeasonIdImport.update({
    path: '/schedule/$seasonId',
    getParentRoute: () => authenticatedRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/__authenticated': {
      id: '/__authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof authenticatedImport
      parentRoute: typeof rootRoute
    }
    '/__non-authenticated': {
      id: '/__non-authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof nonAuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/welcome': {
      id: '/welcome'
      path: '/welcome'
      fullPath: '/welcome'
      preLoaderRoute: typeof WelcomeImport
      parentRoute: typeof rootRoute
    }
    '/__authenticated/create-new-season': {
      id: '/__authenticated/create-new-season'
      path: '/create-new-season'
      fullPath: '/create-new-season'
      preLoaderRoute: typeof authenticatedCreateNewSeasonImport
      parentRoute: typeof authenticatedImport
    }
    '/__non-authenticated/confirm-email': {
      id: '/__non-authenticated/confirm-email'
      path: '/confirm-email'
      fullPath: '/confirm-email'
      preLoaderRoute: typeof nonAuthenticatedConfirmEmailImport
      parentRoute: typeof nonAuthenticatedImport
    }
    '/__non-authenticated/login': {
      id: '/__non-authenticated/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof nonAuthenticatedLoginImport
      parentRoute: typeof nonAuthenticatedImport
    }
    '/__non-authenticated/reset-password': {
      id: '/__non-authenticated/reset-password'
      path: '/reset-password'
      fullPath: '/reset-password'
      preLoaderRoute: typeof nonAuthenticatedResetPasswordImport
      parentRoute: typeof nonAuthenticatedImport
    }
    '/__non-authenticated/signup': {
      id: '/__non-authenticated/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof nonAuthenticatedSignupImport
      parentRoute: typeof nonAuthenticatedImport
    }
    '/__authenticated/schedule/$seasonId': {
      id: '/__authenticated/schedule/$seasonId'
      path: '/schedule/$seasonId'
      fullPath: '/schedule/$seasonId'
      preLoaderRoute: typeof authenticatedScheduleSeasonIdImport
      parentRoute: typeof authenticatedImport
    }
    '/__authenticated/schedule/': {
      id: '/__authenticated/schedule/'
      path: '/schedule'
      fullPath: '/schedule'
      preLoaderRoute: typeof authenticatedScheduleIndexImport
      parentRoute: typeof authenticatedImport
    }
  }
}

// Create and export the route tree

interface authenticatedRouteChildren {
  authenticatedCreateNewSeasonRoute: typeof authenticatedCreateNewSeasonRoute
  authenticatedScheduleSeasonIdRoute: typeof authenticatedScheduleSeasonIdRoute
  authenticatedScheduleIndexRoute: typeof authenticatedScheduleIndexRoute
}

const authenticatedRouteChildren: authenticatedRouteChildren = {
  authenticatedCreateNewSeasonRoute: authenticatedCreateNewSeasonRoute,
  authenticatedScheduleSeasonIdRoute: authenticatedScheduleSeasonIdRoute,
  authenticatedScheduleIndexRoute: authenticatedScheduleIndexRoute,
}

const authenticatedRouteWithChildren = authenticatedRoute._addFileChildren(
  authenticatedRouteChildren,
)

interface nonAuthenticatedRouteChildren {
  nonAuthenticatedConfirmEmailRoute: typeof nonAuthenticatedConfirmEmailRoute
  nonAuthenticatedLoginRoute: typeof nonAuthenticatedLoginRoute
  nonAuthenticatedResetPasswordRoute: typeof nonAuthenticatedResetPasswordRoute
  nonAuthenticatedSignupRoute: typeof nonAuthenticatedSignupRoute
}

const nonAuthenticatedRouteChildren: nonAuthenticatedRouteChildren = {
  nonAuthenticatedConfirmEmailRoute: nonAuthenticatedConfirmEmailRoute,
  nonAuthenticatedLoginRoute: nonAuthenticatedLoginRoute,
  nonAuthenticatedResetPasswordRoute: nonAuthenticatedResetPasswordRoute,
  nonAuthenticatedSignupRoute: nonAuthenticatedSignupRoute,
}

const nonAuthenticatedRouteWithChildren =
  nonAuthenticatedRoute._addFileChildren(nonAuthenticatedRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof nonAuthenticatedRouteWithChildren
  '/welcome': typeof WelcomeRoute
  '/create-new-season': typeof authenticatedCreateNewSeasonRoute
  '/confirm-email': typeof nonAuthenticatedConfirmEmailRoute
  '/login': typeof nonAuthenticatedLoginRoute
  '/reset-password': typeof nonAuthenticatedResetPasswordRoute
  '/signup': typeof nonAuthenticatedSignupRoute
  '/schedule/$seasonId': typeof authenticatedScheduleSeasonIdRoute
  '/schedule': typeof authenticatedScheduleIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof nonAuthenticatedRouteWithChildren
  '/welcome': typeof WelcomeRoute
  '/create-new-season': typeof authenticatedCreateNewSeasonRoute
  '/confirm-email': typeof nonAuthenticatedConfirmEmailRoute
  '/login': typeof nonAuthenticatedLoginRoute
  '/reset-password': typeof nonAuthenticatedResetPasswordRoute
  '/signup': typeof nonAuthenticatedSignupRoute
  '/schedule/$seasonId': typeof authenticatedScheduleSeasonIdRoute
  '/schedule': typeof authenticatedScheduleIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/__authenticated': typeof authenticatedRouteWithChildren
  '/__non-authenticated': typeof nonAuthenticatedRouteWithChildren
  '/welcome': typeof WelcomeRoute
  '/__authenticated/create-new-season': typeof authenticatedCreateNewSeasonRoute
  '/__non-authenticated/confirm-email': typeof nonAuthenticatedConfirmEmailRoute
  '/__non-authenticated/login': typeof nonAuthenticatedLoginRoute
  '/__non-authenticated/reset-password': typeof nonAuthenticatedResetPasswordRoute
  '/__non-authenticated/signup': typeof nonAuthenticatedSignupRoute
  '/__authenticated/schedule/$seasonId': typeof authenticatedScheduleSeasonIdRoute
  '/__authenticated/schedule/': typeof authenticatedScheduleIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/welcome'
    | '/create-new-season'
    | '/confirm-email'
    | '/login'
    | '/reset-password'
    | '/signup'
    | '/schedule/$seasonId'
    | '/schedule'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/welcome'
    | '/create-new-season'
    | '/confirm-email'
    | '/login'
    | '/reset-password'
    | '/signup'
    | '/schedule/$seasonId'
    | '/schedule'
  id:
    | '__root__'
    | '/'
    | '/__authenticated'
    | '/__non-authenticated'
    | '/welcome'
    | '/__authenticated/create-new-season'
    | '/__non-authenticated/confirm-email'
    | '/__non-authenticated/login'
    | '/__non-authenticated/reset-password'
    | '/__non-authenticated/signup'
    | '/__authenticated/schedule/$seasonId'
    | '/__authenticated/schedule/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  authenticatedRoute: typeof authenticatedRouteWithChildren
  nonAuthenticatedRoute: typeof nonAuthenticatedRouteWithChildren
  WelcomeRoute: typeof WelcomeRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  authenticatedRoute: authenticatedRouteWithChildren,
  nonAuthenticatedRoute: nonAuthenticatedRouteWithChildren,
  WelcomeRoute: WelcomeRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/__authenticated",
        "/__non-authenticated",
        "/welcome"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/__authenticated": {
      "filePath": "__authenticated.tsx",
      "children": [
        "/__authenticated/create-new-season",
        "/__authenticated/schedule/$seasonId",
        "/__authenticated/schedule/"
      ]
    },
    "/__non-authenticated": {
      "filePath": "__non-authenticated.tsx",
      "children": [
        "/__non-authenticated/confirm-email",
        "/__non-authenticated/login",
        "/__non-authenticated/reset-password",
        "/__non-authenticated/signup"
      ]
    },
    "/welcome": {
      "filePath": "welcome.tsx"
    },
    "/__authenticated/create-new-season": {
      "filePath": "__authenticated/create-new-season.tsx",
      "parent": "/__authenticated"
    },
    "/__non-authenticated/confirm-email": {
      "filePath": "__non-authenticated/confirm-email.tsx",
      "parent": "/__non-authenticated"
    },
    "/__non-authenticated/login": {
      "filePath": "__non-authenticated/login.tsx",
      "parent": "/__non-authenticated"
    },
    "/__non-authenticated/reset-password": {
      "filePath": "__non-authenticated/reset-password.tsx",
      "parent": "/__non-authenticated"
    },
    "/__non-authenticated/signup": {
      "filePath": "__non-authenticated/signup.tsx",
      "parent": "/__non-authenticated"
    },
    "/__authenticated/schedule/$seasonId": {
      "filePath": "__authenticated/schedule/$seasonId.tsx",
      "parent": "/__authenticated"
    },
    "/__authenticated/schedule/": {
      "filePath": "__authenticated/schedule/index.ts",
      "parent": "/__authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
