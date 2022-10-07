import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE2NjQ2NDkxODksImV4cCI6MTY2NTI1Mzk4OX0.CPUkYjyNQ5YwP7hV-b9mvXyJw7_mCIKB4KrO4hJTylI"

describe('/login', () => {
  describe('post /login', () => {
    const dataUser = { 
      "email": "admin@admin.com",
      "password": "secret_admin"
      }
    it('Deve retornar o status 200 caso tenha sucesso no login', async () => {
      const response = await chai.request(app).post('/login').send(dataUser)
     expect(response.status).to.equal(200)
    })
    it('Deve retornar um token', async () => {
      const response = await chai.request(app).post('/login').send(dataUser)
     expect(response.body).to.include.keys('token')
    })
  })
  describe('get /login/validate', () => {
    it('Deve retornar a role do usuário', async () => {
     const response = await chai.request(app).get('/login/validate').set({"Authorization" : token})
     expect(response.body).to.deep.equal({
      "role": "admin"
  })
  it("Deve retornar status 200, caso tenha o header Authorization", async () => {
    const response = await chai.request(app).get('/login/valiadte').set({"Authorization" : token})
    expect(response.status).to.equal(200)
  })
    })
    it ("Deve retornar status 400, caso não tenha o header Authorization", async () => {
      const response = await chai.request(app).get('/login/validate')
      expect(response.status).to.equal(400)
    } )
  } )
})

describe('/teams', () => {
  describe('get /teams',  () => {
    it('Deve retornar status 200', async () => {
      const response = await chai.request(app).get('/teams')
      expect(response.status).to.equal(200)
    })
    it('Deve retornar um array com times', async () => {
      const response = await chai.request(app).get('/teams')
      expect(response.body[0]).to.include.keys("teamName")
    })
  })
  describe('get /teams/:id', () => {
    const teamObj = {
      "id": 1,
      "teamName": "Avaí/Kindermann"
    }
    
     it('Deve retornar um objeto com o time Avaí', async () => {
      const response = await chai.request(app).get('/teams/1')
      expect (response.body).to.deep.equal(teamObj)
     })
     it('Deve retornar o status 200, caso a requisição seja realizada', async () => {
      const response = await chai.request(app).get('/teams/1')
      expect(response.status).to.equal(200)
     })
  })
})

describe('/matches', () => {
  describe('get /matches', () => {
    const match = {
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 1,
      "awayTeam": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "teamHome": {
          "teamName": "São Paulo"
      },
      "teamAway": {
          "teamName": "Grêmio"
      }
    }
    it('Deve retornar o status 200', async () => {
      const response = await chai.request(app).get('/matches')
      expect(response.status).to.equal(200)
    })
    it('Deve retornar a lista com todas as partidas', async () => {
      const response = await chai.request(app).get('/matches')
      expect(response.body[0]).to.deep.equal(match)
      expect(response.body.length).to.equal(48)
    })
  })
  // describe('get /matches/inProgress', () => {
  // })
})