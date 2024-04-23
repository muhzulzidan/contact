interface Contact {
    id: string
    firstName: string
    lastName: string
    age: number
    photo: string
}

interface ContactsResponse {
    message: string
    data: Contact[]
}

interface HomeProps {
    contacts: ContactsResponse
}