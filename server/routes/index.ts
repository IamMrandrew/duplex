import express from 'express'

export default abstract class Routes {
  router: express.Router
  name: string

  constructor(router: express.Router, name: string) {
    this.router = router
    this.name = name
    this.configureRoutes()
  }

  getName(): string {
    return this.name
  }

  abstract configureRoutes(): void
}
