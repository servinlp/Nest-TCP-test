# Nest TCP test

A small project to explain the problem i'm having

### Tools used:

- [Nestjs](https://docs.nestjs.com/)
- [Packetsender](https://packetsender.com/)

## Situation

**Expected behavior:** Receive a response when running the app with and without docker

**What I got:** A response when running the app without docker but not inside docker

**What I thing the problem could be:** The app seems to be working inside docker but the port just not passing through correctly.

**What I already tried:**

- Making a hybrid app. Make a GET request that is then internaly passed to the TCP microservice (this worked but is not the behavior I want).
- Run `yarn start:dev` inside the docker container instead of `yarn start:prod`. This did nothing, but then again the ports both used where the same.
- Exposing the port like so: (this did nothing)

```yml
- target: 3000
  published: 3000
  protocol: tcp
  mode: host
```

### Some images

![alt text](./images/app.controller.png 'app.controller.ts')
app.controller.ts

![alt text](./images/package-sender.png 'PacketSender')
PacketSender

![alt text](./images/yarn-start:dev-result.png 'yarn start:dev results')
`yarn start:dev` results
