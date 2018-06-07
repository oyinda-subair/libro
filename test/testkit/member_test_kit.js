import ngfaker from 'ng-faker';

// sets locale to yo (Yoruba)
ngfaker.setLocale('yo');

const randomFirstName = ngfaker.name.firstName() // Annabelle
const randonLastName = ngfaker.name.lastName()
const randomUsername =
ngfaker.internet.userName(randomFirstName, randonLastName)
const randomEmail = ngfaker.internet.email(randomFirstName, randonLastName)

export const memberEntity = {
  firstName: randomFirstName,
  lastName: randonLastName,
  username: randomUsername,
  email: randomEmail,
  password: 'p@ssword1',
  role: ['member']
}

export const adminMemberEntity = {
  firstName: randomFirstName,
  lastName: randonLastName,
  username: randomUsername,
  email: randomEmail,
  password: 'p@ssword1',
  role: ['member', 'admin']
}
