import request from 'supertest'
import expect from 'expect';

import app from '../../../src/server'
import { memberEntity } from '../../testkit/member_test_kit'

const server = request(app)

describe('Member API', () => {
  const entity = memberEntity
  let member

  it('POST /libro/v1/members Creates an new member account', (done) => {
    server
      .post('/libro/v1/members')
      .send(entity)
      .expect('Content-Type', /json/)
      .end((error, response) => {
        expect(response.status).toEqual(201);
        expect(response.token)
        expect(response.body.message)
          .toEqual('create: Member successfully created');
        if (error) return done(error);
        return done();
      })
  })

  it('GET /libro/v1/members/:email/email get a member by email', (done) => {
    server
      .get(`/libro/v1/members/${entity.email}/email`)
      .expect('Content-Type', /json/)
      .end((error, response) => { // eslint-disable-line consistent-return
        member = response.body.data
        expect(response.status).toEqual(200);
        expect(response.body.data.firstName).toEqual(entity.firstName)
        expect(response.body.data.username).toEqual(entity.username)
        if (error) return done(error);
        done();
      })
  })

  it('GET /libro/v1/members/:username/username member', (done) => {
    server
      .get(`/libro/v1/members/${entity.username}/username`)
      .expect('Content-Type', /json/)
      .end((error, response) => { // eslint-disable-line consistent-return
        expect(response.status).toEqual(200);
        expect(response.body.data.firstName).toEqual(entity.firstName)
        expect(response.body.data.email).toEqual(entity.email)
        if (error) return done(error);
        done();
      })
  })

  it('GET /libro/v1/members/:id get a member account by id', (done) => {
    server
      .get(`/libro/v1/members/${member.id}`)
      .expect('Content-Type', /json/)
      .end((error, response) => { // eslint-disable-line consistent-return
        expect(response.status).toEqual(200);
        expect(response.body.data.firstName).toEqual(entity.firstName)
        expect(response.body.data.username).toEqual(entity.username)
        expect(response.body.data.email).toEqual(entity.email)
        if (error) return done(error);
        done();
      })
  })

  it('GET /libro/v1/members all members', (done) => {
    server
      .get('/libro/v1/members')
      .expect('Content-Type', /json/)
      .end((error, response) => { // eslint-disable-line consistent-return
        const dataObj = response.body.data
        const memberObject = dataObj.find(data => data.id === member.id)

        expect(response.status).toEqual(200);
        expect(memberObject.username).toEqual(entity.username)
        expect(dataObj.filter(data => data.id === member.id).length).toEqual(1)
        if (error) return done(error);
        done();
      })
  })

  it('PUT /libro/v1/members update member firstname', (done) => {
    server
      .put(`/libro/v1/members/${member.id}`)
      .send({ firstName: 'Damola' })
      .expect('Content-Type', /json/)
      .end((error, response) => { // eslint-disable-line consistent-return
        const newInfo = response.body.data
        expect(response.status).toEqual(200);
        expect(newInfo.firstName).toEqual('Damola')
        if (error) return done(error);
        done();
      })
  })

  it.skip(`PUT /libro/v1/members update member password
  PENDING: waiting for middleware`, (done) => {
    server
      .put(`/libro/v1/members/${member.id}/change_password`)
      .send({ password: 'newpass' })
      .expect('Content-Type', /json/)
      .end((error, response) => { // eslint-disable-line consistent-return
        expect(response.status).toEqual(200);
        if (error) return done(error);
        done();
      })
  })
})
