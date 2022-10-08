import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { response } from 'express';
import Match from '../database/models/Match';

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
  describe('get /matches/inProgress', () => {
   describe('true', () => {
    it('Deve retornar o status 200', async () => {
      const respose = await chai.request(app).get('/matches?inProgress=true')
      expect(respose.status).to.equal(200)
    })
    it('O primeiro item deve conter a chave inProgresse com o valor true', async() => {
      const response = await chai.request(app).get('/matches?inProgress=true')
      expect(response.body[0]).to.include.keys('inProgress')
      expect(response.body[0].inProgress).to.deep.equal(true)
    })
   })
   describe('false', () => {
    it('Deve retornar o status 200', async () => {
      const respose = await chai.request(app).get('/matches?inProgress=false')
      expect(respose.status).to.equal(200)
    })
    it('O primeiro item deve conter a chave inProgresse com o valor false', async() => {
      const response = await chai.request(app).get('/matches?inProgress=false')
      expect(response.body[0]).to.include.keys('inProgress')
      expect(response.body[0].inProgress).to.deep.equal(false)
    })
   })
  })
  describe('get /matches/id/finish', () => {
    const message = {message: 'Finished'}
    it('Deve retornar o status 200 e a mensagem "Finished" ', async () => {
    const response = await chai.request(app).patch('/matches/47/finish').set({"Authorization" : token})
    expect(response.status).to.equal(200)
    expect(response.body).to.deep.equal(message)
    })
  })
  describe('patch /matches/id', () => {
    it('Espera que retorne o status 200', async () => {
      const response = await chai.request(app).patch('/matches/48').set({"Authorization" : token}).send({ 
        "homeTeamGoals": 2,
        "awayTeamGoals": 2
      })
      expect(response.status).to.equal(200)
    })
    it('Espera que retorna a mensagem informando que a partida foi atualizada', async () => {
      const response = await chai.request(app).patch('/matches/48').set({"Authorization" : token}).send({
        "homeTeamGoals": 1,
        "awayTeamGoals": 2
      })
      expect(response.body).to.deep.equal({message: "Updated"})
    })
    it('Espera que não seja possível atualizar a partida sem estar atuorizado', async () => {
      const response = await chai.request(app).patch('/matches/48').send({
        "homeTeamGoals": 1,
        "awayTeamGoals": 2
      })
      expect(response.status).to.equal(401)
      expect(response.body).to.deep.equal({message: "Token must be a valid token"})
    })
  })
  describe('post /matches', () => {
    before(() => {
      Sinon.stub(Match, 'create').resolves({
      "id": 49,
      "homeTeam": 16,
      "awayTeam": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
      "inProgress": true} as Match)
    })
  
    it('Espera que retorne o status 201 e a partida criada', async () => {
      const response = await chai.request(app).post('/matches').set({"Authorization" : token}).send({"homeTeam": 16,
      "awayTeam": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
      "inProgress": true} )
      expect(response.status).to.equal(201)
      expect(response.body).to.include.keys(['id', 'homeTeam', 'awayTeam', 'homeTeamGoals', 'awayTeamGoals', 'inProgress'])
    })
    it('Não é possível criar uma nova partida sem o token de autorização', async () => {
      const response = await chai.request(app).post('/matches').send({"homeTeam": 16,
      "awayTeam": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
      "inProgress": true} )
      expect(response.status).to.equal(401)
      expect(response.body).to.deep.equal({message: "Token must be a valid token"})
    })
  })
  describe('/leaderboard', () => {
    describe('get /home', () => {
      it('Espera o status 200', async () => {
        const response = await chai.request(app).get('/leaderboard/home')
        expect(response.status).to.equal(200)
      })
      it('Espera que o primeiro time retornado seja o Santos', async () => {
        const response = await chai.request(app).get('/leaderboard/home')
        expect(response.body[0].name).to.equal('Santos')
      })
      it('Espera que tenham 16 times', async () => {
        const response = await chai.request(app).get('/leaderboard/home')
        expect(response.body.length).to.equal(16)
      })
    })
    describe('get /away', () => {
      it('Espera o status 200', async () => {
        const response = await chai.request(app).get('/leaderboard/away')
        expect(response.status).to.equal(200)
      })
      it('Espera que o primeiro time retornado seja o Palmeiras', async () => {
        const response = await chai.request(app).get('/leaderboard/away')
        expect(response.body[0].name).to.equal('Palmeiras')
      })
      it('Espera que tenham 16 times', async () => {
        const response = await chai.request(app).get('/leaderboard/away')
        expect(response.body.length).to.equal(16)
      })
    })
    describe('get /leaderboard', () => {
      it('Espera o status 200', async () => {
        const response = await chai.request(app).get('/leaderboard')
        expect(response.status).to.equal(200)
      })
      it('Espera que o primeiro time retornado seja o santos', async () => {
        const response = await chai.request(app).get('/leaderboard')
        expect(response.body[0].name).to.equal('Santos')
      })
      it('Espera que tenham 16 times', async () => {
        const response = await chai.request(app).get('/leaderboard')
        expect(response.body.length).to.equal(16)
      })
    })
  })
})