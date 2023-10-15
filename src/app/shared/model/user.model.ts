export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  address: userAddress
  phone: string,
  website: string,
  company: companyData
}

interface userAddress {
  street: string,
  suite: string,
  city: string,
  zipcode: string
}

interface companyData {
  name: string,
  catchPhrase: string,
  bs: string
}