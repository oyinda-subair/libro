import expect from 'expect'

import { memberEntity } from '../testkit/member_test_kit'
import { Member } from '../../src/server/models'

describe.only('Member Model', () => {
  let member
  const entity = memberEntity
  describe('Create Member', () => {
    it('should create new member', (done) => {
      Member.create(entity)
        .then((response) => {
          member = response.dataValues
          expect(member).toBeTruthy()
          done()
        })
    })

  })
});

